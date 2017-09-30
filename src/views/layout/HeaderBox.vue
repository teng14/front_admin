<template>
  <header>
    <div class="userContainer">
      <span v-text="name+ ' ('+ phone +')'"></span> | <a href="javascript:;" @click="logout">退出</a>
    </div>  
  </header>
</template>

<script>
  import { mapGetters  } from 'vuex'
  export default {  
    data() {  
      return { 
      }  
    },
    computed: {
      ...mapGetters([
        'name',
        'phone'
      ])
    },
    methods: {
      logout(){
        this.$store.dispatch('LogOut').then(() => {
          // window.location.href = 'http://passport.ypzdw.cn/login?returnUrl=http://cr.ypzdw.cn'
        })
      }
    }  
  }
</script>

<style lang="scss" scoped>
  header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: #28282e;
    z-index: 9;
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