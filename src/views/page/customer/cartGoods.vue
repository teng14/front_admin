<template>
  <div class="list">
    <div class="list-title">商品列表（{{cartGoodsAllSku.length}}）</div>
    <div class="card-goods-list" v-loading="loading">
      <transition name="el-zoom-in-top" v-if="cartGoodsAllSku.length > 0">
        <CartGoodsCard ref="showDialog" :goodsSkus = "goodsType == 'all'? cartGoodsAllSku : cartGoodsYouhuiSku" :organizationId= "organizationId" :areaCode="areaCode"></CartGoodsCard>
      </transition>
    </div>
  </div>
</template>

<script>
  import { cartInfo } from '@/api/customer'
  import CartGoodsCard from '@/components/goods/CartGoodsCard'
  export default {
    data(){
      return {
        ecommerceId: this.$route.query.ecommerceId,
        organizationId: this.$route.query.organizationId,
        areaCode: this.$route.query.areaCode,
        loading: true,
        goodsType: this.$route.query.type,
        cartGoodsAllSku : [],
        cartGoodsYouhuiSku : []
      }
    },
    components:{
      CartGoodsCard
    },
    methods: {
      getCartGoodsSku: function(){
        cartInfo(this.ecommerceId).then( response => {
          this.cartGoodsAllSku = response.data.allSkuList
          this.cartGoodsYouhuiSku = response.data.preferentialSkuList;
          this.loading =  false
        },
        error => {
          this.loading =  false
        })
      }
    },
    created: function(){
      this.getCartGoodsSku();
    }
  }
</script>

<style lang="scss" scoped>
  .list{
    margin-top: 30px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.12);
    .list-title{
      padding-bottom: 20px;
    }
    .router-link-active{
      color: #20a0ff;
    }
    .link{
      color: #475669;
      &:hover{
        color: #20a0ff;
      }
    }
  }
</style>