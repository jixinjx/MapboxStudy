import Honeycombsrc from"../../../../../static/json/fengwo.json";



export const layerConfig = {
    map: {
        version: 8,
        name: "mapBox_dsj",
        // glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        // sprite: "mapbox://styles/wangsen123/ck273vrot0lak1cqt2sbp5mrf",
        sources: {
            heatmapShow:{
                type: "geojson",
                data: "http://122.193.33.86:8050/geoserver/KS_ZHZS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=KS_ZHZS:VW_ZS_SQDJ_NullShape&maxFeatures=1000&outputFormat=application/json"
                },
                HoneycombShow:{
                    "type": "geojson",
                   "data": Honeycombsrc,
                  },
                  clusterShow:{
                    type: "geojson",
                    data: "http://122.193.33.86:8050/geoserver/KS_ZHZS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=KS_ZHZS:VW_ZS_SQDJ_NullShape&maxFeatures=1000&outputFormat=application/json",
                    cluster: true,
                    clusterMaxZoom: 16, // Max zoom to cluster points on
                   clusterRadius: 80// 改变聚类的范围Radius of each cluster when clustering points (defaults to 50)   
                },

        },
        layers: []
    },

    heatmap_Heatmap: {
        id: "heatmap_Heatmap",
type: "heatmap",
source: "heatmapShow",
maxzoom: 16,
paint: {
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
16, 3
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
16, 0
],
}
    },

heatmap_Circle: {
 id: "heatmap_Circle",
type: "circle",
source: "heatmapShow",
minzoom: 13.5,//调节点显示
paint: {
// Size circle radius by earthquake magnitude and zoom level
"circle-radius": [
"interpolate",
["linear"],
["zoom"],
7, [
"interpolate",
["linear"],
["get", "mag"],
1, 1,
6, 4
],
16, [
"interpolate",
["linear"],
["get", "mag"],
1, 5,
6, 50
]
],
// Color circle by earthquake magnitude
"circle-color": [
"interpolate",
["linear"],
["get", "mag"],
1, "rgba(33,102,172,0)",
2, "rgb(103,169,207)",
3, "rgb(209,229,240)",
4, "rgb(253,219,199)",
5, "rgb(239,138,98)",
6, "rgb(178,24,43)"
],
"circle-stroke-color": "white",
"circle-stroke-width": 1,
// Transition from heatmap to circle layer by zoom level
"circle-opacity": [
"interpolate",
["linear"],
["zoom"],
3, 0,
8, 1
]
}
},

Honeycomb:{
    'id': 'Honeycomb',
    'type': 'fill-extrusion',
    'source': 'HoneycombShow',
    'paint': {
    // See the Mapbox Style Specification for details on data expressions.
    // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions
     
    // Get the fill-extrusion-color from the source 'color' property.
    'fill-extrusion-color':[
        'interpolate', ['linear'],
        ['to-number', ['get', 'cnt']],
        1,
        '#147131',
        2,
        'rgb(26, 150, 65)',
        3,
        'rgb(106, 188, 88)',
        4,
        'rgb(179, 222, 118)',
        6,
        'rgb(230, 244, 167)',
        9,
        'rgb(254, 232, 165)',
        14,
        'rgb(253, 186, 111)',
        16,
        'rgb(237, 110, 67)',
        18,
        'rgb(215, 25, 28)'
    ],
     
    // Get fill-extrusion-height from the source 'height' property.
    'fill-extrusion-height': ['*', ['to-number', ['get', 'cnt']], 15],
     
    // Get fill-extrusion-base from the source 'base_height' property.
    
     
    // Make extrusions slightly opaque for see through indoor walls.
    'fill-extrusion-opacity': 0.5
    }
    },
    
    Honeycomb_hightlight:{
        'id': 'Honeycomb_hightlight',
        'type': 'fill',
      'source': 'HoneycombShow',
        'type': 'fill-extrusion',
        'layout': {},
       'minZoom': 10,
        'paint': {
          'fill-extrusion-color': '#FF0000',
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': ['*', ['to-number', ['get', 'cnt']], 15],
        
          'fill-extrusion-opacity': 1
        },
        "filter": ["in", "hexcode", ""]
      },

      clusters:{
        "id": "clusters",
        "type": "circle",
        "source": "clusterShow",
        filter: ["has", "point_count"],
        "maxzoom": 16,
        "paint": {// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        12,
        "#f1f075",
        20,
        "#f28cb1"
        ],
        "circle-radius": [
        "step",
        ["get", "point_count"],
        20,
        15,//第一级个
        30,
        40,//第二级个
        40
        ]
        }
        }, 
        
        cluster_count:{
            id: "cluster_count",
            type: "symbol",
            source: "clusterShow",
            filter: ["has", "point_count"],
            layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 35
            }
            },

}