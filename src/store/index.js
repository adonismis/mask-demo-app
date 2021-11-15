import { createStore } from 'vuex'
import axios from 'axios'
import jsSHA from "jssha"

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


      let cityurl = 'https://link.motc.gov.tw/v2/Basic/City?$format=JSON';
      // `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city}/${routeName}`;
      axios({
        method: 'get',
        url: cityurl,
        headers: GetAuthorizationHeader()
      })
      .then(response => {
          const result = response.data;
          const data = result //放入data中

          console.log(data)
      })
      .catch( error => {
          console.log(error);
      })
      .finally(()=>{
          console.log('完成')
      })



      // const cityurl = 'https://link.motc.gov.tw/v2/Basic/City?$format=JSON';
      // const cityjson = await fetch(cityurl)
      //   .then((res) => res.json());
        
      //   console.log(cityjson);

      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
      .then((res) => res.json());
      //console.log(json);
      const cityData = [
        { name: '臺北市', value: 'Taipei' },
        { name: '新北市', value: 'NewTaipei' },
        { name: '桃園市', value: 'Taoyuan' },
        { name: '臺中市', value: 'Taichung' },
        { name: '臺南市', value: 'Tainan' },
        { name: '高雄市', value: 'Kaohsiung' },
        { name: '基隆市', value: 'Keelung' },
        { name: '新竹市', value: 'Hsinchu' },
        { name: '新竹縣', value: 'HsinchuCounty' },
        { name: '苗栗縣', value: 'MiaoliCounty' },
        { name: '彰化縣', value: 'ChanghuaCounty' },
        { name: '南投縣', value: 'NantouCounty' },
        { name: '雲林縣', value: 'YunlinCounty' },
        { name: '嘉義縣', value: 'ChiayiCounty' },
        { name: '嘉義市', value: 'Chiayi' },
        { name: '屏東縣', value: 'PingtungCounty' },
        { name: '宜蘭縣', value: 'YilanCounty' },
        { name: '花蓮縣', value: 'HualienCounty' },
        { name: '臺東縣', value: 'TaitungCounty' },
        { name: '金門縣', value: 'KinmenCounty' },
        { name: '澎湖縣', value: 'PenghuCounty' },
        { name: '連江縣', value: 'LienchiangCounty' },
      ]


      
      commit('setAreaLocation', cityData);
    },
    //取得藥局資料
    async fetchPharmacies({commit}){

      let url1 = "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON";
      let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON";
      const datatest = await fetch(url)
      .then((res) => res.json());

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


 // API 驗證用
 function GetAuthorizationHeader() {
  var AppID = '6c12d83e847a4d7084fb6c5a1911528d';
  var AppKey = 'Y9LQlj1fHBrc02ql5a2s5G2tZFw';

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}