<template>
    <div class="operation-list-box">
         <titleHeaderVue title="运营活动列表" headerBtn='创建活动' showDate='true' @headerAction='addAndEdit("add")'></titleHeaderVue>
        <selectFormVue ref="selectFormVue" :option="selectFormConfig" @search="getData"></selectFormVue>
        <search-header @searchAction="searchAction" searchPlaceholder="请输入主题关键字，按下enter键搜索">
        </search-header >
        <div class="ui-table-list">
            <data-table :inSerachFilte="serachFilte" :formatter="formatter" :sortFormatter="sortFormatter" :flush="fresh" :inTableData="tableDataConfig"
                @rowClick="tableClickConfig" :inAjax="tableAjaxConfig">
            </data-table>
        </div>
        <!--弹窗-->
        <el-dialog class="ui-pop-up-box" :title="popUpConfig.title" center :close-on-click-modal=false :visible.sync="popUpConfig.show"
            :width="popUpConfig.width">
            <operationListAddItem v-if="popUpConfig.show" @flush="fresh=new Date()" :editInfor="isEdit" @handleClose="handleClose"></operationListAddItem>
        </el-dialog>
    </div>
</template>

<script>
    import searchHeader from '@/components/header/searchHeader.vue';
    import selectFormVue from '@/components/common/selectForm.vue';
    import titleHeaderVue from '@/components/common/titleHeader.vue';
    import operationListAddItem from './operationListAddItem.vue';
    import dataTable from '../../../../components/common/dataTable.vue';
    import GlobalUtil from "../../../../utils/globalUtil";
    import globalMessageBox from "../../../../utils/messageBox";
    import globalMessage from "../../../../utils/message";
    
    export default {
        name: "operationList",
        components: {
            searchHeader,
            selectFormVue,
            operationListAddItem,
            dataTable,
            titleHeaderVue
        },
        data() {
            return {
                //搜索组件配置
                selectFormConfig:[
                    {
                        template:'filterResult',
                        resultKey:''
                    },
                    {
                        template:'city',
                        resultKey:'city'
                    },
                    {
                        template:'activityDate',
                        resultKey:'time',
                        text:"活动日期"
                    },
                    {
                        template:'team',
                        resultKey:'team'
                    },
                    {
                        template:'attribute',
                        resultKey:'build'
                    },
                    {
                        template:'taskHomeState',
                        type:'activity',
                        resultKey:'status'
                    },
                ],
                //table组件搜索字段
                serachFilte:{},
                //用于tableData组件刷新，tableData检测到fresh值发生变化就会刷新数据
                fresh: "",
                //弹窗判断是否为编辑
                isEdit:null,
                //新增编辑弹窗配置
                popUpConfig:{
                    show:false,
                    title:"创建活动",
                    width:"910px"
                },
                showPopUp: false,
                //tableData组件参数配置
                tableDataConfig: {
                    //表头及字段配置
                    tHead: [{
                            name: '任务ID',       //表头名称
                            field: "id",         //表头对应字段
                            //width: 88          //可以设置固定宽度
                        }, {
                            name: '活动图片',
                            field: "imgUrl",
                            type: 'image',      //type 为处理不同数据需求，image 为图片类型，该列显示图片
                        }, {
                            name: '主题',
                            field: "title",
                            //width: 218
                        },
                        {
                            name: '开始时间',
                            field: "startTime",
                            sortable:true,      //设置可排序，配合sortFormatter方法处理排序字段格式
                            type: 'function',  //type 为处理不同数据需求，function 万能数据处理类型可在callback任意处理出需要的格式并return即可在页面展示
                            callback: function (v) {
                                return GlobalUtil.dateFormat(v,"YY-M-D H:m:s").split(" ").join("<br/>");
                            },
                        },
                        {
                            name: '结束时间',
                            field: "endTime",
                            sortable:true,  //排序
                            type: 'function',
                            callback: function (v) {
                                return GlobalUtil.dateFormat(v,"YY-M-D H:m:s").split(" ").join("<br/>");
                            },
                            //sortable: true, //排序
                            //width: 100
                        },
                        {
                            name: '城市',
                            field: "city",
                            textRowSize:3,          //可限制数据展示列数多出隐藏
                            type: 'function',
                            callback: function (cellValue) {
                                let names = "";
                                 if(cellValue&&cellValue.length>0){
                                     cellValue.forEach((e,i)=>{
                                         if(e&&e.name){
                                             names += e.name;
                                             names += i!==cellValue.length-1?',':'';
                                         }
                                     })
                                     return names;
                                 }
                                return names;
                            },
                        },
                        {
                            name: '建筑属性',
                            field: "build",
                            type: 'function',
                            textRowSize:3,
                            callback: function (cellValue) {
                                let names = "";
                                if(cellValue&&cellValue.length>0){
                                    cellValue.forEach((e,i)=>{
                                        if(e&&e.name){
                                            names += e.name;
                                            names += i!==cellValue.length-1?',':'';
                                        }
                                    })
                                    return names;
                                }
                                return names;
                            },
                            width: 250
                        },
                        {
                            name: '团队',
                            field: "team",
                            type: 'function',
                            textRowSize:3,
                            callback: function (cellValue) {
                                let names = "";
                                if(cellValue&&cellValue.length>0){
                                    cellValue.forEach((e,i)=>{
                                        if(e&&e.name){
                                            names += e.name;
                                            names += i!==cellValue.length-1?',':'';
                                        }
                                    })
                                    return names;
                                }
                                return names;
                            },
                             width: 250
                        },

                         {
                             name: '任务状态',
                             field: "status"   //1-未发布，2-已发布
                         },
                    ],
                    //自动渲染
                    tData: [],
                    //自动渲染
                    total: 0,
                    //配置操作按钮actionSelectBtns为下拉按钮，actionBtns为平铺按钮
                    actionBtWidth: "220px",
                    actionBtns: [{
                            type: 'edit',
                            label: "<span class='ul-table-option-btn'>编辑</span>",
                        },
                        {
                            type: 'release',
                            label: "<span class='ul-table-option-btn'>发布</span>",
                            filter: {
                                callback:function(val){
                                    return val.code;
                                },
                                field: 'status',
                                needel: ["1"]
                            }
                        },
                        {
                            type: 'recall',
                            label: "<span class='ul-table-option-btn'>撤回</span>",
                            filter: {
                                callback:function(val){
                                    return val.code;
                                },
                                field: 'status',
                                needel: ["2","3","4"]
                            }
                        },
                        {
                            type: 'del',
                            label: "<span class='ul-table-option-btn'>删除</span>",
                        },
                    ],
                    //配置是否显示多选框
                    isMultiple: false,
                    //配置是否显示排序
                    isRank: false
                },
                //列表自动获取数据ajax配置
                tableAjaxConfig: {
                    url: this.$url.getOperatingActivitiesList,
                    method: "post",
                    data: {
                        pageNum: 1,
                        pageSize: 10
                    },
                },
            }
        },
        methods: {
            //搜索组件数据处理
            searchAction(v) {
                this.$refs.selectFormVue.searchAll('search');
                this.serachFilte["keyWord"] = v;

            },
            //添加编辑点击事件
            addAndEdit(type,rowData){
                if(type==="add"){
                    this.popUpConfig.title = "创建活动";
                    this.isEdit=null;
                }else {
                    this.popUpConfig.title = "编辑活动";
                    this.isEdit =rowData;
                }
                this.popUpConfig.show =true;
            },
            //删除活动
            deleteData: function (data) {
                globalMessageBox.confirm({
                    title: "删除提示",
                    message: "确定删除？",
                    type: "warning"
                }).then(() => {
                    //操作历史记录
                    let paramObj = {
                        old: {
                            id:'',
                        },
                        new: {
                            id:data.id,
                        },
                        options: {
                        },
                        fields: {
                        },
                        key: "id"
                    }
                    this.$axios.ajax({url:this.$url.delOperatingActivities,method:"post",data:{id:data.id},headers:{"optContent":GlobalUtil.handleLogParams(paramObj)}}).then(res=>{
                        if(res.retCode!==0){
                            globalMessage.error(res.msg);
                            return
                        }
                        globalMessage.success("删除成功！");
                        //改变值刷新table组件
                        this.fresh = new Date();
                    })

                })
            },
            //改变状态
            statusChange: function (type,data) {
                let msg = type ==="release"?'发布':'撤回'
                globalMessageBox.confirm({
                    title: msg+"提示",
                    message: "确定"+msg+"？",
                    type: "warning"
                }).then(() => {
                    let state = type ==="release"?'2':'1'
                    //操作历史记录
                    let paramObj = {
                        old: {
                            id:data.id,
                            status:type ==="release"?'1':'2'
                        },
                        new: {
                            id:data.id,
                            status:state
                        },
                        options: {
                            status:{
                                '1':'未发布',
                                '2':'已发布'
                            }
                        },
                        fields: {
                            status:'状态'
                        },
                        key: "id"
                    }
                    this.$axios.ajax({url:this.$url.changeOperatingActivities,method:"post",data:{id:data.id,activityStatus:state},headers:{"optContent":GlobalUtil.handleLogParams(paramObj)}}).then(res=>{
                        if(res.retCode!==0){
                            globalMessage.error(res.msg);
                            return
                        }
                        globalMessage.success(msg+"成功！");
                        //改变值刷新table组件
                        this.fresh = new Date();
                    })

                })
            },
            //搜索组件传出搜索数据
            getData(data){
                if(data.status.length>0){
                    let sta={'未发布':1,'未开始':2,'进行中':3,'已结束':4};
                    let arr = [];
                    data.status.forEach((e,i)=>{
                        if(sta[e]){
                            arr.push(sta[e]);
                        }
                    })
                    data.status = arr;
                }
                this.serachFilte = data;
            },
            //tabel点击事件过滤可actionBtns配置的type过滤出table中点击的相应操作按钮
            tableClickConfig(obj) {
                if (obj.type === 'edit') {
                    this.addAndEdit('edit',obj.rowData);
                }
                if (obj.type === 'del') {
                    this.deleteData(obj.rowData);
                }
                if (obj.type === 'release'||obj.type === 'recall') {
                    this.statusChange(obj.type,obj.rowData);
                }
            },
            handleClose(done) {
                this.popUpConfig.show = false;
            },
            //用于固定类型枚举方法
            formatter(row, column, cellValue) {
                if (column.property == 'status') {
                    let a = ['',"未发布", "未开始",'进行中',"已结束"];
                    return a[cellValue.code];
                }
                return cellValue;
            },
            //排序字段数据处理
            sortFormatter(obj) {
                return {order:{name:obj.prop,type:obj.order==="ascending"?"asc":"desc"}};
            }
        }
    }
</script>

<style scoped>
    .operation-list-box {
        min-width: 900px;
    }

    .now-time {
        font-size: 12px;
    }

    .create-item {
        cursor: pointer;
    }

    .ui-table-list {
        border-radius: 10px;
        background: #fff;
        margin-top: 20px;
    }

    .ui-table-list .ui-table-list-selection {
        height: 60px;
        line-height: 60px;
        padding: 0 27px;
    }
</style>