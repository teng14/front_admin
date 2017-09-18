<template>
  <div class="plan-box">
    <div class="title">今日拜访记录8</div>
    <div class="plan-content">
      <el-table
      :data="planData"
      style="width: 100%"
      empty-text="暂无内容">
        <el-table-column
          label="终端名称"
          width="280"
          align="center">
          <template scope="scope">
            <router-link to="/customer">{{scope.row.name}}</router-link>
          </template>
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
          prop="content"
          label="拜访事由"
          align="center">
        </el-table-column>
        <el-table-column
          label="记录客情"
          align="center">
          <template scope="scope">
            <span class="el-icon-edit" @click="edit(scope.$index, scope.row)" style="font-size:20px;margin-right: 5px; cursor: pointer;"></span>
            <span class="el-icon-check" @click="confirm(scope.$index, scope.row)" style="font-size:20px; cursor: pointer;"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        planData: [
          {
            name: '德阳市区源生堂大药房',
            contacts: '张金祥',
            phone: '18981038656',
            content: '业务员手动填写'
          },
        ]
      }
    },
    methods: {
      edit: function(index, data){
        alert(1)
      },
      confirm: function(index, data){
        console.log(data)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .plan-box{
    margin-top: 30px;
    padding: 10px;
    border: 1px solid #d1dbe5;
    .title{
      margin-top: 10px;
    }
  }
  .plan-content{
    padding: 20px;
  }
</style>