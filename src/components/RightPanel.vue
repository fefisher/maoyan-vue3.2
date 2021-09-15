<template>
  <div class="right-panel">
    <div class="today-dashboard bg">
      <div class="today-dashboard-title">{{ nationBoxInfos.value.title }}</div>
      <div class="nation-box">
        <span class="mtsi-num" v-html="nationBoxInfos.value.nationBoxSplitUnit.num"></span>
        <span class="unit">{{ nationBoxInfos.value.nationBoxSplitUnit.unit }}</span>
      </div>
      <div class="today-dashboard-view">
        <p>总出票:{{ nationBoxInfos.value.viewCountDesc }}张</p>
        <p>总场次:{{ nationBoxInfos.value.showCountDesc }}张</p>
      </div>
    </div>
    <div class="movie-detail bg">
      <div class="movie-detail-desc">
        <div class="poster-img">
          <img :src="postImgUrl" alt="" />
        </div>
        <div class="movie-detail-title">
          <p class="movie-title">
            {{ movieInfos.value.name }}
            <span class="sprite sprite-star"></span>
          </p>
          <p class="movie-box-data">{{ movieInfos.value.category }}</p>
          <p class="movie-box-data">{{ movieInfos.value.releaseInfo }}&nbsp;&nbsp;{{ checkedItem.value.sumBoxDesc }}</p>
        </div>
      </div>
      <div class="movie-data-bar">
        <div class="movie-box">
          <div class="movie-box-detail movie-box-total">
            <div class="movie-box-block">
              <p class="box-title">今日综合票房</p>
              <p class="sum-box-desc">
                <span class="sum-box-num mtsi-num" v-html="checkedItem.value.boxSplitUnit.num"></span>
                <span class="sum-box-unit">{{ checkedItem.value.boxSplitUnit.unit }}</span>
              </p>
            </div>
            <div class="movie-box-block">
              <p class="box-title">票房占比</p>
              <p class="sum-box-desc">{{ checkedItem.value.boxRate }}</p>
            </div>
          </div>
          <div class="movie-box-detail movie-box-view">
            <div class="movie-box-block">
              <p class="box-title">今日排片场次</p>
              <p class="sum-box-num">{{ checkedItem.value.showCount }}</p>
              <p class="box-extr">排片占比 {{ checkedItem.value.showCountRate }}</p>
            </div>
            <div class="movie-box-block">
              <p class="box-title">今日上座率</p>
              <p class="sum-box-num">{{ checkedItem.value.avgSeatView }}</p>
              <p class="box-extr">场均人次 {{ checkedItem.value.avgShowView }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineProps } from '@vue/runtime-core';

const props = defineProps({
  movieInfos: {
    type: Object,
    default() {
      return {};
    }
  },
  nationBoxInfos: {
    type: Object,
    default() {
      return {};
    }
  },
  currentItem: {
    type: Object,
    default() {
      return {};
    }
  }
});
const movieInfos = props.movieInfos;
const nationBoxInfos = props.nationBoxInfos;
const checkedItem = props.currentItem;
const postImgUrl = computed(() => (movieInfos ? movieInfos.value.imgUrl.replace('w.h/', '') + '@165w_220h' : ''));
</script>
<style lang="scss" scoped>
.right-panel {
  width: 4.8rem;
  margin-left: 0.25rem;
  overflow: auto;
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .bg {
    background: #454454;
    border-radius: 0.07rem;
  }
  .h-50 {
    height: 50%;
    overflow: auto;
  }
  .tv {
    margin-top: 0.24rem;
  }
  .today-dashboard {
    text-align: center;
    padding: 0.3rem;
    line-height: 1.4;
    .today-dashboard-title {
      font-size: 0.36rem;
    }
    .nation-box {
      font-size: 0.6rem;
      color: #ff9400;
      margin-top: 0.12rem;
      margin-bottom: 0.14rem;
      .mtsi-num {
        font-family: 'mtsi-font';
      }
      .unit {
        font-size: 0.26rem;
      }
    }
    .today-dashboard-view {
      opacity: 0.8;
      font-size: 0.2rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .movie-detail {
    flex: auto;
    padding: 0.24rem;
    margin-top: 0.24rem;
    line-height: 1.4;

    .movie-detail-desc {
      display: flex;
      align-items: center;
      .poster-img {
        width: 1rem;
        max-height: 1.36rem;
        overflow: hidden;
        border: 0 solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
        border-radius: 2px;
        margin-right: 0.18rem;
      }
      .movie-detail-title {
        flex: 1;
        overflow: hidden;

        .movie-box-data {
          font-size: 0.19rem;
          margin-top: 0.1rem;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    .movie-data-bar {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .movie-box {
        margin: 0.3rem 0 0.26rem;
      }
    }
    .movie-box-detail {
      display: flex;
      text-align: center;
      .movie-box-block {
        flex: 1;
      }
      .box-title {
        font-size: 0.2rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: normal;
      }
      .sum-box-desc {
        font-size: 0.38rem;
        color: #ff9400;
      }
      .box-extr {
        font-size: 0.18rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }
    .movie-box-total {
      margin-bottom: 0.24rem;
    }
  }
}
</style>
