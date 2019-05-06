<template>
    <div class="search-header">
        <div class="header-left" v-if="selectOptions">
            <el-select v-model="typeValue" filterable placeholder="请选择分类">
                <el-option v-for="(item,index) in selectOptions" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="header-right">
            <el-input v-model="searchValue" :placeholder="placeholder" class="search-input" @keyup.enter.native="searchAction"></el-input>
            <el-button type="primary" round class="search-btn" style="margin-right:0px" @click="searchAction">
                {{searchBtn||'搜索'}}
            </el-button>
        </div>

    </div>
</template>
<script>
    export default {
        name: "tableHeader",
        /**
         * title                标题名称
         * leftBtn              左侧按钮名字
         * searchBtn            搜索按钮名字 不传默认:搜索
         * searchPlaceholder    搜索框placeholder
         */
        props: ['selectOptions', 'searchBtn', 'searchPlaceholder'],
        data() {
            return {
                searchValue: '',
                typeValue: ''
            }
        },
        created() {
            // console.log(this.selectOptions)
            this.placeholder = this.searchPlaceholder?this.searchPlaceholder:'请输入关键字,按下enter键搜索'
            if(this.selectOptions && this.selectOptions.length>0){
                this.typeValue = this.selectOptions[0].value
            }
        },
        methods: {
            searchAction() {
                if (this.selectOptions) {
                    if (this.searchValue) {
                        // 定义最大字节
                        var maxtext = 20;
                        var d = 0
                        // 匹配汉字
                        if (this.searchValue.match(/[\u4e00-\u9fa5]/g)) {
                            d = this.searchValue.match(/[\u4e00-\u9fa5]/g).length
                        }
                        maxtext = maxtext - d
                        // 匹配字母，数字，不为空和汉字
                        var str = '/^[\u4e00-\u9fa5a-zA-Z0-9]{1,' + maxtext + '}$/'
                        if (!(eval(str).test(this.searchValue))) {
                            this.$message.error('请输入合法关键字符')
                        } else {
                            this.$emit('searchAction', {
                                type: this.typeValue,
                                value: this.searchValue
                            });
                        }
                    }else{
                        this.$emit('searchAction', {
                                type: this.typeValue,
                                value: this.searchValue
                            });
                    }
                } else {
                    this.$emit('searchAction', this.searchValue);
                }
            },
        },
    }
</script>
<style scoped lang="scss">
    .search-header {
        padding: 0px 30px 10px;
        overflow: hidden;
        background: #fff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        top: -10px;

        .header-title {
            /* margin-right:20px; */
            font-size: 14px;
            line-height: 40px;
            float: left;
        }

        .header-left {
            float: left;
            margin-right: 30px;
            width: 200px;
            /* display: flex; */
        }

        .header-right {
            /* width: 500px; */
            /* display: flex; */
            float: left;
        }

        .search-input {
            float: left;
            width: 380px;
        }

        .search-btn {
            margin: 0 15px;
            float: right;
            width: 120px;
            background: #6890FE;
        }
    }
</style>