
const IS_CONNECTED = false
const USE_TOKEN = 'token'
const users = [
    {
        name: 'test',
        password: 'test'
    }
]


const state = () => ({
    name: 'John Doe',
    loggedIn: false,
});

const mutations = {
    SET_USER(state, user) {
        state.loggedIn = true;
        state.name = user.name
    },
};

const actions = {
    login({ commit }, user) {
        const u = users.find((us) => us.name === user.name && us.password === user.password)

        if (u) {
            commit('SET_USER', u)
            return true
        } else {
            return false
        }
    },
    getAuth(token) {
        if (IS_CONNECTED) {
            return {
                'token': token,
                'name': "Jean le restaurateur"
            }
        } else {
            return false
        }
    },
    checkAuth({ commit }) {
        if (state.loggedIn) {
            return true
        } else {
            const user = actions.getAuth(USE_TOKEN)

            if (typeof user === 'object') {
                commit('SET_USER', user)
                return true
            }

            return false
        }
    },
};

const getters = {
    isAuthenticated(state) {
        return state.loggedIn;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};