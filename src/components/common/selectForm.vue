<style>
</style>
<template>
    <div class="yk_wap screen_content">
        <div style="border-bottom:1px solid #e5e5e5" v-if="option">
            <div v-for="(item , index) in option" :key="index">
                <template v-if=" item.template === 'filterResult'" class="pr">
                    <el-row>
                        <el-col :span="24">
                            <div class="select_result">
                                <div class='fl'>筛选：</div>
                                <div>
                                    <el-tag class="m5 select_tags" v-for="(tag,index) in tags" :key="index" :closable="true"
                                        v-if="tag" :title="tag.name" size="mini" type="info" @close="closeItem(index)">
                                        <el-tooltip class="item" effect="dark" :content="tag" placement="bottom-end">
                                            <span class="tags_info">{{tag}}</span>
                                        </el-tooltip>
                                    </el-tag>
                                </div>
                            </div>
                            <div class="select_btns">
                                <div class="select_btn report_btn" @click="searchAll(buttonConfig.type)" v-if="buttonConfig.type">{{buttonConfig.text}}</div>
                                <div class="select_btn" @click="searchAll('search')">查询</div>
                                <div class="select_btn" @click="clearAll">清除筛选</div>
                            </div>
                        </el-col>
                    </el-row>
                </template>
                <template v-if=" item.template === 'taskStatus'">
                    <el-row>
                        <div class="select_item">
                            <el-col :span="2" class="select_item_left"><span>任务状态：</span></el-col>
                            <el-col :span="22" class="select_item_right">
                                <ul>
                                    <li v-for="(item,index) in taskList" :key="index" :class="{'taskActive' : item}"
                                        @click="selectTaskState(index,item)">{{index}}</li>

                                </ul>
                            </el-col>
                        </div>
                    </el-row>
                </template>

                <template v-if=" item.template === 'dateScope'">
                    <el-row>
                        <div class="select_item">
                            <el-col :span="2" class="select_item_left"><span>日期查询：</span></el-col>
                            <el-col :span="22" class="select_item_right">
                                <el-date-picker v-model="dateValue" type="daterange" align="right" class="w200" @change="dateSeach"
                                    range-separator="-" value-format="yyyy-MM-dd" start-placeholder="开始日期"
                                    end-placeholder="结束日期" :picker-options="pickerOptions" size="mini">
                                </el-date-picker>
                            </el-col>
                        </div>
                    </el-row>
                </template>
                <template v-if=" item.template === 'activityDate'">
                    <el-row>
                        <div class="select_item">
                            <el-col :span="2" class="select_item_left"><span>{{item.text}}：</span></el-col>
                            <el-col :span="22" class="select_item_right">
                                <el-date-picker v-model="activityDateValue" align="right" type="date" placeholder="选择日期"
                                    @change="getActivityDate" value-format="yyyy-MM-dd" class="w200" :picker-options="pickerOptions1"
                                    size="mini">
                                </el-date-picker>
                            </el-col>
                        </div>
                    </el-row>
                </template>
                <template v-if=" item.template === 'timeType'">
                    <el-row>
                        <div class="select_item">
                            <el-col :span="2" class="select_item_left"><span>查找日期：</span></el-col>
                            <el-col :span="22" class="select_item_right">
                                <el-select v-model="dateTypeValue" clearable placeholder="日期类型" size="mini" class="w100 mr5"
                                    @change="getDateTypeChange">
                                    <el-option v-for="(item,index) in dateTypes" :key="index" :label="item" :value="index">
                                    </el-option>
                                </el-select>
                                <el-date-picker v-model="dateValue" type="daterange" align="right" class="w200"
                                    range-separator="-" value-format="yyyy-MM-dd" start-placeholder="开始日期"
                                    end-placeholder="结束日期" :picker-options="pickerOptions" size="mini" @change="changDate">
                                </el-date-picker>
                            </el-col>
                        </div>
                    </el-row>
                </template>
                <template v-if=" item.template === 'city'">
                    <el-row>
                        <div class="select_item">
                            <el-col :span="2" class="select_item_left"><span>所属城市：</span></el-col>
                            <el-col :span="22" class="select_item_right">
                                <div class="select_input">
                                    <div class="select_input">
                                        <el-input placeholder="输入检索城市名称" v-model="cityConfig.value" clearable size="mini"
                                            @clear="searchItem(cityConfig,'city')" @keyup.native="searchItem(cityConfig,'city')">
                                        </el-input>
                                    </div>
                                </div>
                                <div class="el-icon-arrow-down checkbox_hide" v-if="cityConfig.options.length" @click="showCheck(cityStyle)"
                                    :style="cityStyle.transform"></div>
                                <div class="select_checkbox ">
                                    <div class="fl" style="margin-right:20px;">
                                        <el-checkbox :indeterminate="cityConfig.isIndeterminate" v-model="cityConfig.checkAll"
                                            v-if="!hideCheckAll.city" @change="handleCheckAllChangeCity" size="mini">全选</el-checkbox>
                                    </div>
                                    <div :style="cityStyle.style">
                                        <el-checkbox-group v-model="cityConfig.checkedResult" @change="handleCheckedCitiesChange"
                                            size="mini">
                                            <el-checkbox v-for="(city,index) in cityConfig.options" :label="city.value"
                                                :key="index">{{city.label}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                </template>
                <template v-if=" item.template === 'team'">
                    <el-row>
                        <div class="select_item position-r">
                            <el-col :span="2" class="select_item_left"><span>所属团队：</span></el-col>
                            <el-col :span="22" class="select_item_right">
                                <div class="select_input">
                                    <div class="select_input">
                                        <el-input placeholder="输入检索团队名称" v-model="teamConfig.value" clearable size="mini"
                                            @clear="searchItem(teamConfig,'team')" @keyup.native="searchItem(teamConfig,'team')">
                                        </el-input>
                                    </div>
                                </div>
                                <div class="el-icon-arrow-down checkbox_hide" v-if="teamConfig.options.length" @click="showCheck(teamStyle)"
                                    :style="teamStyle.transform"></div>
                                <div class="select_checkbox ">
                                    <div class="fl" style="margin-right:20px;">
                                        <el-checkbox :indeterminate="teamConfig.isIndeterminate" v-model="teamConfig.checkAll"
                                            v-if="!hideCheckAll.team" @change="handleCheckAllChangeTeam" size="mini">全选</el-checkbox>
                                    </div>
                                    <div :style="teamStyle.style">
                                        <el-checkbox-group v-model="teamConfig.checkedResult" @change="handleCheckedTeamChange"
                                            size="mini">
                                            <el-checkbox v-for="(team,index) in teamConfig.options" :label="team.value"
                                                :key="index">{{team.label}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>

                                </div>
                            </el-col>
                        </div>
                    </el-row>
                </template>
                <template v-if=" item.template === 'taskHomeState'">
                    <el-row>
                        <div class="select_item position-r">
                            <el-col :span="2" class="select_item_left"><span>任务状态：</span></el-col>
                            <el-col :span="22" class="select_item_right">
                                <div class="select_checkbox ">
                                    <div class="fl" style="margin-right:20px;">
                                        <el-checkbox :indeterminate="taskStatesConfig.isIndeterminate" v-model="taskStatesConfig.checkAll"
                                            @change="handleCheckAllChangeStates" size="mini">全部</el-checkbox>
                                    </div>
                                    <el-checkbox-group v-model="taskStatesConfig.checkedResult" @change="handleCheckedStatesChange"
                                        size="mini">
                                        <el-checkbox v-for="(taskStates,index) in taskStatesConfig.options" :label="taskStates.label"
                                            :key="index">{{taskStates.label}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                </template>
                <template v-if=" item.template === 'attribute'">
                    <el-row>
                        <div class="select_item position-r">
                            <el-col :span="2" class="select_item_left"><span>建筑属性：</span></el-col>
                            <el-col :span="22" class="select_item_right">
                                <div class="select_input">
                                    <div class="select_input">
                                        <el-input placeholder="输入检索属性名称" v-model="attributeConfig.value" clearable size="mini"
                                            @clear="searchItem(attributeConfig,'build')" @keyup.native="searchItem(attributeConfig,'build')">
                                        </el-input>
                                    </div>
                                </div>
                                <div class="el-icon-arrow-down checkbox_hide" v-if="attributeConfig.options.length"
                                    @click="showCheck(attributeStyle)" :style="attributeStyle.transform"></div>
                                <div class="select_checkbox ">
                                    <div class="fl" style="margin-right:20px;">
                                        <el-checkbox v-if="!hideCheckAll.build" :indeterminate="attributeConfig.isIndeterminate"
                                            v-model="attributeConfig.checkAll" @change="handleCheckAllChangeAttribute"
                                            size="mini">全选</el-checkbox>
                                    </div>
                                    <div :style="attributeStyle.style">
                                        <el-checkbox-group v-model="attributeConfig.checkedResult" @change="handleCheckedAttributeChange"
                                            size="mini">
                                            <el-checkbox v-for="(attribute,index) in attributeConfig.options" :label="attribute.value"
                                                :key="index">{{attribute.label}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseConfig from '@/utils/baseConfig';
    import GlobalUtil from '../../utils/globalUtil';
    export default {
        name: "collectionData",
        dialogVisible: true,
        props: {
            /**
             * filterResult TODO 筛选结果
             * city  todo 城市，区域
             * timeType  TODO 日期类型
             * dateScope  TODO 时间范围
             * taskStatus TODO  任务状态
             * team TODO  所属团队
             * attribute  TODO  建筑类型
             * activityDate  TODO 活动日期
             * taskHomeState TODO 首页任务状态
             */
            option: {
                type: Array,
                default: () => {
                    return []
                }
            },
            buttonConfig: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                //隐藏全选选项
                hideCheckAll: {
                    build: false,
                    team: false,
                    city: false
                },
                transform: {
                    // transition:'transform 0.3s',
                    //   transform: 'rotate(90deg)'
                },
                teamStyle: {
                    style: {
                        overflow: 'hidden',
                        height: '20px'
                    },
                    transform: {}
                },
                cityStyle: {
                    style: {
                        overflow: 'hidden',
                        height: '20px'
                    },
                    transform: {}
                },
                attributeStyle: {
                    style: {
                        overflow: 'hidden',
                        height: '20px'
                    },
                    transform: {}
                },
                value3: '',
                name: "采集数据",
                tags: {
                    city: '',
                    team: '',
                    attribute: '',
                    timeType: '',
                    dateScope: '',
                    activityDate: '',
                    taskHomeState: '',
                    taskStatus: ''
                },
                cityConfig: {
                    checkAll: false,
                    value: '',
                    options: [],
                    allOptions: [],
                    checkedResult: [],
                    isIndeterminate: false,
                    type: 'city',
                    name: '所属城市：'
                },
                teamConfig: {
                    checkAll: false,
                    value: '',
                    options: [],
                    allOptions: [],
                    checkedResult: [],
                    isIndeterminate: false,
                    type: 'team',
                    name: '所属团队：'
                },
                attributeConfig: {
                    checkAll: false,
                    value: '',
                    options: [],
                    allOptions: [],
                    checkedResult: [],
                    isIndeterminate: false,
                    type: 'attribute',
                    name: '建筑属性：'
                },
                cityObj: {},
                teamObj: {},
                attributeObj: {},
                pickerOptions: BaseConfig.timePickerOptions,
                pickerOptions1: BaseConfig.datePickerOptions,
                dateValue: '', //日期查询-value
                dateTypes: {
                    1: '提交日期',
                    2: '质检日期',
                    3: '抽查日期',
                    4: '完工日期',
                    5: '结算日期',
                    6: '退回日期'
                }, //日期类型-array
                dateTypeValue: '', //日期类型-value
                activityDateValue: '', //活动日期-value
                taskList: [], //任务状态-array
                taskStatesConfig: {
                    options: [{
                            value: '1',
                            label: '进行中'
                        },
                        {
                            value: '2',
                            label: '已完成'
                        },
                    ],
                    checkedResult: [],
                    checkAll: false,
                    isIndeterminate: false,
                }, //采集页任务状态-value
                emitData: {}
            };
        },
        components: {},
        created() {
            for (let obj in this.option) {
                if (this.option[obj].template == 'taskHomeState') {
                    if (this.option[obj].type == 'activity') {
                        this.taskStatesConfig.options = [{
                                value: '1',
                                label: '未发布'
                            },
                            {
                                value: '2',
                                label: '未开始'
                            },
                            {
                                value: '3',
                                label: '进行中'
                            },
                            {
                                value: '4',
                                label: '已结束'
                            }
                        ]
                    }
                }
            }

        },
        mounted() {
            let that = this;
            this.taskList = {
                '全部': false,
                '进行中': false,
                '待提交': false,
                '待质检': false,
                '通过-待结算': false,
                '通过-不结算': false,
                '通过-已结算': false,
                '质检不通过': false,
                '被退回': false,
                '失效': false,
                '被删除': false,

            }
            this.$axios.get(this.$url.getCollectTeam).then(res => { //获取团队列表
                let arr = res.data;
                if (arr) {
                    this.teamConfig.options = this.teamConfig.allOption = arr.map(function (item) {
                        that.teamObj[item.teamCode] = item.teamName;
                        return {
                            value: item.teamCode,
                            label: item.teamName
                        }
                    })
                }
            })
            this.$axios.get(this.$url.getAllBuildType).then(res => { //获取建筑属性
                let arr = res.data;
                if (arr) {
                    this.attributeConfig.options = this.attributeConfig.allOption = arr.map(function (item) {
                        that.attributeObj[item.buildTypeCode] = item.buildTypeName;
                        return {
                            value: item.buildTypeCode,
                            label: item.buildTypeName
                        }
                    })
                }
            })
            this.$axios.get(this.$url.getCityList).then(res => { //获取城市列表
                let arr = res.data;
                if (arr) {
                    this.cityConfig.options = this.cityConfig.allOption = arr.map(function (item) {
                        that.cityObj[item.id] = item.name;
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })
                }
            })
        },
        methods: {
            searchItem(data, showType) { //输入框检索CheckBox
                data.value = data.value.replace(/(^\s*)|(\s*$)/g, '')
                if (data.value) {
                    this.hideCheckAll[showType] = true;
                    let filterData = data.allOption.filter(item => item.label.indexOf(data.value) > -1);
                    data.options = filterData;
                } else {
                    data.options = data.allOption;
                    if (data.checkedResult.length === 0) {
                        data.checkAll = false;
                    } else if (data.checkedResult.length < data.options.length && data.checkedResult.length > 0) {
                        data.isIndeterminate = true;
                    } else if (data.checkedResult.length === data.options.length) {
                        data.checkAll = true;
                    }
                    this.hideCheckAll[showType] = false;
                }
            },
            clearAll() { //清除已筛选条件
                for (var obj in this.tags) {
                    this.closeItem(obj);
                }
                this.taskStatesConfig.isIndeterminate = false;
                this.searchAll('search');
            },
            searchAll(type) { //emit事件和筛选数据到父组件
                let that = this;
                let tags = this.tags;
                let resData = {}
                let arr = this.option;
                for (let i = 0; i < arr.length; i++) {
                    let obj = arr[i];
                    let task = []
                    switch (obj.template) {
                        case 'city':
                            resData[obj.resultKey] = GlobalUtil.deepClone(this.cityConfig.checkedResult)
                            break;
                        case 'team':
                            resData[obj.resultKey] = GlobalUtil.deepClone(this.teamConfig.checkedResult)
                            break;
                        case 'attribute':
                            resData[obj.resultKey] = GlobalUtil.deepClone(this.attributeConfig.checkedResult)
                            break;
                        case 'taskHomeState':
                            resData[obj.resultKey] = GlobalUtil.deepClone(this.taskStatesConfig.checkedResult)
                            break;
                        case 'activityDate':
                            resData[obj.resultKey] = this.activityDateValue
                            break;
                        case 'timeType':
                            resData[obj.resultKey] = {
                                date: this.dateValue,
                                type: this.dateTypeValue
                            }
                            break;
                        case 'dateScope':
                            resData[obj.resultKey] = this.dateValue
                            break;
                        case 'taskStatus':
                            // console.log(this.taskList)
                            for (var r in this.taskList) {
                                if (this.taskList[r]) {
                                    task.push(r)
                                }
                            }
                            resData[obj.resultKey] = task
                            break;
                    }
                }
                if (type == 'search') {
                    this.$emit('search', resData);
                } else {
                    this.$emit('btnAction', resData)
                }
                // console.log(resData,type)
            },
            closeItem(idx) { //关闭筛选tag同时取消重置对应筛选条件结果
                this.tags[idx] = '';
                switch (idx) {
                    case 'city':
                        this.cityConfig.checkedResult = [];
                        this.cityConfig.checkAll = false;
                        this.cityConfig.isIndeterminate = false;
                        break;
                    case 'team':
                        this.teamConfig.checkedResult = [];
                        this.teamConfig.checkAll = false;
                        this.teamConfig.isIndeterminate = false;
                        break;
                    case 'attribute':
                        this.attributeConfig.checkedResult = [];
                        this.attributeConfig.checkAll = false;
                        this.attributeConfig.isIndeterminate = false;
                        break;
                    case 'activityDate':
                        this.activityDateValue = ''
                        break;
                    case 'timeType':
                        this.dateTypeValue = ''
                        break;
                    case 'taskStatus':
                        for (let obj in this.taskList) {
                            this.taskList[obj] = false;
                        }
                        this.tags.taskStatus = ''
                        break;
                    case 'dateScope':
                        this.dateValue = ''
                        break;
                    case 'taskHomeState':
                        this.taskStatesConfig.checkedResult = [];
                        this.taskStatesConfig.checkAll = false;
                        this.taskStatesConfig.isIndeterminate = false;
                        break;
                }
            },
            getActivityDate(data) { //push活动日期结果到筛选列表
                // console.log(data)
                if(data){
                this.tags.activityDate = '日期：' + data
                }else{
                      this.tags.activityDate = ''
                }
            },
            getDateTypeChange(data) { //push日期类型结果到筛选列表
                // console.log(data)
                if (data) {
                    this.tags.timeType = '日期类型：' + this.dateTypes[data]
                } else {
                    this.tags.timeType = ''
                }
            },
            dateSeach(data) { //push日期查询结果到筛选列表
                if (data) {
                    if (new Date(data[0]) < new Date(data[1]) - 2 * 365 * 24 * 3600 * 1000) {
                        this.tags.dateScope = ''
                        this.dateValue = ''
                        this.$message.error('最多只能选择两年范围的时间！！！')
                        return false
                    } else {
                        // console.log(9999999999)
                        this.tags.dateScope = "日期查询：" + data.join('至')
                    }
                } else {
                    this.tags.dateScope = ''
                }
            },
            handleCheckedStatesChange(value) { //全选首页任务状态or全不选
                let checkedCount = value.length;
                this.taskStatesConfig.checkAll = checkedCount === this.taskStatesConfig.options.length;
                // console.log(this.taskStatesConfig.checkAll)
                // console.log(this.taskStatesConfig.isIndeterminate)
                this.taskStatesConfig.isIndeterminate = checkedCount > 0 && checkedCount < this.taskStatesConfig.options
                    .length;
                if (this.taskStatesConfig.checkedResult.length > 0) {
                    this.tags.taskHomeState = '任务状态：' + this.taskStatesConfig.checkedResult.join('、');
                } else {
                    this.tags.taskHomeState = ''
                }
            },
            handleCheckAllChangeCity(val) {
                this.handleCheckAllData(this.cityConfig, this.cityObj, val)
            },
            handleCheckAllChangeTeam(val) {
                this.handleCheckAllData(this.teamConfig, this.teamObj, val)
            },
            handleCheckAllChangeAttribute(val) {
                this.handleCheckAllData(this.attributeConfig, this.attributeObj, val)
            },
            handleCheckAllChangeStates(val) { //选择首页任务状态
                let datas = [];
                for (let i = 0; i < this.taskStatesConfig.options.length; i++) {
                    datas.push(this.taskStatesConfig.options[i].label);
                }
                this.taskStatesConfig.checkedResult = val ? datas : [];
                this.taskStatesConfig.checkAll = val;
                this.taskStatesConfig.isIndeterminate = false;
                if (this.taskStatesConfig.checkedResult.length > 0) {
                    this.tags.taskHomeState = '任务状态：' + this.taskStatesConfig.checkedResult.join('、');
                } else {
                    this.tags.taskHomeState = ''
                }
                this.taskStatesConfig.isIndeterminate = false;
            },
            handleCheckAllData(data, dataObj, val) { //多选框全选or全部选
                let datas = [];
                for (let i = 0; i < data.options.length; i++) {
                    datas.push(data.options[i].value);
                }
                data.checkedResult = val ? datas : [];
                if (data.checkedResult.length > 0) {
                    let res = data.checkedResult.map(function (item) {
                        return dataObj[item];
                    })
                    this.tags[data.type] = data.name + res.join('、');
                } else {
                    this.tags[data.type] = ''
                }
                data.isIndeterminate = false;
                data.checkAll = val;
            },

            handleCheckedCitiesChange(value) {
                this.handleCheckedChange(this.cityConfig, this.cityObj, value);
            },
            handleCheckedTeamChange(value) {
                this.handleCheckedChange(this.teamConfig, this.teamObj, value);
            },
            handleCheckedAttributeChange(value) {
                this.handleCheckedChange(this.attributeConfig, this.attributeObj, value);
            },
            handleCheckedChange(data, dataObj, value) { //多选框勾选or不勾选
                let that = this;
                let checkedCount = value.length;
                data.checkAll = checkedCount === data.options.length;
                data.isIndeterminate = checkedCount > 0 && checkedCount < data.options.length;
                if (data.checkedResult.length > 0) {
                    let res = data.checkedResult.map(function (item) {
                        return dataObj[item];
                    })
                    this.tags[data.type] = data.name + res.join('、');
                } else {
                    this.tags[data.type] = ''
                }
            },
            changDate(data) { //时间筛选
                // console.log(data)

                if (data) {
                    if (new Date(data[0]) < new Date(data[1]) - 2 * 365 * 24 * 3600 * 1000) {
                        // console.log(8888888)
                        this.tags.dateScope = ''
                        this.dateValue = ''
                        this.$message.error('最多只能选择两年范围的时间！！！')
                        return false
                    } else {
                        // console.log(9999999999)
                        this.tags.dateScope = "查找日期：" + data.join('至')
                    }
                } else {
                    this.tags.dateScope = ''
                }
            },
            showCheck(data) { //折叠、显示
                // console.log(data)
                if (data.style.height == '20px') {
                    data.style.height = 'auto'
                    data.transform = {
                        transition: 'transform 0.3s',
                        transform: 'rotate(180deg)'
                    }
                } else {
                    data.style.height = '20px';
                    data.transform = {
                        transition: 'transform 0.3s',
                        transform: 'rotate(0deg)'
                    }
                }
            },
            selectTaskState(idx, data) { // 多选任务状态
                // console.log(idx, data)
                if (this.taskList[idx]) {
                    this.taskList[idx] = false;
                    this.taskList['全部'] = false
                    if (idx == '全部') {
                        for (let obj in this.taskList) {
                            this.taskList[obj] = false;
                        }
                    }
                } else {
                    this.taskList[idx] = true;
                    if (idx == '全部') {
                        for (let obj in this.taskList) {
                            this.taskList[obj] = true;
                        }
                    }
                }
                let arr = []
                for (let str in this.taskList) {
                    if (this.taskList[str] && str != '全部') {
                        arr.push(str)
                    }
                }
                // console.log(arr)
                if (arr.length == 10) {
                    // console.log(2)
                    this.taskList['全部'] = true;
                }
                if (arr.length > 0) {
                    this.tags.taskStatus = '任务状态：' + arr.join('、')
                } else {
                    this.tags.taskStatus = ''
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    .yk_wap {
        position: relative;
        background: #ffffff;
        padding: 0px 30px 20px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        .check_box {
            height: 20px;
            overflow: hidden;
        }

        .select_form_button {
            position: absolute;
            top: 0px;
            right: 100px;

        }

        .tags_info {
            display: block;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
            cursor: pointer;
        }

        .m5 {
            margin: 0px 5px;
        }

        .select_result {
            line-height: 32px;
            padding: 10px 0px;
            font-size: 12px;
            min-height: 32px;
            // float: left;
            margin-right: 300px;
        }

        .select_btns {
            width: 300px;
            position: absolute;
            right: 0;
            top: 0;
            overflow: hidden;

            .select_btn {
                float: right;
                width: 70px;
                line-height: 32px;
                text-align: center;
                // border:1px solid #e5e5e5;
                margin: 10px 14px;
                font-size: 12px;
                border-radius: 5px;
                background-color: #6890FE;
                color: #ffffff;
                cursor: pointer;
            }
        }

        .select_tags {
            color: #999999;
            border-color: #b9b9b9;
            background: #e1e1e1;
            border-radius: 0px;
        }

        .select_item {
            border-right: 1px solid #e5e5e5;
            overflow: auto;
            border-top: 1px solid #e5e5e5;
            background: #f0f0f0;
        }

        .select_input {
            width: 200px;
        }

        .checkbox_hide {
            position: absolute;
            top: 20px;
            right: 20px;
            // transform: rotate(70deg)
        }

        .select_item_left {
            height: 100%;
            text-align: center;
            font-size: 12px;
            color: #a1a1a1;
            line-height: 48px;

        }

        .select_item_right {
            min-height: 32px;
            padding: 10px 0;
            background: #ffffff;
            padding-left: 20px;

            ul li {
                float: left;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
                margin-right: 10px;
                padding: 1px 15px;
                border: 1px solid #B2B2B2;
                border-radius: 15px;
                color: #999999;
                cursor: pointer;
            }

            .select_checkbox {
                margin-top: 10px;
                font-size: 12px;
                width: 80%;
            }

            .taskActive {
                background-color: #6890FE;
                color: #ffffff;
                border: none;
                height: 26px;
                padding: 1px 16px;
                line-height: 26px;
                cursor: pointer;
            }
        }

    }
</style>