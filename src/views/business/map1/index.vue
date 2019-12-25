<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="mapboxC"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import * as threebox from" ../../../static/threebox.js"
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
        // 148.98190, -35.39847
        // 120.740349690458, 31.2549510559793
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
      
        var featuresdata=_this.data.features;
      //for循环给对象写入color属性，通过cnt赋予不同的color属性，由于cnt属性值太小，所以乘以一个系数
        for(var i=0;i<featuresdata.length;i++){
          // _this.$set(featuresdata[i].properties,'id',featuresdata[i].properties.hexcode)
          if(Number(featuresdata[i].properties.cnt)<2)
          {_this.$set(featuresdata[i].properties,'color','#00FFFF');}
          else if(Number(featuresdata[i].properties.cnt)<10)
          {_this.$set(featuresdata[i].properties,'color','#0000FF');}
          else {_this.$set(featuresdata[i].properties,'color','#FFFF00');}
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

          _this.map.addSource('heatsrc',{
          "type": "geojson",
         "data": geojson,
         
        });
       console.log(_this.data.features,"2222");
       
var AnimateIdx = 0
var sel =  setInterval(()=>{
   AnimateIdx++;
   var times=30;
  if(AnimateIdx < times){
        console.log(AnimateIdx,"AnimateIdx")
        _this.map.querySourceFeatures('heatsrc').forEach((fea)=>{//取出元素
            let delta;
           
            delta = (AnimateIdx/times)
            // let current=Math.sqrt(Number(delta* AnimateIdx))

             _this.map.setPaintProperty('room-extrusion', 'fill-extrusion-height', ['*', ['to-number', ['get', 'cnt']], delta],);
            //  _this.map.setFeatureState({ id: current, source: 'heatsrc',}, { current_cnt:current })
            // console.log(fea.properties)
          
        })
            // let animation = requestAnimationFrame(animateLine);  
        }else{clearInterval(sel);
				sel = null}
            }, 0.001);
        
	if(!config) console.error("Config not set! Make a copy of 'config_template.js', add in your access token, and save the file as 'config.js'.");
      var origin = [120.740349690458, 31.2549510559793];
 _this.map.on('style.load', function() {
		 _this.map.addLayer({
				id: 'custom_layer',
				type: 'custom',
				onAdd: function(map, mbxContext){
					tb = new Threebox(
						_this.map, 
						mbxContext,
						{defaultLights: true}
					);
					//instantiate a red sphere and position it at the origin lnglat
					var sphere = tb.sphere({color: 'red', material: 'MeshStandardMaterial'})
						.setCoords(origin);
					// add sphere to the scene
					tb.add(sphere);
				},
				
				render: function(gl, matrix){
					tb.update();
				}
			})
    }
);





        _this.map.addLayer({
'id': 'room-extrusion',
'type': 'fill-extrusion',
'source': 'heatsrc',
'paint': {
// See the Mapbox Style Specification for details on data expressions.
// https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
 
// Get the fill-extrusion-color from the source 'color' property.
'fill-extrusion-color': ['get','color'],
 
// Get fill-extrusion-height from the source 'height' property.
'fill-extrusion-height':0,
// ['to-number', ['get', 'id']],
 
// Get fill-extrusion-base from the source 'base_height' property.

 
// Make extrusions slightly opaque for see through indoor walls.
'fill-extrusion-opacity': 0.5
}
}, 'waterway-label');


  _this.map.addLayer({
        'id': 'entity_borders',
        'type': 'fill',
      'source': 'heatsrc',
        'type': 'fill-extrusion',
        'layout': {},
       'minZoom': 10,
        'paint': {
          'fill-extrusion-color': '#FF0000',
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
  'fill-extrusion-height': ['get', 'cnt'],
        
          'fill-extrusion-opacity': 1
        },
        "filter": ["in", "hexcode", ""]
      });

 _this.map.on("mousemove", "room-extrusion", function(e) {
        _this.map.getCanvas().style.cursor = 'pointer';
         let feature = e.features[0];
console.log(feature,'4444')
        let relatedFeatures = _this.map.querySourceFeatures('heatsrc', {
          filter: ['in', 'hexcode', feature.properties.hexcode]
        });
console.log(relatedFeatures,'555')
        // let filter = relatedFeatures.reduce(function(memo, feature) {
        //   memo.push(feature.properties.hexcode);
        //   return memo;
        // }, ['in', 'hexcode']);
        // console.log(filter,'66')

        _this.map.setFilter("entity_borders",['in', 'hexcode', feature.properties.hexcode]);

        
        })
      
   _this.map.on("mouseleave", "room-extrusion", function() {
        _this.map.getCanvas().style.cursor = '';
        _this.map.setFilter('entity_borders', ['in', 'hexcode', '']);

      });

      
      
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
