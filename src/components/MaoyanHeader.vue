<template>
  <div class="my-header">
    <div class="left-logo">
      <span class="span-logo"></span>
      <span class="current-date">{{ dateYMD }}</span>
      <span class="clock">
        <span>北京时间 {{ dateHMS }}</span>
      </span>
    </div>
    <div class="center-nav">
      <span v-for="item in navTypes" :key="item.type" @click="changeNav(item)" :class="[item.active ? 'active' : '']">
        {{ item.name }}
      </span>
    </div>
    <div class="right-actions">
      <div id="fullScreen" @click="toggleFullScreen">{{ screenText }}</div>
    </div>
  </div>
</template>

<script setup>
import screenfull from 'screenfull';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';

const navTypes = reactive([
  { type: 1, name: '综合票房', active: false },
  { type: 2, name: '电影票房', active: true },
  { type: 3, name: '网播热度', active: false },
  { type: 4, name: '电视收视', active: false }
]);
let isFullScreen = ref(false);
const fmtTime = t => {
  return t < 10 ? '0' + t : t;
};
let dateYMD = ref('');
let dateHMS = ref('');
const setTime = () => {
  const NOW = new Date();
  const year = NOW.getFullYear();
  const month = fmtTime(NOW.getMonth() + 1);
  const d = fmtTime(NOW.getDate());
  const hour = fmtTime(NOW.getHours());
  const minute = fmtTime(NOW.getMinutes());
  const second = fmtTime(NOW.getSeconds());
  dateYMD.value = year + '-' + month + '-' + d;
  dateHMS.value = hour + ':' + minute + ':' + second;
};

let hmsInterval = setInterval(() => {
  setTime();
}, 1000);

onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(hmsInterval);
  hmsInterval = null;
});

const init = () => {
  screenfull.enabled && screenfull.on('change', changeScreen);
};
const changeScreen = () => {
  isFullScreen.value = screenfull.isFullscreen;
};
const toggleFullScreen = () => {
  screenfull.toggle();
  setTimeout(() => {
    isFullScreen.value = !isFullScreen.value;
  }, 200);
};
const screenText = computed(() => (isFullScreen.value ? '取消全屏' : '全屏'));
const changeNav = item => {
  navTypes.forEach(nav => {
    nav.active = nav.type === item.type;
  });
};
</script>

<style lang="scss" scoped>
.my-header {
  height: 0.69rem;
  line-height: 0.69rem;
  background: rgba(69, 68, 84, 0.7);
  position: relative;
  display: flex;
  align-items: center;

  .left-logo {
    font-size: 0.19rem;
    margin-left: 0.2rem;
    color: rgba(255, 255, 255, 0.6);

    .span-logo {
      display: inline-block;
      vertical-align: top;
      margin-top: 0.13rem;
      width: 1.75rem;
      height: 0.39rem;
      background: url('../assets/home-logo.png') no-repeat;
      background-size: 100%;
      margin-right: 0.18rem;
    }

    .current-date {
      color: #fff;
      font-size: 0.185rem;
      margin-right: 0.1rem;
    }

    .clock {
      min-width: 1.7rem;
      display: inline-block;
    }
  }

  .center-nav {
    cursor: pointer;
    font-size: 0.2rem;
    background-color: #000;
    border-radius: 1rem;
    display: inline-block;
    height: 0.53rem;
    line-height: 0.53rem;
    padding: 0 0.05rem;
    vertical-align: middle;
    text-align: center;
    margin-left: 1rem;

    span {
      display: inline-block;
      border-radius: 0.24rem;
      height: 0.46rem;
      width: 1.3rem;
      line-height: 0.46rem;
    }

    span.active {
      background-color: #4c4b57;
    }
  }

  .right-actions {
    position: absolute;
    top: 0;
    right: 0.16rem;
    font-size: 0.2rem;

    #fullScreen {
      border: 0.01rem solid rgba(255, 255, 255, 0.2);
      border-radius: 0.2rem;
      height: 0.4rem;
      line-height: 0.4rem;
      padding: 0 0.23rem;
      margin-top: 0.15rem;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);
      margin-right: 0.12rem;
    }
  }
}
</style>
