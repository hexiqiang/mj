import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue' //首页
import Login from '../views/Login.vue' //登录页
import Index from '../views/Index.vue' //主页
import Engin from '../views/Engin.vue' //工程管理页
import Called from '../views/Called.vue' // 报警页
import Promanage from '../views/Promanage.vue'
import User from '../views/User.vue' //用户管理页
import Joint from '../views/Joint.vue' //联动页
import Message from '../views/Message.vue' //信息管理页
import Systemset from '../views/Systemset.vue' //系统设置页
import Api from '../views/Api.vue' //api管理页
import Curve from '../views/Curve.vue' //曲线报表页
// import CallData from '../views/CallData.vue' //报警记录页
// import ControlData from '../views/ControlData.vue' //控制记录页
// import JoinData from '../views/JoinData.vue' //联控记录页
import GatewayOnline from '../views/GatewayOnline.vue' //网关在线状态页
import MonitoringView from '../views/MonitoringView.vue' //监控视图页
import Monitoring from '../views/Monitoring.vue' //监控视图管理页
import MonitoringData from '../views/MonitoringData.vue' //监控视图列表页
import Historys from '../views/Historys.vue' //监控视图列表页

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        redirect: to => {
            // 方法接收目标路由作为参数
            // return 重定向的字符串路径/路径对象
            return {path: '/home'}
        },
        meta: {
            title: '控制台'
        }
    },
    {
        path: 'index/:username',
        components: {
            default: Index
        },
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                    title: '控制台'
                }
            },
            {
                path: '/engin',
                name: 'engin',
                component: Engin,
                meta: {
                    title: '工程管理'
                }
            },
            {
                path: '/called',
                name: 'called',
                component: Called,
                meta: {
                    title: '报警管理'
                }
            },
            {
                path: '/joint',
                name: 'joint',
                component: Joint,
                meta: {
                    title: '联控管理'
                }
            },
            {
                path: '/user',
                name: 'user',
                component: User,
                meta: {
                    title: '用户管理'
                }
            }, {
                path: '/message',
                name: 'message',
                component: Message,
                meta: {
                    title: '消息管理'
                }
            }, {
                path: '/system',
                name: 'system',
                component: Systemset,
                meta: {
                    title: '系统设置'
                }
            }, {
                path: '/apiset',
                name: 'apiset',
                component: Api,
                meta: {
                    title: 'api接口管理'
                }
            }, {
                path: '/curve',
                name: 'curve',
                component: Curve,
                meta: {
                    title: '曲线报表'
                }
            }, {
                path: '/historys',
                name: 'historys',
                component: Historys,
                meta: {
                    title: '历史记录'
                }
            },{
                path: '/gatewayonline',
                name: 'gatewayonline',
                component: GatewayOnline,
                meta: {
                    title: '网关在线状态'
                }
            },{
                path: '/monitoringview',
                name: 'monitoringview',
                component: MonitoringView,
                meta: {
                    title: '监控视图'
                }
            },{
                path: '/monitoring',
                name: 'monitoring',
                component: Monitoring,
                meta: {
                    title: '监控视图管理'
                }
            },{
                path: '/monitoringdata',
                name: 'monitoringdata',
                component: MonitoringData,
                meta: {
                    title: '监控视图管理'
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
