import {get, post, postFile} from '../utils/requests'

export const getNavs = data => get('api/navs/getnavs', data); // 获取导航栏
export const getNavsLists = data => get('api/navs/navs', data); // 获取导航栏
export const getCsrf = () => get('api/user/csrf', {}); // 获取csfr

export const getMembers = data => get('api/user/getmembers', data); //获取用户资料
export const postUser = data => post('api/user/adduser', data); //添加账号
export const editUser = data => post('api/user/editmember', data); //编辑账号
export const delmember = data => post('api/user/delmember', data); //删除账号
export const changestatus = data => post('api/user/changestatus', data); //修改用户账号状态


export const getProjects = data => get('api/project/getprojects', data); //查询工程列表
export const addProject = data => post('api/project/addproject', data); //添加工程
export const editproject = data => post('api/project/editproject', data); //编辑工程
export const searchPro = data => get('api/project/searchproject', data); //查询工程列表
export const getProjectList = data => get('api/project/getprojectlist', data); //查询所有工程
export const delProject = data => post('api/project/delproject', data); //删除工程
export const changeprojectstatus = data => post('api/project/changestatus', data); //修改工程状态

export const addGateway = data => post('api/gateway/addgateway', data); //添加网关
export const editGateway = data => post('api/gateway/editgateway', data); //编辑网关
export const getGateway = data => get('api/gateway/getgateway', data); //查询网关
export const delGateway = data => post('api/gateway/delgateway', data); //删除网关
export const changeGatewaystatus = data => post('api/gateway/changestatus', data); //修改工程状态

//数据流
export const addStream = data => post('api/stream/addstream', data); //添加
export const editStream = data => post('api/stream/editstream', data); //编辑
export const getStream = data => get('api/stream/getstream', data); //查询
export const delStream = data => post('api/stream/delstream', data); //删除

//报警
export const addCall = data => post('api/call/addcall', data); //添加
export const editCall = data => post('api/call/editcall', data); //编辑
export const getCall = data => get('api/call/getcall', data); //查询
export const delCall = data => post('api/call/delcall', data); //删除

//触发器
export const addTrigger = data => post('api/trigger/addtrigger', data); //添加
export const editTrigger = data => post('api/trigger/edittrigger', data); //编辑
export const getTrigger = data => get('api/trigger/gettrigger', data); //查询
export const delTrigger = data => post('api/trigger/deltrigger', data); //删除

//联控
export const addJoins = data => post('api/joins/add', data); //添加
export const editJoins = data => post('api/joins/edit', data); //编辑
export const getJoins = data => get('api/joins/lists', data); //查询
export const delJoins = data => post('api/joins/del', data); //删除

//视图管理
export const addView = data => post('api/viewmanage/add', data); //添加
export const editView = data => post('api/viewmanage/edit', data); //编辑
export const getView = data => get('api/viewmanage/lists', data); //查询
export const delView = data => post('api/viewmanage/del', data); //删除

//消息管理
export const addMessage = data => post('api/message/add', data); //添加
export const editMessage = data => post('api/message/edit', data); //编辑
export const getMessage = data => get('api/message/lists', data); //查询
export const delMessage = data => post('api/message/del', data); //删除

//栏目设置管理
export const addUserNav = data => post('api/userrule/add', data); //添加
export const UserNavList = data => get('api/userrule/getnavs', data); //查询

//项目设置管理
export const addUserPro = data => post('api/userproject/add', data); //添加
export const UserProList = data => get('api/userproject/getlist', data); //查询

//项目权限设置管理
export const addUserProRule = data => post('api/userprojectrule/add', data); //添加
export const UserProRuleList = data => get('api/userprojectrule/getlist', data); //查询

//获取数据流云变量
export const getCloudVal = data => get('api/api/datastreamofdev', data);
//获取对应工程下的网关
export const getProjectGateway = data => get('api/trigger/getgateway', data);
//获取对应网关下的数据流
export const getGatewayStream = data => get('api/trigger/getstream', data);
// 查询报警的记录
export const getCallRecord = data => get('api/callrecord/getcallrecord', data);
// 查询控制的记录
export const getControlRecord = data => get('api/controlrecord/getcontrolrecord', data);
// 查询联控的记录
export const getJoinRecord = data => get('api/joinrecord/getjoinrecord', data);
// 查询工程下的记录命令
export const getProjectJoin = data => get('api/joins/getprojectjoinslist', data);
//查询网关的在线状态
export const getGatewayStauts = data => get('api/gatewaystatus/gatewaystatus', data);
//查询控件的组件
export const getViewControl = data => get('api/viewcontrol/lists', data);
//查询该视图的控件组件
export const getViewJoinControlList = data => get('api/viewmanagejoin/lists', data);
//提交该视图的控件组件
export const addViewJoinControl = data => post('api/viewmanagejoin/add', data);
//删除该视图的控件组件
export const delViewJoinControl = data => post('api/viewmanagejoin/del', data);
//根据工程id查询该工程下的视图组件
export const actionSearchView = data => get('api/viewmanage/search', data);
//配置系统设置
export const addSetting = data => post('api/setting/add', data);
//配置系统设置
export const editSetting = data => post('api/setting/edit', data);
//上传文件
export const upFile = data => postFile('api/setting/upfile', data);
//查询配置
export const settingsys = data => get('api/setting/field', data);
//查询用户的对应项目
export const Searchprojectlist = data => get('api/user/searchprojectlist', data);
//查询获取首页数据
export const index = data => get('api/index/index', data);
//获取首页的在线工程
export const getIndexProject = data => get('api/index/getprojects', data);

//获取报警的曲线表
export const totalcall = data => get('api/total/totalcall', data);
//获取控制的曲线表
export const totalcontrol = data => get('api/total/totalcontrol', data);
//获取联控的曲线表
export const totaljoin = data => get('api/total/totaljoin', data);
//获取用户信息曲线表
export const totalmessage = data => get('api/total/totalmessage', data);
//登录
export const login = data => post('api/login/login', data);
//检测登录
export const checklogin = data => post('api/login/checklogin',data);

export const getProjectViewGateway = data => get('api/viewmanage/getprojectviewgateway',data);

//提交视图设置的相关项
export  const PostData = data => post('api/viewmanage/postdata',data);
export  const Getsetting = data => get('api/viewmanage/getsetting',data);
//提交视图上的文本数据
export const Postnote = data => post('api/viewmanage/postnote',data);
//获取曲线报表的数据流报表
export  const Getstreamrecord = data => get('api/datas/getstreamrecord',data);
//查询对应的历史数据
export const  Getstreamrecorddatas = data => get('api/datas/getstreamrecorddatas',data);
//查询报警历史数据
export const Getcalldata = data => get('api/datas/getcalldata',data);
export const Getcallrecords = data  => get('api/datas/getcallrecord',data);
export default {
    getNavs
    , getCsrf
    , postUser
    , getMembers
    , editUser
    , delmember
    , changestatus
    , addProject
    , getProjects
    , getProjectList
    , editproject
    , delProject
    , changeprojectstatus
    , addGateway
    , getGateway
    , editGateway
    , delGateway
    , changeGatewaystatus
    , addStream
    , getStream
    , editStream
    , delStream
    , searchPro
    , getCloudVal
    , addCall
    , getCall
    , editCall
    , delCall
    , addTrigger
    , getTrigger
    , editTrigger
    , delTrigger
    , getProjectGateway
    , getGatewayStream
    , getCallRecord
    , getControlRecord
    , getJoinRecord
    , getProjectJoin
    , getGatewayStauts
    , addJoins
    , getJoins
    , editJoins
    , delJoins
    , addView
    , getView
    , editView
    , delView
    , getViewControl
    , addViewJoinControl
    , getViewJoinControlList
    , delViewJoinControl
    , actionSearchView
    , addMessage
    , getMessage
    , editMessage
    , delMessage
    , addSetting
    , editSetting
    , upFile
    , settingsys
    , getNavsLists
    , addUserNav
    , UserNavList
    , addUserPro
    , UserProList
    , Searchprojectlist
    , addUserProRule
    , UserProRuleList
    , index
    , getIndexProject
    , totalcall
    , totaljoin
    , totalcontrol
    , login
    ,checklogin
    ,getProjectViewGateway
    ,PostData
    ,Getsetting
    ,Postnote
    ,Getstreamrecord
    ,Getstreamrecorddatas
    ,Getcalldata
    ,Getcallrecords
}