<template>
  <div v-loading="orderLoading">
    <el-card class="box-card">
      <div class="item">
        <el-row :gutter="20" class="item-order">
          <el-col :span="12"><div>订单号：<span class="red">{{orderData.orderCode}}</span></div></el-col>
          <el-col :span="12"><div>商铺名称：<span class="blue">{{orderData.shopname}}</span></div></el-col>
          <el-col :span="12"><div>下单人：<span>{{orderData.ordersalesman}}</span></div></el-col>
          <el-col :span="12"><div>支付方式：<span class="red">{{orderData.paymethod == 0 ? '无' : (orderData.paymethod == 1 ? '资金支付': '挂账')}}</span></div></el-col>
          <el-col :span="12"><div>操作人：<span>{{orderData.changePriceSalesman == '' ? '-' : orderData.changePriceSalesman}}</span></div></el-col>
          <el-col :span="12"><div>物流方式：<span>自主物流</span></div></el-col>
          <el-col :span="12"><div>支付人：<span class="green">{{orderData.paysalesman}}</span></div></el-col>
          <el-col :span="24"><div>备注：<span>{{orderData.remark == '' ? '无' : orderData.remark}}</span></div></el-col>
          <el-col :span="24"><div>推客备注：<span>{{makerRemarData == null ? '无' : makerRemarData}}</span></div></el-col>
        </el-row>
      </div>
      <div class="steps-box" v-if="orderData.orderstatus != -1">
        <el-steps :active="orderStatus" finish-status="success" :center="true" :align-center="true">
          <el-step title="下单"><div slot="description">{{parseTime(orderData.orderdate)}}</div></el-step>
          <el-step title="付款"><div slot="description"></div></el-step>
          <el-step title="出库"><div slot="description"></div></el-step>
          <el-step title="收货"><div slot="description"></div></el-step>
          <el-step title="交易完成"><div slot="description"></div></el-step>
        </el-steps>
      </div>
      <div class="order-close" v-else>
        <div class="title"><i class="el-icon-warning"></i> 已关闭订单</div>
        <div class="item">
          <p>关闭时间：<span class="red">{{parseTime(orderData.closedate)}}</span></p>
          <p>关闭理由：<span>{{orderData.closereason}}</span></p>
        </div>
      </div>
    </el-card>
    <el-card class="box-card-goods">
      <div slot="header" class="clearfix">
        <span>订单信息</span>
      </div>
      <el-table
        :data="orderData.allproducts"
        style="width: 100%">
        <el-table-column
          label="商品名称">
          <template scope="scope">
            {{scope.row.proname}} <i class="tag" v-for="proms in scope.row.promos" :key="proms.typename" v-if="proms.promotype != 0">{{proms.typename}}</i>
          </template>
        </el-table-column>
        <el-table-column
          prop="factory"
          label="生产厂家">
        </el-table-column>
        <el-table-column
          prop="specification"
          label="规格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="utils"
          label="单位"
          width="120">
        </el-table-column>
        <el-table-column
          label="单价"
          prop="price"
          width="180">
          <template scope="scope">
            <span class="red">￥{{formatPrice(scope.row.payprice)}} </span>&nbsp;&nbsp;<s class="gray" v-html="scope.row.payprice === scope.row.price ? '' : '￥'+formatPrice(scope.row.price)"></s>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          label="小计"
          width="200">
          <template scope="scope">
            ￥{{formatPrice(scope.row.payprice*scope.row.num)}}
          </template>
        </el-table-column>
      </el-table>
      <div class="total clearfix">
        <div class="inner">
          <div>商品总价：¥ {{formatPrice(orderData.goodsprice)}}</div>
          <div v-if="orderData.specialprice !== 0">优惠金额：<span class="green">-¥ {{formatPrice(orderData.specialprice)}}</span></div>
          <div>邮费金额：¥ {{formatPrice(orderData.orderrealpost)}}</div>
          <div class="total-price">
            实际支付：<span class="red">¥ {{formatPrice(orderData.paidinprice)}}</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card-goods" v-if="orderData.outproducts != ''">
      <div slot="header" class="clearfix">
        <span>出库信息</span>
      </div>
      <el-table
        :data="orderData.outproducts"
        style="width: 100%">
        <el-table-column
          label="商品名称">
          <template scope="scope">
            {{scope.row.proname}} <i class="tag" v-for="proms in scope.row.promos" :key="proms.typename" v-if="proms.promotype != 0">{{proms.typename}}</i>
          </template>
        </el-table-column>
        <el-table-column
          prop="factory"
          label="生产厂家">
        </el-table-column>
        <el-table-column
          prop="specification"
          label="规格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="utils"
          label="单位"
          width="120">
        </el-table-column>
        <el-table-column
          label="单价"
          prop="price"
          width="180">
          <template scope="scope">
            <span class="red">￥{{formatPrice(scope.row.payprice)}} </span>&nbsp;&nbsp;<s class="gray" v-html="scope.row.payprice === scope.row.price ? '' : '￥'+formatPrice(scope.row.price)"></s>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          label="小计"
          width="200">
          <template scope="scope">
            ￥{{formatPrice(scope.row.payprice*scope.row.num)}}
          </template>
        </el-table-column>
      </el-table>
      <div v-if="orderData.notoutproducts != ''" style="margin-top: 10px;">
        <div slot="header" class="clearfix">
          <span style="font-size: 14px; color: #FF4949">未出库</span>
        </div>
        <el-table
          :data="orderData.notoutproducts"
          style="width: 100%">
          <el-table-column
            label="商品名称">
            <template scope="scope">
              {{scope.row.proname}} <i class="tag" v-for="proms in scope.row.promos" :key="proms.typename" v-if="proms.promotype != 0">{{proms.typename}}</i>
            </template>
          </el-table-column>
          <el-table-column
            prop="factory"
            label="生产厂家">
          </el-table-column>
          <el-table-column
            prop="specification"
            label="规格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="utils"
            label="单位"
            width="120">
          </el-table-column>
          <el-table-column
            label="单价"
            prop="price"
            width="180">
            <template scope="scope">
              <span class="red">￥{{formatPrice(scope.row.payprice)}} </span>&nbsp;&nbsp;<s class="gray" v-html="scope.row.payprice === scope.row.price ? '' : '￥'+formatPrice(scope.row.price)"></s>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            width="80">
          </el-table-column>
          <el-table-column
            align="center"
            label="小计"
            width="200">
            <template scope="scope">
              ￥{{formatPrice(scope.row.payprice*scope.row.num)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card class="box-card-goods" v-if="orderData.redproducts != ''">
      <div slot="header" class="clearfix">
        <span>冲红信息</span>
      </div>
      <el-table
        :data="orderData.redproducts"
        style="width: 100%">
        <el-table-column
          label="商品名称">
          <template scope="scope">
            {{scope.row.proname}} <i class="tag" v-for="proms in scope.row.promos" :key="proms.typename" v-if="proms.promotype != 0">{{proms.typename}}</i>
          </template>
        </el-table-column>
        <el-table-column
          prop="factory"
          label="生产厂家">
        </el-table-column>
        <el-table-column
          prop="specification"
          label="规格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="utils"
          label="单位"
          width="120">
        </el-table-column>
        <el-table-column
          label="单价"
          prop="price"
          width="180">
          <template scope="scope">
            <span class="red">￥{{formatPrice(scope.row.payprice)}} </span>&nbsp;&nbsp;<s class="gray" v-html="scope.row.payprice === scope.row.price ? '' : '￥'+formatPrice(scope.row.price)"></s>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          label="小计"
          width="200">
          <template scope="scope">
            ￥{{formatPrice(scope.row.payprice*scope.row.num)}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="other-info">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>发票信息</span>
            </div>
            <div class="item">
              <p>发票类型：{{orderData.taxType == 1 ? '增值税专用发票' : '增值税普通发票'}}</p>
              <p>公司名称：{{orderData.taxCompany}}</p>
              <p>纳税人识别号：{{orderData.taxPayCode}}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>收货信息</span>
            </div>
            <div class="item">
              <p>收货人：{{orderData.deliveryman}}</p>
              <p>联系电话：{{orderData.deliverytel}}</p>
              <p>收货地址：{{orderData.deliveryaddress}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>

<script>
  import { getOrderInfo, getOrderDetail, makerRemark } from '@/api/order'
  import { parseTime, formatPrice } from '@/utils/index'
  export default {
    data(){
      return {
        orderCode: this.$route.query.orderCode,
        orderLoading: true,
        areaCode: 0,
        ecommerceId: 0,
        makerRemarData: '',
        orderData: {}
      }
    },
    methods: {
      //获取订单基本信息
      getOrderInfoData: function(){
        getOrderInfo(this.orderCode).then( response => {
          this.areaCode = response.Data.areacode
          this.ecommerceId = response.Data.buyerid
          this.getOrderDetailData()
          this.getMakerRemark()
        },
        error => {

        })
      },
      //获取订单详细信息
      getOrderDetailData: function(){
        getOrderDetail(this.areaCode, this.ecommerceId, this.orderCode).then( response => {
          this.orderData = response.Data[0]
          this.orderLoading = false
        },
        error => {

        })
      },
      getMakerRemark: function(){
        makerRemark(this.orderCode).then( response => {
          this.makerRemarData = response.data.remark
        })
      },
      parseTime,
      formatPrice
    },
    computed: {
      orderStatus: function(){
        let status = this.orderData.orderstatus
        let _status;
        if(status < 2 && status != -1){
          _status = 1
        }else if(status < 5 ){
          _status = 2
        }else if(status == 5){
          _status = 3
        }else if(status == 6){
          _status = 5
        }
        return _status
      }
    },
    created: function(){
      this.getOrderInfoData()
    }
  }
</script>

<style lang="scss">
  .item-order{
    font-size: 14px;
    line-height: 20px;
    .el-col{
      padding-top: 5px;
      padding-bottom: 5px;
      color: #8492a6;
      span{
        color: #324057;
        &.red{
          color: #FF4949;
        }
        &.blue{
          color: #1D8CE0;
        }
        &.green{
          color: #13CE66;
        }
      }
    }
  }
  .steps-box{
    padding: 30px 70px 15px;
    margin-top: 20px;
    background-color: #fff;
    text-align: center;
    .el-step{
      .el-step__main{
        margin-top: -60px;
      }
      .el-step__description{
        margin-top:40px;
        font-weight: bold;
        font-size: 14px;
        div{
          margin-left: -40px;
        }
      }
    }
  }
  .order-close{
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #D3DCE6;
    font-size: 14px;
    .title{
      font-size: 16px;
      color: #FF4949;
    }
    .item{
      color: #8492a6;
      span{
        color: #324057;
        &.red{
          color: #FF4949;
        }
        &.blue{
          color: #1D8CE0;
        }
        &.green{
          color: #13CE66;
        }
      }
    }
  }
  .box-card-goods{
    margin-top: 20px;
    .red{
      color: #FF4949;
    }
    .gray{
      color: #8492a6;
    }
    .tag{
      margin-right: 4px;
      padding: 2px 4px;
      font-size: 12px;
      font-style: normal;
      background-color: #13CE66;
      border-radius: 3px;
      color: #fff;
    }
  }
  .total{
    text-align: right;
    font-size: 14px;
    padding: 10px;
    line-height: 24px;
    .inner{
      float: right;
    }
    .total-price{
      margin-top: 5px;
      padding-top: 5px;
      border-top: 1px solid #8492a6;
      font-size: 16px;
      font-weight: bold;
    }
    span{
      &.green{
        color: #13CE66;
      }
    }
  }
  .other-info{
    margin-top: 20px;
    font-size: 14px;
  }
</style>