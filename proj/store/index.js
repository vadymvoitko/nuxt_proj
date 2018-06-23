
import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
        users: [],
    },
    getters: { users(state){
          return state.users;
      }},
    mutations: {
//state in a row below can be any name. Its transmitted automatically as well as in raw upper. So when you call it you nedd 1 arg in this case 
              getUsers (state, users){
                  state.users = users;
              },
                  removeUser (state, userId) {
                      state.users.splice(userId, 1);
                  }
          },
//              diiference between mutations and actions is that actions are async
//              so we get our data from json file 
//.data its not from json fiel its general  to get data from json. You cannot use just req
    actions: {
//instead of context can be any name
            async getUsers (context, addr){
//    in nuxt we don't use this.axios 
//I added arg addr by my self. Before was w/o arg passed from component
                      const req = await axios.get(addr);
                      context.commit('getUsers', req.data);
                  },
                  removeUser(context, userId) {
                      context.commit('removeUser', userId);
                  }
              }
          
})
}
export default createStore

//in Nuxt we need to define as argument for getters, actions, mutations etw. context, in fact any name - just define mention it in arg