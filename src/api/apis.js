import {get, post} from '../utils/requests'
export const getNavs = ()=> get('api/navs/getnavs',{}); // 获取导航栏
export const getCsrf =() =>  get('api/user/csrf',{}); // 获取csfr

export const getMembers =() =>  get('api/user/getmembers',{}); //获取用户资料
export const postUser = data => post('api/user/adduser',data); //添加账号
export const editUser = data => post('api/user/editmember',data); //编辑账号
export const delmember = data => post('api/user/delmember',data); //删除账号
export const changestatus = data => post('api/user/changestatus',data); //修改用户账号状态


export const addProject = data => post('api/project/addproject',data); //添加工程
export const editproject = data => post('api/project/editproject',data); //编辑工程
export const getProjects = data => get('api/project/getprojects',data); //查询工程列表
export const searchPro = data => get('api/project/searchproject',data); //查询工程列表
export const getProjectList = data => get('api/project/getprojectlist',data); //查询所有工程
export const delProject = data => post('api/project/delproject',data); //删除工程
export const changeprojectstatus = data => post('api/project/changestatus',data); //修改工程状态

export const addGateway = data => post('api/gateway/addgateway',data); //添加网关
export const editGateway = data => post('api/gateway/editgateway',data); //编辑网关
export const getGateway = data => get('api/gateway/getgateway',data); //查询网关
export const delGateway = data => post('api/gateway/delgateway',data); //删除网关
export const changeGatewaystatus = data => post('api/gateway/changestatus',data); //修改工程状态

//数据流
export const addStream= data => post('api/stream/addstream',data); //添加
export const editStream = data => post('api/stream/editstream',data); //编辑
export const getStream = data => get('api/stream/getstream',data); //查询
export const delStream= data => post('api/stream/delstream',data); //删除

//报警
export const addCall= data => post('api/call/addcall',data); //添加
export const editCall = data => post('api/call/editcall',data); //编辑
export const getCall = data => get('api/call/getcall',data); //查询
export const delCall = data => post('api/call/delcall',data); //删除

//触发器
export const addTrigger= data => post('api/trigger/addtrigger',data); //添加
export const editTrigger = data => post('api/trigger/edittrigger',data); //编辑
export const getTrigger = data => get('api/trigger/gettrigger',data); //查询
export const delTrigger = data => post('api/trigger/deltrigger',data); //删除


//获取数据流云变量
export const getCloudVal = data => get('api/api/datastreamofdev',data);
//获取对应工程下的网关
export const getProjectGateway = data => get('api/trigger/getgateway',data);
//获取对应工程下的网关
export const getGatewayStream = data => get('api/trigger/getstream',data);
export default {
    getNavs
    ,getCsrf
    ,postUser
    ,getMembers
    ,editUser
    ,delmember
    ,changestatus
    ,addProject
    ,getProjects
    ,getProjectList
    ,editproject
    ,delProject
    ,changeprojectstatus
    ,addGateway
    ,getGateway
    ,editGateway
    ,delGateway
    ,changeGatewaystatus
    ,addStream
    ,getStream
    ,editStream
    ,delStream
    ,searchPro
    ,getCloudVal
    ,addCall
    ,getCall
    ,editCall
    ,delCall
    ,addTrigger
    ,getTrigger
    ,editTrigger
    ,delTrigger
    ,getProjectGateway
    ,getGatewayStream
}