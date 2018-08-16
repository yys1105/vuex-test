import axios from 'axios';
import storejs from 'storejs';
import moduleEvent from '@/event/moduleEvent';

var instanceAxios = axios.create()
instanceAxios.interceptors.request.use(
    function (config) {
        config.headers['token'] = storejs("token");
        return config
    },
    function (error) {
        moduleEvent.$emit("errorNetWork", '网络异常');
        return Promise.reject(error)
    },
)
instanceAxios.interceptors.response.use(
    function (response) {
        let resData = response.data;
        moduleEvent.$emit('moduleload', false);
    
        if (resData.code == 200) return resData
        // 302 掉线
        else if (resData.code == 302) {
            moduleEvent.$emit("errorNetWork", '账号已掉线，请重新登录');
            location.href = '/#/login';
            return Promise.reject(response);
        } else {
            moduleEvent.$emit("errorNetWork", resData.msg);
            return Promise.reject(response);
        }

    },
    function (error) {
        moduleEvent.$emit("errorNetWork", error.message);
        moduleEvent.$emit('moduleload', false);
        return Promise.reject(error)
    },
)

instanceAxios.defaults.withCredentials = true
instanceAxios.defaults.timeout = 115000

const http = {
    post: function (action, params) {
        return instanceAxios
            .post(action, params)
            .then(function (response) {
                return response
            })
    },
    get: function (action, params) {
        return instanceAxios
            .get(action, {
                params: params
            })
            .then(function (response) {
                return response
            })
    },
    put: function (action, params) {
        return instanceAxios
            .put(action, params)
            .then(function (response) {
                return response
            })
    },
    delete: function (action, params) {
        return instanceAxios
            .delete(action, {
                data: params
            })
            .then(function (response) {
                return response
            })
    }
}

export default http