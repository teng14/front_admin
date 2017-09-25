<template>
  <el-table
    :data="goodsData"
    border
    style="width: 100%">
    <el-table-column
      label="供应商"
      width="180">
      <template scope="scope">
        <div class="goods-info">
          <div class="img-box">
            <img src="" alt="">
          </div>
          <div class="goods-info-bd">
            <p class="title">{{scope.row.basic.generalName}}</p>
            <p class="other">库存：{{scope.row.basic.quantity - scope.row.basic.blockedQuantity < scope.row.basic.minBuyQuantity ? '库存不足' : scope.row.basic.quantity - scope.row.basic.blockedQuantity}}</p>
            <p class="other">规格： {{scope.row.basic.specification}} / {{scope.row.basic.unit}}</p>
            <p><a href="" target="_blank">查看品种详情</a></p>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="价格"
      width="180">
      <template scope="scope">
        <div class="price-box">
          <p class="price">￥{{scope.row.basic.price}} {{scope.row.basic.price == scope.row.basic.retainPrice ? '' : '￥<s>' + scope.row.basic.retainPrice + '</s>'}}</p>
          <p class="tag"><span v-for="item in scope.row.activities" :key="item" :class="'tag-' + item.type">{{item.typeName}}</span></p>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="purchaseTips.cartCount"
      label="当前购物车数量">
    </el-table-column>
    <el-table-column
      label="可用优惠券">
    </el-table-column>
    <el-table-column
      label="可领优惠券">
    </el-table-column>
    <el-table-column
      label="服务保障">
    </el-table-column>
  </el-table>
</template>

<script>
  import { goodsInfo } from '@/api/customer'
  export default {
    props: ['organizationId', 'areaCode', 'goodsSkus'],
    data(){
      return {
        goodsData: []
      }
    },
    methods: {
      getCartGoodsInfo: function(){
        goodsInfo({
          id: 'item',
          organizationId: this.organizationId,
          areaCode: this.areaCode,
          card_skuIds: this.goodsSkus,

        }).then( response => {
          this.goodsData = response.data
        })
      }
    },
    created: function(){
      this.getCartGoodsInfo()
    }
  }
</script>

<style scoped>

</style>