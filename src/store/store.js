import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [
            {   
                id:1,
                username: 'user',
                password: 'user',
            },
            {   
                id:2,
                username: 'client',
                password: 'client',
            },  
        ],
        userNextId:3,
        categories: ['category1', 'category2'],
        productCountId: 3,
        products: [
            {
                id: 1,
                name: 'prod1',
                price: 300,
                description: 'description1',
                category: 'category1',
                quantity:200
            },
            {
                id: 2,
                name: 'prod2',
                price: 400,
                description: 'description2',
                category: 'category2',
                quantity:15
            }
        ],
        orders: [
            {
                user: 'user',
                validate: false,
                total: '',
                products: [
                    {
                        product_id: '',
                        product_name: '',
                        price: '',
                        quantity: '',
                    }
                ]
            }
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
        },
        products: state => {
            return state.products
        },
        categories: state => {
            return state.categories
        }
    },
    mutations:{
        updateProduct: (state, payload) => {
            if(state.products.filter(product => product.id == payload.id).length){
                state.products.filter(product => {
                    if(product.id == payload.id){
                        Object.assign(product, payload)
                    }
                })
            }else{
                payload.id = state.productCountId
                state.products.push(payload)
                state.productCountId++
            }
        },
        deleteProduct: (state, payload) => {
            state.products.splice(state.products.indexOf(payload), 1)
        },
        addCategory: (state, payload) => {
            state.categories.push(payload)
        },
        updateUser: (state, payload) => {
            if(state.users.filter(user => user.id == payload.id).length){
                state.users.filter(user => {
                    if(user.id == payload.id){
                        if(state.users.filter(user => user.username == payload.username).length) alert('this username is already token, retry')
                        else  Object.assign(user, payload)
                        
                    }
                })
            }else{
                if(state.users.filter(user => user.username == payload.username).length) alert('this username is already token, retry')
                else{
                payload.id = state.userNextId
                state.users.push(payload)
                state.userNextId++
                }
                
            }
        },
        deleteUser: (state, payload) => {
            state.users.splice(state.users.indexOf(payload), 1)
        },
    },
    actions: {

    }
})