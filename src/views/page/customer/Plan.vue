<template>
  <div class="plan-box" v-loading.body="listLoading">
    <div class="title">今日拜访记录（{{totalElements}}）</div>
    <div class="plan-content">
      <transition name="el-zoom-in-top">
      <el-table
      border
      :data="planData"
      style="width: 100%"
      empty-text="暂无内容">
        <el-table-column
          label="终端名称"
          width="340"
          align="center">
          <template scope="scope">
            <router-link :to="{path:'/customer/detail',query:{organizationId: scope.row.organizationId, ecommerceId: scope.row.ecommerceId}}" class="link">{{scope.row.organizationName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="organizationContact"
          label="联系人"
          width="110"
          align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="returnVisitContent"
          label="拜访事由"
          align="center">
        </el-table-column>
        <el-table-column
          label="记录客情"
          width="120"
          align="center">
          <template scope="scope">
            <span class="el-icon-my-yijianfankui" @click="addKeqing(scope.$index, scope.row)" style="font-size:20px;margin-right: 10px; cursor: pointer;"></span>
            <span class="el-icon-check" @click="mark(scope.$index, scope.row)" style="font-size:15px; cursor: pointer;color:#7fbe2d"></span>
          </template>
        </el-table-column>
      </el-table>
      </transition>
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
    <addrecord ref="showDialog" :organizationId = "organizationId" remark="true" :customerContact="customerContact" :organizationName = "organizationName"></addrecord>
  </div>
</template>

<script>
  import { planData, markCustomerContact } from '@/api/record'
  import Addrecord from '@/components/Keqing/Addrecord'
  export default {
    data(){
      return {
        pageSize: 10,
        page: 1,
        totalPages: 0,
        totalElements: 0,
        planData: [], 
        listLoading: true,
        organizationId: '',
        organizationName: '',
        currentPage: 4,
        customerContact: ''
      }
    },
    components: {
      Addrecord
    },
    methods: {
      getDate: function(){
        this.listLoading = true;
        planData({
            page: this.page,
            pageSize: this.pageSize
        }).then( response => {
          this.planData = response.data.customerContactList
          this.totalElements = response.data.pageInfo.totalElements
          this.listLoading = false
        },
        error => {
          this.listLoading = false;
        }
        )
      },
      mark: function(index){
        markCustomerContact(this.planData[index].id).then( response => {
          this.planData.splice(index,1);
          this.totalElements = this.totalElements - 1
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        })
      },
      handleCurrentChange: function(){
        this.getDate();
      },
      addKeqing: function(index, data){
        this.organizationId = data.organizationId
        this.organizationName = data.organizationName
        this.customerContact = data.id
        this.$refs.showDialog.show()
      }
    },
    created: function(){
      this.getDate();
    }
  }
</script>

<style lang="scss" scoped>
  .plan-box{
    margin-top: 30px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.12);
    // border: 1px solid #d1dbe5;
    .title{
      margin-top: 10px;
      padding-bottom: 20px;
    }
  }
  .plan-content{
    // padding: 20px;
  }
  .page{
    padding: 20px 0 10px;
    text-align: right;
  }
</style>