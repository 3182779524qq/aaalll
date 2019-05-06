<template>
    <div class="add-item-box ">
        <div class="clear-both">
            <div class="left-img-upload-box">
                <up-load-image :imgInfor="imgInfor" @returnImgNames="returnImgNames"></up-load-image>
            </div>
            <div class="right-data-form-box">
                <data-fom :formConfig="dataForm" @optionSelectData="selectData" @dataReturn="dataReturn"></data-fom>
            </div>
        </div>
        <div class="ui-pop-up-footer">
            <el-button class="ui-pop-up-footer-finish-bt"  @click="submitData">{{editInfor?"完成编辑":"完成创建"}}</el-button>
        </div>
    </div>
</template>

<script>
    import * as qiniu from 'qiniu-js';
    import dataFom from '../../../../components/common/dataFom.vue';
    import upLoadImage from '../../../../components/common/upLoadImage.vue';
    import GlobalUtil from "../../../../utils/globalUtil";
    import globalMessage from "../../../../utils/message";
    export default {
        name: "operationList",
        components: {
            dataFom,
            upLoadImage
        },
        props:{
            editInfor:'',    //判断是否为编辑
        },
        data() {
            return {
                inEditInfor:GlobalUtil.deepCopy(this.editInfor),
                //图片配置信息
                imgInfor: {
                    field:'activityImgUrl',
                    imgName: [],
                    imgUrl: {}
                },
                //上传的图片
                uploadImgs:'',
                //form表单配置
                dataForm:[
                        {
                            field:'activityTitle',
                            titName:"活动标题",
                            inputType:"input",
                            clearable:true,
                            value:"",
                            regexp:'',
                            maxlength:30,
                            required:true,
                            placeholder:"请输入",
                            titleWidth:'130px',
                            inputTitleTextAlign:"right"
                        },
                        {
                            field:'city',
                            titName:"参与活动城市",
                            inputType:"underLineSearSelect-multiple",
                            value:[],
                            regexp:'',
                            required:true,
                            selectData:[],
                            getSelectDataConfig:{  //select下拉数据请求配置
                                ajax:{  //ajax请求配置
                                    url:this.$url.getCityList,
                                    method:"get",
                                    data:{}
                                },
                                dataKey:{ //字段对应配置value和label分别对应ajax返回数据的相应字段
                                    value:"id",
                                    label:"name"
                                }
                            },
                            titleWidth:'130px',
                            inputWidth:'80%',
                            inputTitleTextAlign:"right"
                        },
                        {
                            field:'activityStartTime',
                            titName:"活动开始日期",
                            inputType:"datetime",
                            placeholder:"请选择日期时间",
                            titleWidth:'130px',
                            required:true,
                            value:'',
                            regexp:'',
                            inputTitleTextAlign:"right"
                        },
                        {
                            field:'activityEndTime',
                            titName:"活动结束日期",
                            inputType:"datetime",
                            placeholder:"请选择日期时间",
                            value:'',
                            required:true,
                            regexp:'',
                            titleWidth:'130px',
                            inputTitleTextAlign:"right"
                        },
                        {
                            field: 'team',
                            titName: "参与活动团队",
                            inputType: "select-multiple",
                            value:'',
                            required:true,
                            selectData: [],
                            getSelectDataConfig:{  //select下拉数据请求配置
                                ajax:{  //ajax请求配置
                                    url:this.$url.getCollectTeam,
                                    method:"get",
                                    data:{}
                                },
                                dataKey:{ //字段对应配置value和label分别对应ajax返回数据的相应字段
                                    value:"teamCode",
                                    label:"teamName"
                                }
                            },
                            titleWidth:'130px',
                            inputTitleTextAlign: "right"
                        },
                        {
                            field:'build',
                            titName:"参与活动建筑属性",
                            inputType:"select-multiple",
                            value:'',
                            required:true,
                            selectData:[],
                            getSelectDataConfig:{  //select下拉数据请求配置
                                ajax:{  //ajax请求配置
                                    url:this.$url.getAllBuildType,
                                    method:"get",
                                    data:{}
                                },
                                dataKey:{ //字段对应配置value和label分别对应ajax返回数据的相应字段
                                    value:"buildTypeCode",
                                    label:"buildTypeName"
                                }
                            },
                            titleWidth:'130px',
                            inputTitleTextAlign:"right"
                        },
                        {
                            field:'activityContent',
                            titName:"活动详情",
                            inputType:"textarea",
                            value:'',
                            regexp:'',
                            required:true,
                            titleWidth:'130px',
                            inputHeight:'120px',
                            inputTitleTextAlign:"right"
                        },
                ],
                //操作历史使用的数据
                cityList:{},
                teamList:{},
                buildList:{}
            }
        },
        methods: {
            //弹窗初始化方法
            init(){
                //判断是否为编辑，如果是编辑就填入数据
                if(this.inEditInfor&&this.inEditInfor.id){
                    //数据处理,处理成选中的ID数组
                    this.inEditInfor.city = GlobalUtil.getArrayDataKeyValue(this.inEditInfor.city,'code');
                    this.inEditInfor.build =GlobalUtil.getArrayDataKeyValue(this.inEditInfor.build,'code');
                    this.inEditInfor.team = GlobalUtil.getArrayDataKeyValue(this.inEditInfor.team,'code');
                    //填入编辑数据
                    this.imgInfor.imgName= [this.inEditInfor.imgUrlName];
                    this.imgInfor.imgUrl[this.inEditInfor.imgUrlName]=this.inEditInfor.imgUrl;
                    GlobalUtil.fillEditData(this.inEditInfor,this.dataForm,
                        {
                            title:'activityTitle',
                            startTime:'activityStartTime',
                            endTime:'activityEndTime',
                            city:'city',
                            team:'team',
                            build:'build',
                            content:'activityContent'
                        }
                    );
                }
            },
            //图片上传组件返回的数据
            returnImgNames(imgNames){
                this.uploadImgs = imgNames;
            },
            //图片放大
            showBigImg: function (src) {
                if (!src) {
                    return;
                }
                GlobalUtil.bigImage(src);
            },
            //删除上传的图片
            deletePic(){
                this.imgData = '';
            },
            //form返回操作数据
            dataReturn(obj){
                 this.dataForm[obj.itemIndex].value = obj.data;
            },
            //获取form内部请求的下拉选项数据
            selectData(obj){
                if(obj.field==="city"){
                   this.cityList = toObjList(obj.data);
                }
                if(obj.field==="team"){
                    this.teamList = toObjList(obj.data);
                }
                if(obj.field==="build"){
                    this.buildList = toObjList(obj.data);
                }
                function toObjList(data){
                    let obj = {};
                    for (let item of data) {
                        obj[item.value] = item.label
                    }
                    return obj;
                }
            },

            //提交数据
            submitData(){
                //效验图片
                if(!this.uploadImgs||this.uploadImgs.length<1){
                    globalMessage.error("请先上传图片");
                    return false;
                }

                //校验数据
                let result = GlobalUtil.checkParameters(this.dataForm);
                if(!result.status){
                    globalMessage.error(result.msg);
                    return false;
                }
                //开始时间与必须小于当前时间判断
                if(this.dataForm[2].value<Date.parse(new Date())+600000){
                    globalMessage.error("开始时间需晚于当前时间10分钟");
                    this.dataForm[2].value = "";
                    return false
                }

                //结束时间与必须大于开始时间判断
                if(!this.dataForm[2].value){
                    globalMessage.error("请先设置开始时间");
                    this.dataForm[3].value = "";
                    return
                }
                if(this.dataForm[3].value<this.dataForm[2].value+600000){
                    globalMessage.error("结束时间需晚于开始时间10分钟");
                    this.dataForm[3].value = "";
                    return false
                }
                //获取出每个字段的value数据
                let postData = GlobalUtil.getFormData(this.dataForm);
                postData["activityImgUrl"] = this.uploadImgs[0];
                //多选数据处理
                let multipleData = [];
                for(let item in postData){
                    if(item==="city"||item==="team"||item==="build"){
                        if(postData[item].length>0){
                            postData[item].forEach((e,i)=>{
                                multipleData.push({"ruleType":item,"ruleValue":e})
                            })
                        }
                    }
                }
                postData["rule"]=multipleData;
                //操作历史记录
                let paramObj = {
                    old: {
                        id:'-',
                        activityTitle:'-',
                        city:["-"],
                        activityStartTime:'-',
                        activityEndTime:'-',
                        team:["-"],
                        build:["-"],
                        activityContent:'-',
                    },
                    new: {
                        id:'-',
                        activityTitle:postData["activityTitle"],
                        city:GlobalUtil.deepCopy(postData["city"]),
                        activityStartTime:GlobalUtil.dateFormat(postData["activityStartTime"],"YYYY-M-D H:m:s"),
                        activityEndTime:GlobalUtil.dateFormat(postData["activityEndTime"],"YYYY-M-D H:m:s"),
                        team:GlobalUtil.deepCopy(postData["team"]),
                        build:GlobalUtil.deepCopy(postData["build"]),
                        activityContent:postData["activityContent"],
                    },
                    options: {
                        city: this.cityList,
                        team:this.teamList,
                        build:this.buildList,
                    },
                    fields: {
                        activityTitle:'活动标题',
                        city:'参与活动城市',
                        activityStartTime:'活动开始日期',
                        activityEndTime:'活动结束日期',
                        team:'参与活动团队',
                        build:'参与活动建筑属性',
                        activityContent:'活动详情',
                    },
                    key: "id"
                }
                delete postData["city"];
                delete postData["team"];
                delete postData["build"];

                //判断新增编辑
                if(this.inEditInfor){
                    postData["id"] = this.inEditInfor.id;
                    paramObj["new"]['id']= this.inEditInfor.id;
                    paramObj["old"]= {
                        id:this.inEditInfor.id,
                        activityTitle:this.inEditInfor.title,
                        city:this.inEditInfor.city,
                        activityStartTime:GlobalUtil.dateFormat(this.inEditInfor.startTime,"YYYY-M-D H:m:s"),
                        activityEndTime:GlobalUtil.dateFormat(this.inEditInfor.endTime,"YYYY-M-D H:m:s"),
                        team:this.inEditInfor.team,
                        build:this.inEditInfor.build,
                        activityContent:this.inEditInfor.content,
                    };
                    postData.optContent = GlobalUtil.handleLogParams(paramObj);
                    //提交编辑
                    this.$axios.ajax({url:this.$url.editOperatingActivitiet,method:"post",data:postData}).then(res=>{
                        if(res.retCode!==0){
                            globalMessage.error(res.msg);
                            return
                        }
                        globalMessage.success("编辑成功！");
                        this.refresh();
                    })
                }else{
                    //提交新增
                      postData.optContent = GlobalUtil.handleLogParams(paramObj);
                    this.$axios.ajax({url:this.$url.addOperatingActivitie,method:"post",data:postData}).then(res=>{
                        if(res.retCode!==0){
                            globalMessage.error(res.msg);
                            return
                        }
                        globalMessage.success("添加成功！");
                        this.refresh();
                    })
                }
            },
            //关闭弹窗刷新页面
            refresh(){
                this.closePop();
                this.$emit("flush",true);
            },
            //关闭弹窗
            closePop(){
                this.$emit('handleClose',true);
            }
        },
        created() {
            //初始化弹窗
            this.init();
        }
    }
</script>

<style scoped>
    .add-item-box{

    }
    .left-img-upload-box{
        width: 260px;
        float: left;
    }

    .right-data-form-box{
        width: 60%;
        float: right;
    }

</style>