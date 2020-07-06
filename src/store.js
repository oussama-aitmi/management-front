import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'http://localhost/api/';



export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
  		user : {}
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token, user){
		    state.status = 'success'
		    state.token = token
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
		set_user(state, user){
			state.user = user
		},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
	  	},
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'login', data: user, method: 'POST' })
	            .then(resp => {
					console.log(resp.data);
	                const token = resp.data.token
	                let user = parseJwt(token)
	                localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token)
					commit('set_user', user)
	                resolve(resp.data)
	            })
	            .catch(err => {
					console.log(err)
	                commit('auth_error')
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'register', data: user, method: 'POST' })
	            .then(resp => {
					console.log(resp.data);
					const token = resp.data.token
					let user = parseJwt(token)

	                localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token)
					commit('set_user', user)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
	},
	getters : {
	  	isLoggedIn: state => !!state.token,
	  	authStatus: state => state.status,
		userConnected: state => state.user.firstName
	}
})

function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}