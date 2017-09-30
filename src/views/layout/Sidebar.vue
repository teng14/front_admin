<template>
  <div class="sidebar">
    <div class="logo">
      <router-link to="/">  
        <img :src="logoImg" alt="logo">  
      </router-link>
    </div>
    <el-menu mode="vertical" theme="dark" :default-active="$route.path">
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import logoImg from '@/images/base/logo.png' 
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  data(){
    return {
      logoImg
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sidebar{
  background: #324157;
}
.logo{
  padding: 20px 0;
  margin-bottom: 20px;
  text-align: center;
  background: #28282e;
}
.el-menu {
  min-height: 100%;
}
</style>
