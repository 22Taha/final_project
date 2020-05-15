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
        ] 
    },
    getters:{
        user: state => (username, password) => {
            if(state.users.find(element => element.username==username && element.password==password))
                return true
            else return false 
        },
        users: state => {
            return state.users
        }
    },
    mutations:{

    },
    actions: {

    }
})