import { createStore } from 'vuex'

export default createStore({
  state: {
    movieId: ''
  },
  mutations: {
    SET_STARID(state, id) {
      state.movieId = id;
      sessionStorage.setItem('__movieId__', id);
    }
  },
  actions: {
  },
  modules: {
  },
})
