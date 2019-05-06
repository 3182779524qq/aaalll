<template>
    <div class="strategy-config-box">
        <div class="strategy-config-tit">
            攻略列表
            <span class="add-new-bt" @click="addAndEdit('add')">新增实例</span>
        </div>
        <div class="search-item-box" >
            <search-header @searchAction="searchAction" searchPlaceholder="请输入采集位置关键字，按下enter键搜索">
            </search-header >
        </div>
        <div class="ui-table-list">
            <data-table :formatter="formatter"
                        :inSerachFilte="serachFilte"
                        :sortFormatter="sortFormatter"
                        :flush="fresh"
                        :inTableData="tableDataConfig"
                        @rowClick="tableClickConfig"
                        :inAjax="tableAjaxConfig">
            </data-table>
        </div>
        <!--弹窗-->
        <el-dialog
                class="ui-pop-up-box-no-pading"
                :title="popUpConfig.title"
                center
                :close-on-click-modal=false
                :visible.sync="popUpConfig.show"
                :width="popUpConfig.width">
            <add-picture-configuration v-if="popUpConfig.show" @flush="fresh=new Date()" :editInfor="isEdit" @handleClose="handleClose"></add-picture-configuration>
        </el-dialog>
    </div>
</template>

<script>
    import dataTable from '../../../../../components/common/dataTable.vue';
    import searchHeader from '../../../../../components/header/searchHeader.vue';
    import foldSearch from '../../../../../components/common/foldSearch.vue';
    import addPictureConfiguration from './addPictureConfiguration.vue';
    import GlobalUtil from "../../../../../utils/globalUtil";
    import globalMessageBox from "../../../../../utils/messageBox";
    import globalMessage from "../../../../../utils/message";
    export default {
        name: "operationList",
        components: {
            dataTable,
            foldSearch,
            searchHeader,
            addPictureConfiguration
        },
        data() {
            return {
                //用于tableData组件刷新，tableData检测到fresh值发生变化就会刷新数据
                fresh: "",
                //弹窗判断是否为编辑
                isEdit:null,
                //新增编辑弹窗配置
                popUpConfig:{
                    show:false,
                    title:"新建例图",
                    width:"870px"
                },
                serachFilte:{},
                //tableData组件参数配置
                tableDataConfig: {
                    //表头及字段配置
                    tHead: [
                        {
                            name: 'ID',
                            field: "id",
                            //width: 88
                        },
                        {
                            name: '采集位置',
                            field: "position"
                        },
                        {
                            name: '点类型',
                            field: "point"
                        },
                        {
                            name: '例图',
                            field: "imgUrl",
                            type: 'image',
                            callback:function(data,row){
                                return row.imgName[0]?data[row.imgName[0]]:'';
                            },
                        },
                        {
                            name: '说明',
                            field: "imgDesc",
                            hideTit:true,
                            textRowSize:5,
                            type:"function",
                            callback:function(data){
                                return '<span style="display: block;text-align: left" title="'+(data===null?'':data)+'"> '+(data===null?'':data)+' </span>';
                            },
                            width:520
                        },
                        {
                            name: '更新日期',
                            field: "gmtUpdate",
                            type: "function",
                            callback: function (v) {
                                return GlobalUtil.dateFormat(v,"YY-M-D H:m:s").split(" ").join("<br/>");
                            },
                            //sortable: true,  //排序
                            //width: 100
                        },
                    ],
                    //自动渲染
                    tData: [],
                    //自动渲染
                    total: 0,
                    //配置操作按钮actionSelectBtns为下拉按钮，actionBtns为平铺按钮
                    actionBtWidth: "220px",
                    actionBtns: [
                        {
                            type: 'edit',
                            label: "<span class='ul-table-option-btn'>编辑</span>",
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
                //table自动获取列表数据ajax配置
                tableAjaxConfig: {
                    url: this.$url.getPictureConfigurationList,
                    method: "post",
                    data: {
                        pageNum: 1,
                        pageSize: 10
                    },
                },
            }
        },
        methods: {
            //搜索
            searchAction(v) {
                this.serachFilte= {keyWord:v};

            },
            //tabel点击事件过滤可actionBtns配置的type过滤出table中点击的相应操作按钮
            tableClickConfig(obj) {
                if (obj.type === 'edit') {
                    this.addAndEdit('edit',obj.rowData);
                }
                if (obj.type === 'del') {
                    this.deleteData(obj.rowData);
                }
            },
            //添加编辑点击事件
            addAndEdit(type,rowData){
                if(type==="add"){
                    this.popUpConfig.title = "新建例图";
                    this.isEdit=null;
                }else {
                    this.popUpConfig.title = "编辑例图";
                    this.isEdit = rowData;
                }
                this.popUpConfig.show =true;
            },
            //删除例图
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
                    this.$axios.ajax({url:this.$url.delPictureConfiguration,method:"post",data:{id:data.id},headers:{"optContent":GlobalUtil.handleLogParams(paramObj)}}).then(res=>{
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
            //关闭弹窗
            handleClose(done) {
                this.popUpConfig.show = false;
            },
            //用于固定类型枚举方法
            formatter(row, column, cellValue) {
                if (column.property == 'areaCategory') {
                    return cellValue.buildName;
                }
                if (column.property == 'position') {
                    return cellValue.pointName;
                }
                if (column.property == 'point') {
                    return cellValue.pointName;
                }
                    return cellValue;
            },
            //table排序数据处理
            sortFormatter(obj){
                return obj;
            }
        }
    }
</script>

<style scoped>
    .strategy-config-box{
        border-radius: 20px;
        background: #fff;
        min-width: 900px;
    }
    .strategy-config-tit{
        height: 64px;
        line-height: 64px;
        position: relative;
        font-size: 14px;
        color: #000000;
        font-weight: bold;
        padding-left: 33px;
        border-bottom: 2px #E5E5E5 solid;
    }
    .strategy-config-tit .add-new-bt{
        background: #6890fe;
        display: inline-block;
        width: 122px;
        height:40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        border-radius: 20px;
        cursor: pointer;
        position: absolute;
        right: 25px;
        top: 12px;
    }
    .strategy-config-tit .add-new-bt:hover{
        background: #5d81e4;
    }
    .search-item-box{
        padding: 20px 0 20px 33px;
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
    }

    .ui-table-list .ui-table-list-selection {
        height: 60px;
        line-height: 60px;
        padding: 0 27px;
    }
    .search-header{
        border: none;
        top:0;
    }
</style>