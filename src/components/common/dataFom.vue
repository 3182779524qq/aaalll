<template>
    <div class="data-form-box">
        <div class="right-data-form-box clear-both">
            <input-select v-for="(item,index) in formConfig"
                          :style="{marginBottom:item.formBottomHeight?item.formBottomHeight:formBottomHeight}"
                          :field="item.field"
                          :titName="item.titName"
                          :hideTitName="item.hideTitName"
                          :titleWidth="item.titleWidth"
                          :defaultValue="item.value"
                          :invalueUrl="item.valueUrl"
                          :key="index"
                          :itemKey="index"
                          :markRequired="item.required"
                          :inputType="item.inputType"
                          :inputWidth="item.inputWidth"
                          :itemInputWidth="item.itemInputWidth"
                          :imgWidth="item.imgWidth"
                          :imgLength="item.imgLength"
                          :imgFormat="item.imgFormat"
                          :placeholder="item.placeholder"
                          :inputTitleTextAlign="item.inputTitleTextAlign"
                          :inputHeight="item.inputHeight"
                          :maxlength="item.maxlength"
                          :minlength="item.minlength"
                          :clearable="item.clearable"
                          :selectData="item.selectData"
                          :getSelectDataConfig="item.getSelectDataConfig"
                          :disabled="item.disabled"
                          :hideItemHeight="item.hideItemHeight"
                          :showItemHeight="item.showItemHeight"
                          @dataChange="newData"
                          @optionSelectData="getInOptionSelectData"
            ></input-select>
        </div>
    </div>
</template>

<script>
    import inputSelect from './inputSelect.vue';
    export default {
        name: "operationList",
        props:{
            formIndex:'',    //永远实现添加多个form表单时定位某一个
            formConfig: {    //表单配置，可配置单个表单类型，如input或select等
                type: Array,
                default: function () {
                    return [
                        {
                            field:'sex',                //字段
                            titName:"第三方士大夫",       //字段标题名称
                            titleWidth:'100px',         //字段标题名称的宽度
                            inputTitleTextAlign:"",     //字段标题名称的居中方式默认：left
                            inputWidth:'',              //单个表单元素的宽度
                            imgWidth:'',                //当type为upLoadImg时有效设置图片宽度
                            imgLength:'',               //当type为upLoadImg时有效限制图片上传张数,
                            imgSize:'4mb',                 //当type为upLoadImg时有效限制图片大小
                            imgFormat:"jpg,jpeg,png",   //限制图片格式,默认支持jpg,jpeg,png
                            inputHeight:'',             //单个表单元素的高度
                            itemInputWidth:'100%',      //input项目框宽度设置用于换行
                            maxlength:'',               //最大输入长度
                            minlength:'',               //最小输入长度
                            clearable:true,             //输入数据时是否出现小叉叉，直接清除
                            disabled:false,             //是否可输入
                            placeholder:'',             //默认展示的提示信息
                            inputType:"select",         //表单输入框类型：input普通,
                                                                    // select普通带搜索,
                                                                    // select-multiple下拉多选带搜索,
                                                                    // upLoadImg图片上传,value必须为数组[]
                                                                    // year/month/date/dates/ week/datetime/datetimerange/daterange日期时间选择器
                                                                    // underLineSearSelect-multiple 带搜索横向展示多选框,value必须为数组[]

                            value:'',                    //外部传入的值
                            invalueUrl:{},                //当上传图片加密地址时使用，存url{img1:"www.img.com/pic"},用value的数组对应取URL，value必须为数组[]
                            regexp:'/\w/g',             //表单验证时-正则匹配,写正则的字符串，也可以直接写已有的正则验证类型：username/password/email/phone/url/ip/chinese/
                            required:true,              //表单验证时-是否必填
                            selectData:[               //当inputType为select-multiple或select时这个字段为必须，传入下拉框数据
                                {label:"男",value:0},
                                {label:"女",value:1},
                                {label:"未知",value:2},
                                {label:"不男不女",value:3},
                            ],
                            getSelectDataConfig:{  //select下拉数据请求配置
                                 ajax:{  //ajax请求配置
                                     url:this.$url.getAllBuildType,
                                     method:"get",
                                     data:{}
                                 },
                                 dataKey:{ //字段对应配置value和label分别对应ajax返回数据的相应字段
                                     value:"id",
                                     label:"name"
                                 }

                            },
                            hideItemHeight:'24px', //选项折叠隐藏高度 underLineSearSelect-multiple时有效
                            showItemHeight:'115px', //选项折叠展开的最大高度 underLineSearSelect-multiple时有效
                            checkItemsMinWidth:"30px" //选项折叠展开时的选项最小宽度 underLineSearSelect-multiple时有效
                        }
                    ]
                }
            },
            //每个输入框元素下方到另一个框的高度
            formBottomHeight: {
                type: String,
                default: function () {
                    return '20px'
                }
            },
        },
        components: {
            inputSelect
        },
        data() {
            return {
                //多维form时使用，用于定位form
                informIndex:this.formIndex
            }
        },
        methods: {
            //组件内部值改变更新到父级
            newData(obj){
                obj['formIndex'] = this.informIndex;
                this.$emit("dataReturn",obj)
            },
            //组件内部获取下拉数据更新到父级
            getInOptionSelectData(obj){
                obj['formIndex'] = this.informIndex;
                this.$emit("optionSelectData",obj)
            }
        }
    }
</script>

<style scoped>
    .data-form-box{

    }
</style>