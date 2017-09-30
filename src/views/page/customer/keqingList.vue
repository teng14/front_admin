<template>
  <div class="keqing-list" v-loading="loading">
    <div>
      <el-card class="box-card" v-for="(item, index) in recordData" :key="index">
        <div slot="header" class="box-card-header clearfix">
          <p class="fl"><i class="el-icon-time"></i> {{item.created}} <span>（{{item.type == 'INITIATIVE' ? '主动客情' : '客户来电'}}）</span></p>
          <p class="fr">服务人员: <span>{{item.operatorName}}</span></p>
        </div>
        <div class="item">
          <p><span>服务内容：</span></p>
          <p class="fr">{{item.serviceContent}}</p>
        </div>
      </el-card>
    </div>
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
</template>

<script>
  import { getRecord } from '@/api/record'
  export default {
    data() {
      return {
        loading: false,
        pageSize: 10,
        page: 1,
        totalPages: 0,
        totalElements: 0,
        recordData: []
      }
    },
    methods: {
      getData: function(){
        this.loading = true
        getRecord({
          page: this.page,
          pageSize: this.pageSize
        }).then( response => {
          this.recordData = response.data.customerContactList;
          this.totalPages = response.data.pageInfo.totalPages
          this.totalElements = response.data.pageInfo.totalElements
          this.loading = false
        },
        error => {
          this.loading = false
        }  
        )
      },
      handleCurrentChange: function(){
        this.getData();
      }
    },
    created: function(){
      this.getData()
    }
  }
</script>

<style lang="scss">
  .keqing-list{
    margin-top: 10px;
    padding: 30px 20px 20px;
    background: #fff;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.12);
    font-size: 14px;
    // .item{
    //   border: 1px solid #d1dbe5;
    // }
    .box-card{
      margin-bottom: 15px;
    }
    .el-card{
      // box-shadow: none;
    }
    .el-card__header{
      padding: 0 20px;
      p{
        color: #8492a6;
        span{
          color: #324057;
        }
        &.fl{
          float: left;
        }
        &.fr{
          float: right;
        }
      }
    }
    .el-card__body{
      padding: 5px 20px;
      p{
        span{
          color: #8492a6;
        }
      }
    }
    
  }
  .page{
    padding: 20px 0 10px;
    text-align: right;
  }
</style>