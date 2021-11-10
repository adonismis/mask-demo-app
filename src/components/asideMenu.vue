<template>
  <!-- aside-menu 左側欄 -->
  <div class="aside-menu">
    <div class="wraps">
      <label>
        縣市：
        <select v-model="currCity">
          <option v-for="c in cityList" :key="c">{{ c }}</option>
        </select>
      </label>
      <label>
        行政區：
        <select v-model="currDistrict">
          <option>北投區</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input type="text" placeholder="請輸入關鍵字">
      </label>
    </div>

    <ul class="store-lists">
      <li class="store-info wraps">
        <h1>ＸＸ藥局</h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: 100 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: 100 個</span>
        </div>

        <div class="mask-info">
          最後更新時間:
        </div>

        <button class="btn-store-detail">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
      <li class="store-info wraps">
        <h1>ＸＸ藥局</h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: 100 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: 100 個</span>
        </div>

        <div class="mask-info">
          最後更新時間:
        </div>

        <button class="btn-store-detail">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
      <li class="store-info wraps">
        <h1>ＸＸ藥局</h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: 100 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: 100 個</span>
        </div>

        <div class="mask-info">
          最後更新時間:
        </div>

        <button class="btn-store-detail">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'asideMenu',
  computed: {
    currCity:{
      get(){
        return this.$store.state.currCity;
      },
      set(){
        this.$store.commit('setcurrCity', value);
      }
    },
    currDistrict:{
      get(){
        return this.$store.state.currDistrict;
      },
      set(){
        this.$store.commit('setcurrDistrict', value);
      }
    },
    ...mapGetters(['cityList', 'districtList'])
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
