<template>

    <div class="login-wrap">
        <div class="ms-title">JMTOOL 后台管理系统</div>
        <div class="ms-login">
            <div class="ms-login-input-content">
                <div class="login-icon user_name"></div>
                <div class="login-input">
                    <input type="text" v-model="userName" placeholder="请输入用户名" maxlength="20">
                </div>
            </div>
            <div class="ms-login-input-content">
                <div class="login-icon user_psd"></div>
                <div class="login-input">
                    <input type="password" v-model="passWord" placeholder="请输入密码" maxlength="20">
                </div>
            </div>
            <div class="sliding_block">
                <captchaVue @captchaData="getCaptchaData" ref="captcha"></captchaVue>
            </div>
            <div class="ms-verify">
                <div class="ms-verify-input">
                    <input type="text" v-model="vCode" v-input-number='vCode' placeholder="短信验证码"
                        @keyup.enter="enterSubmit" maxlength="6">
                </div>
                <div class="get_code_btn">
                    <el-button type="success" round :disabled='disabled' class="code_btn" @click="getVcode">{{codeText}}
                    </el-button>
                </div>

            </div>
            <div class="login-btn">
                <el-button type="primary" @click="submitForm()" round :disabled="loginDisabled">登录</el-button>
            </div>
        </div>
    </div>

</template>

<script>
    import captchaVue from '@/components/common/captcha.vue';
    import sha1 from 'js-sha1';
    import GlobalUtil from '../../utils/globalUtil';

    export default {
        data: function () {
            return {
                disabled: true,
                loginDisabled: false,
                userName: '',
                passWord: '',
                codeText: '发送',
                flag: true,
                vCode: '',
                session: '',
                token: "",
                sig: '',
            }
        },
        mounted() {},
        components: {
            captchaVue
        },
        methods: {
            enterSubmit() {
                if (this.loginDisabled) {
                    return false
                } else {
                    this.submitForm()
                }
            },
            submitForm() { //登录验证
                if (!this.userName) {
                    this.$message.error('请填写正确的用户名！');
                    this.initCaptCha();
                    return false;
                } else if (!this.passWord) {
                    this.$message.error('请填写正确的登录密码！');
                    this.initCaptCha();
                    return false;
                } else if (!this.token) {
                    this.$message.error('请重新验证滑块！');
                    this.initCaptCha();
                    return false;
                } else if (!this.vCode) {
                    this.$message.error('请填写正确验证码！');
                    this.initCaptCha();
                    return false;
                }
                this.loginDisabled = true;
                this.$router.push('/home');
            },

            getCaptchaData(data) { //获取滑块验证结果
                if (!this.userName) {
                    this.$message.error('请填写正确的用户名！');
                    this.initCaptCha();
                    return false;
                } else if (!this.passWord) {
                    this.$message.error('请填写正确的登录密码！');
                    this.initCaptCha();
                    return false;
                }
                // console.log(data)
                this.session = data.csessionid;
                this.token = data.token;
                this.sig = data.sig;
                this.disabled = false;
            },
            getVcode() { //获取短信验证码
                if (!this.userName) {
                    this.$message.error('请填写正确的用户名！');
                    this.initCaptCha();
                    return false;
                } else if (!this.passWord) {
                    this.$message.error('请填写正确的登录密码！');
                    this.initCaptCha();
                    return false;
                } else if (!this.token) {
                    this.$message.error('请重新验证滑块！');
                    this.initCaptCha();
                    return false;
                } else if (this.flag) {
                    let loop = 59;
                    let that = this;
                    let clock = setInterval(function () {
                        if (loop >= 0) {
                            that.codeText = loop-- + " S";
                        } else {
                            that.flag = true;
                            that.codeText = '发送';
                            clearInterval(clock);
                        }
                    }, 1000);
                }
            },
            initCaptCha() { //重置滑块
                this.$refs.captcha.init();
                this.disabled = true;
                this.loginDisabled = false;
            }
        }
    }
</script>

<style scoped>
    input {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        background: none;
    }

    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;

    }

    .sliding_block {
        height: 40px;
        margin-bottom: 30px;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -250px;
        text-align: center;
        font-size: 30px;
        color: #fff;
        font-weight: bold;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 330px;
        height: 160px;
        margin-left: -165px;
        margin-top: -150px;
        border-radius: 5px;
    }

    .ms-login-input-content {
        margin-bottom: 30px;
        overflow: hidden;
        background: #fff;
        border-radius: 25px;
        font-weight: bold;
    }

    .ms-verify {
        /* float: left; */
        width: 330px;
        overflow: hidden;
        height: 50px;
        color: #fff;
        margin-bottom: 30px;
    }

    .ms-verify-input {
        float: left;
        width: 180px;
        height: 38px;
        line-height: 38px;
        border: 1px solid #FFFFFF;
        border-radius: 20px;
        text-indent: 1em;
        color: #fff
    }

    .ms-verify-input input {
        color: #FFFFFF;
    }

    .ms-verify-input input::-moz-placeholder {
        color: #FFFFFF
    }

    .ms-verify-input input::-webkit-input-placeholder {
        color: #FFFFFF
    }

    .get_code_btn {
        float: right;
        width: 138px;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        /* background-color: #93CE7C; */
        cursor: pointer;
        /* overflow: hidden; */
    }

    .code_btn {
        width: 100%;
        border: 0px;

    }

    .login-icon {
        float: left;
        width: 20px;
        height: 20px;
        background-size: contain;
        margin: 15px;
    }

    .user_name {
        background: url('../../assets/img/username.png') no-repeat;
    }

    .user_psd {
        background: url('../../assets/img/psd.png') no-repeat;
    }

    .login-input {
        float: left;
        width: 280px;
        height: 50px;
        line-height: 50px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 40px;
        background: #6890FE;
    }
</style>