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
    <div class="center_left darkBackground_left">
      <div class="highFreDiv">
        <div class="title">高发案件TOP10</div>
        <div class="highFreCaseDiv"></div>
        <div class="highFreCaseTotal">
          <div
            class="value gradient-text-bp"
            v-if="GDZL!==0"
          >{{sjzl}}</div>
          <div class="tag">总数</div>
        </div>
        <div class="list">
          <div
            class="oneList"
            v-for="(cell,cellKey) in dataTableAJGF"
            :key="cellKey"
            @click="selectDJDL(cell)"
          >
            <div class="indexDiv">No.{{cellKey+1}}</div>
            <div class="name">{{cell['工单类型']}}</div>
            <div class="value gradient-text-one">{{cell['工单数量']}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="timeLineDiv">
      <hr class="timeLineHr">
      <ul class="timeLineUl">
        <li
          class="timeLineli"
          v-for="(item,index) in timeLineDataList"
          :key="index"
          @click="changeColor(item,index)"
        >
          <div
            class="liMid"
            v-if="item.id==0"
          >
            <div class="keep"><img src='~static/images/circle.png'></div>
          </div>
          <div
            class="liMid"
            v-if="item.id==1"
          >
            <div class="keep"><img src='~static/images/circle1.png'></div>
          </div>
          <div class="liBottom">{{item.name}}</div>
        </li>
      </ul>
    </div> -->

  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import { layerConfig } from './js/confignew.js'
// import layer from 'views/components/testlayers'
/* eslint-disable */
export default {
  name: "myMap",
  components: {
    layer
  },
  data() {
    return {
      time: this.getdate(),
      DJDL: "社区物业",
      key: "",
      timeLineDataList: [
        { name: "2019-06", id: 0 },
        { name: "2019-07", id: 0 },
        { name: "2019-08", id: 0 },
        { name: "2019-09", id: 0 },
        { name: "2019-10", id: 0 },
        { name: "2019-11", id: 1 }
      ],
      GDZL: 0,
      dataTableAJGF: [],
      map: null,
      activeLayerList: [],
      mapInitOption: {
        center: [120.75357943348001, 31.359303666125427],
        pitch: 50,
        bearing: 0,
        zoom: 12.5
      },
      isShowLayerControls: true,
      currentMK: "clusterShow",
      layers: [
        {
          name: "clusters",
          sourcesname: "",
          label: "聚类分析",
          visable: true,
          checked: true
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
    this.initMap();
    this.getTop10();
    const _this = this;
  },
  computed:{
    sjzl(){
      return this.GDZL
    }
  },
  watch: {
    DJDL: function(newValue, oldValue) {
      console.log(newValue, "777");
      if (oldValue != this.DJDL) {
        this.addLayer(this.key);
      }
    },
    time: function(newValue, oldValue) {
      if (oldValue != this.time) {
        this.addLayer(this.key);
      }
    }
  },
  methods: {
    getxml() {
      var xml =
        "&Filter=" +
        "<Filter><And><PropertyIsEqualTo><PropertyName>DJDL</PropertyName><Literal>" +
        this.DJDL +
        "</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>date_format</PropertyName><Literal>" +
        this.time +
        "</Literal></PropertyIsEqualTo></And></Filter>";
      return xml;
    },
    getdate() {
      var date = new Date();
      var newyear = date.getFullYear();
      var newmonth = date.getMonth() + 1;
      var time = newyear + "-" + newmonth;
      return time;
    },
    changeColor(item, index) {
      if (this.timeLineDataList[index].id == 0) {
        for (var i = 0; i < this.timeLineDataList.length; i++) {
          this.timeLineDataList[i].id = this.timeLineDataList[index].id;
        }
        this.timeLineDataList[index].id = this.timeLineDataList[index].id + 1;
      } else {
        console.log(1);
        this.timeLineDataList[index].id =
          this.timeLineDataList[index].id - 1 + 1;
      }
      this.time = item.name;
      this.getTop10();
    },
    selectDJDL(item) {
      this.DJDL = item["工单类型"];
      console.log(this.DJDL, "999");
    },
    getTop10() {
      webAPI.server
        .get({
          url:
            "http://58.210.9.131:90/SIP_BDC_DataCenter/Q.ashx?DBTag=CH_ZHWT&xKey=GetGDTOP10" +
            "&time=" +
            this.time
        })
        .then(res => {
          console.log(res, 7777);
          this.DJDL = res.data[0]['工单类型'];
          this.dataTableAJGF = res.data;
          var number = 0;
          this.dataTableAJGF.map(item => {
            number = number + Number(item.工单数量);
          });
          this.GDZL = number;
          console.log(this.GDZL, 1789789);
        });
    },
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibGluZ2psIiwiYSI6ImNqcmlpd2lkcDAwMmU0NG1tNmEyMWFpd28ifQ.ORCbHExJDD6iDq7AhtNiRw";
      this.map = new mapboxgl.Map({
        container: "mapboxC", // container id
        style: layerConfig.map,
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

        _this.initEvent();
        //初始化加载
      });
      setTimeout(function() {
        //_this.handlerGeoJson();
        _this.$refs.layers.addLayer("clusters", _this.layers[0]);
      }, 1000);
    },
    handlerGeoJson() {
      var url = layerConfig.map.sources[this.currentMK].data;
      var fliter = this.getxml();
      url = url + fliter;
      layerConfig.map.sources[this.currentMK].data = url;
      console.log(layerConfig.map.sources[this.currentMK].data, "111");
    },
    initEvent() {},
    addLayerByKey(key) {
      var layObj = layerConfig[key];
      console.log(layObj, "888");
      var sourceName = layObj["source"];
      this.currentMK = sourceName;
      if (this.currentMK != undefined) {
        var url = layerConfig.map.sources[this.currentMK].data;
        var fliter = this.getxml();
        url = url + fliter;
        layerConfig.map.sources[this.currentMK].data = url;
      }
      console.log(url, 6666666);
      this.map.addLayer(layerConfig[key]);
      this.activeLayerList.push(key);
    },
    addLayer(key) {
      this.key = key;
      //清除之前的底图
      this.activeLayerList.forEach(e => {
        if (this.map.getLayer(e)) this.map.removeLayer(e);
      });
      this.activeLayerList = [];
      switch (key) {
        case "Honeycomb":
          this.addLayerByKey("Honeycomb");
          this.flyTo(14, 15.5, [120.78458943458801, 31.369303666125427]);
          break;
        case "heatmap_Heatmap":
          this.addLayerByKey("heatmap_Heatmap");
          this.addLayerByKey("heatmap_Circle");
          this.flyTo(12.5, 13, [120.75357943348001, 31.359303666125427]);
          break;

        case "clusters":
          this.addLayerByKey("clusters");
          this.addLayerByKey("cluster_count");
          this.flyTo(12, 13, [120.75357943348001, 31.359303666125427]);
          break;
      }
    },
    flyTo(zoom, from, centerdata) {
      this.map.setZoom(from || 11);
      this.map.setBearing(-10);
      this.map.flyTo({
        center: centerdata,
        zoom: zoom,
        bearing: 0,
        pitch: 45,
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
.timeLineDiv {
  width: 800px;
  z-index: 1001;
  left: 700px;
  bottom: 60px;
  position: fixed;
  .timeLineHr {
    margin-left: 15px;
    margin-top: 25px;
    border: 1px solid #fff;
  }
  .timeLineUl {
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
    list-style: none;
    .liMid {
      margin-top: -23.5px;
      img {
        margin-right: 125px;
      }
    }
    .liBottom {
      color: #fff;
    }
  }
}
.center_left {
  width: 400px;
  height: 100%;
  z-index: 1001;
  position: relative;
}
.darkBackground_left {
  background: linear-gradient(
    to right,
    rgb(0, 6, 20),
    rgba(4, 10, 24, 0.7),
    rgba(0, 6, 20, 0.6),
    rgba(0, 6, 20, 0)
  );
}
.highFreDiv {
  width: 90%;
  height: 700px;
  position: absolute;
  top: 50px;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: flex-start;
}
.highFreDiv .title {
  width: 100%;
  height: 30px;
  font-size: 18px;
  font-family: fanghei;
  margin-left: 15px;
  border-bottom: 2px solid #299cec;
  letter-spacing: 3px;
  color: white;
}
.highFreCaseDiv {
  width: 32%;
  height: 110px;
  top: 50px;

  // background: url("~static/images/dsj/ajbg.png") 0 0 no-repeat;
}
.highFreCaseTotal {
  width: 50%;
  height: 130px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
}
.highFreCaseTotal div {
  width: 70%;
}

.highFreCaseTotal .value {
  font-size: 38px;
  font-family: digital;
  letter-spacing: 2px;
  text-align: center;
}
.gradient-text-bp {
  background-image: -webkit-linear-gradient(
    bottom,
    rgb(62, 59, 255),
    rgb(55, 131, 255),
    rgb(132, 237, 255),
    rgb(255, 255, 255)
  );
  background: linear-gradient(
    0deg,
    rgb(62, 59, 255),
    rgb(55, 131, 255),
    rgb(132, 237, 255),
    rgb(255, 255, 255)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.highFreCaseTotal .tag {
  font-size: 12px;
  letter-spacing: 2px;
  text-align: center;
  color: white;
}
.list {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
}

.list .oneList {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.list .oneList .indexDiv {
  width: 50px;
  color: #299cec;
  font-size: 14px;
  text-align: center;
}
.list .oneList .name {
  width: 150px;
  color: white;
  font-size: 14px;
  text-align: center;
}
.list .oneList .value {
  width: 80px;
  font-size: 24px;
  text-align: center;
}
.gradient-text-one {
  background-image: -webkit-linear-gradient(
    bottom,
    rgb(255, 2, 34),
    #fdae03,
    rgb(255, 255, 62)
  );
  background: linear-gradient(
    0deg,
    rgb(255, 2, 34),
    #fdae03,
    rgb(255, 255, 62)
  );
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  color: transparent;
}
.selectedHighCase {
  border-left: solid 2px #299cec;
  background: rgba(1, 7, 22, 0.6);
}
.pt8 {
  position: relative;
  color: aliceblue;
  display: grid;
}
</style>
