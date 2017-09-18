<template>
  <div>
    <searchbar class="search-bar"></searchbar>
    <div class="list">
      <el-table
      :data="listData"
      style="width: 100%"
      empty-text="暂无内容">
        <el-table-column
          prop="id"
          label="终端ID" 
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="终端名称"
          width="280"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="账户状态"
          align="center">
        </el-table-column>
        <el-table-column
          prop="contacts"
          label="联系人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template scope="scope">
            <el-button @click="edit(this)" type="text">新增客情记录</el-button> &nbsp;&nbsp;
            <router-link to="/customer/detail" class="router-link-active">查看详情</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import Searchbar from '@/components/main/Searchbar'
  export default {
    data(){
      return {
        listData:[
          {
            id: 3243,
            status: '激活',
            name: '德阳市区源生堂大药房',
            contacts: '张金祥',
            phone: '18981038656',
          }
        ]
      }
    },
    components: {
      Searchbar
    }
  }
</script>

<style lang="scss">
  .search-bar{
    padding: 30px 0;
    text-align: center;
    border: 1px solid #d1dbe5;
    // box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    .search-input{
      width: 500px;
    }
  }
  .list{
    margin-top: 30px;
    .router-link-active{
      color: #20a0ff;
    }
  }
</style>