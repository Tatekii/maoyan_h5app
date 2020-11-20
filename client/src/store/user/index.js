const state = {
  user: "" || window.localStorage.getItem('user'),
  isAdmin: false || window.localStorage.getItem('isAdmin'),
  avatar:''
};

const actions = {};

const mutations = {
  CUR_USER(state, payload) {
    state.user = payload.user,
    state.isAdmin = payload.isAdmin
    state.avatar = payload.avatar
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
