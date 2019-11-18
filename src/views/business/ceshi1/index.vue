<template>
  <div class="myMap">
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
        center: [118.88703098200011, 32.98849272000073], //POINT (118.95703098200011 33.013849272000073)
        pitch: 50,
        bearing: 0,
        zoom: 12.5
      },
      isShowLayerControls: true,
      layers: [
        {
          name: "XRegion_Town",
          label: "戴楼街道",
          visable: true,
          checked: true
        },
        {
          name: "XRegion_Village",
          label: "行政区划",
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
        "pk.eyJ1Ijoid2FuZ3NlbjEyMyIsImEiOiJjanJ6bTliaDMxYTgzNDVvZG44N2N5M2c2In0.ab5OgYWksZbKLzTl2BxZKg";
      this.map = new mapboxgl.Map({
        container: "mapboxC", // container id
        style: "mapbox://styles/wangsen123/ck273vrot0lak1cqt2sbp5mrf", //"mapbox://styles/wangsen123/ck273vrot0lak1cqt2sbp5mrf", //layerConfig.map,
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
        _this.map.loadImage("./static/images/dsj/marker/政府.png", function(
          error,
          image
        ) {
          console.log(error);
          if (error) throw error;
          _this.map.addImage("icon-zf", image);
        });
        _this.addSource();

        //初始化加载
        setTimeout(function() {
          _this.$refs.layers.addLayer("XRegion_Town", _this.layers[0]);
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
      this.map.on("mousemove", "XZQH", function(e) {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            _this.map.setFeatureState(
              {
                source: "SuZhou_SIPSD_Region_CGS84",
                id: hoveredStateId,
                sourceLayer: "SuZhou_SIPSD_Region_CGS84"
              },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          _this.map.setFeatureState(
            {
              source: "SuZhou_SIPSD_Region_CGS84",
              id: hoveredStateId,
              sourceLayer: "SuZhou_SIPSD_Region_CGS84"
            },
            { hover: true }
          );
        }
      });
      this.map.on("mouseleave", "XZQH", function() {
        if (hoveredStateId) {
          _this.map.setFeatureState(
            {
              source: "SuZhou_SIPSD_Region_CGS84",
              id: hoveredStateId,
              sourceLayer: "SuZhou_SIPSD_Region_CGS84"
            },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });
    },
    initMarker(info) {},
    addLayerByKey(key) {
      this.map.addLayer(layerConfig[key]);
      this.activeLayerList.push(key);
    },
    addLayer(key) {
      this.activeLayerList.forEach(e => {
        if (this.map.getLayer(e)) this.map.removeLayer(e);
      });
      this.activeLayerList = [];
      if (this.popupTip) this.popupTip.remove();
      switch (key) {
        case "XRegion_Town":
          this.addLayerByKey(key);
          this.addLayerByKey("XRegion_Town_line");
          this.addLayerByKey("XRegion_Village_line");
          this.addLayerByKey("XRegionVillageG_CenterPoint");
          this.addLayerByKey("XRegionVillageG_CenterPoint_Symbol");
          this.addLayerByKey("XRegion_TownGovernment_Symbol");

          break;
        case "XRegion_Village":
          this.addLayerByKey(key);
          this.addLayerByKey("XRegionVillageG_CenterPoint");
          this.addLayerByKey("XRegionVillageG_CenterPoint_Symbol");
          break;
        default:
          this.addLayerByKey(key);
          break;

case "heatmap_Heatmap":
          this.addLayerByKey("heatmap_Heatmap");
          this.addLayerByKey("heatmap_Circle");
    
          break;

      }
      this.flyTo(12.5, 13);
    },
    clearLayer() {},
    flyTo(zoom, from) {
      this.map.setZoom(from || 11);
      this.map.setBearing(-10);
      this.map.flyTo({
        center: this.mapInitOption.center,
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
