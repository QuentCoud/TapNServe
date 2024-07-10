import {useRouter} from "vue-router";

const IS_CONNECTED = false
const USE_TOKEN = 'token'
const users = [
    {
        name: 'test',
        password: 'test',
        restau: 'test1'
    },
    {
        name: 'test2',
        password: 'test2',
        restau: 'test2'
    }
]


const state = () => ({
    name: null,
    loggedIn: false,
    restau: null,
});

const mutations = {
    SET_USER(state, user) {
        state.loggedIn = true;
        state.name = user.name
        state.restau = user.restau
    },
    UNSET_USER(state) {
        state.loggedIn = false;
        state.name = null
        state.restau = null
    },
};

const actions = {
    login({ commit }, user) {
        const u = users.find((us) => us.name === user.name && us.password === user.password)

        if (u) {
            commit('SET_USER', u)
            localStorage.setItem('online', u.restau)
            return true
        } else {
            return false
        }
    },
    getAuth() {
        const restau = localStorage.getItem('online')
        if (restau) {
            return users.find((user) => restau === user.restau)
        } else {
            return null
        }
    },
    checkAuth({ commit }) {
        if (state.loggedIn) {
            return true
        } else {
            const user = actions.getAuth()

            if (typeof user === 'object') {
                commit('SET_USER', user)
                return true
            }

            return false
        }
    },
    logout({ commit }) {
        commit('UNSET_USER')
        localStorage.removeItem('online')
        return true
    }
};

const getters = {
    isAuthenticated(state) {
        return state.loggedIn;
    },
    getUser(state) {
        return {
            restau: state.restau,
            name: state.name
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};