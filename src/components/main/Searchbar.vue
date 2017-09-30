<template>
  <el-form :inline="true" :model="searchRequest" class="search-form-inline">
    <el-form-item label="" class="search-input">
      <el-input size="large" @focus="clearError" v-model="searchRequest.searchKey" placeholder="终端名\联系人\订单号" @keyup.enter.native="onSubmit"></el-input>
      <div class="search-tips">{{error}}</div>
    </el-form-item>
    </el-form-item><el-form-item>
      <el-button size="large" type="primary" icon="search" @click="onSubmit">搜索</el-button>
    </el-form-item>
    
  </el-form>
</template>

<script>
  export default {
    data(){
      return {
        error: '',
        searchRequest: {
          searchKey: ''
        }
      }
    },
    methods: {
      onSubmit: function(){
        const router = this.$router;
        let keywords = this.searchRequest.searchKey.replace(/(^\s*)|(\s*$)/g, "")
        if(keywords !=''){
          if(keywords.substring(0,2).toLowerCase() === 'dd'){
            if(keywords.length !== 15){
              this.error = '您输入的订单号错误'
            }else{
              
              router.push({ path: '/order/detail', query: { orderCode: keywords }})
            }
          }else{
            router.push({ path: '/customer/index', query: { keywords: keywords }})
          }
        }else{
          this.error = '请输入要搜索内容'
        }
      },
      clearError: function(){
        this.error = ''
      }
    },
    created: function(){
    }
  }
</script>

<style lang="scss">
  .search-tips{
    position: absolute;
    left: 0;
    top: 40px;
    text-align: left;
    color: #FF4949;
    font-size: 14px;
  }
  .el-form-item{
    margin: 0;
  }
  .el-form-item__content{
    width: 100%;
  }
</style>