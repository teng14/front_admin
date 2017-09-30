<template>
  <div>
    <searchbar class="search-bar" :keywords="keywords"></searchbar>
    <div class="list">
      <div class="list-title">终端列表</div>
      <el-table
      border
      :data="listData"
      style="width: 100%"
      empty-text="暂无内容" v-loading="listDataLoading">
        <el-table-column
          prop="ecommerceId"
          label="终端ID" 
          width="120px"
          align="center">
        </el-table-column>
        <el-table-column
          label="终端名称"
          align="center">
          <template scope="scope">
            <router-link :to="{path:'/customer/detail', query: {organizationId: scope.row.organizationId, ecommerceId: scope.row.ecommerceId}}" class="link">{{scope.row.name}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="isActivated"
          label="账户状态"
          width="120px"
          align="center">
          <template scope="scope">
            {{scope.row.isActivated ? '激活' : '锁定'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="contactPerson"
          label="联系人"
          width="120px"
          align="center">
        </el-table-column>
        <el-table-column
          prop="contactPhone"
          label="电话"
          width="200px"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
          align="center">
          <template scope="scope">
            <el-button @click="addKeqing(scope.row.organizationId, scope.row.name)" type="text">新增记录</el-button> &nbsp;&nbsp;
            <router-link :to="{path:'/customer/detail', query: {organizationId: scope.row.organizationId, ecommerceId: scope.row.ecommerceId}}" class="router-link-active">查看详情</router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange" 
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalElements">
        </el-pagination>
      </div>
    </div>
    <addrecord ref="showDialog" :organizationId = "organizationId" :organizationName = "organizationName"></addrecord>
  </div>
</template>

<script>
  import Searchbar from '@/components/main/Searchbar'
  import Addrecord from '@/components/Keqing/Addrecord'
  import { searchCustomer } from '@/api/customer'
  export default {
    data(){
      return {
        organizationId: '',
        organizationName: '',
        keywords: this.$route.query.keywords || '',
        page: this.$route.query.page || 1,
        pageSize: this.$route.query.pageSize || 20,
        listDataLoading: true,
        totalElements: 0,
        listData:[]
      }
    },
    methods: {
      getSearchData: function(){
        this.listDataLoading = true
        searchCustomer(this.keywords, this.page, this.pageSize).then( response => {
          this.listData = response.data.customerList
          this.listDataLoading = false
          this.totalElements = this.pageSize * response.data.pageInfo.totalPages
        },
        error => {
          this.listDataLoading = false
        })
      },
      addKeqing: function(organizationId, organizationName){
        this.organizationId = organizationId
        this.organizationName = organizationName
        this.$refs.showDialog.show()
      },
      handleCurrentChange: function(){
        this.getSearchData();
      }
    },
    created: function(){
      this.getSearchData()
    },
    components: {
      Searchbar,
      Addrecord
    }
  }
</script>

<style lang="scss">
  .search-bar{
    padding: 30px 0;
    text-align: center;
    // border: 1px solid #d1dbe5;
    // box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    .search-input{
      width: 500px;
    }
  }
  .list{
    margin-top: 30px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.12);
    .list-title{
      padding-bottom: 20px;
    }
    .router-link-active{
      color: #20a0ff;
    }
    .link{
      color: #475669;
      &:hover{
        color: #20a0ff;
      }
    }
  }
  .page{
    padding: 20px 0 10px;
    text-align: right;
  }
</style>