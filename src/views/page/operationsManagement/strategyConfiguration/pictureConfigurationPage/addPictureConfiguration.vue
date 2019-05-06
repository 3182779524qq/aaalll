<template>
    <div class="add-item-box">
        <div class="add-item-content clear-both">
            <div class="add-item-content-left fl">
                <h3 class="left-tit">行业-采集位置</h3>
                <el-menu
                        :default-active="sideMenuValue"
                        class="ul-side-menu-box"
                        @select="handleSelect"
                        background-color="#EFF3F5"
                        text-color="#646464"
                        active-text-color="#6890FE">
                    <template v-for="(item,index) in sideMenuConfig">
                        <template v-if="item.children&&item.children.length>0">
                            <el-submenu :index="item.id">
                                <template slot="title">
                                    <span>{{item.name}}</span>
                                </template>
                                <template v-for="(inItem,jIndex) in item.children">
                                    <el-menu-item @click="actItem(inItem)" :index="inItem.id" :disabled="inEditInfor&&sideMenuValue!==inItem.id">{{inItem.name}}</el-menu-item>
                                </template>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item @click="actItem(item)" :index="item.id">{{item.name}}</el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </div>
            <div class="add-item-content-left fl">
                <h3 class="left-tit">点类型</h3>
                <div class="add-menu-item-box" >
                    <div class="add-menu-item-list" >
                        <template v-if="inEditInfor">
                            <div v-for="(point,index) in pointList" :class="{active:pointVal===point.id}" class="menu-item">{{point.name}}</div>
                        </template>
                        <template v-else>
                            <div v-for="(point,index) in pointList" :class="{active:pointVal===point.id}" @click="pointCl(point.id,point.name)" class="menu-item">{{point.name}}</div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="add-item-content-right fr">
                <h3 class="right-tit">攻略内容</h3>
                <div class="add-item-content-box">
                    <data-fom :formConfig="dataForm"  @dataReturn="dataReturn"></data-fom>
                </div>
                <div class="ui-pop-up-footer">
                    <el-button class="ui-pop-up-footer-finish-bt"  @click="submitData">{{editInfor?"完成编辑":"完成创建"}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dataFom from '../../../../../components/common/dataFom.vue';
    import GlobalUtil from "../../../../../utils/globalUtil";
    import globalMessage from "../../../../../utils/message";
    export default {
        name: "operationList",
        props:{
            editInfor:'',    //判断是否为编辑
        },
        components: {
            dataFom
        },
        data() {
            return {
                inEditInfor:this.editInfor,
                //侧边选中值
                sideMenuValue:'',
                //侧边选路径
                sideMenukeyPath:[],
                //侧边选项配置
                sideMenuConfig:[
                    /*{id:'1', name:'餐饮', children:[{id:'10', name:'餐地方厅1'}, {id:'11', name:'饭馆1'}]},
                    {id:'2', name:'金融',children:[{id:'13', name:'餐地方厅2'}, {id:'15', name:'饭馆2'}]},*/
                ],
                //点类型列表
                pointList:[],
                //选中的点
                pointVal:'',
                pointName:'',
                //form表单配置数据
                dataForm:[
                    {
                        field:'imgUrl',
                        titName:"图片实例",
                        inputType:"upLoadImg",
                        value:[],
                        fillMoreKey:{'imgUrl':'valueUrl'}, //编辑时填入多个字段数据,把列表数据中的editimgurl字段的数据填到valueUrl字段
                        valueUrl:{},         //当上传图片加密地址时使用，存url{img1:"www.img.com/pic"},用value的数组对应取URL
                        required:true,
                        titleWidth:'80px',
                        inputWidth:'450px',
                        inputHeight:'130px',
                        imgWidth:'130px',       //当type为upLoadImg时有效设置图片宽度
                        imgLength:1,           //当type为upLoadImg时有效限制图片上传张数,
                        inputTitleTextAlign:"right",
                        formBottomHeight:'0px'
                    },
                    {
                        field:'imgDesc',
                        titName:"实例描述",
                        inputType:"textarea",
                        value:'',
                        maxlength:40,
                        titleWidth:'80px',
                        inputHeight:'200px',
                        inputWidth:'450px',
                        inputTitleTextAlign:"right"
                    },
                ],
                //操作历史使用的数据
                areaCategoryList:{},
                positionList:{},
                pointListObj:{},
            }
        },
        methods: {
            //弹窗初始化方法
            init(){
                //行业和采集位置
                this.$axios.ajax({url:this.$url.getCategoryCollect,method:"get"}).then(res=>{
                    if(res.retCode!==0){
                        globalMessage.error(res.msg);
                        return
                    }
                    //数据处理
                    let filter = this.inEditInfor?"":{selective:true};
                    let data = GlobalUtil.arrayDataKeyDispose(res.data,{areaCategoryCode:"id",areaCategoryName:"name",position:"children"},false,false,filter);
                    data.forEach((e,i)=>{
                        //获取行业列表对象
                        this.areaCategoryList[e.id]=e.name;
                        //处理采集位置字段
                        if(e.children.length>0){
                            data[i].children = GlobalUtil.arrayDataKeyDispose(e.children,{positionCode:"id",positionName:"name",point:"pointList"},false,false,filter)
                        }
                        //获取采集位置列表对象
                        for (let item of data[i].children) {
                            this.positionList[item.id] = item.name;
                            //获取点类型列表对象
                            if(item.pointList&&item.pointList.length>0){
                                for (let jitem of item.pointList) {
                                    this.pointListObj[jitem.pointCode] = jitem.pointName;
                                }
                            }
                        }
                    })
                    this.sideMenuConfig = data;
                    //判断是否为编辑，如果是编辑就填入点数据数据
                    if(this.inEditInfor&&this.inEditInfor.id){
                        for(let itemKey in this.sideMenuConfig){
                            if(this.sideMenuConfig[itemKey].id===this.inEditInfor.areaCategory.buildCode){
                                if(this.sideMenuConfig[itemKey].children&&this.sideMenuConfig[itemKey].children.length>0){
                                    let children =this.sideMenuConfig[itemKey].children
                                    for(let citem in children){
                                        if(children[citem].id===this.inEditInfor.position.pointCode){
                                            this.sideMenukeyPath=[this.sideMenuConfig[itemKey].id,children[citem].id]
                                            if(children[citem].pointList&&children[citem].pointList.length>0){
                                                this.pointList = GlobalUtil.arrayDataKeyDispose(children[citem].pointList,{pointCode:"id",pointName:"name"},false)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                //判断是否为编辑，如果是编辑就填入数据
                 if(this.inEditInfor&&this.inEditInfor.id){
                     //填入侧边数据
                     this.sideMenuValue = this.inEditInfor.position.pointCode;
                     this.pointVal = this.inEditInfor.point.pointCode;
                     //填入图片数据
                     GlobalUtil.fillEditData(this.inEditInfor,this.dataForm,
                         {
                             imgName:'imgUrl',
                             imgDesc:'imgDesc',
                         }
                     );
                 }
            },
            //侧边菜单操作
            handleSelect(key, keyPath) {
                this.sideMenukeyPath = keyPath;
                this.sideMenuValue = key;
            },
            //点击行业/采集位置渲染点类型
            actItem(item){
                let filter = this.inEditInfor?"":{selective:true};
                this.pointList = GlobalUtil.arrayDataKeyDispose(item.pointList,{pointCode:"id",pointName:"name"},false,"",filter)
            },
            //点击点类型
            pointCl(id,name){
                this.pointName = name;
                this.pointVal = id;
            },
            //form返回操作数据
            dataReturn(obj){
                this.dataForm[obj.itemIndex].value = obj.data;
            },
            //提交数据
            submitData(){
                //校验数据
                //采集位置，建筑属性效验
                if(!this.sideMenuValue){
                    globalMessage.error("请选择：行业-采集位置");
                    return;
                }
                //点类型效验
                if(!this.pointVal){
                    globalMessage.error("请选择：点类型");
                    return;
                }

                //列图内容效验
                let result = GlobalUtil.checkParameters(this.dataForm)
                if(!result.status){
                    globalMessage.error(result.msg);
                    return false;
                }
                let postData = {};
                postData = GlobalUtil.getFormData(this.dataForm);
                postData['areaCategoryCode'] = this.sideMenukeyPath[0];
                postData['positionCode'] = this.sideMenuValue;
                postData['pointCode'] = this.pointVal;
                //操作历史记录
                let paramObj = {
                    old: {
                        id:'-',
                        areaCategoryCode:'-',
                        positionCode:'-',
                        pointCode:'-',
                        imgDesc:'-',
                        sContent:'-'
                    },
                    new: {
                        id:'-',
                        areaCategoryCode:postData['areaCategoryCode'],
                        positionCode:postData['positionCode'],
                        pointCode:postData['pointCode'],
                        imgDesc:postData['imgDesc'],
                        sContent:'新攻略内容'
                    },
                    options: {
                        areaCategoryCode:this.areaCategoryList,
                        positionCode:this.positionList,
                        pointCode:this.pointListObj
                    },
                    fields: {
                        areaCategoryCode:'行业属性',
                        positionCode:'采集位置',
                        pointCode:'点类型',
                        imgDesc:'实列描述',
                        sContent:'攻略内容'
                    },
                    key: "id"
                }
                //判断是否为编辑
                if(this.inEditInfor){
                    paramObj.old = {
                        id:this.inEditInfor.id,
                        areaCategoryCode:this.inEditInfor.areaCategory.buildCode,
                        positionCode:this.inEditInfor.position.pointCode,
                        pointCode:this.inEditInfor.point.pointCode,
                        imgDesc:this.inEditInfor.imgDesc,
                        sContent:'攻略内容'
                    }
                    paramObj.new.id = this.inEditInfor.id;
                    postData["id"] = this.inEditInfor.id;
                }
                //提交新增编辑
                postData.optContent = GlobalUtil.handleLogParams(paramObj);
                this.$axios.ajax({url:this.$url.addOrEditPictureConfiguration,method:"post",data:postData}).then(res=>{
                    if(res.retCode!==0){
                        globalMessage.error(res.msg);
                        return
                    }
                    globalMessage.success(this.inEditInfor?"编辑成功！":"添加成功！");
                    this.refresh();
                })
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
    .add-item-content{
        border-bottom: 1px #e5e5e5 solid;
        height: 635px;
    }
    .add-item-content-left{
        width: 20%;

    }
    .add-item-content-right .right-tit,.add-item-content-left .left-tit{
        background: #EFF3F5;
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        color: #646464;
        border-top: 2px #e5e5e5 solid;
        text-align: center;
        border-bottom: 1px #e5e5e5 solid;
    }
    .add-item-content-left .left-tit{
        border-right: 1px #e5e5e5 solid;
    }
    .add-item-content-left .add-menu-item-box{
        background: #EFF3F5;
    }
    .add-item-content-left .add-menu-item-list{
        height: 592px;
        overflow-y: auto;
    }
    .add-item-content-left .add-menu-item-box .menu-item{
        color: #646464;
        font-size: 12px;
        text-align: center;
        padding: 10px 20px;
        cursor: pointer;
    }
    .add-item-content-left .add-menu-item-box .menu-item:hover{
        background: rgb(191,194,196);
    }
    .add-item-content-left .add-menu-item-box .menu-item.active{
        color: #6890fe;
    }

    .add-item-content-right{
        width: 60%;
        padding-bottom: 50px;
    }

    .add-item-content-box{
        overflow-y: auto;
        max-height: 465px;
        position: relative;
        padding-top: 30px;
        padding-left: 20px;
    }

</style>
<style>
.ul-side-menu-box{
    height: 592px;
    overflow-y: auto;
}
.ul-side-menu-box>.el-submenu,.ul-side-menu-box>.el-menu-item{
    border-bottom: 1px #e5e5e5 solid;
    text-align: center;
}
.ul-side-menu-box li.el-submenu ul.el-menu li.el-menu-item{
    min-width:100%;
    padding: 0 10px!important;
    text-align: center;
}
.ul-side-menu-box .el-submenu .el-menu-item{
    height: 35px;
    line-height: 35px;
}
.ul-side-menu-box .el-submenu__title{
    font-size: 12px;
}
.ul-side-menu-box .el-menu-item{
    font-size: 12px;
}
</style>