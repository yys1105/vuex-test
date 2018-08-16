import fetch from '@/fetch';

class Store {
    constructor(action, obj, apiName) {
        const api = action
        this.namespaced = true
        this.state = {
            // 异步loading控制
            loading: false,
            // 数据列表
            list: [],
            // 数据对象
            data: {},
            // 数据条数
            count: 0
        }
        this.getters = {
            // 获取状态数据
            data(state, getters) {
                return state
            }
        }
        this.mutations = {
            // 突变数据
            setOne(state, res) {
                if (res.code != 200) {

                } else {
                    state.data = res.data
                }
                state.loading = false;
            },
            // 突变列表
            setList(state, res) {
                if (res.code != 200) {

                } else {
                    state.list = res.data.docs;
                    state.count = res.data.count;
                }
                state.loading = false;
            },
            // 开启loading
            changeLoading(state, loading) {
                state.loading = loading;
            }
        }
        this.actions = {
            // 获取单条数据
            getByParams({
                state,
                commit
            }, params = {}) {
                commit('changeLoading', true);
                return fetch.get(api, params).then(res => {
                    commit('setOne', res)
                    return res
                }).finally(one => {
                    commit('changeLoading', false);
                })
            },
            // 获取单条数据
            getById({
                state,
                commit
            }, id) {
                commit('changeLoading', true);
                return fetch.get(`${api}/${id}`, {}).then(res => {
                    commit('setOne', res)
                    return res
                }).finally(one => {
                    commit('changeLoading', false);
                })
            },

            // 获取列表数据
            getList({
                state,
                commit
            }, params = {}) {
                commit('changeLoading', true);
                if (!params.pageSize) {
                    Object.assign(params, {
                        pageSize: 20
                    });
                }
                if (!params.pageNo) {
                    Object.assign(params, {
                        pageNo: 1
                    });
                }
                return fetch.get(api, params).then(res => {
                    commit('setList', res)
                    return res
                }).finally(one => {
                    // debugger
                    commit('changeLoading', false);
                })
            },

            // 新增数据
            post({
                state,
                commit
            }, params = {}) {
                commit('changeLoading', true);
                return fetch.post(api, params).then(res => {
                    return res;
                }).finally(one => {
                    commit('changeLoading', false);
                })
            },

            // 修改数据
            put({
                state,
                commit
            }, params = {}) {
                commit('changeLoading', true);
                return fetch.put(api, params).then(res => {
                    return res;
                }).finally(one => {
                    commit('changeLoading', false);
                })
            },

            // 删除数据
            delete({
                state,
                commit
            }, id) {
                commit('changeLoading', true);
                return fetch.delete(`${api}/${id}`, {}).then(res => {
                    return res;
                }).finally(one => {
                    commit('changeLoading', false);
                })
            },

            // 批量删除数据
            deleteBatch({
                state,
                commit
            }, ids) {
                commit('changeLoading', true);
                return fetch.delete(api, ids).then(res => {
                    return res;
                }).finally(one => {
                    commit('changeLoading', false);
                })
            }
        }
    }
}

export default Store