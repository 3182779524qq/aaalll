<template>
    <div class="tips">
        <div class="ui-table-list">
            <div class="ui-table-list-selection">
                <h2 class="header_title">小贴士</h2>
                <el-button round type="primary" class="add_btn" @click="leftAction">新增小贴士
                </el-button>
            </div>
            <data-table :formatter="formatter" :flush="fresh" :inTableData="tableDataConfig" @rowClick="tableClickConfig"
                :inAjax="tableAjaxConfig">
            </data-table>
        </div>
        <!-- 小贴士弹窗 -->
        <el-dialog title="" :visible.sync="editVisible" width="710px" center>
            <div class="edat_active">
                <h2 class="edat_title" style="">编辑小贴士</h2>
                <div class="edat_text">
                    <el-form ref="form" :model="editTips" label-width="80px">
                        <el-form-item label="小贴士内容">
                            <el-input v-model="editTips.tipContent" clearable @blur="editcon"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSubmit">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog title="" :visible.sync="addVisible" width="710px" center>
            <div class="edat_active">
                <h2 class="edat_title" style="">新增小贴士</h2>
                <div class="edat_text">
                    <el-form ref="form" :model="addTips" label-width="80px">
                        <el-form-item label="小贴士内容">
                            <el-input v-model="addTips.tipContent" clearable placeholder="字符数不得超过40个"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSubmit">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import dataTable from '@/components/common/dataTable'
    import searchHeader from '@/components/header/searchHeader'
    import globalMessage from "@/utils/message";
    import globalMessageBox from "@/utils/messageBox";
    import GlobalUtil from '@/utils/globalUtil.js'
    export default {
        name: "operateTips",
        components: {
            dataTable,
            searchHeader
        },
        data() {
            return {
                oldData: {},
                addVisible: false,
                editVisible: false,
                addTips: {
                    id: '',
                    tipContent: '',
                    gmtCreate: ''
                },
                editTips: {
                    id: '',
                    tipContent: '',
                    gmtUpdate: ''
                },
                showTips: {
                    id: '',
                    tipContent: '',
                    gmtUpdate: '',
                    staute: ''
                },
                //用于tableData组件刷新，tableData检测到fresh值发生变化就会刷新数据
                fresh: "",
                input: '',
                //tableData组件参数配置
                tableDataConfig: {
                    //表头及字段配置
                    tHead: [{
                        name: 'ID',
                        field: "id",
                        width: 88
                    }, {
                        name: '小贴士详情',
                        field: "tipContent"
                    }, {
                        name: '更新日期',
                        field: "gmtUpdate",
                        type: "function",
                        callback: function (v) {
                            if (v) {
                                return GlobalUtil.dateFormat(v, "YY-M-D H:m:s").split(" ").join("<br/>");
                            }
                        },
                        width: 192
                    }],
                    //自动渲染
                    tData: [],
                    //自动渲染
                    total: 0,
                    //配置操作按钮actionSelectBtns为下拉按钮，actionBtns为平铺按钮
                    actionBtns: [{
                        type: 'edit',
                        label: "<span>编辑</span>",
                    }, {
                        type: 'show',
                        label: "<span>展示</span>",
                        filter: {
                            field: 'tipStatus',
                            needel: [1]
                        }
                    }, {
                        type: 'callback',
                        label: "<span>撤回</span>",
                        filter: {
                            field: 'tipStatus',
                            needel: [0]
                        }
                    }, {
                        type: 'delete',
                        label: "<span>删除</span>",
                    }],
                    //配置是否显示多选框
                    isMultiple: false,
                    //配置是否显示排序
                    isRank: false
                },
                tableAjaxConfig: {
                    url: this.$url.getAllTips,
                    method: "post",
                    data: {
                        pageNum: 1,
                        pageSize: 10
                    },
                }
            }
        },
        methods: {
            //tabel点击事件过滤可actionBtns配置的type过滤出table中点击的相应操作按钮
            tableClickConfig(obj) {
                // console.log(obj,"000");
                // 删除操作
                if (obj.type == 'delete') {
                    globalMessageBox.confirm({
                        title: "删除提示",
                        message: "确定删除？",
                        type: "warning"
                    }).then(() => {
                        this.showTips.tipContent = obj.rowData.tipContent;
                        this.showTips.id = obj.rowData.id;
                        this.showTips.tipStatus = JSON.stringify(obj.rowData.tipStatus);
                        this.oldData = GlobalUtil.deepClone(this.showTips);
                        let paramObj = {
                            old: {
                                id: this.oldData.id,
                                tipContent: this.oldData.tipContent,
                            },
                            new: {
                                id: this.showTips.id
                            },
                            options: {
                                tipStatus: {
                                    '0': "撤回",
                                    '1': "展示"
                                }
                            },
                            fields: {
                                tipStatus: "状态",
                                tipContent: '详情'
                            },
                            key: "id"
                        }
                        this.$axios.post(this.$url.deleteTipById, {
                            "id": obj.rowData.id
                        }, {
                            "optContent": GlobalUtil.handleLogParams(paramObj)
                        }).then(res => {
                            if (res.retCode !== 0) {
                                globalMessage.error(res.msg);
                                return
                            }
                            globalMessage.success("删除成功！");
                            //改变值刷新table组件
                            this.fresh = new Date();
                        })
                    })
                }
                // 编辑操作
                if (obj.type == 'edit') {
                    this.editVisible = true;
                    this.editTips.tipContent = obj.rowData.tipContent;
                    this.editTips.id = obj.rowData.id;
                    this.oldData = GlobalUtil.deepClone(this.editTips);
                }
                // 展示操作
                if (obj.type == 'show') {
                    // console.log(obj.rowData.id)
                    this.showTips.tipContent = obj.rowData.tipContent;
                    this.showTips.id = obj.rowData.id;
                    this.showTips.tipStatus = JSON.stringify(obj.rowData.tipStatus);
                    this.oldData = GlobalUtil.deepClone(this.showTips);
                    let paramObj = {
                        old: {
                            id: this.oldData.id,
                            tipStatus: '1',
                            tipContent: this.oldData.tipContent,
                        },
                        new: {
                            id: this.showTips.id,
                            tipStatus: '0',
                            tipContent: obj.rowData.tipContent,
                        },
                        options: {
                            tipStatus: {
                                '0': "撤回",
                                '1': "展示"
                            }
                        },
                        fields: {
                            tipStatus: "状态",
                            tipContent: '详情'
                        },
                        key: "id"
                    }
                    this.$axios.post(this.$url.updataTipStaute, {
                        "id": obj.rowData.id,
                        "staute": 1
                    }, {
                        "optContent": GlobalUtil.handleLogParams(paramObj)
                    }).then(result => {
                        // console.log(result.data)
                        this.$message({
                            message: '展示成功',
                            type: 'success'
                        });
                        this.fresh = new Date();
                    })
                }
                // 撤回操作
                if (obj.type == 'callback') {
                    // console.log(obj.rowData.id)
                    this.showTips.tipContent = obj.rowData.tipContent;
                    this.showTips.id = obj.rowData.id;
                    this.showTips.tipStatus = JSON.stringify(obj.rowData.tipStatus);
                    this.oldData = GlobalUtil.deepClone(this.showTips);
                    let paramObj = {
                        old: {
                            id: this.oldData.id,
                            tipStatus: '0',
                            tipContent: this.oldData.tipContent,
                        },
                        new: {
                            id: this.showTips.id,
                            tipStatus: '1',
                            tipContent: obj.rowData.tipContent,
                        },
                        options: {
                            tipStatus: {
                                '0': "撤回",
                                '1': "展示"
                            }
                        },
                        fields: {
                            tipStatus: "状态",
                            tipContent: '详情'
                        },
                        key: "id"
                    }
                    // console.log(paramObj,888);
                    // GlobalUtil.handleLogParams(paramObj)
                    // return;
                    this.$axios.post(this.$url.updataTipStaute, {
                        "id": obj.rowData.id,
                        "staute": 0
                    }, {
                        "optContent": GlobalUtil.handleLogParams(paramObj)
                    }).then(result => {
                        // console.log(result.data)
                        this.$message({
                            message: '撤回成功',
                            type: 'success'
                        });
                        this.fresh = new Date();
                    })
                }
            },

            //用于固定类型枚举方法
            formatter(row, column, cellValue) {
                // 过滤
                return cellValue;
            },
            // 添加按钮
            leftAction(v) {
                this.addVisible = true;
            },
            // 添加提交
            addSubmit() {
                let paramObj = {
                    old: {
                        id: "",
                        tipStatus: "-",
                        tipContent: "-",
                    },
                    new: {
                        id: "",
                        tipStatus: 1,
                        tipContent: this.addTips.tipContent,
                    },
                    options: {
                        tipStatus: {
                            0: "撤回",
                            1: "展示"
                        }
                    },
                    fields: {
                        tipStatus: "状态",
                        tipContent: '详情'
                    },
                    key: "id"
                }
                if (!this.addTips.tipContent) {
                    this.$message.error('请输入正确小贴士');
                    return false;
                }
                this.$axios.post(this.$url.addTip, {
                    "content": this.addTips.tipContent
                }, {
                    "optContent": GlobalUtil.handleLogParams(paramObj)
                }).then(result => {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    // console.log(result.data)
                    this.fresh = new Date();
                })
                this.addVisible = false
            },
            // 赋值
            editcon(e) {
                this.editTips.tipContent = e.target.value
            },
            // 编辑提交
            editSubmit() {
                let paramObj = {
                    old: {
                        id: this.oldData.id,
                        status: this.oldData.status,
                        tipContent: this.oldData.tipContent,
                    },
                    new: {
                        id: this.editTips.id,
                        status: this.editTips.status,
                        tipContent: this.editTips.tipContent
                    },
                    options: {
                        status: {
                            0: "撤回",
                            1: "展示"
                        }
                    },
                    fields: {
                        status: "状态",
                        tipContent: '详情'
                    },
                    key: "id"
                }
                // console.log(this.editTips.tipContent);
                this.editVisible = false
                if (!this.editTips.tipContent) {
                    this.$message.error('请输入正确小贴士');
                    return false;
                }
                this.$axios.post(this.$url.updataTipContent, {
                    "id": this.editTips.id,
                    "content": this.editTips.tipContent
                }, {
                    "optContent": GlobalUtil.handleLogParams(paramObj)
                }).then(result => {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    // console.log(result.data)
                    this.fresh = new Date();
                })
            }
        },
        watch: {
            // 监听，清空tipContent里的数据
            addVisible: function () {
                if (this.addVisible === false) {
                    this.addTips.tipContent = ''
                }
            }
        },
    }
</script>
<style scoped>
    .edat_active {
        margin-left: 100px;
        width: 500px;
    }

    .header_title {
        font-size: 14px;
        line-height: 60px;
        float: left;
    }

    .add_btn {
        margin: 10px 15px;
        float: right;
        width: 120px;
    }

    .dialog-footer button {
        width: 180px;
        height: 40px;
        background: rgba(104, 144, 254, 1);
        border-radius: 20px;
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

    .edat_title {
        text-align: center;
        height: 50px;
        padding-top: 66px;
        font-size: 24px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(100, 100, 100, 1);
    }
</style>
<style>
    .tips .el-dialog--center .el-dialog__body {
        padding: 0 !important;
    }

    .tips .el-form-item__content .el-select {
        margin-right: 20px;
    }

    .tips .el-dialog__header {
        padding: 0 !important;
    }

    .tips .el-form-item__label {
        width: 90px !important;
    }

    .tips .el-form-item__content {
        width: 400px !important;
        margin-left: 90px !important;
    }
</style>