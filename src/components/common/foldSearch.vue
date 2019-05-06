<template>
    <div :style="{paddingLeft:titleWidth}" class="fold-search-items">
        <div :style="{height:itemHeight,lineHeight:itemHeight}" class="fold-search-tit">
            <span class="fold-search-tit-text">{{titleName}}</span>
        </div>
        <div class="fold-search-check-items">
            <div class="fold-search-input-box">
                <input class="fold-search-input" :style="{height:itemHeight,lineHeight:itemHeight,width:inputWidth}" v-model="searchInput" :placeholder="placeholder">
                <span @click="isShowAllItems" :style="{height:itemHeight,lineHeight:itemHeight}" class="fold-item-btn"><i :class="{'img-rotate-up':hideItems?false:true,'img-rotate-down':true}" class="el-icon-arrow-down"></i></span>
            </div>
            <div :style="{paddingLeft:hideItems?inOptionData.length===optionData.length?'73px':'0px':'0px',paddingTop:hideItems?'':inOptionData.length===optionData.length?'24px':'',height:hideItems?hideItemHeight:''}" class="check-items">
                <el-checkbox v-if="!hideCheckAll" class="checked-all" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group :style="{overflowY:'auto',maxHeight:showItemHeight}" v-model="checkedItems" @change="handleCheckedCitiesChange">
                    <el-checkbox :style="{minWidth:hideItems?'':checkItemsMinWidth}" v-for="(item,index) in optionData" :label="item.id" :key="index">{{item.name}}</el-checkbox>
                </el-checkbox-group>
                <div v-if="hideItems" class="fold-hide-scroll-bar"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            titleName:{   //title名称
                type: String,
                default: function () {
                    return "分类名称："
                }
            },
            inOptionData:{   //选项数据
                type: Array,
                default: function () {
                    return [
                        {id:1,name:'上海'},
                        {id:2,name:'北京'},
                        {id:3,name:'广州'},
                        {id:4,name:'深圳'}
                    ]
                }
            },
            placeholder:{   //input框宽度设置
                type: String,
                default: function () {
                    return "请输检索内容"
                }
            },
            hideItemHeight:{ //选项折叠隐藏高度
                type: String,
                default: function () {
                    return "24px"
                }
            },
            showItemHeight:{ //选项折叠隐藏展开的最高高度
                type: String,
                default: function () {
                    return ""
                   // return "185px"
                }
            },
            itemHeight:{   //项目默认行高
                type: String,
                default: function () {
                    return "40px"
                }
            },
            titleWidth:{   //title的宽度宽度设置
                type: String,
                default: function () {
                    return "100px"
                }
            },
            inputWidth:{   //input框宽度设置
                type: String,
                default: function () {
                    return "280px"
                }
            },
            checkItemsMinWidth:{ //选项最小宽度
                type: String,
                default: function () {
                    return "150px"
                }
            },
        },
        data() {
            return {
                hideCheckAll:false,
                //默认隐藏多余选项
                hideItems:true,
                //搜索输入框
                searchInput:'',
                //选项数据
                optionData: this.inOptionData,
                //被选中的数据
                checkedItems: [],
                //全选按钮选中状态
                checkAll: false,
                //全选状态
                isIndeterminate: false
            }
        },
        created(){

        },
        mounted() {

        },
        methods: {
            //展开隐藏所有项目
            isShowAllItems(){
                this.hideItems = !this.hideItems;
            },
            //全选方法
            handleCheckAllChange(val) {
                let checked = [];
                if(val){
                    for(let i=0,len=this.optionData.length;i<len;i++){
                        checked.push(this.optionData[i].id);
                    }
                }
                this.checkedItems = val ? checked : [];
                this.isIndeterminate = false;
            },
            //单选方法
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.optionData.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.optionData.length;
            },
            //搜索项目
            searchItem(){
                this.searchInput = this.searchInput.replace(/(^\s*)|(\s*$)/g,'')
                if(this.searchInput){
                    this.hideCheckAll = true;
                    let filterData = this.inOptionData.filter(item=>item.name.indexOf(this.searchInput) > -1);
                    this.optionData = filterData;
                }else {
                    this.optionData = this.inOptionData;
                    if(this.checkedItems.length===0){
                        this.checkAll = false;
                    }else if(this.checkedItems.length < this.optionData.length&&this.checkedItems.length > 0){
                        this.isIndeterminate = true;
                    }
                    this.hideCheckAll = false;
                }
            }
        },
        watch: {
            inOptionData: {
                handler(newData, oldData) {
                    this.optionData = newData
                },
                deep: true
            },
            checkedItems: {
                handler(newData, oldData) {
                    this.$emit("checkedData",newData)
                },
                deep: true
            },
            searchInput: {
                handler(newData, oldData) {
                    this.searchItem();
                },
                deep: true
            },

        }
    }
</script>
<style scoped>
    .fold-search-tit-text{
        font-size: 12px;
        color: #999;
    }
    .fold-search-items{
        position: relative;
    }
    .fold-search-tit{
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
    }
    .fold-search-check-items{
        width: 100%;
        display: inline-block;

    }
    .check-items{
        position: relative;
        padding-left: 70px;
        margin-top: 10px;
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
    }
    .checked-all{
       position: absolute;
        left: 0;
        top: 0;
    }
    .fold-item-btn{
        float: right;
        cursor:pointer;
        margin-right: 2px;
    }
    .fold-search-input {
        outline: none;
        border: 1px #B2B2B2 solid;
        border-radius: 20px;
        width: 100%;
        padding: 0 20px;
    }
    .fold-item-btn i{
        font-weight: bold;
        color: #999;
    }
    .fold-item-btn .img-rotate-down{
        transform: rotate(0deg);
        transition:linear 0.15s;
    }
    .fold-item-btn .img-rotate-up{
        transform: rotate(-180deg);
        transition:linear 0.15s;
    }
    .fold-hide-scroll-bar{
        width: 17px;
        height: 50px;
        background: #fff;
        position: absolute;
        right: 0;
        top: 0;
    }



</style>
<style>
    .fold-search-check-items .el-checkbox__inner{
        border-color: #b9b9b9;
    }
    .check-items .el-checkbox{
        margin-right: 30px;
        margin-left: 0;
    }
</style>