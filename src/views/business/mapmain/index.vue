<template>
  <div style="height:100%;width:100%;text-align:left;">
    <div id="mapboxC"></div>
    <layer
      ref="layers"
      :layers="layers"
      :multi="false"
      @addLayer="addLayer"
      v-if="isShowLayerControls"
    ></layer>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { layerConfig } from "./js/confignew.js";
import layer from "@/views/components/rightLayerControlsNew";
/* eslint-disable */
export default {
  name: "myMap",
  components: {
    layer
  },
  data() {
    return {
      map: null,
      activeLayerList: [],
      mapInitOption: {
        center: [120.990197,31.46735], //POINT (118.95703098200011 33.013849272000073)
        pitch: 50,
        bearing: 0,
        zoom: 12.5
      },
      isShowLayerControls: true,
      layers: [
        {
          name: "clusters",
          label: "聚类分析",
          visable: true,
          checked: false
        },
      {
          name: "Honeycomb",
          label: "蜂窝分析",
          visable: true,
          checked: false
        },
        {
          name: "heatmap_Heatmap",
          label: "热点图",
          visable: true,
          checked: false
        }
      ]
    };
  },
  mounted() {
    this.markers = [];
    this.initMap();
    const _this = this;
    window.addLayerByKey = function(key) {
      _this.addLayer(key);
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiaml4aW5qeCIsImEiOiJjazJiaTk4bjQ0amw3M2ltdHNlNDY0cGRhIn0.HoLIuAtwOgzJj5ax3NG4hQ";
      this.map = new mapboxgl.Map({
        container: "mapboxC", // container id
        style: "mapbox://styles/mapbox/dark-v10", //"mapbox://styles/wangsen123/ck273vrot0lak1cqt2sbp5mrf", //layerConfig.map,
        center: this.mapInitOption.center,
        minZoom: 5,
        maxZoom: 15.5,
        zoom: this.mapInitOption.zoom,
        pitch: this.mapInitOption.pitch, // pitch in degrees
        bearing: this.mapInitOption.bearing
      });

      const _this = this;
      this.map.on("load", e => {
        _this.isShowLayerControls = true;
        //加载sources
      
        _this.addSource();
 _this.initEvent()
        //初始化加载
        setTimeout(function() {
          _this.$refs.layers.addLayer("Honeycomb", _this.layers[0]);
        }, 1000);
      });
    },
    //加载数据源
    addSource() {
      var mapSources = layerConfig.map.sources;
      var objArr = Object.keys(mapSources);
      for (let index = 0; index < objArr.length; index++) {
        const element = objArr[index]; //数据源对象名称
        this.map.addSource(element, layerConfig.map.sources[element]);
      }
    },
    initEvent() {
      const _this = this;
      let hoveredStateId = null;
//鼠标移到图层上指针发生变化
      _this.map.on("mousemove", "Honeycomb", function(e) {
        _this.map.getCanvas().style.cursor = 'pointer';})
//点击蜂窝图蜂窝图变为红色
 _this.map.on("click", "Honeycomb", function(e) {
         let feature = e.features[0];
        let relatedFeatures = _this.map.querySourceFeatures('HoneycombShow', {
          filter: ['in', 'hexcode', feature.properties.hexcode]
        });

        // let filter = relatedFeatures.reduce(function(memo, feature) {
        //   memo.push(feature.properties.hexcode);
        //   return memo;
        // }, ['in', 'hexcode']);
        // console.log(filter,'66')
//选择器
        _this.map.setFilter("Honeycomb_hightlight",['in', 'hexcode', feature.properties.hexcode]);

        
        })
      //鼠标移开指针变回
   _this.map.on("mouseleave", "Honeycomb", function() {
        _this.map.getCanvas().style.cursor = '';

      });


    },

    
    initMarker(info) {},
    addLayerByKey(key) {
      this.map.addLayer(layerConfig[key]);
      this.activeLayerList.push(key);
    },
    addLayer(key) {
      //清除之前的底图
      this.activeLayerList.forEach(e => {
        if (this.map.getLayer(e)) this.map.removeLayer(e);
      });
      this.activeLayerList = [];
      if (this.popupTip) this.popupTip.remove();
      switch (key) {
case "Honeycomb":
          this.addLayerByKey("Honeycomb");
          this.addLayerByKey("Honeycomb_hightlight");
    this.flyTo(12.5, 13,[120.740349690458, 31.2549510559793]);
          break;
case "heatmap_Heatmap":
          this.addLayerByKey("heatmap_Heatmap");
          this.addLayerByKey("heatmap_Circle");
    this.flyTo(12.5, 13,[120.990197,31.46735]);
          break;

case "clusters":
          this.addLayerByKey("clusters");
          this.addLayerByKey("cluster_count");
    this.flyTo(12, 13,[120.990197,31.46735]);
          break;

      }
     
    },
    clearLayer(){},
    flyTo(zoom, from,centerdata) {
      this.map.setZoom(from || 11);
      this.map.setBearing(-10);
      this.map.flyTo({
        center: centerdata,
        zoom: zoom,
        bearing: 0,
        pitch: 50,
        speed: 0.2,
        curve: 1
      });
    }
  },
  beforeDestroy() {
    this.map = null;
  }
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
