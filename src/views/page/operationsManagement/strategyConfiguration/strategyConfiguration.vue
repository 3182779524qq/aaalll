<template>
    <div class="gathering-place-configuration-box">
        <el-tabs class="ui-gathering-place-configuration" v-model="activeName" type="card" >
            <el-tab-pane label="采集规范" name="first">
                <gathering-place-page></gathering-place-page>
            </el-tab-pane>
            <el-tab-pane label="软件使用说明" name="second">
                <operation-strategy-page></operation-strategy-page>
            </el-tab-pane>
            <el-tab-pane label="实例" name="third">
                <picture-configuration-page></picture-configuration-page>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import gatheringPlacePage from './gatheringPlaceConfiguration/gatheringPlacePage.vue';
    import operationStrategyPage from './operationStrategyPage/operationStrategyPage.vue';
    import pictureConfigurationPage from './pictureConfigurationPage/pictureConfigurationPage.vue';
    export default {
        name: "strategyConfiguration",
        components: {
            gatheringPlacePage,
            operationStrategyPage,
            pictureConfigurationPage
        },
        data(){
            return {
                //默认展示
                activeName:'first',
            }
        },
        method: {

        }
    }
</script>

<style scoped>

</style>
<style>
    .ui-gathering-place-configuration.el-tabs--card>.el-tabs__header .el-tabs__nav{
        border-radius: 20px;
        overflow: hidden;
        border: 1px #B2B2B2 solid;
    }
    .ui-gathering-place-configuration .el-tabs__item{
        background: #fff;
        font-size: 12px;
        color: #999;
        width: 170px;
        text-align: center;
    }
    .ui-gathering-place-configuration .el-tabs__header .el-tabs__item.is-active{
        border: none;
    }
    .ui-gathering-place-configuration .el-tabs__header{
        border: none;
    }
    .ui-gathering-place-configuration .el-tabs__item.is-active{
        background: #6890fe;
        color: #fff;
    }
</style>