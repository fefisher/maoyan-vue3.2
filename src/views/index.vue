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
import store from '@/store';

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
      movieList: { list, nationBoxInfo }
    } = resData;
    list.forEach((item, index) => (item.sortId = index < 9 ? '0' + (+index + 1) : +index + 1));

    movieList.value = list;
    rightView.nationBoxInfos.value = nationBoxInfo;
    if (firstEnter.value) {
      const movieId_0 = list[0].movieInfo.movieId;
      const localMovieId = sessionStorage.getItem('__movieId__');
      const starId = localMovieId ? localMovieId : movieId_0;
      store.commit('SET_STARID', starId);

      list.forEach(item => (item.checked = item.movieInfo.movieId === +starId));
      const currentItem = list.find(v => v.checked);
      changeMovie(currentItem);
    } else {
      sortList(movieList.value, store.state.movieId);
    }

    firstEnter.value = false;
  });
};
//点击列表
const changeMovie = async item => {
  const movieId = item.movieInfo.movieId;
  store.commit('SET_STARID', movieId);
  rightView.currentItem.value = item;
  sortList(movieList.value, movieId);
  let params = new URLSearchParams();
  params.append('movieId', movieId);
  params.append('orderType', 0);
  params.append('uuid', uuid);
  params.append('timestamp', new Date().getTime());
  const data = await API.getMovieDetail(params);
  if (!data) return;
  const { movieInfo } = data.data;
  rightView.movieInfos.value = movieInfo;

  !firstEnter.value && (showPanel.value = true);
  //滚动到列表顶部
  document.querySelector('#movieList').scrollIntoView();
};

const sortList = (list, movieId) => {
  const starItem = list.find(v => v.movieInfo.movieId === movieId);
  const starIndex = list.findIndex(v => v.movieInfo.movieId === movieId);
  list.splice(starIndex, 1);
  const newList = list.sort((a, b) => {
    return Number(a.sortId) - Number(b.sortId);
  });
  newList.unshift(starItem);
  newList.forEach(item => (item.checked = item.movieInfo.movieId === movieId));
  movieList.value = list;
};

let timeer = null;
onMounted(() => {
  getPageData();
  timeer = setInterval(() => {
    getPageData();
  }, 10 * 1000);
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
