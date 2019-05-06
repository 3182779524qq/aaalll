/**
 *全局基础配置
 */

const BaseConfig = {
    //分页参数
    pageSize: 20,
    PageSizeList: [10, 20, 50, 100, 200],
    role: 'b4c56ee8d2854166dec66644f541b85247105b2c', //用户角色判断
    taskState: { //任务状态
        10: '进行中',
        11: '进行中',
        12: '待提交',
        13: '被退回',
        14: '失效',
        15: '失效',
        20: '待质检',
        21: '待质检',
        30: '通过-待结算',
        31: '通过-不结算',
        32: '通过-不结算',
        40: '被删除'
    },
    //手机正则
    mobileRegexp: /^1[3456789]{1}[0-9]{9}$/,
    emailRegexp: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    //匹配中文
    //chinese://
    //快捷时间段配置参数
    timePickerOptions: {
        disabledDate(time) {
            // console.log(time)
            return time.getTime() > Date.now()
        },
        onPick(time) {
            // console.log(time)
            // console.log(22222)
            if (time.maxDate) {
                if (new Date(time.minDate) < new Date(time.maxDate) - 2 * 365 * 24 * 3600 * 1000) {
                    // console.log(8888888)
                    return false
                } else {
                    // console.log(9999999999)
                    return time
                }
            }

        },
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
    },
    //快捷日期配置参数
    datePickerOptions: {
        disabledDate(time) {
            // return time.getTime() > Date.now() || time.getTime() <  Date.now()-2 * 365 * 24 * 3600 * 1000;
            // return time.getTime() > Date.now() 
        },
        shortcuts: [{
            text: '今天',
            onClick(picker) {
                picker.$emit('pick', new Date());
            }
        }, {
            text: '昨天',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
            }
        }, {
            text: '一周前',
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
            }
        }]
    },
}

export default BaseConfig;