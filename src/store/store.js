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
        categories: ['category1', 'category2'],
        productCountId: 3,
        products: [
            {
                id: 1,
                name: 'prod1',
                price: 300,
                description: 'description1',
                category: 'category1'
            },
            {
                id: 2,
                name: 'prod2',
                price: 400,
                description: 'description2',
                category: 'category2'
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
        }
    },
    actions: {

    }
})