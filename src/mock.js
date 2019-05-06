const Mock = require('mockjs');
const listData = function () {
    let item = {
        'code': 200,
        'data': {
            list: [
                {id: 1, name: '张三', age: 12},
                {id: 2, name: '李四', age: 13},
            ],
        },
        'msg': 'success'
    };
    return item;
};

const selectData = function () {
    return {
        code:200,
        msg:'success',
        data:{
            teamOptions: [{
                value: '选项1',
                label: '伊环科技'
            }, {
                value: '选项2',
                label: '众盈战队'
            }, {
                value: '选项3',
                label: '华普利科技'
            }, {
                value: '选项4',
                label: '诚安信战队'
            }, {
                value: '选项5',
                label: '独立团战队'
            }, {
                value: '选项1',
                label: '伊环科技'
            }, {
                value: '选项2',
                label: '众盈战队'
            }, {
                value: '选项3',
                label: '华普利科技'
            }, {
                value: '选项4',
                label: '诚安信战队'
            }, {
                value: '选项5',
                label: '独立团战队'
            }, {
                value: '选项1',
                label: '伊环科技'
            }, {
                value: '选项2',
                label: '众盈战队'
            }, {
                value: '选项3',
                label: '华普利科技'
            }, {
                value: '选项4',
                label: '诚安信战队'
            }, {
                value: '选项5',
                label: '独立团战队'
            }],
            cityOptions: [{
                value: '选项1',
                label: '深圳市'
            }, {
                value: '选项2',
                label: '广州市'
            }, {
                value: '选项3',
                label: '惠州市'
            }, {
                value: '选项4',
                label: '佛山市'
            }, {
                value: '选项5',
                label: '珠海市'
            }],
            areaOptions: [{
                value: '选项1',
                label: '龙岗区'
            }, {
                value: '选项2',
                label: '南山区'
            }, {
                value: '选项3',
                label: '福田区'
            }, {
                value: '选项4',
                label: '宝安区'
            }, {
                value: '选项5',
                label: '龙华区'
            }],
            taskList:
                { 
                    '全部':false,
                    '进行中':false,
                    '待提交':false,
                    '待质检':false,
                    '通过-待结算':false,
                    '通过-不结算':false,
                    '通过-已结算':false,
                    '质检不通过':false,
                    '被退回':false,
                   
                 },
            sceneOptions : [{
                value: '1',
                label: '医院'
            },
            {
                value: '2',
                label: '医1院'
            },
            {
                value: '3',
                label: '超市'
            },
            {
                value: '4',
                label: '写字楼'
            },
            {
                value: '5',
                label: '商场'
            },
            {
                value: '6',
                label: '学校'
            },
            {
                value: '7',
                label: '机场'
            },
            {
                value: '8',
                label: '车站'
            },

        ]
        }
    }
}

const dataList = function () {
    return {
        retCode:0,
        msg:'success',
        data:{
            pageNum: 1,
            pageSize: 15,
            total:100,
            list: [{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '0',
                gathering_info: '点：10,照：1,信：10',
                img: 'http://pic1.win4000.com/wallpaper/2018-12-17/5c1709b370e8b.jpg',
                detail:'就回家看见看见看见看见客户均可',
                page:'登录',
                other:[
                    {
                        shuoming:'sad撒多所',
                        editimg:["l5c1709b370e8b"],
                        editimgurl:{
                            l5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-17/5c1709b370e8b.jpg',
                        },
                        details:"圣诞节饭还是开发和圣诞节疯狂送",
                    },
                    {
                        shuoming:'的地方官方',
                        editimg:["l5c1709b370e8b","a5c1709b370e8b"],
                        editimgurl:{
                            l5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-17/5c1709b370e8b.jpg',
                            a5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-08/5c0b63bbee2ab.jpg',
                        },
                        details:"郭德纲的鬼地方个电饭锅地方节疯狂送",
                    },
                    {
                        shuoming:'dfsfsdfs',
                        editimg:["l5c1709b370e8b","a5c1709b370e8b"],
                        editimgurl:{
                            l5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-17/5c1709b370e8b.jpg',
                            a5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-08/5c0b63bbee2ab.jpg',
                        },
                        details:"蝶恋蜂狂独守空房快递费",
                    }
                ]
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '1',
                gathering_info: '点：10,照：1,信：10',
                img: 'http://pic1.win4000.com/wallpaper/2018-12-08/5c0b63bbee2ab.jpg',
                detail:'啊啊啊啊啊啊啊对福建省地方还是多久发货及时的回复及时的回复交电话费圣诞节',
                page:'首页',
                other:[
                    {
                        shuoming:'sad撒多所',
                        editimg:["l5c1709b370e8b"],
                        editimgurl:{
                            l5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-17/5c1709b370e8b.jpg',
                        },
                        details:"圣诞节饭还是开发和圣诞节疯狂送",
                    }
                ]
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '0',
                gathering_info: '点：10,照：1,信：10',
                img: 'http://pic1.win4000.com/wallpaper/2018-12-20/5c1b30ec4d26f.jpg',
                editimg:["l5c1709b370e8b","a5c1709b370e8b",'b5c1709b370e8b','c5c1709b370e8b'],
                page:'注册',
                editimgurl:{
                    l5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-17/5c1709b370e8b.jpg',
                    a5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-08/5c0b63bbee2ab.jpg',
                    b5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-20/5c1b30ec4d26f.jpg',
                    c5c1709b370e8b:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739597541,3585053471&fm=26&gp=0.jpg',
                },
                detail:'第三方士大夫士大夫结束对话方式对福建省地方还电话费圣诞节'
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '1',
                gathering_info: '点：10,照：1,信：10',
                page:'采集',
                img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739597541,3585053471&fm=26&gp=0.jpg',
                detail:'第三方士大夫士大夫结束对话方式对福建省地方还是时的回复及时的回复交电话费圣诞节'
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '0',
                gathering_info: '点：10,照：1,信：10',
                img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2597861235,4279922762&fm=26&gp=0.jpg',
                editimg:["l5c1709b370e8b","a5c1709b370e8b",'b5c1709b370e8b','c5c1709b370e8b'],
                editimgurl:{
                    l5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-17/5c1709b370e8b.jpg',
                    a5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-08/5c0b63bbee2ab.jpg',
                    b5c1709b370e8b:'http://pic1.win4000.com/wallpaper/2018-12-20/5c1b30ec4d26f.jpg',
                    c5c1709b370e8b:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739597541,3585053471&fm=26&gp=0.jpg',
                },
                detail:'第三方士大夫士大夫结束对话方式对福建省地货及时的回复及时的回复交电话费圣诞节'
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '0',
                gathering_info: '点：10,照：1,信：10',
                img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739597541,3585053471&fm=26&gp=0.jpg',
                detail:'第三方士大夫士对福建省地方还是多久发货及时的回复及时的回复交电话费圣诞节'
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '0',
                gathering_info: '点：10,照：1,信：10',
                img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739597541,3585053471&fm=26&gp=0.jpg',
                detail:'第三方士大夫士大夫结束对话方式对福建省地方还电话费圣诞节'
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '0',
                gathering_info: '点：10,照：1,信：10',
                img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739597541,3585053471&fm=26&gp=0.jpg',
                detail:'第三方士大夫士大夫结束对话方式对时的回复交电话费圣诞节'
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '0',
                gathering_info: '点：10,照：1,信：10',
                img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739597541,3585053471&fm=26&gp=0.jpg',
                detail:'第三方士大夫士大夫结束对话方式对福建省地方还是多久发货及时的回复及复交电话费圣诞节'
            },{
                task_id: '15265',
                name: '腾讯大厦',
                building_name: '独立写字楼',
                building: '-',
                area: '深圳市南山区',
                street: '龙华街道23223号',
                scene: '餐馆',
                gathering: '王天宝',
                team: '自由团队',
                start_time: '18-11-20 11:32:25',
                submit_time: '18-11-20 11:32:25',
                status: '0',
                gathering_info: '点：10,照：1,信：10',
                img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3739597541,3585053471&fm=26&gp=0.jpg',
                detail:'第三方士大夫士大夫结束对话方方还是多久发货及时的回复及时的回复交电话费圣诞节'
            }
            ]
        }
    }
}

const teamList = function () {
    return {
        retCode:0,
        msg:'success',
        data:{
            pageNum: 1,
            pageSize: 3,
            total:22,
            list: [{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            },{
                id: '15265',
                team_name: '斗米战队',
                province_code: '广东省',
                city_code: '深圳市',
                people_num: '46/70',
                remark: '团队领袖：张亮（电话：138574541）'
            }
            ]
        }
    }
}

const userList = function () {
    return {
        retCode:0,
        msg:'success',
        data:{
            pageNum: 1,
            pageSize: 15,
            total:100,
            list: [{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status: '0',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            },{
                id: '15265',
                user_name: '腾讯大厦',
                ref_team_code: '斗米战队',
                identify_id: '351684563454566',
                status:'1',
                freshman_man: '是',

                last_time: '18-11-20 11:32:25',
                true_name: '张广泰',
                role: '信号采集员',
            }
            ]
        }
    }
}

const TipsList = function () {
    return {
        retCode:0,
        msg:'success',
        data:{
            pageNum: 1,
            pageSize: 15,
            total:100,
            list: [{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25',
                gmt_modify: '18-12-25 11:29:29'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25',
                gmt_modify: '18-12-25 11:29:29'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25',
                gmt_modify: '18-12-25 11:29:29'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25',
                gmt_modify: '18-12-25 11:29:29'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25',
                gmt_modify: '18-12-25 11:29:29'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25',
                gmt_modify: '18-12-25 11:29:29'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25',
                gmt_modify: '18-12-25 11:29:29'
            },{
                id: '15265',
                tip_content: '拖动指针至采集区与点击“开始采集”',
                gmt_create: '18-11-20 11:32:25'
            }
            ]
        }
    }
}

const NoticeList = function () {
    return {
        retCode:0,
        msg:'success',
        data:{
            pageNum: 1,
            pageSize: 15,
            total:100,
            list: [{
                id: '15265',
                topic: '拖动指针至采集区与点击“开始采集”',
                time: '18-11-20 11:32:25',
                city: '深圳',
                team: '百合战队、战狼战队、芝加哥火箭队',
                detail: '采集规则，要很大很大的图',
            },{
                id: '15265',
                topic: '拖动指针至采集区与点击“开始采集”',
                time: '18-11-20 11:32:25',
                city: '深圳',
                team: '百合战队、战狼战队、芝加哥火箭队',
                detail: '采集规则，要很大很大的图',
            },{
                id: '15265',
                topic: '拖动指针至采集区与点击“开始采集”',
                time: '18-11-20 11:32:25',
                city: '深圳',
                team: '百合战队、战狼战队、芝加哥火箭队',
                detail: '采集规则，要很大很大的图',
            },{
                id: '15265',
                topic: '拖动指针至采集区与点击“开始采集”',
                time: '18-11-20 11:32:25',
                city: '深圳',
                team: '百合战队、战狼战队、芝加哥火箭队',
                detail: '采集规则，要很大很大的图',
            },{
                id: '15265',
                topic: '拖动指针至采集区与点击“开始采集”',
                time: '18-11-20 11:32:25',
                city: '深圳',
                team: '百合战队、战狼战队、芝加哥火箭队',
                detail: '采集规则，要很大很大的图',
            },{
                id: '15265',
                topic: '拖动指针至采集区与点击“开始采集”',
                time: '18-11-20 11:32:25',
                city: '深圳',
                team: '百合战队、战狼战队、芝加哥火箭队',
                detail: '采集规则，要很大很大的图',
            },{
                id: '15265',
                topic: '拖动指针至采集区与点击“开始采集”',
                time: '18-11-20 11:32:25',
                city: '深圳',
                team: '百合战队、战狼战队、芝加哥火箭队',
                detail: '采集规则，要很大很大的图',
            }
            ]
        }
    }
}





//Mock.mock('/api/getselectData', 'get', selectData);
//Mock.mock('/api/getList', 'post', listData);
//Mock.mock('/api/getDataTableList', 'post', dataList);
//Mock.mock('/api/getTeamList', 'post', teamList);
//Mock.mock('/api/getUserList', 'post', userList);
//Mock.mock('/api/getTipsList', 'post', TipsList);
Mock.mock('/api/getNoticeList', 'post', NoticeList);

