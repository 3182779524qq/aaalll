<template>
    <div :id="modelName" :class="[modelName]">
        <div class="nc-container"></div>
        <!-- <remote src="http://g.alicdn.com/sd/ncpc/nc.js?t=2015052012" type="text/javascript" charset="utf-8" /> -->
    </div>

</template>

<script>
    // import remote from '@/assets/js/common';
    export default {
        data() {
            return {
                'appKey': 'FFFF0N000000000069E7',
                'modelName': 'no-captcha',
                'nc_token': null,
                'lang': 'cn',
                'NC_Opt': null,
            }
        },

        mounted() {
            this.init();
        },
        components: {
           
        },
        methods: {
            init() {
                var self = this;
                this.nc_token = [this.appKey, (new Date()).getTime(), Math.random()].join(':');
                this.NC_Opt = {
                    renderTo: "#no-captcha",
                    appkey: "FFFF0N000000000069E7",
                    scene: "nc_login",
                    token: this.nc_token,
                    customWidth: 300,
                    trans: {
                        "key1": "code0"
                    },
                    is_Opt: 0,
                    language: this.lang,
                    isEnabled: true,
                    timeout: 3000,
                    times: 5,
                    apimap: {},
                    callback: function (data) {
                        // window.console && console.log(self.nc_token)
                        // window.console && console.log(data.csessionid)
                        // window.console && console.log(data.sig)
                        //将这三个参数在这里回调服务器的接口，进行服务器的验证
                        self.$emit('captchaData',data)
                    }
                }
                this.generarte();
            },

            generarte() {
                var nc = new noCaptcha(this.NC_Opt)
                nc.upLang('cn', {
                    _startTEXT: "请按住滑块，拖动到最右边",
                    _yesTEXT: "验证通过",
                    _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
                    _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
                });
            }
        }
    }
</script>
<style>
.nc-container{
    width: 330px;
}
.nc-container #nc_1_wrapper{
    width: 100% !important;
}
.nc-container .nc_wrapper{
    width: 100% !important;
}
    .nc_scale {
        background: #e8e8e8;
        height: 40px;
        /* 默认背景色 */
    }
.nc-container .nc_scale span{
    height: 38px;
    line-height: 38px;
}
.nc-container .nc_scale .btn_ok{
    line-height: 38px;
}
    ￼.nc_scale .scale_text {
        color: #9c9c9c;
        /* 默认字体颜色 */
    }

    .nc_scale div.nc_bg {
        background: #7ac23c;
        /* 滑过时的背景色 */
    }

    .nc_scale .scale_text2 {
        color: #fff;
        /* 滑过时的字体颜色 */
    }

    .nc_scale span {
        border: 1px solid #ccc;
        background: #fff url("//g.alicdn.com/sd/ncpc/images/rt.png") no-repeat center;
    }

    .nc_scale .btnok {
        background: #fff url("//g.alicdn.com/sd/ncpc/images/yes.png") no-repeat center;
    }

    .errloading {
        border: #faf1d5 1px solid;
        background: url("//g.alicdn.com/sd/ncpc/images/no.png") #fffff0 no-repeat 10px 9px;
        color: #ef9f06;
    }
</style>