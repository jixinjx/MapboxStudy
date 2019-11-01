<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="mapboxC"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import geojson from"../../../../static/json/fengwo.json";
// import { layerConfig } from "./js/confignew.js";
// import layer from "views/components/rightLayerControlsNew";
/* eslint-disable */
export default {
  name: "map1",
  // components: {
  //   layer
  // },
  data() {
    return {
      data:{},
      map: null,
      activeLayerList: [],
      mapInitOption: {
        center: [120.740349690458, 31.2549510559793], //POINT (118.95703098200011 33.013849272000073)
        pitch: 50,
        bearing: 0,
        zoom: 12.5
      },
      isShowLayerControls: true,
      
    };
  },
  mounted() {
     this.data=geojson;
    console.log(this.data,"ddd");
    this.data=geojson;
//     var change=this.data.features;
//     change.forEach(function(item){
//     delete item.properties;
//  });
//     this.data.features=change;
    console.log(this.data,"222");
    this.markers = [];
    this.initMap();
    const _this = this;
   
  },
  methods: {

    
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiaml4aW5qeCIsImEiOiJjazJiaTk4bjQ0amw3M2ltdHNlNDY0cGRhIn0.HoLIuAtwOgzJj5ax3NG4hQ";
      this.map = new mapboxgl.Map({
        container: "mapboxC", // container id
        style: "mapbox://styles/jixinjx/ck2bid49n0syx1co1z3amr094", //"mapbox://styles/wangsen123/ck273vrot0lak1cqt2sbp5mrf", //layerConfig.map,
        center: this.mapInitOption.center,
        minZoom: 10,
        maxZoom: 15.5,
        zoom: this.mapInitOption.zoom,
        pitch: this.mapInitOption.pitch, // pitch in degrees
        bearing: this.mapInitOption.bearing
      });

      const _this = this;
      this.map.on('load',function(){
        _this.map.addSource('heatsrc',{
          "type": "geojson",
         "data": geojson,
         
        });
        var featuresdata=_this.data.features;
      //for循环给对象写入color属性，通过cnt赋予不同的color属性，由于cnt属性值太小，所以乘以一个系数
        for(var i=0;i<featuresdata.length;i++){
          if(Number(featuresdata[i].properties.cnt)<2)
          {_this.$set(featuresdata[i].properties,'color','#0000FF');}
          else if(Number(featuresdata[i].properties.cnt)<10)
          {_this.$set(featuresdata[i].properties,'color','#FFFF00');}
          else {_this.$set(featuresdata[i].properties,'color','#FF0000');}
        // switch(featuresdata[i].properties.cnt){
        //   case Number(featuresdata[i].properties.cnt)<2:
        //     _this.$set(featuresdata[i].properties,'color','#0000FF');
        //     break;
        //     case Number(featuresdata[i].properties.cnt)>10:
        //    _this.$set(featuresdata[i].properties,'color','#FFFF00');
        //     break;
        //     default: 
        //     _this.$set(featuresdata[i].properties,'color','#FF0000');
        // };
            featuresdata[i].properties.cnt=featuresdata[i].properties.cnt*60;
        }
         
       console.log(_this.data.features,"2222");



        _this.map.addLayer({
'id': 'room-extrusion',
'type': 'fill-extrusion',
'source': {
// GeoJSON Data source used in vector tiles, documented at
// https://gist.github.com/ryanbaumann/a7d970386ce59d11c16278b90dde094d
'type': 'geojson',
 "data": _this.data,
},
'paint': {
// See the Mapbox Style Specification for details on data expressions.
// https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
 
// Get the fill-extrusion-color from the source 'color' property.
'fill-extrusion-color': ['get','color'],
 
// Get fill-extrusion-height from the source 'height' property.
'fill-extrusion-height': ['get', 'cnt'],
 
// Get fill-extrusion-base from the source 'base_height' property.

 
// Make extrusions slightly opaque for see through indoor walls.
'fill-extrusion-opacity': 0.5
}
}, 'waterway-label');



      }
      )
      // this.map.on("load", e => {

      // });
    },
    //加载数据源
    
   
 
    
  },
 
};
</script>

<style lang="less">
@import url("./css/mapbox-gl.css");
#mapboxC {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
