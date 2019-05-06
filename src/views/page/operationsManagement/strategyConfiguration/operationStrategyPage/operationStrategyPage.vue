<template>
    <div class="strategy-config-box">
        <div class="strategy-config-tit">
            攻略列表
            <span class="add-new-bt" @click="addAndEdit('add')">新增</span>
        </div>
        <div class="ui-table-list">
            <data-table :formatter="formatter"
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
            <add-operation-strategy v-if="popUpConfig.show" @flush="fresh=new Date()" :editInfor="isEdit" @handleClose="handleClose"></add-operation-strategy>
        </el-dialog>
    </div>
</template>

<script>
    import dataTable from '../../../../../components/common/dataTable.vue';
    import foldSearch from '../../../../../components/common/foldSearch.vue';
    import addOperationStrategy from './addOperationStrategy.vue';
    import GlobalUtil from "../../../../../utils/globalUtil";
    import globalMessageBox from "../../../../../utils/messageBox";
    import globalMessage from "../../../../../utils/message";
    export default {
        name: "operationList",
        components: {
            dataTable,
            foldSearch,
            addOperationStrategy
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
                    title:"新建软件使用说明",
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
                            name: '页面',
                            field: "useitem",
                            type:"function",
                            callback:function(data){
                                return data.useitemName
                            },
                        },
                        {
                            name: '详情',
                            field: "guideTitle",
                            hideTit:true,
                            textRowSize:5,
                            type:"function",
                            callback:function(data,row){
                                let text = ""
                                row.guideItem.forEach((e,i)=>{
                                    text += (i+1)+","+e.itemName+":<br />"+(e.itemContent===null?'':e.itemContent)+"<br />";
                                })
                                return "<div style='text-align: left' title='"+text.replace(/<br \/>/g,'\n')+"'>"+text+"</div>"
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
                    url: this.$url.getoperationStrategyPageList,
                    method: "post",
                    data: {
                        pageNum: 1,
                        pageSize: 10
                    },
                },
            }
        },
        methods: {
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
                    this.popUpConfig.title = "新增软件使用说明";
                    this.isEdit=null;
                }else {
                    this.popUpConfig.title = "编辑软件使用说明";
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
</style>