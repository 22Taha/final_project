import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [
            {
                username: 'user',
                password: 'user',
            },
            {
                username: 'client',
                password: 'client',
            },  
        ],
    },
    getters:{
        getUser: state => (username, password) => {
            return state.users.find(element => element.username==username && element.password==password)
        }
    },
    mutations:{

    },
    actions: {

    }
})