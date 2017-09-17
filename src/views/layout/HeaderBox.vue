<template>
  <header>  
    <h1>  
      <router-link to="/">  
        <img :src="logoImg" alt="logo">  
      </router-link>  
    </h1>
    <div class="userContainer">
      <span v-text="name">刘强（18081009090）</span> | <a href="javascript:;" @click="logout">退出</a>
    </div>  
  </header>
</template>

<script>
  import logoImg from '@/images/base/logo.png' 
  import { mapGetters  } from 'vuex'
  export default {  
    data() {  
      return { 
        logoImg
      }  
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      logout(){
        this.$store.dispatch('LogOut').then(() => {
          location.reload();
        })
      }
    }  
  }
</script>

<style lang="scss" scoped>
  header{
    height: 40px;
    background: #324157;
    h1{
      float: left;
      margin: 5px 10px;
      img{
        height: 30px;
      }
    }
    .userContainer{
      float: right;
      padding-right: 10px;
      line-height: 40px;
      color: #fff;
      font-size: 14px;
    }
  }
</style>