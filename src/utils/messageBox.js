//$messageBox

import Vue from "vue";
import {ElMessageBoxOptions} from 'element-ui/packages/message-box/index';

class MessageBox extends Vue {
    constructor() {
        super();

        this.$confirm

    }

    confirm(options) {
        return new Promise((resolve, reject)=>{
            this.$confirm(options.message, options.title || '提示', options).then(() => {
                resolve()
            }).catch(() => {
                //reject()
            })
        })
    }

}

const globalMessageBox = new MessageBox();
export default globalMessageBox;