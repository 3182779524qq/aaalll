<template>
    <div :style="{width: itemInputWidth}" class="input-select-box">
        <!--普通input和textarea输入框-->
        <template v-if="inputType==='input'||inputType==='textarea'">
            <span :style="{width: inputWidth,paddingLeft:hideTitName?0:titleWidth}" class="input-item-row">
                <span :style="{
                            width: titleWidth,
                            height: inputHeight,
                            lineHeight:inputHeight,
                            textAlign:inputTitleTextAlign
                       }"
                      class="input-item-title">
                    <span :class="{required:!hideTitName&&markRequired}">{{titName}}</span>
                </span>
                <el-input :type="inputType==='input'?'text':'textarea'"
                          :style="{height:inputHeight}"
                          v-model="value"
                          :placeholder="placeholder"
                          :clearable='clearable'
                          :maxlength="maxlength"
                          :minlength="minlength">
                </el-input>
            </span>
        </template>
        <!--普通select单选和多选框-->
        <template v-else-if="inputType==='select'||inputType==='select-multiple'">
             <span :style="{width: inputWidth,paddingLeft:hideTitName?0:titleWidth}" class="input-item-row">
                <span :style="{width: titleWidth,height: inputHeight,lineHeight:inputHeight,textAlign:inputTitleTextAlign}"
                      class="input-item-title">
                    <span :class="{required:!hideTitName&&markRequired}">{{titName}}</span>
                </span>
               <el-select  :multiple="inputType==='select-multiple'?true:false"
                           :collapse-tags="inputType==='select-multiple'?true:false"
                           :style="{height:inputHeight,width:'100%'}"
                           v-model="value"
                           filterable
                           :placeholder="placeholder">
                   <el-option
                        v-for="item in inselectData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
               </el-select>
            </span>
        </template>
       <!--带搜索横向展示多选框-->
        <template v-else-if="inputType==='underLineSearSelect-multiple'">
             <span :style="{width:'100%',paddingLeft:hideTitName?0:titleWidth}" class="input-item-row">
                <span :style="{width: titleWidth,height: inputHeight,lineHeight:inputHeight,textAlign:inputTitleTextAlign}"
                      class="input-item-title">
                    <span :class="{required:!hideTitName&&markRequired}">{{titName}}</span>
                </span>
                 <div class="under-line-sear-select-box">
                        <div class="fold-search-input-box">
                            <el-input class="under-line-sear-select-input"
                                      :style="{height:inputHeight,lineHeight:inputHeight,width:inputWidth}"
                                      v-model="searchInput"
                                      :placeholder="placeholder">
                            </el-input>
                              <span @click="isShowAllItems" :style="{height:inputHeight,lineHeight:inputHeight}" class="under-line-sear-select-fold-item-btn">
                                <i :class="{'img-rotate-up':hideItems?false:true,'img-rotate-down':true}" class="el-icon-arrow-down"></i>
                            </span>
                        </div>
                        <div :style="{paddingLeft:hideItems?inselectData.length===resSelectData.length?'85px':'15px':'15px',paddingTop:hideItems?'':inselectData.length===resSelectData.length?'24px':'',height:hideItems?hideItemHeight:''}" class="under-line-sear-select-check-items">
                            <el-checkbox v-if="!hideCheckAll"
                                         class="under-line-sear-select-checked-all"
                                         :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange">
                                全选
                            </el-checkbox>
                            <el-checkbox-group :style="{maxHeight:showItemHeight}" v-model="value" @change="handleCheckedCitiesChange">
                                <el-checkbox :style="{minWidth:hideItems?'':checkItemsMinWidth}" v-for="(item,index) in inselectData" :label="item.value" :key="index">{{item.label}}</el-checkbox>
                            </el-checkbox-group>
                            <div v-if="hideItems" class="hide-scroll-bar"></div>
                        </div>
                 </div>

            </span>
        </template>
        <!--时间日期选择框-->
        <template v-else-if="inputType==='daterange'|| inputType==='year'||inputType==='month'||inputType==='date'||inputType==='week'||inputType==='datetime'||inputType==='datetimerange' ">
             <span :style="{width: inputWidth,paddingLeft:hideTitName?0:titleWidth}" class="input-item-row">
                <span :style="{width: titleWidth,height: inputHeight,lineHeight:inputHeight,textAlign:inputTitleTextAlign}"
                      class="input-item-title">
                    <span :class="{required:!hideTitName&&markRequired}">{{titName}}</span>
                </span>
                <el-date-picker
                        @change="dateChange"
                        :style="{height:inputHeight,width:'100%'}"
                        v-model="value"
                        value-format="timestamp"
                        :type="inputType"
                        :placeholder="placeholder">
                </el-date-picker>
            </span>
        </template>
        <!--图片上传框-->
        <template v-else-if="inputType==='upLoadImg'">
             <span :style="{width: inputWidth,paddingLeft:hideTitName?0:titleWidth}" class="input-item-row">
                <span :style="{width: titleWidth,height: inputHeight,lineHeight:inputHeight,textAlign:inputTitleTextAlign}"
                      class="input-item-title">
                    <span :class="{required:!hideTitName&&markRequired}">{{titName}}</span>
                </span>
                 <span class="ui-up-img-box" :style="{width:'100%'}">
                      <template v-if="value && value!=' '">
                          <span v-for="(item,index) in value" :key="index" :style="{height:inputHeight,width:imgWidth}" class="img-items">
                             <span class="img-item">
                                 <img @click="clickImg(valueUrl[item])" :src="valueUrl[item]" alt="">
                             </span>
                                <span @click="delImgs(index,item)" class="operation-box">
                                     <i class="el-icon-circle-close-outline"></i>
                                </span>
                         </span>
                      </template>
                     <template v-if="imgLength===1&&!value.length||imgLength>1&&value.length<imgLength">
                         <span v-if="" style="cursor:pointer;background: #fff;font-size: 20px;font-weight: bold" :style="{height:inputHeight,width:imgWidth,lineHeight:inputHeight,textAlign:'center'}" class="img-items up-btn">
                            <i class="el-icon-plus"></i>
                             <input class="up-img-btn" @change="selectImg($event)" type="file">
                         </span>
                     </template>
                      <span class="pic-reminder">提示：照片上传超过2M将被压缩至2M以下</span>
                 </span>
               <!-- <el-date-picker
                        :style="{height:inputHeight,width:'100%'}"
                        v-model="value"
                        :type="inputType"
                        :placeholder="placeholder">
                </el-date-picker>-->
            </span>
        </template>

    </div>
</template>

<script>
    import GlobalUtil from "../../utils/globalUtil";
    import globalMessage from "../../utils/message";
    import * as qiniu from 'qiniu-js';
    export default {
        props: {
            markRequired:'',//是否必填
            itemKey:'', //循环项目的index
            field:'',   //字段
            titName:'',     //标题名称
            hideTitName:"",//隐藏标题名称
            defaultValue:'' , //外部传入的默认值
            invalueUrl:{        //当上传图片加密地址时使用，存url{img1:"www.img.com/pic"},用value的数组对应取URL
                type: Object,
                default: function () {
                    return {
                        //img1:url,
                        //img2:url
                    }
                }
            },
            inputType: {
                type: String,
                default: function () {
                    return "input"     //类型 input普通,select普通带搜索,select-multiple下拉多选带搜索,[year/month/date/dates/ week/datetime/datetimerange/daterange]日期时间选择器
                }
            },
            itemInputWidth:{   //input项目框宽度设置用于换行
                type: String,
                default: function () {
                    return "100%"
                }
            },
            inputWidth:{   //input框宽度设置
                type: String,
                default: function () {
                    return "100%"
                }
            },
            imgWidth:{   //当type为upLoadImg时有效设置图片宽度
                type: String,
                default: function () {
                    return "150px"
                }
            },
            imgLength:{   //限制图片上传张数
                type: Number,
                default: function () {
                    return 10
                }
            },
            imgSize:{   //限制图片大小
                type: String,
                default: function () {
                    return "2048" //单位kb
                }
            },
            imgFormat:{   //限制图片格式,默认支持jpg,jpeg,png
                type: String,
                default: function () {
                    return "jpg,jpeg,png,gif"
                }
            },
            inputTitleTextAlign:{   //inputTitle的文字对齐方式
                type: String,
                default: function () {
                    return "left"
                }
            },
            titleWidth:{   //inputTitle宽度
                type: String,
                default: function () {
                    return "20%"
                }
            },
            inputHeight:{  //input框高度设置
                type: String,
                default: function () {
                    return "40px"
                }
            },
            placeholder:'', //input默认展示的提示文字
            maxlength:'',   //最大长度
            minlength:'',   //最小长度
            clearable:'',   //是否可以清空
            disabled:'',    //是否可输入
            selectData:{  //select框的下拉数据
                type: Array,
                default: function () {
                    return [
                        {label:"男",value:1},
                        {label:"女",value:1},
                        {label:"未知",value:1},
                    ]
                }
            },
            getSelectDataConfig:{  //select下拉数据请求配置
                type: Object,
                default: function () {
                    return {
                       /* ajax:{  //ajax请求配置
                            url:this.$url.getAllBuildType,
                            method:"get",
                            data:{}
                        },
                        dataKey:{ //字段对应配置value和label分别对应ajax返回数据的相应字段
                            value:"id",
                            label:"name"
                        }*/
                    }
                }
            },
            hideItemHeight:{ //选项折叠隐藏高度 underLineSearSelect-multiple时有效
                type: String,
                default: function () {
                    return "24px"
                }
            },
            showItemHeight:{ //选项折叠展开的最大高度 underLineSearSelect-multiple时有效
                type: String,
                default: function () {
                    return "115px"
                }
            },
            checkItemsMinWidth:{ //选项折叠展开时的选项最小宽度
                type: String,
                default: function () {
                    return "30px"
                }
            },

        },
        data() {
            return {
                initemKey:this.itemKey,
                //父级传入value数据
                indefaultValue:this.defaultValue,
                //字段
                inField:this.field,
                value:'',
                valueUrl:this.invalueUrl,
                //七牛云token
                token:'',
                //上传图片数量限制
                inIimgLength:this.imgLength,
                //图片格式限制
                inImgFormat:this.imgFormat,
                //限制图片大小
                inImgSize:this.imgSize,

                //默认隐藏多余选项
                hideItems:true,
                hideCheckAll:false,
                //全选状态
                isIndeterminate: false,
                //全选按钮选中状态
                checkAll: false,
                //搜索输入框
                searchInput:'',
                //初始化数据
                resSelectData:this.selectData,
                //选项数据
                inselectData: this.selectData,
            }
        },
        created(){
            //判断是否有设置下拉数据请求配置，有哲获取下拉数据
            if(this.getSelectDataConfig&&this.getSelectDataConfig.ajax&&this.getSelectDataConfig.ajax.url){
                //获取保存第一次获取到的默认数据,用于解决下拉数据还没请求到时显示code超出inpu框的问题
                let firstDefaultValue = this.defaultValue||[];
                //获取下拉数据
                this.getSelectDataList(this.getSelectDataConfig,firstDefaultValue);
            }else {
                this.value = this.defaultValue;
                //判断展示全选样式
                this.checkedStatusChange();
            }
        },
        mounted() {},
        methods: {
            //删除上传的图片
            delImgs(index,imgName){
                this.value.splice(index,1);
                delete this.valueUrl[imgName];
            },
            //图片点击
            clickImg(src){
                GlobalUtil.bigImage(src);
            },
            //上传图片
            selectImg(e){
                let it = this;
                let date = new Date().getTime()+((Math.random()*1000)*(Math.random()*1000)).toFixed(0);
                if(!this.token){
                    this.$axios.ajax({url:this.$url.getQiniuToken,method:"get"}).then(res=>{
                        this.token= res.data.qiniuToken;
                        checkCompress(e.target.files[0])
                    })
                }else {
                    checkCompress(e.target.files[0])
                }
                //判断是否压缩图片
                function checkCompress(fileObj) {
                    let format = it.inImgFormat.split(",");
                    let fileFormat = fileObj.type.substr(fileObj.type.indexOf("/"),fileObj.type.length).replace("/",'');
                    //判断上传文件的格式是否正确
                    if(format.indexOf(fileFormat)===-1){
                        globalMessage.error('上传图片格式错误，请上传 '+format.join(" / ")+' 格式图片');
                        return false
                    }
                    if (fileObj.size /1024 > it.inImgSize) { //大于限制大小，进行压缩上传
                        GlobalUtil.photoCompress(fileObj,{quality:0.2},false,function(subFile) {
                            if (subFile.size /1024 > it.inImgSize){
                                GlobalUtil.photoCompress(subFile,{quality:0.1},false,function(insubFile) {
                                    upImg(insubFile);
                                });
                            }else {
                                upImg(subFile);
                            }
                        });
                    }else {
                        upImg(fileObj);
                    }
                }
                //图片解析上传
                function upImg(file){
                    let fileSize = it.inImgSize;

                    //判断上传文件大小
                    if(parseFloat((file.size/1024).toFixed(3))>fileSize){
                        globalMessage.error('上传图片大小不能超过 '+fileSize/1024+' MB');
                        return false
                    }
                    let formData = new FormData();
                    formData.append('file', file);
                    formData.append('token', it.token);
                    formData.append('key', "picture_"+it.inField+'_'+date);
                    it.$axios.ajax({url:it.$url.qiniuUploadImg,method:'post',data:formData}).then(res=>{
                        let fr = new FileReader();
                        fr.onload=function (re) {
                            if(it.inIimgLength===1){
                                it.value=[res.key];
                                it.valueUrl = {};
                                it.valueUrl[res.key] = re.target.result;
                            }else {
                                it.value.push(res.key);
                                it.valueUrl[res.key] = re.target.result;
                            }

                        }
                        fr.readAsDataURL(file);
                    })
                }
            },

            //展开隐藏所有项目
            isShowAllItems(){
                this.hideItems = !this.hideItems;
            },
            //全选方法
            handleCheckAllChange(val) {
                let checked = [];
                if(val){
                    for(let i=0,len=this.inselectData.length;i<len;i++){
                        checked.push(this.inselectData[i].value);
                    }
                }
                this.value = val ? checked : [];
                //判断展示全选样式
                this.checkedStatusChange();
                //this.isIndeterminate = false;
            },
            //单选方法
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                //判断展示全选样式
                this.checkedStatusChange();
                /*this.checkAll = checkedCount === this.inselectData.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.inselectData.length;*/
            },
            //搜索项目
            searchItem(){
                this.searchInput = this.searchInput.replace(/(^\s*)|(\s*$)/g,'')
                if(this.searchInput){
                    this.hideCheckAll = true;
                    let filterData = this.resSelectData.filter(item=>item.label.indexOf(this.searchInput) > -1);
                    this.inselectData = filterData;
                }else {
                    this.inselectData = this.resSelectData;
                    //判断展示全选样式
                    this.checkedStatusChange();
                    /*if(this.value.length===0){
                        this.checkAll = false;
                    }else if(this.value.length < this.inselectData.length&&this.value.length > 0){
                        this.isIndeterminate = true;
                    }*/
                    this.hideCheckAll = false;
                }
            },
            //判断及设置全新样式
            checkedStatusChange(){
                if(this.inputType==="underLineSearSelect-multiple") {
                    this.checkAll = this.value.length === this.resSelectData.length;
                    this.isIndeterminate = this.value.length > 0 && this.value.length < this.resSelectData.length;
                }
            },
            //当外部传入数据为空时，把时间选择框清空
            dateChange(value){
                if(!this.indefaultValue){
                    this.value = '';
                }
            },
            //获取下拉数据
            getSelectDataList(config,defValue){
                //ajax请求
                this.$axios.ajax({url:config.ajax.url,method:config.ajax.method,data:config.ajax.data}).then(res=>{
                    if(res.retCode!==0){
                        globalMessage.error(res.msg);
                        return
                    }
                    let keys={}
                    keys[config.dataKey.value]='value';
                    keys[config.dataKey.label]='label';
                    this.resSelectData =  GlobalUtil.arrayDataKeyDispose(res.data,keys);
                    this.value = defValue;
                    this.$emit("optionSelectData",{field:this.field,data:this.resSelectData ,itemIndex:this.initemKey});//把内部获取到的选项数据传到父级使用
                    //判断展示全选样式
                    this.checkedStatusChange();
                })
            }
        },
        watch: {
            //监控父级默认值改变时更新数据
            defaultValue:{
                handler(newData, oldData) {
                    this.value = newData;
                    this.indefaultValue = newData;
                },
                deep: true
            },
            //监控当前值改变时更新到父级
            value: {
                handler(newData, oldData) {
                    this.$emit("dataChange",{field:this.field,data:newData,itemIndex:this.itemKey});
                },
                deep: true
            },
            //监控搜索框值变化触发搜索
            searchInput: {
                handler(newData, oldData) {
                    this.searchItem();
                },
                deep: true
            },
            //监控父级传入下拉数据更新时更新数据
            selectData: {
                handler(newData, oldData) {
                    this.inselectData=newData;
                    this.resSelectData=newData;
                    //判断展示全选样式
                    this.checkedStatusChange();
                },
                deep: true
            },
            //监控内部下拉数据更新时更新数据
            resSelectData: {
                handler(newData, oldData) {
                    this.inselectData=newData;
                },
                deep: true
            },
        }
    }
</script>
<style scoped>
    .input-select-box{
        float: left;
    }
    .input-select-box .input-item-row{
        position: relative;
        display: inline-block;
        box-sizing: border-box;
    }
    .input-item-title{
        display: inline-block;
        position: absolute;
        box-sizing: border-box;
        padding-right: 11px;
        top: 0;
        left: 0;
    }
    .input-item-title span{
        position: relative;
    }
    .input-item-title span.required:before{
        position: absolute;
        height: 10px;
        line-height: 14px;
        left: -8px;
        top: 2px;
       content: "*";
        color: #f56c6c;
    }
    .ui-up-img-box{
        display: inline-block;
        position: relative;
    }
    .ui-up-img-box .img-items{
        overflow: hidden;
        position: relative;
        border: 1px #B2B2B2 solid;
        background: #f9f9f9;
        display: inline-block;
        float: left;
        margin-right: 15px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ui-up-img-box .img-items .img-item{
        display: inline-block;
    }
    .ui-up-img-box .img-items .img-item img{
        width: 100%;
    }
    .ui-up-img-box .img-items .operation-box{
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        color: #ff7656;
        font-weight: bold;
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        display: none;

    }
    .ui-up-img-box .img-items .operation-box{
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        color: #ff7656;
        font-weight: bold;
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        display: none;

    }
    .ui-up-img-box .img-items:hover .operation-box{
         display: block;

     }
    .up-btn{
        position: relative;
    }
    .up-btn .up-img-btn{
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        cursor: pointer;
        opacity: 0;
    }



    .under-line-sear-select-box{
        box-sizing: border-box;
        padding: 10px 15px 10px 5px;
        border: 1px #b2b2b2 solid;
        border-radius: 20px;
        width: 100%;
        display: inline-block;

    }

    .under-line-sear-select-fold-item-btn{
        float: right;
        padding-right: 3px;
        cursor:pointer;
    }
    .under-line-sear-select-fold-item-btn i{
        font-weight: bold;
        color: #999;
    }
    .under-line-sear-select-fold-item-btn .img-rotate-down{
        transform: rotate(0deg);
        transition:linear 0.15s;
    }
    .under-line-sear-select-fold-item-btn .img-rotate-up{
        transform: rotate(-180deg);
        transition:linear 0.15s;
    }
    .under-line-sear-select-check-items{
        position: relative;
        margin-top: 10px;
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
    }
    .under-line-sear-select-check-items .hide-scroll-bar{
        position: absolute;
        width: 20px;
        height: 30px;
        background: #fff;
        right: 0;
        top: 0;
    }
    .under-line-sear-select-checked-all{
        position: absolute;
        left: 15px;
        top: 0;
    }
    .ui-up-img-box .pic-reminder{
        font-size: 12px;
        position: absolute;
        left: 0;
        bottom: 0;
    }

</style>
<style>
    .input-select-box .el-input__inner{
        border-color: #b2b2b2;
        border-radius: 20px;
        color: #727272;
        height: 100%;
    }
    .input-select-box .el-textarea__inner{
        border-color: #b2b2b2;
        border-radius: 20px;
        color: #727272;
        height: 100%;
        resize:none
    }
    .input-select-box .el-select .el-input{
        height: 100%;
    }

    .under-line-sear-select-box .el-checkbox__inner{
        border-color: #b9b9b9;
    }
    .under-line-sear-select-check-items .el-checkbox{
        margin-right: 30px;
        margin-left: 0;
    }
    .under-line-sear-select-box .el-checkbox-group{
        overflow-y: auto;
    }

</style>