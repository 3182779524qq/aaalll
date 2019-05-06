<template>
    <div class="strategy-config-box">
        <div class="strategy-config-tit">
            采集规范
            <span class="add-new-bt" @click="addAndEdit('add')">新增采集规范</span>
        </div>
        <div class="search-item-box" >
            <search-header @searchAction="searchAction" searchPlaceholder='请输入采集位置关键字，按下enter键搜索'>
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
            <add-gathering v-if="popUpConfig.show" @flush="fresh=new Date()" @handleClose="handleClose" :editInfor="isEdit"></add-gathering>
        </el-dialog>
    </div>
</template>

<script>
    import dataTable from '../../../../../components/common/dataTable.vue';
    import searchHeader from '../../../../../components/header/searchHeader.vue';
    import foldSearch from '../../../../../components/common/foldSearch.vue';
    import addGathering from './addGathering';
    import GlobalUtil from "../../../../../utils/globalUtil";
    import globalMessageBox from "../../../../../utils/messageBox";
    import globalMessage from "../../../../../utils/message";
    export default {
        name: "operationList",
        components: {
            dataTable,
            foldSearch,
            searchHeader,
            addGathering
        },
        data() {
            return {
                //选项过滤数据
                searchData:[],
                //用于tableData组件刷新，tableData检测到fresh值发生变化就会刷新数据
                fresh: "",
                //table搜索功能字段，以对象方式传入要搜索的字段和数据，table内部自动搜索并更新列表
                serachFilte:{},
                //新增编辑弹窗配置
                popUpConfig:{
                    show:false,
                    title:"新增场景攻略",
                    width:"710px"
                },
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
                            field: "collect",
                            type:"function",
                            callback:function(data){
                                return data.collectName
                            },
                        },
                        {
                            name: '详情',
                            field: "guideItem",
                            hideTit:true,
                            textRowSize:5,
                            type:"function",
                            callback:function(data,row){
                                let text = ""
                                if(data&&data.length>0) {
                                    data.forEach((e, i) => {
                                        text += (i + 1) + "," + e.itemName + "：<br/>" + (e.itemContent===null?'':e.itemContent)+ "<br/>";
                                    })
                                }
                                return "<div style='text-align: left' title='"+text.replace(/<br\/>/g,'\n')+"'>"+text+"</div>"
                            },
                            width:520
                        },
                        {
                            name: '更新日期',
                            field: "gmtModify",
                            type: "function",
                            callback: function (v) {
                                return GlobalUtil.dateFormat(v,"YY-M-D H:m:s").split(" ").join("<br/>");
                            },
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
                    url: this.$url.getGatheringPlacePageList,
                    method: "post",
                    data: {
                        pageNum: 1,
                        pageSize: 10
                    },
                },
                //弹窗判断是否为编辑
                isEdit:null,
            }
        },
        methods: {
            //搜索
            searchAction(v) {
                this.serachFilte= {keyWord:v};
            },
           //分类过滤参数
            checkedData(obj){
                this.serachFilte = {positionCode:obj};
                console.log(this.serachFilte);
            },
            //tabel点击事件过滤可actionBtns配置的type过滤出table中点击的相应操作按钮
            tableClickConfig(obj) {
                if (obj.type == 'edit') {
                    this.addAndEdit('edit',obj.rowData);
                }
                if (obj.type === 'del') {
                    this.deleteData(obj.rowData);
                }
            },
            //添加编辑点击事件
            addAndEdit(type,rowData){
                if(type==="add"){
                    this.popUpConfig.title = "新增采集规范";
                    this.isEdit=null;
                }else {
                    this.popUpConfig.title = "编辑采集规范";
                    this.isEdit =rowData;
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
                    this.$axios.ajax({url:this.$url.deloperationAndGathering,method:"post",data:{id:data.id},headers:{"optContent":GlobalUtil.handleLogParams(paramObj)}}).then(res=>{
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
                if (column.property == 'status') {
                    let a = ["未发布", '已发布']
                    return a[cellValue];
                }
                return cellValue;
            },
            //table列表排序处理
            sortFormatter(obj){
                return obj;
            }
        },
        created() {

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
        padding: 20px 40px 20px 33px;
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