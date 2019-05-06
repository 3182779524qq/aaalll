<template>
    <div class="dataTableBox">
        <el-table :data="tableData.tData" stripe :height="height" :header-cell-style="headercellstyle" :border="border"
            :row-class-name="rowclassname" @cell-dblclick="cellDblclick" :header-cell-class-name="headercellclassname"
            :cell-class-name="cellclassname" :row-style="rowstyle" :cell-style="cellstyle" style="width: 100%"
            @selection-change="selectionChange" @sort-change="sortChange">
            <!--是否展示多选框-->
            <el-table-column v-if="tableData.isMultiple" type="selection" width="55">
            </el-table-column>
            <!--是否展示列序号-->
            <el-table-column v-if="tableData.isRank" type="index" align="center" width="80" label="序号" :index="numerical">
            </el-table-column>
            <template v-for="(tit,index) in tableData.tHead">
                <!--type.image图片展示类型-->
                <el-table-column v-if="tit.type === 'image'" :key="index" :label="tit.name" :width="tit.width?tit.width:''"
                    :formatter="formatter" v-show="!tit.isHide">
                    <template slot-scope="scope">
                        <span @click="allClick(tit.type,scope.row,tit.field,tit.callback?tit.callback(scope.row[tit.field],scope.row):'')">
                            <img style="width: 100%" :src="tit.callback?tit.callback(scope.row[tit.field],scope.row):scope.row[tit.field]" alt="">
                        </span>
                    </template>
                </el-table-column>
                <!--type.custom用户自定义类型可配合wordwrap字符定义数据换行位置，和textRowSize限制数据展示行数-->
                <el-table-column v-else-if="tit.type === 'custom'" :key="index" :prop="tit.field" :label="tit.name" :width="tit.width?tit.width:''"
                    :formatter="formatter" v-show="!tit.isHide">
                    <template slot-scope="scope">
                        <div :class="textRowClassName[tit.textRowSize]" :title="tit.textRowSize?tit.hideTit?'':scope.row[tit.field]:''">
                            <span v-html="scope.row[tit.field].split(tit.wordwrap||' ').join('<br />')"></span>
                        </div>
                    </template>
                </el-table-column>
                <!--type.function万能数据处理类型配合callback回调函数处理展示内容，和textRowSize限制数据展示行数-->
                <el-table-column v-else-if="tit.type === 'function'" :key="index" :prop="tit.field" :label="tit.name"
                                 :sortable="tit.sortable?'custom':false"
                                 :width="tit.width?tit.width:''" :formatter="formatter" v-show="!tit.isHide">
                    <template slot-scope="scope">
                        <div :class="textRowClassName[tit.textRowSize]" :title="tit.textRowSize?tit.hideTit?'':tit.callback(scope.row[tit.field],scope.row):''">
                            <span v-html="tit.callback(scope.row[tit.field],scope.row)"></span>
                        </div>
                    </template>
                </el-table-column>
                <!--默认数据展示没有type时走这个分支-->
                <el-table-column v-else :key="index" :prop="tit.field" :label="tit.name" :width="tit.width?tit.width:''"
                                :formatter="formatter" v-show="!tit.isHide">
                </el-table-column>
            </template>
            <!--actionBtns横向展示操作选项-->
            <el-table-column v-if="tableData.actionBtns" label="操作" :width="tableData.actionBtWidth ? tableData.actionBtWidth :'' ">
                <template slot-scope="scope">
                    <template v-for="btn of tableData.actionBtns">
                        <template v-if="btn.filter !== undefined && btn.filter != null">
                            <el-button type="text" v-if="btn.filter.needel.indexOf(btn.filter.callback?btn.filter.callback(scope.row[btn.filter.field]):scope.row[btn.filter.field]) > -1" @click="allClick(btn.type, scope.row)">
                                <span v-html="btn.label"></span>
                            </el-button>
                        </template>
                        <template v-else>
                            <el-button type="text" @click="allClick(btn.type, scope.row)">
                                <span v-html="btn.label"></span>
                            </el-button>
                        </template>
                    </template>
                </template>
            </el-table-column>
            <!--actionSelectBtns下拉展示操作选项-->
            <el-table-column v-if="tableData.actionSelectBtns" label="操作" :width="tableData.actionBtWidth ? tableData.actionBtWidth :'' ">
                <template slot-scope="scope">
                    <el-dropdown trigger="click" placement="bottom" @command="optionHandleClick($event,scope.row)">
                        <el-button type="primary">
                            操作<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                        </el-button>
                        <el-dropdown-menu :class="{optionSelect:true}" slot="dropdown">
                            <template v-for="btn of tableData.actionSelectBtns">
                                <template v-if="btn.filter !== undefined && btn.filter != null">
                                    <el-dropdown-item v-if="btn.filter.needel.indexOf(btn.filter.callback?btn.filter.callback(scope.row[btn.filter.field]):scope.row[btn.filter.field])>-1"
                                    :command="btn.type">
                                        <span v-html="btn.label"></span>
                                    </el-dropdown-item>
                                </template>
                                <template v-else>
                                    <el-dropdown-item :command="btn.type"><span v-html="btn.label"></span>
                                    </el-dropdown-item>
                                </template>
                            </template>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <!--分页配置-->
        <div v-if="ispagination" class="paginationBox">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                :current-page="ispagination && ajax.data ? ajax.data.pageNum:''" :page-sizes="[10,50,1000,2000]"
                :page-size="ispagination && ajax.data ? ajax.data.pageSize:''" layout="total, sizes,jumper, prev, pager, next"
                :total="tableData.total||0">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import GlobalUtil from "../../utils/globalUtil";

    export default {
        data() {
            return {
                ajax: this.inAjax,
                tableData: this.inTableData,
                serachFilte: this.inSerachFilte,
                headercellstyle: {background: "#EFF3F5", fontSize: "14px", color: "#3A3A3A"},
                cellstyle: {background: "transparent", fontSize: "12px"},
                rowstyle: {height: "30px"},
                sortData:{},
                textRowClassName:['','textLineSize1','textLineSize2','textLineSize3','textLineSize4','textLineSize5']
            }
        },
        props: {
            height: {},
            //检测flush发生变化刷新数据
            flush: '',
            border: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            //是否分页
            ispagination: {
                type: Boolean,
                default: function () {
                    return true
                }
            },
            //排序格式化
            sortFormatter:{
                type: Function,
                default: function (obj) {
                    
                    return obj
                }
            },
            //搜索过滤把搜索字段及数据传过来自动搜索过滤
            inSerachFilte: {},
            //AJAX请求配置
            inAjax: {
                type: Object,
                default: function () {
                    return {
                        url: '',
                        method: "post",
                        data: {
                            pageNum: 1,
                            pageSize: 15
                        },
                    }
                }
            },
            //table表参数配置
            inTableData: {
                type: Object,
                default: function () {
                    return {
                        //表头字段配置
                        tHead: [{
                                name: '任务ID',
                                field: "task_id",
                                width: 100,
                                sortable: true,  //排序
                                isHide: true
                            }, {
                                name: '名称',
                                sortable: true,  //排序
                                field: "name"
                            }, {
                                name: '建筑属性',
                                sortable: true,  //排序
                                field: "building_name"
                            }, {
                                name: '楼宇',
                                field: "building"
                            }, {
                                name: '区域',
                                field: "area"
                            },
                            {
                                name: '街道',
                                field: "street"
                            },
                            {
                                name: '场景属性',
                                field: "scene"
                            },
                            {
                                name: '采集员',
                                field: "gathering"
                            },
                            {
                                name: '团队',
                                field: "team"
                            },
                            {
                                name: '开始时间',
                                field: "start_time"
                            },
                            {
                                name: '提交时间',
                                field: "submit_time"
                            },
                            {
                                name: '当前状态',
                                field: "status"
                            },
                            {
                                name: '采集信息',
                                field: "gathering_info"
                            },
                            /* {
                                 name: '图片',
                                 field: "img",
                                 type: 'image'
                             }*/
                        ],
                        //表内容自动渲染
                        tData: [],
                        //总条数自动渲染
                        total: 0,
                        //控制操作选项列的宽度
                        actionBtWidth: "",
                        //配置操作按钮actionSelectBtns为下拉按钮，actionBtns为平铺按钮
                        actionBtns: [{
                                type: 'info',
                                label: "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>详情</span>",
                                //控制某个字段数据为多少时显示按钮，不设置则全部显示
                                filter: {
                                    field: 'id',
                                    needel: [1, 2, 3, 4, 5]
                                }
                            },
                            {
                                type: 'hulve',
                                label: "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>忽略</span>"
                            },
                            {
                                type: 'del',
                                label: "<span style='color: #24D330;font-size: 12px;text-decoration: underline'>转为工单</span>",
                                filter: {
                                    field: 'id',
                                    needel: [2, 3, 4, 5]
                                }
                            }
                        ],
                        //操作选项列的下拉按钮配置
                        actionSelectBtns: [{
                                type: 'info',
                                label: "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>详情</span>",
                                //控制某个字段数据为多少时显示按钮，不设置则全部显示
                                filter: {
                                    field: 'id',
                                    needel: [1, 2, 3, 4, 5]
                                }
                            },
                            {
                                type: 'hulve',
                                label: "<span style='color: #1881BF;font-size: 12px;text-decoration: underline'>忽略</span>"
                            },
                            {
                                type: 'del',
                                label: "<span style='color: #24D330;font-size: 12px;text-decoration: underline'>转为工单</span>",
                                filter: {
                                    field: 'id',
                                    needel: [2, 3, 4, 5]
                                }
                            }
                        ],
                        //配置是否显示多选框
                        isMultiple: false,
                        //配置是否显示排序
                        isRank: true
                    }
                }
            },
            //枚举字段数据对应数据
            formatter: {},
            //设置头部某列类名方便控制样式
            headercellclassname: {},
            //设置tbody部份某列类名方便控制样式
            cellclassname: {},
        },
        mounted() {
            this.getList();
        },
        methods: {
            numerical(i) {
                if (this.ajax.data && this.ajax.data.pageNum) {
                    return (this.ajax.data.pageNum - 1) * this.ajax.data.pageSize + i + 1;
                } else {
                    return ++i;
                }

            },
            getList() {
                let posdata = Object.assign({}, this.ajax.data, this.serachFilte,this.sortData);
                this.$axios.ajax({url:this.ajax.url,method:this.ajax.method,data:posdata }).then((res) => {
                    let data = res.data;
                    if(data.total>9&data.pageNum >1&&data.list.length===0){
                        --this.ajax.data.pageNum
                        this.getList();
                        return
                    }
                    this.tableData.tData = data.list;
                    this.tableData.total = data.total;
                }).catch((error) => {
                    console.log(error);
                })
              /*  if (this.ajax.method == "get") {
                    this.$axios.get(this.ajax.url, {
                        params: data
                    }).then((res) => {
                        this.tableData.tData = res.data.list;
                        this.tableData.total = res.data.total;
                    }).catch((error) => {
                        console.log(error);
                    })
                }
                if (this.ajax.method == "post") {
                    this.$axios.post(this.ajax.url, data).then((res) => {
                        let data = res.data;
                        if (this.ajax.resData != undefined && this.ajax.resData.length > 0) {
                            for (let key of this.ajax.resData) {
                                data = data[key];
                            }
                        }
                        this.tableData.tData = data.list;
                        this.tableData.total = data.total;
                    }).catch((error) => {
                        console.log(error);
                    })
                }*/
            },
            allClick(type,row, field,imgUrl) {
                if (type === "image") {
                    GlobalUtil.bigImage(imgUrl?imgUrl:row[field]);
                    this.dialogVisible = true;
                    return
                }
                const outData = {
                    type: type,
                    rowData: row
                };
                this.$emit("rowClick", outData);
                /*console.log('表格栏点击事件------' + type);
                console.log(row);*/
            },
            cellDblclick(row, column, cell, event) {
                const outData = {
                    row: row,
                    column: column,
                    cell: cell,
                    event: event
                };
                this.$emit("cellDbClick", outData);
            },
            selectionChange(selection) {
                this.$emit("selection", selection);
            },
            handleSizeChange(val) {
                this.ajax.data.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.ajax.data.pageNum = val;
                this.getList();
            },
            rowclassname(row) {
                /* if ((++row.rowIndex % 2) == 0) {
                     return "rowstylebg";
                 }*/
            },
            //操作点击
            optionHandleClick(type, row) {
                this.allClick(type, row);
            },
            //排序
            sortChange(obj) {
                this.sortData = this.sortFormatter(obj);
                 this.getList();
            }
        },
        watch: {
            inSerachFilte: {
                handler(newData, oldData) {
                    this.serachFilte = newData;
                    this.ajax.data.pageNum = 1;
                    this.getList();
                },
                deep: true
            },
            flush: {
                handler(newData, oldData) {
                    this.getList();
                },
            },
            inAjax: {
                handler(newData, oldData) {
                    this.ajax = this.inAjax;
                    this.tableData = this.inTableData;
                    this.serachFilte = this.inSerachFilte;
                    this.getList();
                },
            },
        }
    }
</script>
<style scoped>
    .dataTableBox {
        width: 100%;
        height: 100%;
    }
</style>
<style>
    .dataTableBox .rowstylebg {
        background: rgba(247, 251, 252, 1) !important;
    }

    .dataTableBox .fontRed {
        color: #ff4848;
    }

    .dataTableBox .fontGreen {
        color: #36b888;
    }

    .dataTableBox .fontGray {
        color: #a4a4a4;
    }

    .dataTableBox .fontBlack {
        color: #353535;
        font-weight: bold;
    }

    .dataTableBox .pl10 {
        padding-left: 10px;
    }

    .dataTableBox .pl20 {
        padding-left: 20px;
    }

    .dataTableBox .pl30 {
        padding-left: 30px;
    }

    .dataTableBox .pr20 {
        padding-right: 20px;
    }

    .dataTableBox .pr30 {
        padding-right: 30px;
    }

    .dataTableBox .pr40 {
        padding-right: 40px;
    }

    .dataTableBox .el-checkbox__inner {
        width: 15px;
        height: 15px;
        border-color: #a5b3bc;
        border-radius: 0;
    }

    .dataTableBox .el-table::before {
        background: #ccc;
    }

    .dataTableBox .operationTit div {
        padding-left: 27%
    }

    .dataTableBox .operationbts div button {
        font-size: 14px;
        font-weight: bold;
    }

    .el-button+.el-button {
        padding-left: 1.5%;
    }

    .dataTableBox .pageTotal {
        padding-left: 20px;
        height: 31px;
        line-height: 31px;
        font-size: 14px;
        color: #838383;
    }

    .dataTableBox .pageTotal span {
        color: #3a3a3a;
    }

    .dataTableBox .setPagesize .el-input--small .el-input__inner {
        height: 25px;
        line-height: 25px;
    }

    .dataTableBox .setPagesize .el-input__inner {
        border-color: #838383;
    }

    .dataTableBox .paginationBox {
        padding: 30px;
        position: relative;
        text-align: right;
    }

    .dataTableBox .paginationBox .el-pagination {
        display: inline-block;
    }
    .dataTableBox .paginationBox .el-pagination__jump{
        margin: 0 24px;
    }

    .dataTableBox .el-table th {
        text-align: center;
        border-top: 1px #e5e5e5 solid;
        padding: 7px 0;
        border-right: none;
    }

    .dataTableBox .el-table td {
        padding: 10px 0;
    }

    .dataTableBox .el-table .cell {
        text-align: center;
        overflow: unset;
    }

    .dataTableBox .el-dropdown .el-button {
        padding: 7px 16px;
        border-radius: 30px;
    }

    .el-dropdown-menu.optionSelect {
        min-width: 100px;
        text-align: center;
    }

    .el-dropdown-menu.optionSelect .el-dropdown-menu__item {
        font-size: 12px;
        line-height: 25px;
        color: #141414;
    }

    .el-dropdown-menu.optionSelect .el-dropdown-menu__item span {
        font-size: 12px;
        color: #141414;
    }
    .dataTableBox  .textLineSize1{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        overflow:hidden;
    }
    .dataTableBox  .textLineSize2{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
    }
    .dataTableBox  .textLineSize3{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:3;
        overflow:hidden;
    }
    .dataTableBox  .textLineSize4{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:4;
        overflow:hidden;
    }
    .dataTableBox  .textLineSize5{
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:5;
        overflow:hidden;
    }

</style>