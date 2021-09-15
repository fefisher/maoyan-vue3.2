<template>
  <div class="left-panel panel-list">
    <div class="dashboard-table-header">
      <div class="header">电影票房</div>
      <div class="table-nav">
        <span v-for="item in navs" :key="item.id" :class="[item.active ? 'active' : '']" @click="activeNav(item.id)">
          {{ item.name }}
        </span>
      </div>
    </div>
    <table class="dashboard-table table-header" id="tableHeader">
      <thead>
        <tr>
          <th class="moviename-th">
            <div>影片</div>
          </th>
          <th>
            <div class="theader box-title">综合票房</div>
          </th>
          <th>
            <div class="theader">票房占比</div>
          </th>
          <th>
            <div class="theader">排片场次</div>
          </th>
          <th>
            <div class="theader">排片占比</div>
          </th>
          <th>
            <div class="theader">场均人次</div>
          </th>
          <th>
            <div class="theader last-col">上座率</div>
          </th>
        </tr>
      </thead>
    </table>
    <div class="movielist-container">
      <div class="movielist" id="movieList">
        <table class="dashboard-table">
          <tbody>
            <tr v-for="item in movieList.value" :key="item.movieInfo.movieId" @click="showCurrentDetail(item)">
              <td class="moviename-td">
                <div class="movie-desc">
                  <div class="moviename-num">
                    <p class="moviename-index">{{ item.sortId }}</p>
                    <p class="moviename-star">
                      <span class="sprite" :class="[item.checked ? 'star' : 'star-gray']"> </span>
                    </p>
                  </div>
                  <div class="moviename-desc">
                    <p class="moviename-name">
                      {{ item.movieInfo.movieName }}
                    </p>
                    <p class="moviename-info">
                      <span>{{ item.movieInfo.releaseInfo }}</span
                      >&nbsp;&nbsp;
                      <span>{{ item.sumBoxDesc }}</span>
                    </p>
                  </div>
                </div>
              </td>
              <td class="realtime mtsi-num">
                <span v-html="item.boxSplitUnit.num + item.boxSplitUnit.unit"></span>
              </td>
              <td>{{ item.boxRate }}</td>
              <td>{{ item.showCount }}</td>
              <td>{{ item.showCountRate }}</td>
              <td>{{ item.avgShowView }}</td>
              <td class="last-col">{{ item.avgSeatView }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  list: {
    type: Array
  }
});

const movieList = props.list;
let navs = reactive([
  { id: 'd', name: '电影票房', active: true },
  { id: 'f', name: '分账票房', active: false }
]);
const activeNav = id => {
  navs.forEach(item => {
    item.active = item.id === id;
  });
};
const emits = defineEmits(['changeMovie']);
const showCurrentDetail = item => {
  emits('changeMovie', item);
};
</script>

<style lang="scss" scoped>
.left-panel {
  flex: 1;
  background: #454454;
  border-radius: 0.07rem;

  .table-nav {
    height: 0.4rem;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.17rem;
    padding: 0 0.02rem;
    background: #101015;
    line-height: 0.4rem;
    border-radius: 0.27rem;
    margin-left: 0.13rem;
    text-align: center;

    span {
      cursor: pointer;
      display: inline-block;
      width: 0.9rem;
      height: 0.34rem;
      line-height: 0.34rem;
      border-radius: 0.23rem;
    }

    .active {
      color: #fff;
      background: #4c4b57;
    }
  }

  .dashboard-table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;

    thead {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .moviename-star {
      line-height: 1;
      .sprite {
        width: 0.24rem;
        height: 0.24rem;
        display: inline-block;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-size: 0.24rem 0.24rem;
      }
      .star-gray {
        background-image: url('../assets/star-gray.png');
      }
      .star {
        background-image: url('../assets/star.png');
      }
    }
    .moviename-th {
      text-align: left;
      width: 4rem;
      box-sizing: border-box;
      padding-left: 25px;
    }

    .realtime {
      text-align: center;
    }

    tbody tr {
      cursor: pointer;
      background-color: rgba(55, 54, 67, 0.6);
      height: 1.3rem;

      &:nth-child(odd) {
        background-color: rgba(69, 68, 84, 0.4);
      }
    }

    th {
      color: rgba(255, 255, 255, 0.6);
      font-weight: normal;
      font-size: 0.2rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: right;
    }

    td {
      font-size: 0.26rem;
      text-align: right;
      height: 1.3rem;
      line-height: 1.3rem;
      font-weight: normal;
    }

    .theader {
      line-height: 1.2;

      tr {
        height: 0.6rem;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .moviename-td {
      overflow: hidden;
      line-height: 1.4;
      text-align: left;
      width: 4rem;
      box-sizing: border-box;
      padding-left: 25px;

      .movie-desc {
        display: flex;
        align-items: center;

        .moviename-num {
          font-size: 0.26rem;
          width: 0.32rem;

          .moviename-index {
            opacity: 0.7;
            font-size: 0.23rem;
          }
        }

        .moviename-desc {
          margin-left: 0.2rem;
          flex: 1;
          overflow: auto;

          .moviename-name {
            font-size: 0.29rem;
          }

          .moviename-info {
            opacity: 0.7;
            font-size: 0.18rem;
            font-weight: normal;
          }
        }
      }
    }
  }

  .realtime {
    text-align: center;
    color: #ff9400;
  }

  .last-col {
    padding-right: 0.28rem;
  }

  .box-title {
    text-align: center;
    width: 1.6rem;
  }
}

.table-header {
  tr {
    height: 0.6rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.movielist-container {
  flex: 1;
  min-height: 0;
  overflow: auto;

  .movielist {
    display: flex;
    flex-direction: column;
  }
}

.panel-list {
  display: flex;
  flex-direction: column;
}
</style>
