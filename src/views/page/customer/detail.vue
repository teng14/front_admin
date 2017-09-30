<template>
  <div>
    <searchbar  class="search-bar"></searchbar>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">基础信息</span>
            <strong class="shop-id">ID: <em>{{ecommerceId}}</em></strong>
          </div>
          <div class="text item">
            <p>终端名：<span>{{customerInfo.basicInfoData.name}}</span></p>
            <p>账号状态：<span>{{customerInfo.basicInfoData.isActivated == true ? '激活' : '锁定'}}</span></p>
            <p>联系人：<span>{{customerInfo.basicInfoData.contactPerson}} (电话：{{customerInfo.basicInfoData.contactPhone}} &nbsp;&nbsp;&nbsp;&nbsp; QQ：{{customerInfo.basicInfoData.contactQQ ? customerInfo.basicInfoData.contactQQ : '无'}})</span></p>
            <p>资质份数：<span style="color:#324057;" v-if="customerInfo.basicInfoData.aptitudeNum >3">{{customerInfo.basicInfoData.aptitudeNum}}</span><span style="color:#ff3333;" v-else>{{customerInfo.basicInfoData.aptitudeNum}}，请联系终端补足资质。</span></p>
            <p v-if="customerInfo.taxpaycodes.length <= 3">税号：<span style="color:#ff3333;" v-html="filtersTaxpaycodes"></span></p>
            <p v-else>税号：<span style="color:#324057;" v-html="filtersTaxpaycodes"></span>
              <el-popover
                ref="popover1"
                placement="top-start"
                width="200"
                title="税号："
                trigger="hover">
                <div v-for=" item in customerInfo.taxpaycodes" :key="item">{{item}}</div>
              </el-popover>
              <span v-popover:popover1>&nbsp;&nbsp;<el-badge :value="customerInfo.taxpaycodes.length" :max="10" class="item">查看更多&nbsp;&nbsp;</el-badge></span>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">最近一次客情记录</span>
            <router-link to="/customer/keqingList" style="float:right;line-height:37px;font-size: 14px;color: #1d90e6;">所有记录</router-link>
            <a style="float: right; margin-right: 10px; font-size: 14px; line-height:37px;color: #1d90e6;" @click="addKeqing(ecommerceId, organizationName)" href="javascript:;">新增客情记录</a>
          </div>
          <div v-if="keqing.recordData.length > 0" v-loading="keqing.loading">
            <div class="text item" v-for="(item,index) in keqing.recordData" :key="index">
              <p><i class="el-icon-time"></i> {{item.created}} <span>({{item.type == 'INITIATIVE' ? '主动客情' : '客户来电'}})</span><strong style="float:right;font-weight: normal;">维护人：<span>{{item.operatorName}}</span></strong></p>
              <p style="margin-top: 20px;margin-bottom: 5px;">服务内容：</p>
              <p style="margin-top: 0;"><span style="line-height: 22px;">{{item.serviceContent}}</span></p>
            </div>
            <div class="page">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="keqing.page"
                :page-size="keqing.pageSize"
                layout="prev, next"
                :total="keqing.totalElements">
              </el-pagination>
            </div>
          </div>
          <div v-else style="text-align:center;line-height:160px">
            {{keqing.loadingText}}
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
            <p><span>当前购物车含有商品 <router-link v-if="cartCountInfo.cartTotalCount !=0" :to="{path: '/customer/cartGoods', query:{ ecommerceId: ecommerceId, organizationId: organizationId, areaCode: areaCode, type: 'all' }}">{{cartCountInfo.cartTotalCount}}</router-link> <em v-else> {{cartCountInfo.cartTotalCount}} </em> 个</span>
            <!-- ，共<router-link :to="{path: '/customer/cartGoods', query:{ ecommerceId: ecommerceId, organizationId: organizationId, areaCode: areaCode, type: 'youhui' }}">{{cartCountInfo.cartYouhuiCount}}</router-link>个商品正在搞活动。 -->
            </p>
            <p style="margin-top: 20px;"><i class="el-icon-my-wodedingdan" style="color:#1d90e6;"></i> 订单：</p>
            <p><span><em style="color:#324057">{{orderCount.unpaidOrderCount}}</em> 个未支付，<em style="color:#324057">{{orderCount.chonghongOrderCount}}</em> 个冲红，<em style="color:#324057">{{orderCount.outBoundOrderCount}}</em> 个未收货。</span></p>
            <!-- <p><span><i class="el-icon-time"></i> 最近采购2017-07-27（星期五） 15:48:59</span></p> -->
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">采购能力统计</span>
          </div>
          <div class="text item">
            <p>百日采购额：<span>{{buyingData.hundred_day_pay_sum}}元</span></p>
            <p>百日采购次数：<span>{{buyingData.hundred_day_pay_count}}</span></p>
            <p v-html="filtersWeek"></p>
            <p>用户分层： <el-tooltip v-if="buyingData.buyerLayerName" effect="dark" placement="bottom">
              <div slot="content" v-html="buyingData.buyerLayerTips"></div>
              <span>{{buyingData.buyerLayerName}} <i class="el-icon-warning"></i></span></el-tooltip></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <addrecord ref="showDialog" :organizationId = "organizationId" :organizationName = "organizationName"></addrecord>
  </div>
</template>

<script>
  import Searchbar from '@/components/main/Searchbar'
  import Addrecord from '@/components/Keqing/Addrecord'
  import { getRecord } from '@/api/record'
  import { basicInfo, cartInfo, orderCount, buyingPower } from '@/api/customer'
  export default {
    data() {
      return {
        ecommerceId: this.$route.query.ecommerceId,
        organizationId: this.$route.query.organizationId,
        organizationName: '',
        areaCode: 0,
        customerInfo: {
          loading: false,
          taxpaycodes: [],
          basicInfoData: ''
        },
        cartCountInfo: {
          cartTotalCount: 0,
          cartYouhuiCount: 0
        },
        buyingData: {
          hundred_day_pay_sum: '0',
          hundred_day_pay_count: '0',
          high_frequency: [],
          buyer_layer: '',
          buyerLayerName: '',
          buyerLayerTips: '',
          week:['周一','周二','周三','周四','周五','周六','周日']
        },
        keqing: {
          loadingText: '数据加载中...',
          loading: false,
          pageSize: 1,
          page: 1,
          totalPages: 0,
          totalElements: 0,
          recordData: []
        },
        orderCount: {
          unpaidOrderCount: 0,
          chonghongOrderCount: 0,
          outBoundOrderCount: 0
        }
      }
    },
    components: {
      Searchbar,
      Addrecord
    },
    methods: {
      //客户基础信息
      getBasicInfo: function(){
        this.customerInfo.loading = true
        basicInfo(this.ecommerceId).then( response => {
          this.customerInfo.basicInfoData = response.data
          this.customerInfo.taxpaycodes = response.data.taxpaycodes
          this.organizationName = response.data.name
          this.customerInfo.loading = false
          this.areaCode = response.data.areaCode
          this.changeRoute(this.organizationName)
        },
        error => {
          this.customerInfo.loading = false
        }
        )
      },

      //购物车信息
      getCartInfo: function(){
        cartInfo(this.ecommerceId).then( response => {
          this.cartCountInfo.cartTotalCount = response.data.allSkuList.length
          this.cartCountInfo.cartYouhuiCount = response.data.preferentialSkuList.length
        })
      },

      //获取订单统计
      getOrderCount: function(){
        orderCount(this.ecommerceId).then( response => {
          var Data = response.Data;
          for(let i = 0; i < Data.length; i++){
            if (Data[i].status === 1) {
              console.log
              this.orderCount.unpaidOrderCount = Data[i].count
            }else if (Data[i].status === 4) {
              this.orderCount.chonghongOrderCount = Data[i].count
            }else if(Data[i].status === 4) {
              this.orderCount.outBoundOrderCount = Data[i].count
            }
          }
        } 
        )
      },

      // 采购能力统计
      getBuyingPower: function() {
        buyingPower(this.ecommerceId).then( response => {
          if(response.data.length > 0){
            this.buyingData.hundred_day_pay_sum = response.data[0].hundred_day_pay_sum
            this.buyingData.hundred_day_pay_count = response.data[0].hundred_day_pay_count
            let high_frequency = (response.data[0].high_frequency && response.data[0].high_frequency.split(',')) || ''
            this.buyingData.high_frequency = high_frequency
            this.buyingData.buyer_layer = response.data[0].buyer_layer
            if(this.buyingData.buyer_layer == 1){
              // 存量
              this.buyingData.buyerLayerName = '存量用户'
              this.buyingData.buyerLayerTips = '距离今天最近的60天内，至少每8天产生一次交易，<br/>最近一次交易在距离今天8天内，持续时间超过60天的采购商。'
            }else if(this.buyingData.buyer_layer == 2){
              // 入门
              this.buyingData.buyerLayerName = '入门用户'
              this.buyingData.buyerLayerTips = '距离今天最近的30天内，至少每8天产生一次交易，<br/>最近一次交易在距离今天8天内，持续时间超过30天的采购商'
            }else if(this.buyingData.buyer_layer == 3){  
              // 体验
              this.buyingData.buyerLayerName = '体验用户'
              this.buyingData.buyerLayerTips = '达不到入门用户和存量用户条件的非流失用户。'
            }else if(this.buyingData.buyer_layer == 4){
              // 流失
              this.buyingData.buyerLayerName = '流失用户'
              this.buyingData.buyerLayerTips = '距离今天30天内无任何交易的采购商。'
            }
          }
        })
      },

      //增加客情
      addKeqing: function(organizationId, organizationName){
        this.organizationId = organizationId
        this.organizationName = organizationName
        this.$refs.showDialog.show()
      },
      //客情记录
      getKeqingData: function(){
        this.keqing.loading = true
        getRecord({
          page: this.keqing.page,
          pageSize: this.keqing.pageSize
        }).then( response => {
          if(response.data.customerContactList){
            this.keqing.loadingText = '暂无客情记录'
          }
          this.keqing.recordData = response.data.customerContactList;
          this.keqing.totalPages = response.data.pageInfo.totalPages
          this.keqing.totalElements = response.data.pageInfo.totalElements
          this.keqing.loading = false
        },
        error => {
          this.keqing.loading = false
        }  
        )
      },
      //客情翻页
      handleCurrentChange: function(){
        this.getKeqingData();
      },
      changeRoute: function(name,path){
        // this.$route.name = name
      }
    },
    computed: {
      filtersWeek: function(){
        let week = ['周一','周二','周三','周四','周五','周六','周日']
        let now = new Date().getDay();
        let tips = '&nbsp;&nbsp;(建议联系终端)'
        let html = '高频采购周期：';
        for( let value in this.buyingData.high_frequency){
          html+= '<span>'+ week[this.buyingData.high_frequency[value]] +'</span>'
          if(this.buyingData.high_frequency[value] == now-1){
            html+= tips
          }
          html+= '、'
        }
        html = html.substring(0, html.lastIndexOf('、'))
        return html
      },
      filtersTaxpaycodes: function(){
        let html ='';
        for( let key in this.customerInfo.taxpaycodes){
            if(key < 3){
              if(this.customerInfo.taxpaycodes[key] != ''){
                html+= this.customerInfo.taxpaycodes[key]+', '
              }
            }
        }
        if(html === ''){
          html = '无，请联系终端完善税号。'
        }else {
          html = html.substring(0, html.lastIndexOf(','))
        }
        return html;
      }
    },
    created: function(){
      this.getKeqingData();
      this.getBasicInfo();
      this.getCartInfo()
      this.getOrderCount();
      this.getBuyingPower()
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
      em{
        font-style: normal;
        color: #1e83ff;
      }
    }
    a{
      color: #1e83ff;
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
  .page{
    text-align: right;
  }
  .el-tooltip{
    &:hover{
      color: #1e83ff;
      cursor: help;
    }
  }
  //提示
  .el-tooltip__popper{
    font-size: 14px;
    line-height: 24px;
  }
  .el-popover{
    max-height: 300px;
    overflow-y: auto;
    font-size: 14px;
    line-height: 24px;
  }
</style>