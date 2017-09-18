<template>
  <div>
    <searchbar class="search-bar"></searchbar>
    <plan></plan>
  </div>
</template>

<script>
  import Searchbar from '@/components/main/Searchbar'
  import Plan from '@/components/index/Plan'
  export default {
    components: {
      Searchbar,
      Plan
    }
  }
</script>

<style lang="scss">
  .search-bar{
    padding: 30px 0;
    text-align: center;
    border: 1px solid #d1dbe5;
    // box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    .search-input{
      width: 500px;
    }
  }
</style>