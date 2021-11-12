<template>
  <div class="mask-map" id="mask-map"></div>
</template>

<script>
import L from 'leaflet';
export default {
  name: 'maskMap',
  data(){
    return {
      map: {},
      markers: [],
    }
  },
  mounted(){
    this.map = L.map('mask-map', {
      center: [25.03, 121.55],
      zoom: 14,
    });
    L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.map);
  },
  methods:{
    addMarker(item){
      const ICON = {
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      };

      const marker = L.marker([item.longitude, item.latitude], ICON)
        .addTo(this.map)
        .bindPopup(`<h2 class="popup-name">${item.name}</h2>`);

      // 替marker加入id與經緯度資訊
      marker.markerId = item.id;
      marker.lng = item.longitude;
      marker.lat = item.latitude;

      //將marker push 到陣列
      this.markers.push(marker);


    },
    clearMarkers(){
      this.map.eachLayer((layer)=>{
        if(layer instanceof L.Marker){
          this.map.removeLayer(layer);
        }
      });
      this.markers.length = 0;
    },
    triggerPopup(markerId){

        //找目標標記
        const marker = this.markers.find((d)=>d.markerId===markerId)

       

        //將地圖中心指向目標標記，並開啟pop
        this.map.flyTo(new L.LatLng(marker.lng,marker.lat),15)
        marker.openPopup()
    }
  },
  computed:{
    currDistrictInfo(){
      return this.$store.getters.currDistrictInfo;
    },
    filteredStores(){
      return this.$store.getters.filteredStores;
    },
  },
  watch:{
    currDistrictInfo(dist){
      this.map.panTo(new L.latLng(dist.latitude, dist.longitude));
    },
    filteredStores(stores){
      this.clearMarkers();
      //根據藥局資訊加上對應marker
      stores.forEach((element)=> this.addMarker(element));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
