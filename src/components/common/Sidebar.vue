<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" background-color="#6890fe" text-color="#ffffff" 
            :collapse="collapse" active-text-color="#ffffff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" v-if="item.show">
                        <template slot="title">
                            <i :class="item.icon" class="iconfont"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" v-if="subItem.show">
                            <i :class="subItem.icon" class="iconfont"></i><span slot="title">{{ subItem.title }}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-if="item.show">
                        <i :class="item.icon" class="iconfont"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import GlobalUtil from '../../utils/globalUtil';
    export default {
        data() {
            return {
                collapse: false,
                items: []
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
         
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods: {
            compare(name, minor) {
                return function (o, p) {
                    var a, b;
                    if (o && p && typeof o === 'object' && typeof p === 'object') {
                        a = o[name];
                        b = p[name];
                        if (a === b) {
                            return typeof minor === 'function' ? minor(o, p) : 0;
                        }
                        if (typeof a === typeof b) {
                            return a < b ? -1 : 1;
                        }
                        return typeof a < typeof b ? -1 : 1;
                    } else {
                        thro("error");
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 60px;
        bottom: 0;
        overflow-y: scroll;
    }
    .iconfont{
        padding-right: 7px;
    }
    .icon-pinpaiguanli{
        /* margin-right: 20px; */
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 200px;
    }

    .sidebar>ul {
        height: 100%;
    }

    .el-menu-item.is-active {
        background-color: #ffffff !important;
        color: #6890fe !important;
    }
    .el-menu-item.is-active i{
        color: inherit !important;
    }
    .el-menu-item i {
        color: #ffffff;
    }

    .el-menu--inline li {
        background-color: #86a6fe !important;
    }

    .el-menu-item {
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
</style>
<style>
    .sidebar .el-submenu__title {
        color: #ffffff;
        text-align: center;
    }

    .sidebar .el-submenu__title i {
        color: #ffffff;
    }
   
</style>