<template>
  <div class="maoyan-container">
    <MaoyanHeader></MaoyanHeader>
    <div class="dashboard-content">
      <LeftPanel :list="movieList" @changeMovie="changeMovie"></LeftPanel>
      <RightPanel v-if="showPanel" v-bind="rightView"></RightPanel>
    </div>
  </div>
</template>

<script setup>
import MaoyanHeader from '@/components/MaoyanHeader';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import API from '@/api/data.js';
import { onMounted, onUnmounted, reactive, ref, nextTick } from 'vue';
import { uuid } from '@/settings';

let movieList = reactive([]);
let rightView = reactive({ movieInfos: {}, nationBoxInfos: {}, currentItem: {} });
let showPanel = ref(false);
let firstEnter = ref(true);

//获取movie列表
const getPageData = () => {
  let params = new URLSearchParams();
  params.append('orderType', 0);
  params.append('uuid', uuid);
  params.append('timestamp', new Date().getTime());

  API.getMovieData(params).then(resData => {
    if (!resData || resData === '\n') return;
    let {
      movieList: { list, nationBoxInfo },
      movieInfo
    } = resData;
    showPanel.value = true;
    list.forEach((item, index) => {
      item.checked = index === 0;
    });
    movieList.value = list;
    rightView.nationBoxInfos.value = nationBoxInfo;
    if (firstEnter.value) {
      rightView.movieInfos.value = movieInfo.movieInfo;
      rightView.currentItem.value = list[0];
    }
    firstEnter.value = false;
  });
};
//点击列表
const changeMovie = item => {
  rightView.currentItem.value = movieList.value.find(v => v.movieInfo.movieId === item.movieInfo.movieId);

  let params = new URLSearchParams();
  params.append('movieId', item.movieInfo.movieId);
  params.append('orderType', 0);
  params.append('uuid', uuid);
  params.append('timestamp', new Date().getTime());
  API.getMovieDetail(params).then(resData => {
    if (!resData) return;
    const { movieInfo } = resData.data;
    rightView.movieInfos.value = movieInfo;
    nextTick();
  });
};
let timeer = null;
onMounted(() => {
  getPageData();
  timeer = setInterval(() => {
    getPageData();
  }, 5 * 1000);
});
onUnmounted(() => {
  clearInterval(timeer);
  timeer = null;
});
</script>
<style lang="scss">
.maoyan-container {
  height: 100vh;
  overflow: hidden;
  background-color: #000;

  .dashboard-content {
    height: calc(100% - 1.1rem);
    margin: 18px 25px;
    display: flex;
    flex: auto;

    .dashboard-table-header {
      font-size: 0.33rem;
      color: #fff;
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.1);
      padding: 20px 25px;
    }

    .dashboard-table {
      table-layout: fixed;
      border-collapse: collapse;
      width: 100%;
    }
  }
}
</style>
