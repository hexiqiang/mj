import {get, post} from '../utils/requests'
export const getNavs = ()=> get('api/navs/getnavs',{}); // 获取导航栏
export const getCsrf =() =>  get('api/user/csrf',{}); // 获取csfr
export const getMembers =() =>  get('api/user/getmembers',{}); //获取用户资料
export const postUser = data => post('api/user/adduser',data);
export const editUser = data => post('api/user/editmember',data);
export default {
    getNavs,
    getCsrf,
    postUser,
    getMembers,
    editUser
}