import { createStore } from 'vuex'

export default createStore({
  state: {
    currCity: '臺北市',
    currDistrict: '北投區',
    location: [],
    stores:[],
    keywords: '',
    showModal: false,
    infoBoxSid: null,
  },
  getters: {
    cityList(state){
      return state.location.map((d) => d.name);
    },
    districtList(state){
      return state.location.find((d) => d.name === state.currCity)?.districts || [];
    },
    filteredStores(state){
      const { stores } = state;
      return state.keywords 
        ? stores.filter((d)=> d.name.includes(state.keywords)) 
        : stores.filter((d)=> d.county === state.currCity && d.town === state.currDistrict);
    },
    currDistrictInfo(state, getters){
      return getters.districtList.find((d)=> d.name === state.currDistrict) || {};
    },

  },
  mutations: {
    setcurrCity(state, payload){
      state.currCity = payload;
    },
    setcurrDistrict(state, payload){
      state.currDistrict = payload;
    },
    setAreaLocation(state, payload){
      state.location = payload;
    },
    setStores(state, payload){
      state.stores = payload;
    },
    setKeywords(state, payload){
      state.keywords = payload;
    },
    setshowModal(state, payload){
      state.showModal = payload;
    },
    setInfoBoxSid(state, payload){
      state.infoBoxSid = payload;
    }
  },
  actions: {
    //取得行政區資料
    async fetchLocations({ commit }){
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
      .then((res) => res.json());
      commit('setAreaLocation', json);
    },
    //取得藥局資料
    async fetchPharmacies({commit}){
      const json = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      .then((res) => res.json());
      
      const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));
      commit('setStores', data);
    }
  },
  modules: {
  }
})
