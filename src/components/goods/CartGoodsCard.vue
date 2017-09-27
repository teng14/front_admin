<template>
  <el-table
    :data="goodsData"
    border
    style="width: 100%"
    class="goodsCard">
    <el-table-column
      label="商品信息"
      width="380"
      align="center">
      <template scope="scope">
        <div class="goods-info">
          <div class="img-box">
            <img :src="staticImgDomain+ scope.row.basic.mainPic+'_77x77'" alt="">
          </div>
          <div class="goods-info-bd">
            <p class="title">{{scope.row.basic.generalName}}</p>
            <p class="other">规格： {{scope.row.basic.specification}} / {{scope.row.basic.unit}}</p>
            <p class="other">厂家： {{scope.row.basic.factoryName}}</p>
            <p class="other">供应商： {{scope.row.shop.sellerName}}</p>
            <p><a href="" class="link" target="_blank">查看商品详情 &gt;</a></p>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="当前商品供应商情况" align="center">
      <el-table-column
        label="价格"
        width="200"
        align="center">
        <template scope="scope">
          <div class="price-box">
            <p class="price" v-if="scope.row.basic.price === scope.row.basic.originalPrice">￥{{formatPrice(scope.row.basic.price)}}</p>
            <p class="price" v-else>￥{{formatPrice(scope.row.basic.price)}} <s>￥{{formatPrice(scope.row.basic.originalPrice)}}</s></p>
            <p class="kucun">当前库存：{{scope.row.basic.quantity - scope.row.basic.blockedQuantity < scope.row.basic.minBuyQuantity ? '库存不足' : scope.row.basic.quantity - scope.row.basic.blockedQuantity}}</p>
            <p class="tag-box"><span v-for="(item, index) in scope.row.activities" :key="index" :class="'tag tag-' + item.type">{{item.typeName}}</span> <span class="tag" v-if="scope.row.basic.isControlSales">控销</span></p>
            <p class="tag-box" v-if="scope.row.basic.expiryDate"><span class="tag tag-expiry">近效期</span> <em>将于{{parseTime(scope.row.basic.expiryDate, '{y}-{m}-{d}')}}到期</em></p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="当前购物车数量"
        align="center">
      </el-table-column>
      <el-table-column
        label="服务保障"
        align="center">
        <template scope="scope">
          <p class="service" v-for="(item, index) in scope.row.shop.serviceTags" :key="index"><i :class="'el-icon-my-'+item"></i> {{item == 'shipments_compensate'? ' 100%足量发货' : (item == 'invoice_peer' ? ' 100%货票同行' : (item == 'einvoice' ? ' 提供电子发票' : (item == 'shipments_onday' ? ' 当日发货' : (item == 'damaged_compensate' ? ' 破损赔付' : ''))))}}</p>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column
      label="其他供应商"
      align="center">
      <template scope="scope">
        <a href="" class="link">查看详情</a>
      </template>
    </el-table-column>
    <el-table-column
      label="活动">
      <template scope="scope">
        <p v-for="(item, index) in scope.row.activities" :key="index">
          {{item.typeName}}: <span class="red">￥{{formatPrice(item.price)}}</span> <s>￥{{formatPrice(scope.row.basic.originalPrice)}}</s>
        </p>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { goodsCard } from '@/api/goods'
  import Api from '@/api/apiConfig'
  import { parseTime, formatPrice } from '@/utils/index'
  export default {
    props: ['organizationId', 'areaCode', 'goodsSkus'],
    data(){
      return {
        staticImgDomain: Api['picDomain'],
        goodsData: []
      }
    },
    methods: {
      getCartGoodsInfo: function(){
        let strGoodsSkus = this.goodsSkus
        if(typeof this.goodsSkus == 'object'){
          strGoodsSkus = this.goodsSkus.join(',')
        }
        goodsCard({
          id: 'item',
          organizationId: this.organizationId,
          areaCode: this.areaCode,
          card_skuIds: strGoodsSkus
        }).then( response => {
          this.goodsData = response.data
          console.log(this.goodsData)
        })
      },
      parseTime,
      formatPrice
    },
    created: function(){
      this.getCartGoodsInfo()
    }
  }
</script>

<style lang="scss">
  .goodsCard{
    .el-table__row{

      .cell{
        padding: 15px 10px;
      }
    }
    .link{
      color: #1e83ff;
    }
    p{
      line-height: 18px;
      -webkit-margin-before: 0;
      -webkit-margin-after: 0;
      font-size: 12px;
      color: #475669;
      &.title{
        line-height: 20px;
        color: #324057;
        font-size: 14px;
        font-weight: bold;
      }
      &.price{
        color: #ff3333;
        font-size: 18px;
        s{
          font-size: 14px;
        }
      }
      &.kucun{
        line-height: 22px;
        font-size: 13px;
      }
      s{
        color: #99a9bf;
      }
      .red{
        color: #ff3333;
        font-weight: bold;
      }
    }
    .tag{
      margin-right: 4px;
      padding: 2px 4px;
      background: #f67228;
      color: #fff;
      &.tag-expiry{
        background: #9449bb;
      }
    }
    .tag-box{
      margin-top: 5px;
      em{
        font-style: normal;
        color: #8492a6;
      }
    }
    .price-box{
      text-align: left;
    }
    .service{
      margin-top: 6px;
      line-height: 18px;
      font-size: 14px;
      vertical-align: center;
      i{
        font-size: 18px;
        color: #ff3333;
        // vertical-align: middle;
      }
    }
  }
  
  .goods-info{
    text-align: left;
    .img-box{
      float: left;
      margin-right: 10px;
      width: 79px;
      height: 79px;
      border: 1px solid #e0e7ed;
      text-align: center;
      vertical-align: middle
      img{
        vertical-align: middle;
      }
    }
    .goods-info-bd{
      overflow: hidden;
    }
  }
  
</style>