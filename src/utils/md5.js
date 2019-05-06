const md5 = require("js-md5");
export default class Md5{
    constructor(){
    }
    static Md5Instance;
    static instance(){
        !this.Md5Instance && (this.Md5Instance = new Md5());
        return this.Md5Instance;
    }

    //常用
    hex(str){
        return md5.hex(str);
    }

    array(str){
        return md5.array(str);
    }

    digest(str){
        return md5.digest(str);
    }

    arrayBuffer(str){
        return md5.arrayBuffer(str);
    }

    buffer(str){
        return md5.buffer(str);
    }
}
