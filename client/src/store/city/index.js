const state = {
  nm: window.localStorage.getItem("currentCity") || "北京",
  id: window.localStorage.getItem("currentCityId") || 1
};

const actions = {};

const mutations = {
  CITY_INDEX(state, payload) {
    state.nm = payload.nm;
    state.id = payload.id;
    // 写错的地方+1
    // 天才+1
    // state.id = state.id;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
