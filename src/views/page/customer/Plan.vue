<template>
  <div class="plan-box" v-loading.body="listLoading">
    <div class="title">今日拜访记录（24）</div>
    <div class="plan-content">
      <transition name="el-zoom-in-top">
      <el-table
      border
      :data="planData"
      style="width: 100%"
      empty-text="暂无内容">
        <el-table-column
          label="终端名称"
          width="280"
          align="center">
          <template scope="scope">
            <router-link to="/customer" class="link">{{scope.row.organizationName}}</router-link>
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
            <span class="el-icon-my-yijianfankui" @click="edit(scope.$index, scope.row)" style="font-size:20px;margin-right: 10px; cursor: pointer;"></span>
            <span class="el-icon-check" @click="mark(scope.$index, scope.row)" style="font-size:15px; cursor: pointer;color:#7fbe2d"></span>
          </template>
        </el-table-column>
      </el-table>
      </transition>
      <div class="page">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" 
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      </div>
    </div>
    <addrecord ref="showDialog" :organizationId = "organizationId"></addrecord>
  </div>
</template>

<script>
  import { planData, markCustomerContact } from '@/api/record'
  import Addrecord from '@/components/Keqing/Addrecord'
  export default {
    data(){
      return {
        planData: [], 
        listLoading: true,
        organizationId: '',
        currentPage: 4,
      }
    },
    created() {
      this.getDate();
    },
    components: {
      Addrecord
    },
    methods: {
      getDate: function(){
        this.listLoading = true;
        planData({
            page: 1,
            pageSize: 10
        }).then( response => {
          this.planData = response.data
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
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      edit: function(index, data){
        this.organizationId = data.organizationId
        this.$refs.showDialog.show()
      }
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