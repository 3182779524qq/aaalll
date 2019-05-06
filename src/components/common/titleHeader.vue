<template>
    <div class="title_header">
        <h2 class="title_name" @click="backTop">{{title}}</h2>
        <div class="title_info" v-if="showDate">{{date}}</div>
        <div class="title_btn" v-if="headerBtn">
            <el-button type="primary" round class="header_btn" style="margin-right:0px" @click="headerAction">
                {{headerBtn||'搜索'}}
            </el-button>
        </div>
    </div>
</template>
<script>
import bus from './bus';

    export default {
        props: ['title', 'showDate', 'headerBtn'],
        data() {
            return {
                name: '采集数据采集',
                date: new Date()
            }
        },
        created() {
            let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
            this.timer = setInterval(() => {
                _this.date = _this.getDate(); // 修改数据date
            }, 1000)
        },
        mounted() {
        
        },
        methods: {
            backTop(){
                bus.$emit('backTop','back')
            },
            headerAction() {
                this.$emit('headerAction', this.headerBtn + '被点击了')
            },
            getDate() {
                let date = new Date();
                let seperator1 = "-";
                let seperator2 = ":";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let days = date.getDate();
                let day = date.getDay();
                let dayName = '';
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                switch (day) {
                    case 1:
                        dayName = '周一';
                        break;
                    case 2:
                        dayName = '周二';
                        break;
                    case 3:
                        dayName = '周三';
                        break;
                    case 4:
                        dayName = '周四';
                        break;
                    case 5:
                        dayName = '周五';
                        break;
                    case 6:
                        dayName = '周六';
                        break;
                    case 7:
                        dayName = '周日';
                        break;
                }
                if (month >= 0 && month <= 9) {
                    month = "0" + month;
                }
                if (days >= 0 && days <= 9) {
                    days = "0" + days;
                }
                if (hours >= 0 && hours <= 9) {
                    hours = "0" + hours;
                }
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                let time = '当前时间 ' + year + seperator1 + month + seperator1 + days +
                    "  " + dayName + '  ' + hours + seperator2 + minutes +
                    seperator2 + seconds;
                return time;
            }
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        }
    }
</script>
<style lang="scss" scoped>
    .title_header {
        // width: 100%;
        padding: 10px 30px;
        overflow: hidden;
        background: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: 1px solid #e5e5e5;
        z-index: 30;

        .title_name {
            font-size: 14px;
            color: #000000;
            line-height: 40px;
            float: left;
        }

        .title_info {
            float: left;
            font-size: 12px;
            color: #AFAFAF;
            line-height: 40px;
            padding-left: 40px;
        }

        .title_btn {
            float: right;

            .header_btn {
                margin: 0 15px;
                float: right;
                width: 120px;
                background: #6890FE;
            }
        }
    }
</style>