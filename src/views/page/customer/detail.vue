<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">基础信息</span>
          </div>
          <div class="text item">
            <p>ID: 9999 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;终端名：德阳市区源生堂大药房</p>
            <p>联系人：张金祥 &nbsp;&nbsp;&nbsp;&nbsp;电话：18981038656  QQ：无</p>
            <p>账号状态：激活</p>
            <p>资质份数：3，请联系终端补足资质。</p>
            <p>税号：无，请联系终端完善税号。</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">最近一次客情记录</span>
            <el-button style="float: right;" type="primary">所有记录</el-button>
            <el-button style="float: right; margin-right: 10px;" type="primary">新增客情记录</el-button>
          </div>
          <div class="text item">
            
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">终端最近情况</span>
          </div>
          <div class="text item">
            
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">采购能力统计</span>
          </div>
          <div class="text item">
            
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style>
  .el-col{
    margin-bottom: 20px;
  }
  .el-card__header{
    padding: 5px 18px;
  }
  .el-card__body{
    padding: 5px 18px;
  }
  .item{
    font-size: 14px;
  }
</style>