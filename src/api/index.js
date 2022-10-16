import request from '@/utils/request'
import { BaseURL } from '../utils/requestBase'
// 发送请求获取文章列表
export function fetchList(params) {
    return request({
        url: '/blog/list',
        method: 'get',
        params: params,
        baseURL: BaseURL.Blog
    })
}
// 获取焦点图列表       !!!!
export function fetchFocus() {
    return request({
        url: '/blog/focusList',
        method: 'get',
        params: {},
        baseURL: BaseURL.Blog
    })
}
// 请求文章分类列表      !!!!
export function fetchCategory() {
    return request({
        url: '/blog/category',
        method: 'get',
        params: {},
        baseURL: BaseURL.Blog
    })
}
// 友链
export function fetchFriend() {
    return request({
        url: '/friend',
        method: 'get',
        params: {}
    })
}
// 发送请求获取社交qq gitee等 !!!!
export function fetchSocial() {
    return request({
        url: '/user/social',
        method: 'get',
        baseURL: BaseURL.User
    });
}
// 请求博主信息        !!!!
export function fetchSiteInfo() {
    return request({
        url: '/user/site',
        method: 'get',
        baseURL: BaseURL.User
    })
}
// 讨论
export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}
// 登录             !!!!
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data,
        baseURL: BaseURL.User
    })
}
// 验证码           !!!!
export function getImg() {
    return request({
        url: '/user/kaptcha?p=' + Math.random(),
        method: 'get',
        responseType: 'arraybuffer',
        baseURL: BaseURL.User
    })
}
// 保存博客
export function saveBlog(data) {
    return request({
        url: '/blog/saveBlog',
        method: 'post',
        data,
        baseURL: BaseURL.Blog
    })
}
