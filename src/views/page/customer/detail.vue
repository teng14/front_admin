<template>
  <div>
    <searchbar  class="search-bar"></searchbar>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">基础信息</span>
            <strong class="shop-id">ID: <em>9999</em></strong>
          </div>
          <div class="text item">
            <p>终端名：<span>德阳市区源生堂大药房</span></p>
            <p>账号状态：<span>激活</span></p>
            <p>联系人：<span>张金祥(电话：18981038656 &nbsp;&nbsp;&nbsp;&nbsp; QQ：无)</span></p>
            <p>资质份数：<span style="color:#ff3333;">3，请联系终端补足资质。</span></p>
            <p>税号：<span style="color:#ff3333;">无，请联系终端完善税号。</span></p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">最近一次客情记录</span>
            <router-link to="" style="float:right;line-height:37px;font-size: 14px;color: #1d90e6;">所有记录</router-link>
            <a style="float: right; margin-right: 10px; font-size: 14px; line-height:37px;color: #1d90e6;" href="javascript:;">新增客情记录</a>
          </div>
          <div class="text item">
            <p><i class="el-icon-time"></i> 2017-09-15 11:25 <span>(主动客情)</span><strong style="float:right;font-weight: normal;">维护人：<span>周省省</span></strong></p>
            <p style="margin-top: 20px;margin-bottom: 5px;">服务内容：</p>
            <p style="margin-top: 0;"><span style="line-height: 22px;">家乐福淡蓝色的理解阿凡达拉风的发动机阿克拉附近地块发大师傅老大叫撒看法积分大房贷爱否发发发家乐福淡蓝色的理解阿凡达拉风的发动机阿克拉附近地块发大师傅老大叫撒看法积分大房贷爱否发发发</span></p>
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
            <p><i class="el-icon-my-gouwuche" style="color:#1d90e6;"></i> 购物车：</p>
            <p><span>当前购物车含有商品<em>100</em>个，其中有8加商业，共<em>39</em>个商品正在搞特价。同时含有厂商直供品种<em>20</em>个。</span></p>
            <p style="margin-top: 20px;"><i class="el-icon-my-wodedingdan" style="color:#1d90e6;"></i> 订单：</p>
            <p><span>共下了<em>87</em>个订单，80个已支付，<em>7</em>个未支付，<em>2</em>个冲红。</span></p>
            <p><span><i class="el-icon-time"></i> 最近采购2017-07-27（星期五） 15:48:59</span></p>
            
            <p></p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">采购能力统计</span>
          </div>
          <div class="text item">
            <p>百日采购额：<span>9999.99元</span></p>
            <p>百日采购次数：<span>10</span></p>
            <p>高频采购周期：<span>周三、周四</span>&nbsp;&nbsp;(建议联系终端)</p>
            <p>用户分层：<span>流失用户，需要多做客情。</span></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Searchbar from '@/components/main/Searchbar'
  export default {
    components: {
      Searchbar
    }
  }
</script>

<style lang="scss">
  .search-bar{
    margin-bottom: 30px;
    padding: 30px 0;
    text-align: center;
    // border: 1px solid #d1dbe5;
    // box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    .search-input{
      width: 500px;
    }
  }
  .el-col{
    margin-bottom: 20px;
  }
  .box-card{
    min-height: 250px;
  }
  .el-card__header{
    padding: 5px 18px;
  }
  .el-card__body{
    padding: 10px 18px;
  }
  .item{
    font-size: 14px;
    p{
      color: #8492a6;
      span{
        color: #324057;
      }
    }
  }
  .shop-id{
    font-size: 14px;
    font-weight: normal;
    color: #666;
    em{
      font-style: normal;
    }
  }
</style>