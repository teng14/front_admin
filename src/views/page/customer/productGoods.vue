<template>
  <div class="list">
    <div class="list-title">商品列表（{{skus.length}}）</div>
    <div class="card-goods-list" v-loading="loading">
      <transition name="el-zoom-in-top" v-if="!loading">
        <CartGoodsCard ref="showDialog" :goodsSkus = "skus" :organizationId= "organizationId" :areaCode="areaCode" :noShow="noShow" sort="true"></CartGoodsCard>
      </transition>
    </div>
  </div>
</template>

<script>
  import { skuGetProduct } from '@/api/product'
  import CartGoodsCard from '@/components/goods/CartGoodsCard'
  export default {
    data(){
      return {
        organizationId: this.$route.query.organizationId,
        noShow: true,
        productId: this.$route.query.productId,
        areaCode: this.$route.query.areaCode,
        loading: true,
        skus : [],
        filterSku: this.$route.query.skuId
      }
    },
    components:{
      CartGoodsCard
    },
    methods: {
      getGoodsSku: function(){
        skuGetProduct({
          areaCode: this.areaCode,
          productId: this.productId
        }).then( response => {
          var data = response.ENTITY
          var skus = []
          for( let i = 0; i < data.length; i++){
            if(this.filterSku !== data[i].skuId){
              skus.push(data[i].skuId)
              //过滤SKUID
            }
          }
          this.skus = skus
          this.loading =  false
        },
        error => {
          this.loading =  false
        })
      }
    },
    created: function(){
      this.getGoodsSku();
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