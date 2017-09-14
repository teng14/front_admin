<template>
  <div id="app">
    <el-row class="cantainer">
      <!--头部-->
      <cheader></cheader>
      <!-- 内容部分 -->
      <el-col :span="24" class="main">
          <!-- 左侧 -->
          <cmenu></cmenu>
          <!-- 右侧内容 -->
          <section class="content-container">
              <div class="grid-content">
                  <el-col :span="24">
                      <transition name="fade" mode="out-in">
                        <router-view></router-view>
                      </transition>
                  </el-col>
              </div>
          </section>
      </el-col>
      <!-- 底部 -->
      <cfooter></cfooter>
    </el-row>
  </div>
</template>

<script>
  import Cheader from './components/common/Header'
  import Cmenu from './components/common/Menu'
  import Cfooter from './components/common/Footer'
  export default {
    name: 'app',
    components: {
      Cheader,
      Cmenu,
      Cfooter
    }
  }
</script>

<style>
</style>
