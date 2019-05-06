// 此文件为所有的接口URL地址
// 测试环境
const baseUrlsso = '/api/sso';//登录接口base
const baseUrl = '/api/collection-admin';//业务接口base
// 开发环境
// const baseUrlsso = '/sso';
// const baseUrl = '/collection-admin';
const ServiceUrls = {
    test:'/user/userList',
    //登录模块
    preLogin: baseUrlsso + "/user/preLogin", //获取滑块验证接口
    doLogin: baseUrlsso + "/user/doLogin", //验证登录接口
    doLoginOut: baseUrlsso + "/user/doLoginOut", //验证登录接口
    getCurrentUser: baseUrlsso + "/authen/currentUser", //获取当前角色信息
    getUserPerrionList: baseUrlsso + "/authen/getUserPerrionList", //获取用户权限 
    //数据统计模块
    getTeamTop10List: baseUrl + "/web/task/getTeamTop10List", //获取团队TOP10
    getUserTop10List: baseUrl + "/web/task/getUserTop10List", //获取用户TOP10
    getEchartList: baseUrl + "/web/task/getEchartList", //获取图表数据
    getActiceEchartList: baseUrl + "/web/task/getActiceEchartList", //获取日活状况数据
    getCountPoi: baseUrl + "/web/task/getCountPoi", //获取POI统计
    getCountActiveUser: baseUrl + "/web/task/getCountActiveUser", //获取日活统计
    homeExport: baseUrl + "/web/task/homeExport", //首页导出接口
    //操作历史
    getLogList: baseUrl + "/web/log/getLogList", //获取操作历史列表
    editLog: baseUrl + "/web/log/editLog ", //编辑历史列表
    //任务管理模块
    getWebTaskList: baseUrl + "/web/task/getWebTaskList", //获取任务列表
    getCollectDetail: baseUrl + "/web/task/getCollectDetail", //获取任务详情
    getHistoryList: baseUrl + "/web/task/getHistoryList", //获取任务历史
    exportTask: baseUrl + "/web/task/export", //导出任务
    //消息通知
    getAllNotify: baseUrl + "/web/notify/getAllNotify", //获取消息列表
    getAllTeamNotify: baseUrl + "/web/notify/getAllTeamNotify", //获取团队消息列表
    addSysNotify: baseUrl + "/web/notify/addSysNotify", //添加消息通知
    deleteSysNotify: baseUrl + "/web/notify/deleteSysNotify", //删除消息通知
    //公共组件
    getCollectTeam: baseUrl + "/web/team/getCollectTeam", //获取团队列表
    getCityList: baseUrl + "/web/city/getCityList", //获取城市列表
    getAllBuildType: baseUrl + "/web/public/getAllBuildType", //获取建筑属性
    // 小贴士接口
    getAllTips: baseUrl + "/web/helpCenter/getAllTips",//获取小贴士列表
    addTip: baseUrl + "/web/helpCenter/addTip",//新增小贴士
    updataTipStaute: baseUrl + "/web/helpCenter/updateTipStaute",//修改小贴士状态
    updataTipContent: baseUrl + "/web/helpCenter/updateTipContent",//修改小贴士内容
    deleteTipById: baseUrl + "/web/helpCenter/deleteTipById",//删除小贴士
    // 人员管理接口
    getUserList: baseUrl + "/web/user/getUserList",//获取人员列表
    editUser: baseUrl + "/web/user/editUser",//编辑人员状态
    userReport: baseUrl + "/web/user/export",//人员导出
    //团队管理接口
    getTeamList: baseUrl + "/web/team/getTeamList",//获取团队列表
    addCollectTeam: baseUrl + "/web/team/addCollectTeam",//添加团队
    editCollectTeam: baseUrl + "/web/team/editCollectTeam",//编辑团队
    //运营管理-运营活动
    getOperatingActivitiesList: baseUrl + "/web/activity/getActivityList", //运营活动列表
    addOperatingActivitie: baseUrl + "/web/activity/addActivity", //新增活动
    editOperatingActivitiet: baseUrl + "/web/activity/updateActivity", //编辑活动
    delOperatingActivities: baseUrl + "/web/activity/deleteActivity", //删除活动
    changeOperatingActivities: baseUrl + "/web/activity/updateActivityStatus", //改变活动状态
    //运营管理-列图配置
    getPictureConfigurationList: baseUrl + "/web/imgSample/list", //列图配置列表
    getAreaCategoryCollect: baseUrl + "/web/imgSample/getAreaCollectPostion", //获取列图配置行业采集位置接口
    addOrEditPictureConfiguration: baseUrl + "/web/imgSample/addOrEdit",  //添加编辑接口
    delPictureConfiguration: baseUrl + "/web/imgSample/delete",         //删除接口
    //运营管理-操作攻略
    getoperationStrategyPageList: baseUrl + "/web/guide/getGuideAppuse", //操作攻略列表
    addOrEditoperationGathering: baseUrl + "/web/guide/edit",   //添加编辑接口
    deloperationAndGathering: baseUrl + "/web/guide/delete",    //删除接口
    //
    getGatheringPlacePageList: baseUrl + "/web/guide/getGuideCollect", //采集攻略
    getCategoryCollect: baseUrl + "/web/imgSample/getImgAreaCollectPostion",  //获取操作攻略行业采集位置接口
    //七牛云图片上传获取token
    getQiniuToken: baseUrl + "/web/public/getQiniuToken",
    //七牛云图片上传接口
    qiniuUploadImg: "https://upload-z2.qiniup.com",
    //导出接口
    taskExportAPi:baseUrl + '/web/task/exportApi',//任务导出
    userExportAPi:baseUrl + '/web/user/exportApi',//人员导出
    homeExportAPi:baseUrl + '/web/task/exportApi2',//首页导出

}
export default ServiceUrls;