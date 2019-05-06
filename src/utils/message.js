//$message

import Vue from "vue";
import ElMessageOptions from 'element-ui/packages/message/index';

class Message extends Vue {
    constructor(){
        super()
    }

    //打开的实例
    messageInstance;
    //关闭延迟
    duration = 3000;

    //集合方法
    open(config){
        this.messageInstance && this.messageInstance.close();
        this.messageInstance = this.$message(config);
    }

    success(text){
        this.messageInstance && this.messageInstance.close();
        this.messageInstance = this.$message({
            message: text,
            center: true,
            type: 'success',
            showClose: true,
            duration: this.duration
        });
    }

    warning(text){
        this.messageInstance && this.messageInstance.close();
        this.messageInstance = this.$message({
            message: text,
            center: true,
            type: 'warning',
            showClose: true,
            duration: this.duration
        });
    }

    info(text){
        this.messageInstance && this.messageInstance.close();
        this.messageInstance = this.$message({
            message: text,
            center: true,
            type: 'info',
            showClose: true,
            duration: this.duration
        });
    }

    error(text){
        this.messageInstance && this.messageInstance.close();
        this.messageInstance = this.$message({
            message: text,
            center: true,
            type: 'error',
            showClose: true,
            duration: this.duration
        });
    }

}

const globalMessage = new Message();
export default globalMessage;