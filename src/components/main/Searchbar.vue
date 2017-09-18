<template>
  <el-form :inline="true" :model="searchRequest" class="search-form-inline">
    <el-form-item label="" class="search-input">
      <el-input v-model="searchRequest.searchKey" placeholder="终端名\联系人\电话\订单号"></el-input>
    </el-form-item>
    </el-form-item><el-form-item>
      <el-button type="primary" icon="search" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data(){
      return {
        searchRequest: {
          searchKey: ''
        }
      }
    },
    methods: {
      onSubmit: function(){
        
      }
    }
  }
</script>

<style lang="scss">
  .el-form-item{
    margin: 0;
  }
  .el-form-item__content{
    width: 100%;
  }
</style>