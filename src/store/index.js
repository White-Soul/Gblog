import Vue from 'vue'
import Vuex from 'vuex'
import { getTimeInterval } from '../utils/index'
import { fetchSocial, fetchSiteInfo } from '@/api'

Vue.use(Vuex)
// 略:后台获取系统运行时间
const runAt = '1589878800000';
let timer = null;
const state = {
    // 是否有过渡动画
    loading: false,
    // 运行时间间隔
    runTimeInterval: '',
    // 社交QQ gitee等
    socials: '',
    // 博主信息
    websiteInfo: '',
    // 是否登录
    login: false,
}
const mutations = {
    // 设置过渡动画
    SET_LOADING: (state, v) => {
        state.loading = v;
    },
    // 设置社交qq gitee等
    SET_SOCIALS: (state, v) => {
        state.socials = v;
    },
    // 获取博主信息
    SET_SITE_INFO: (state, v) => {
        state.websiteInfo = v;
    },
    // 获取运行时间间隔
    GET_RUNTIME_INTERVAL: (state) => {
        if (!timer || !state.runTimeInterval) {
            clearInterval(timer)
            timer = setInterval(() => {
                state.runTimeInterval = getTimeInterval(runAt);
            }, 1000);
        }
    },
    SET_LOGIN(state, v) {
        state.login = v;
    }
}
const actions = {
    // 设置过渡动画
    setLoading: ({ commit }, v) => {
        commit('SET_LOADING', v);
    },
    initComputeTime: ({ commit }) => {
        commit('GET_RUNTIME_INTERVAL');
    },
    // 获取博主信息
    getSiteInfo: ({ commit, state }) => {
        // 异步处理对象
        return new Promise(resolve => {
            if (state.websiteInfo) {
                // pending => fulfilled ====== 成功
                resolve(state.websiteInfo)
            } else {
                fetchSiteInfo().then(res => {
                    let data = res.data || {}
                    commit('SET_SITE_INFO', data);
                    resolve(data);
                }).catch(err => {
                    resolve({});
                })
            }
        })
    },
    // 获取底部的qq，gitee等数据
    getSocials: ({ commit, state }) => {
        return new Promise((resolve => {
            // 判断socials是否为空，如果不为空则直接返回
            if (state.socials) {
                resolve(state.socials)
            } else {
                // 发送ajax请求获取数据
                fetchSocial().then(res => {
                    let data = res.data || []
                    commit('SET_SOCIALS', data);
                    resolve(data);
                }).catch(err => {
                    resolve([]);
                })
            }
        }))
    }
}
// store的计算属性
const getters = {
    loading: state => state.loading,
    runTimeInterval: state => state.runTimeInterval,
    notice: state => state.websiteInfo ? state.websiteInfo.notice : ''
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {},
    getters
})
