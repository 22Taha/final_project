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

                curentOrder: {
                    user: 'user',
                    total: 1200,
                    products: [
                        {
                            product_id: 1,
                            product_name: 'prod1',
                            price: 300,
                            quantity: 4,
                        }
                    ],
                }
            },
            {   
                id:2,
                username: 'client',
                password: 'client',

                curentOrder: {
                    user: 'client',
                    total: 800,
                    products: [
                        {
                            product_id: 2,
                            product_name: 'prod2',
                            price: 400,
                            quantity: 2,
                        }
                    ],
                }
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
                id:1,
                user: 'user',
                total: 1600,
                state:'new',
                products: [
                    {
                        product_id: 2,
                        product_name: 'prod2',
                        price: 400,
                        quantity: 4,
                    },
                    {
                        product_id: 1,
                        product_name: 'prod1',
                        price: 200,
                        quantity: 14,
                    }

                ]
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
        },
        products: state => {
            return state.products
        },
        categories: state => {
            return state.categories
        },
        orders:state=>{
            return state.orders
        },
        newOrders:state=>{
            return state.orders.filter(order=>order.state=="new")
        },
        totalIncom:state=>{
            let total=0;
            state.orders.forEach(order=>{
                if(order.state=='confirmed') total+=order.total;
            })
            return total;
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
        addOrder: (state, payload) => {
            state.users.filter(user => {
                if(user.username == payload.username){
                    user.curentOrder.total = user.curentOrder.total + (payload.price * payload.quantity)
                    user.curentOrder.products.push({ 
                        "product_id": payload.id, 
                        "product_name": payload.name,
                        "price": payload.price, 
                        "quantity": payload.quantity,
                    })
                }
            })
        },
        confirmOrder: (state, payload) => {
                state.orders.filter(order => {
                    if(order.id == payload.id){
                        Object.assign(order, payload)
                    }
                })
            
        },
    },

    actions: {

    }
})