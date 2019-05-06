<template>
    <div class="upload-image-in-box">
        <span class="pic-reminder">提示：照片上传超过2M将被压缩至2M以下</span>
        <div v-if="inImgInfor.imgName.length>0" v-for="(item,index) of inImgInfor.imgName" :key="index" class="show-img-box">
            <div class="img-box">
                <img @click="showBigImg(inImgInfor.imgUrl[item])" :src="inImgInfor.imgUrl[item]?inImgInfor.imgUrl[item]:defaultImgData" alt="">
                <span v-if="inImgInfor.imgName.length>0" class="del-pic" @click="deletePic(index,item)"><i class="el-icon-circle-close-outline"></i></span>
            </div>
        </div>
        <div v-if="inImgInfor.imgName.length===0" class="show-img-box">
            <div class="img-box">
                <img :src="defaultImgData" alt="">
            </div>
        </div>
        <div class="submit-btn-box">
            <span class="sub-bt">上传活动照片<input type="file" @change="selectImg($event)"></span>
        </div>
    </div>
</template>

<script>
    import GlobalUtil from "../../utils/globalUtil";
    import globalMessage from "../../utils/message";
    export default {
        props: {
            imgInfor:{   //限制图片大小
                type: Object,
                default: function () {
                    return {
                        field:'',   //字段
                        imgName:[], //外部传入的默认值['img1','img2']
                        imgUrl :{
                            //img1:url,
                            //img2:url
                        }
                    }
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
            imgLength:{   //图片上传数量限制
                type: Number,
                default: function () {
                    return 1
                }
            },

        },
        data() {
            return {
                //默认图片
                defaultImgData:require('../../assets/img/default-img.png'),
                //图片信息配置
                inImgInfor:this.imgInfor,
                //七牛云token
                token:'',
                //上传图片数量限制
                inIimgLength:this.imgLength,
                //图片格式限制
                inImgFormat:this.imgFormat,
                //限制图片大小
                inImgSize:this.imgSize,
            }
        },
        methods: {
            //图片放大
            showBigImg: function (src) {
                if (!src) {
                    return;
                }
                GlobalUtil.bigImage(src);
            },
            //删除上传的图片
            deletePic(index,imgName){
                this.inImgInfor.imgName.splice(index,1);
                delete this.inImgInfor.imgUrl[imgName];
            },

            //上传图片
            selectImg(e){
                let it = this;
                let date = new Date().getTime()+((Math.random()*1000)*(Math.random()*1000)).toFixed(0);
                //获取七牛云token
                if(!this.token){
                    this.$axios.ajax({url:this.$url.getQiniuToken,method:"get"}).then(res=>{
                        if(res.retCode!==0){
                            globalMessage.error('tocen获取失败请从新上传');
                            return
                        }
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
                                console.log(parseFloat((subFile.size/(1024*1024)).toFixed(3)),11);
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
                    formData.append('key', "picture_"+it.inImgInfor.field+'_'+date);
                    //图片上传七牛云
                    it.$axios.ajax({url:it.$url.qiniuUploadImg,method:'post',data:formData,headers:{'Content-Type': '"multipart/form-data"'}}).then(res=>{
                        let fr = new FileReader();
                        fr.onload=function (re) {
                            if(it.inIimgLength===1){
                                it.inImgInfor.imgName=[res.key];
                                it.inImgInfor.imgUrl = {};
                                it.inImgInfor.imgUrl[res.key] = re.target.result;
                            }else {
                                it.inImgInfor.imgName.push(res.key);
                                it.inImgInfor.imgUrl[res.key] = re.target.result;
                            }

                        }
                        fr.readAsDataURL(file);
                    })
                }
            },
            //把结果传至父级方法
            sendNameData(imgNames){
                this.$emit("returnImgNames",imgNames)
            }
        },
        created(){
            //编辑时把默认获取到的数据传到父级
            this.sendNameData(this.imgInfor.imgName);
        },
        watch: {
            //监控值发生变化时把新数据传到父级
            inImgInfor: {
                handler(newData, oldData) {
                    this.sendNameData(newData.imgName);
                },
                deep: true
            },
        }
    }
</script>
<style scoped>
    .upload-image-in-box .show-img-box{
        overflow: hidden;
        position: relative;
        background: #f2f2f2;
        box-sizing: border-box;
        padding: 10px;
        width: 260px;
        height: 260px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .upload-image-in-box .show-img-box .img-box{
        display: inline-block;
    }
    .upload-image-in-box .show-img-box .img-box .del-pic{
        position: absolute;
        right: 0;
        top: 0;
    }
    .upload-image-in-box .show-img-box .img-box .del-pic i{
        cursor: pointer;
        color: #b9b9b9;
        font-weight: bold;
        font-size: 20px;
    }
    .upload-image-in-box .show-img-box .img-box .del-pic i:hover{
        color: #ff7656;
    }
    .upload-image-in-box .show-img-box .img-box img{
        width: 100%;
    }
    .upload-image-in-box .submit-btn-box{
        margin-top: 20px;
        text-align: center;
    }
    .upload-image-in-box .sub-bt{
        position: relative;
        display: inline-block;
        background: #6890FE;
        color: #fff;
        height: 40px;
        line-height: 40px;
        width: 100%;
        cursor: pointer;
        border-radius: 20px;
    }
    .upload-image-in-box .sub-bt:hover{
        background: #5D81E4;
    }
    .upload-image-in-box .sub-bt input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
        cursor: pointer;

    }
    .upload-image-in-box .pic-reminder{
        font-size: 12px;
    }
</style>