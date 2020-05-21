import Vue from 'vue';
import Vuex from 'vuex';
var sha1= require('sha1');
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [
            {   
                id:1,
                username:'admin',
                password: sha1('admin'),

            },
            {   
                id:2,
                username:'user',
                password: sha1('user'),

                currentOrder: {
                    user: 'user',
                    validate: false,
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
                id:3,
                username: 'client',
                password: sha1('client'),

                currentOrder: {
                    user: 'client',
                    validate: false,
                    total: 1400,
                    products: [
                        {
                            product_id: 1,
                            product_name: 'prod1',
                            price: 300,
                            quantity: 2,
                        },
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
        userNextId:4,
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
            {
                id:2,
                user: 'client',
                total: '1600',
                state:'new',
                products: [
                    {
                        product_id: 2,
                        product_name: 'prod2',
                        price: 400,
                        quantity: 4,
                    }
                ]
            },
            {
                id:3,
                user: 'client',
                total: '1000',
                state:'confirmed',
                products: [
                    {
                        product_id: 1,
                        product_name: 'prod1',
                        price: 300,
                        quantity: 2,
                    },
                    {
                        product_id: 2,
                        product_name: 'prod2',
                        price: 400,
                        quantity: 1,
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
        product: state => productId => {
            return state.products.filter(product => {
                if(product.id == productId)
                    return product
            })[0]
        },
        ordersUser: state => username => {
            return state.orders.filter(order => {
                if(order.user == username)
                    return order
            })
        },
        productsCurrentOrder: state => username => {
                
                return state.users.map(user => {
                    if(user.username == username){
                        return user   
                    }  
                })[1].currentOrder
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
                    if(user.id == payload.id && user.username!=payload.username){
                        if(state.users.filter(user => user.username == payload.username).length){alert('this username is already token, retry') } 
                        else {
                            sha1(payload.password)
                            Object.assign(user, payload) }   
                    }
                })
            }else{
                if(state.users.filter(user => user.username == payload.username).length) {alert('this username is already token, retry')
            }else{
                payload.id = state.userNextId
                sha1(payload)
                state.users.push(payload)
                state.userNextId++
                }
            }
        },
        deleteUser: (state, payload) => {
            state.users.splice(state.users.indexOf(payload), 1)
        },
        addProductToCurrentOrder: (state, payload) => {
            state.users.filter(user => {
                if(user.username == payload.username){
                    user.currentOrder.total = user.currentOrder.total + (payload.price * payload.quantity)
                    if(user.currentOrder.products.filter(product => product.product_id == payload.id).length){
                        user.currentOrder.products.filter(product => {
                            if(product.product_id == payload.id){
                                product.quantity += parseInt(payload.quantity)
                            }
                        })
                    }else{
                        user.currentOrder.products.push({ 
                            "product_id": payload.id, 
                            "product_name": payload.name,
                            "price": payload.price, 
                            "quantity": payload.quantity,
                        })
                    }
                }
            })
            state.products.filter(product => {
                if(product.id == payload.id)
                    product.quantity -= payload.quantity 
            })
        },
        updateProductCurrentOrder: (state, payload) => {
            let oldSum;
            let newSum;
            state.users.map(user => {
                if(user.username == payload.username){
                    user.currentOrder.products.map(product => {
                        if(product.product_id == payload.productId){
                            oldSum = product.price*product.quantity
                            product.quantity = payload.productQuantity
                            newSum = product.price*product.quantity
                        }
                    })
                    user.currentOrder.total -= oldSum
                    user.currentOrder.total += newSum
                }
            })
        },
        deleteProductFromCurrentOrder: (state, payload) => {
            state.users.map(user => {
                if(user.username == payload.username){
                    user.currentOrder.products.splice(user.currentOrder.products.indexOf(payload.product), 1)
                    user.currentOrder.total -= (payload.product.price * payload.product.quantity)
                }
            })
        },
        validateCurrentOrder: (state, payload) => {
            // validate order of user 
            console.log(payload)
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