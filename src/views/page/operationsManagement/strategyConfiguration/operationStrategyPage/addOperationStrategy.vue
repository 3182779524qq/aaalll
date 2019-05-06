<template>
    <div class="add-item-box">
        <div class="add-item-content-box">
            <div class="add-items-tit">
                <data-fom :formConfig="strategyTit" @dataReturn="dataReturnTit"></data-fom>
            </div>
            <div class="add-item-list">
                <div v-for="(fItem,index) in dataForm" :key="index" class="add-items-item">
                    <data-fom :formConfig="fItem" :formIndex="index" @dataReturn="dataReturn"></data-fom>
                    <span @click="delInnerItem(index)" class="del-inner-item"><i class="el-icon-delete"></i></span>
                </div>
            </div>
            <div class="add-inner-item">
                <span @click="addInnerItem" class="add-inner-item-btn"><i class="el-icon-plus"></i></span>
            </div>
        </div>
        <div class="ui-pop-up-footer">
            <el-button class="ui-pop-up-footer-finish-bt"  @click="submitData">{{editInfor?"完成编辑":"完成创建"}}</el-button>
        </div>
    </div>
</template>

<script>
    import dataFom from '../../../../../components/common/dataFom.vue';
    import GlobalUtil from "../../../../../utils/globalUtil";
    import globalMessage from "../../../../../utils/message";
    export default {
        name: "addOperationStrategy",
        props:{
            editInfor:'',    //判断是否为编辑
        },
        components: {
            dataFom
        },
        data() {
            return {
                inEditInfor:this.editInfor,
                //攻略标题
                strategyTit:[
                    {
                        field:'useitemName',
                        titName:"页面",
                        inputType:"input",
                        clearable:true,
                        value:"",
                        regexp:'',
                        required:true,
                        placeholder:"请输入",
                        titleWidth:'95px',
                        inputWidth:'400px',
                        inputTitleTextAlign:"right"
                    },
                ],
                //提交表单默认配置数据
                defDataForm: [
                    {
                        field:'itemName',      //字段
                        titName:"说明项",       //字段标题名称
                        inputType:"input",    //表单输入框类型：input普通,select普通带搜索,select-multiple下拉多选带搜索,upLoadImg图片上传,[year/month/date/dates/ week/datetime/datetimerange/daterange]日期时间选择器
                        clearable:true,      //输入数据时是否出现小叉叉，直接清除
                        value:"",            //值
                        regexp:'',          //表单验证时-正则匹配,写正则的字符串，也可以直接写已有的正则验证类型：username/password/email/phone/url/ip/chinese/
                        required:true,      //表单验证时-是否必填
                        placeholder:"请输入",//默认展示的提示信息
                        titleWidth:'80px',  //字段标题名称的宽度
                        inputWidth:'380px', //单个表单元素的宽度
                        inputTitleTextAlign:"right" //字段标题名称的居中方式默认：left
                    },
                    {
                        field:'imgName',
                        titName:"图片实列",
                        inputType:"upLoadImg",
                        value:[],
                        fillMoreKey:{'imgUrl':'valueUrl'}, //编辑时填入多个字段数据,把列表数据中的editimgurl字段的数据填到valueUrl字段
                        valueUrl:{},         //当上传图片加密地址时使用，存url{img1:"www.img.com/pic"},用value的数组对应取URL
                        required:true,
                        titleWidth:'80px',
                        inputWidth:'380px',
                        inputHeight:'130px',
                        imgWidth:'130px',       //当type为upLoadImg时有效设置图片宽度
                        imgLength:10,           //当type为upLoadImg时有效限制图片上传张数,
                        inputTitleTextAlign:"right",
                        formBottomHeight:'0px'
                    },
                    {
                        field:'itemContent',
                        titName:"说明详情",
                        inputType:"textarea",
                        value:'',
                        titleWidth:'80px',
                        inputHeight:'120px',
                        inputWidth:'380px',
                        inputTitleTextAlign:"right"
                    },
                ],
                //提交表单配置数据
                dataForm:[]
            }
        },
        methods: {
            //弹窗初始化方法
            init(){
                //判断是否为编辑，如果是编辑就填入数据
                if(this.inEditInfor&&this.inEditInfor.id){
                    //攻略标题填入
                this.strategyTit[0].value=this.inEditInfor.useitem.useitemName;
                //说明、图片、详情填入；
                //多form表单数组填入数据
                this.dataForm =  GlobalUtil.moreFormFill(this.editInfor.guideItem,this.defDataForm);
                }else {
                    this.dataForm = [GlobalUtil.deepCopy(this.defDataForm)];
                }
            },
            //攻略标题form返回操作数据
            dataReturnTit(obj){
                this.strategyTit[obj.itemIndex].value = obj.data;
            },
            //form返回操作数据
            dataReturn(obj){
                this.dataForm[obj.formIndex][obj.itemIndex].value = obj.data;
            },
            //提交数据
            submitData(){
                //校验数据
                //校验页面
                let result1 = GlobalUtil.checkParameters(this.strategyTit);
                if(!result1.status){
                    globalMessage.error(result1.msg);
                    return false;
                }
                //校验其他多选参数
                let dataPass = true
                for(let i=0,len=this.dataForm.length;i<len;i++){
                    let result = GlobalUtil.checkParameters(this.dataForm[i]);
                    if(!result.status){
                        globalMessage.error(result.msg);
                        dataPass = false;
                        break
                    }
                }
                //数据效验成功走提交逻辑
                if(dataPass){
                    let postData = GlobalUtil.getFormData(this.strategyTit);
                    postData["guideItem"] = GlobalUtil.getEachFormData(this.dataForm);
                    postData['guideType']="2"

                    //操作历史记录
                    let paramObj = {
                        old: {
                            id:'-',
                            useitemName:'-',
                            sContent:'-'
                        },
                        new: {
                            id:'-',
                            useitemName:postData['useitemName'],
                            sContent:'新攻略内容'
                        },
                        options: {
                        },
                        fields: {
                            useitemName:'页面',
                            sContent:'攻略内容'
                        },
                        key: "id"
                    }
                    //判断是否为编辑
                    if(this.inEditInfor){
                        paramObj.old = {
                            id:this.inEditInfor.id,
                            useitemName:this.inEditInfor.useitem.useitemName,
                            sContent:'攻略内容'
                        },
                        paramObj.new.id = this.inEditInfor.id;
                        postData["id"] = this.inEditInfor.id;
                        postData["useitemCode"] = this.inEditInfor.useitem.useitemCode;
                    }

                    //提交数据
                    postData.optContent = GlobalUtil.handleLogParams(paramObj);
                    this.$axios.ajax({url:this.$url.addOrEditoperationGathering,method:"post",data:postData}).then(res=>{
                        if(res.retCode!==0){
                            globalMessage.error(res.msg);
                            return
                        }
                        globalMessage.success(this.inEditInfor?"编辑成功！":"添加成功！");
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
            },
            //增加项目
            addInnerItem(){
                //校验数据
                let result = GlobalUtil.checkParameters(this.dataForm[this.dataForm.length-1])
                if(!result.status){
                    globalMessage.error(result.msg);
                    return false;
                }
                this.dataForm.push(this.defDataForm);
                let newFormData = GlobalUtil.deepCopy(this.dataForm);
                this.dataForm = [];
                this.$nextTick(()=>{
                    this.dataForm = newFormData;
                    let itemlist = document.querySelector(".add-item-box .add-item-list");
                    setTimeout(()=>{
                        itemlist.scrollTop=itemlist.clientHeight*this.dataForm.length;
                    })
                })
            },
            //删除项目
            delInnerItem(index){
                if(this.dataForm.length!==1) {
                    this.dataForm.splice(index,1);
                    let newFormData = GlobalUtil.deepCopy(this.dataForm);
                    this.dataForm = [];
                    this.$nextTick(()=>{
                        this.dataForm = newFormData;
                    })
                }else {
                    this.dataForm = [];
                    this.$nextTick(()=>{
                        this.dataForm = [GlobalUtil.deepCopy(this.defDataForm)];
                    })

                }
            },

        },
        created() {
            //弹出初始化
            this.init();
        }
    }
</script>

<style scoped>
    .add-item-box{

    }
    .add-item-content-box{
        position: relative;
        padding-left: 110px


    ;
    }
    .add-item-list{
        overflow-y: auto;
        width: 80%;
        height: 377px;
        border: 1px #e5e5e5 solid;
        padding: 10px;
    }
    .add-items-item{
        position: relative;
        width: 394px;
        padding-top: 20px;
        border: 1px #e5e5e5 solid;
        border-radius: 20px;
        margin-bottom: 20px;
    }
    .add-items-item:last-of-type{
        margin-bottom: 0;
    }
    .add-inner-item{
        box-sizing: border-box;
        padding-left: 3px;
        background: #fff;
        width: 59px;
        height: 60px;
        line-height: 60px;
        position: absolute;
        bottom: 1px;
        right: 127px;
    }
    .add-inner-item-btn{
        background: #6890fe;
        width: 55px;
        height: 40px;
        display: inline-block;
        line-height: 40px;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }
    .add-inner-item .add-inner-item-btn:hover{
        background: #5d81e4;
    }
    .del-inner-item{
        background: #ff7878;
        position: absolute;
        width: 55px;
        height: 40px;
        line-height: 40px;
        top: 140px;
        right: -65px;
        border-radius: 20px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }
    .del-inner-item:hover{
        background: #ef6c6c;
    }



</style>
<style>

</style>