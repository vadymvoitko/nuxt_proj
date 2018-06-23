
<template>
<!--key is needed for js to create virtual DOM . Can be any primitive-->
    <ul>
        <li v-for="(user, index) in users" :key="user.id" @click="removeUser(index)"> {{ user.address.city }} </li>
    
    </ul>

</template>    

<script>
//import AppLogo from '~/components/AppLogo.vue'
//!! to make actions before sending page to client we use explicitly "asyncData ({ store })"
//    exactly store must be transmitted, not other name 
//"store.dispatch('getUsers');" we use for actions whereas commit for mutations 
export default {
    // ssr
    async asyncData ( {store} ) {
        await store.dispatch('getUsers', 'https://jsonplaceholder.typicode.com/users');
//using exactly with getters , directly won't work 
        return {
            users: store.getters.users
        }
    },
    methods: {
        removeUser(id){
            this.$store.dispatch('removeUser', id);
            this.users = this.$store.getters.users;
        }
    }
//  note how we use store in asyncData and in removeUser. Works only like this 
}
</script>

<style scoped>
    ul {
        margin-top: 20px;
    }
    li {
        display: block;
        min-width: 200px;
        border-radius: 10px;
        box-shadow: 1px 1px 2px #7f828b;
        margin-bottom: 10px;
        padding: 10px;
        cursor: pointer;
    }
</style>