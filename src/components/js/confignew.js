import geojson from "static/json/222.json";
export const layerConfig = {
    map: {
        version: 8,
        name: "mapBox_dsj",
        // glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        // sprite: "mapbox://styles/wangsen123/ck273vrot0lak1cqt2sbp5mrf",
        sources: {
            //热点图
            heatmap1:{
                type: "geojson",
                data: geojson
                },
            
            //X行政区划_Z镇界G
            XRegion_Town: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/CH_ZHDL:XRegion_Town@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },
            //X行政区划_C村界G
            XRegion_Village: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/CH_ZHDL:XRegion_Village@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },
            //行政区划_Z镇政府P
            XRegion_TownGovernment: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/CH_ZHDL:XRegion_TownGovernment@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },
            //X行政区划_C村界G_CenterPoint
            XRegionVillageG_CenterPoint: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/CH_ZHDL:XRegionVillageG_CenterPoint@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },
            //W网格管理_E二级网格G
            WGrid_SecondGrid: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/CH_ZHDL:WGrid_SecondGrid@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            }
        },
        layers: []
    },


    heatmap1: {
        "id": "heatmap1",
"type": "heatmap",
"center": [120.990197,31.46735],
"source": "heatsrc",
"maxzoom": 14,
"paint": {
// Increase the heatmap weight based on frequency and property magnitude
// "heatmap-weight": [
// "interpolate",
// ["linear"],
// ["get", "mag"],
// 0, 0,
// 6, 1
// ],
// Increase the heatmap color weight weight by zoom level
// heatmap-intensity is a multiplier on top of heatmap-weight
//热力图强度大小变化，1-3变化，数值越大，效果越明显
"heatmap-intensity": [
"interpolate",
["linear"],
["zoom"],
12, 1,
15, 3
],
// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
// Begin color ramp at 0-stop with a 0-transparancy color
// to create a blur-like effect.
//密度颜色选定
"heatmap-color": [
"interpolate",
["linear"],
["heatmap-density"],
0, "rgba(33,102,172,0)",
0.1, "rgb(103,169,207)",
0.2, "rgb(209,229,240)",
0.5, "rgb(253,219,199)",
0.6, "rgb(239,138,98)",
1, "rgb(178,24,43)"
],
// 热点图密度范围，数值越大，效果越明显
"heatmap-radius": [
"interpolate",
["linear"],
["zoom"],
10, 2,
15, 20
],
// 热点图的透明度随ZOOM变化
"heatmap-opacity": [
"interpolate",
["linear"],
["zoom"],
12, 1,
14, 0
],
}
    },

    /*X行政区划_Z镇界G */
    XRegion_TownGovernment_Symbol: {
        id: "XRegion_TownGovernment_Symbol",
        source: "XRegion_TownGovernment",
        "source-layer": "XRegion_TownGovernment",
        type: "symbol",
        layout: {
            "icon-image": "icon-zf",
            "icon-size": 0.2,
            "text-font": [
                "Roboto Regular",
                "Arial Unicode MS Regular"
            ],
            "text-anchor": "bottom",
            "symbol-placement": "point",
            "text-field": "{MC}",
            "text-offset": [-2, 2.1],
            "text-size": 20
        },
        paint: {
            "text-color": "hsl(0, 0%, 90%)",
            "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
            "text-halo-width": 3
        }
    },
    /** X行政区划_Z镇界G 金湖戴楼--镇界*/
    XRegion_Town: {
        id: "XRegion_Town",
        source: "XRegion_Town",
        "source-layer": "XRegion_Town",
        type: "fill",
        maxzoom: 13,

        layout: {},
        paint: {
            "fill-color": "rgba(0,153,153,0.3)",
            'fill-opacity': 0.6
        }
    },
    XRegion_Town_line: {
        id: "XRegion_Town_line",
        source: "XRegion_Town",
        "source-layer": "XRegion_Town",
        type: "line",
        maxzoom: 13,
        layout: {
            "line-join": "round",
            /* 线条相交处的样式 */
            "line-cap": "round" /* 线条末端的样式 */
        },
        paint: {
            "line-color": "rgba(0,153,153,0.3)",
            'line-opacity': 1,
            "line-width": 8,
        }
    },
    /*X行政区划_C村界G*/
    XRegion_Village_line: {
        id: "XRegion_Village_line",
        source: "XRegion_Village",
        "source-layer": "XRegion_Village",
        //minzoom: 13,
        type: "line",
        layout: {
            "line-join": "round",
            /* 线条相交处的样式 */
            "line-cap": "round" /* 线条末端的样式 */
        },
        paint: {
            "line-color": "rgba(0,153,153,0.3)",
            "line-width": 2
        }
    },
    /**3D建筑 */
    XRegion_Village: {
        id: "XRegion_Village",
        source: "XRegion_Village",
        "source-layer": "XRegion_Village",
        type: "fill-extrusion",
        layout: {},
        paint: {
            'fill-extrusion-color': [
                "match", ["get", "MC"],
                "红岭村",
                "#091220",
                "小集村",
                "rgb(253,251,194)",
                "新河水库",
                "rgb(255,214,154)",
                "官塘村",
                "rgb(252,170,120)",
                "新塘村",
                "rgb(244,136,100)",
                "牌楼村",
                "rgb(239,95,105)",
                "楼庄村",
                "rgb(216,64,111)",
                "永丰社区",
                "rgb(174,58,119)",
                "戴楼村",
                "rgb(141,40,134)",
                "衡阳村",
                "rgb(107,30,126)",
                "rgb(32,19,72)"
            ],
            'fill-extrusion-height': 1000,
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 0.9
        }
    },
    /** X行政区划_C村界G_CenterPoint */
    /**symbol */
    XRegionVillageG_CenterPoint_Symbol: {
        id: "XRegionVillageG_CenterPoint_Symbol",
        source: "XRegionVillageG_CenterPoint",
        "source-layer": "XRegionVillageG_CenterPoint",
        type: "symbol",
        layout: {
            "text-field": "{MC}",
            "text-offset": [0, -1.5],
            "text-max-width": 10,
            "text-size": 20
        },
        paint: {
            "text-color": "hsl(0, 0%, 90%)",
            "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
            "text-halo-width": 5
        }
    },
    /** X行政区划_C村界G_CenterPoint */
    /**symbol */
    XRegionVillageG_CenterPoint: {
        id: "XRegionVillageG_CenterPoint",
        source: "XRegionVillageG_CenterPoint",
        "source-layer": "XRegionVillageG_CenterPoint",
        type: "circle",
        layout: {},
        paint: {
            "circle-color": "hsla(0, 0%, 10%, 0.75)",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
        }
    }
}