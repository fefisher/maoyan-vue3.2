import { GET } from '@/utils/request';

export default {
    //综合票房
    getDashboard: params => GET('dashboard-ajax', params),
    //电影列表数据
    getMovieData: params => GET('dashboard-ajax/movie', params),
    //电影详情
    getMovieDetail: params => GET('dashboard/ajax-moviedetail', params),
}