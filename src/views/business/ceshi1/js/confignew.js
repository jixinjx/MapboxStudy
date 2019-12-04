export const layerConfig = {
    map: {
        version: 8,
        name: 'mapBox_dsj',
        glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
        sources: {
            X_SuZhou_Region: {
                type: 'vector',
                scheme: 'tms',
                tiles: [
                    webAPI.const.layerIP +
                    '/geoserver/gwc/service/tms/1.0.0/bigmap:X_SuZhou_Region@EPSG:900913@pbf/{z}/{x}/{y}.pbf'
                ]
            },
            SuZhou_SIPSD_Region_CGS84: {
                type: 'vector',
                scheme: 'tms',
                tiles: [
                    webAPI.const.layerIP +
                    '/geoserver/gwc/service/tms/1.0.0/bigmap:SuZhou_SIPSD_Region_CGS84@EPSG:900913@pbf/{z}/{x}/{y}.pbf'
                ]
            },
            S_SuZhou_River_CGS84: {
                type: 'vector',
                scheme: 'tms',
                tiles: [
                    webAPI.const.layerIP +
                    '/geoserver/gwc/service/tms/1.0.0/bigmap:S_SuZhou_River_CGS84@EPSG:900913@pbf/{z}/{x}/{y}.pbf'
                ]
            },
            D_SuZhou_Droad_CGS84: {
                type: 'vector',
                scheme: 'tms',
                tiles: [
                    webAPI.const.layerIP +
                    '/geoserver/gwc/service/tms/1.0.0/bigmap:D_SuZhou_Droad_CGS84@EPSG:900913@pbf/{z}/{x}/{y}.pbf'
                ]
            },
            heatmapShow: {
                type: 'geojson',
                data: webAPI.const.layerIP + '/geoserver/CH_ZHWT/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CH_ZHWT:WT_GDSJ&outputFormat=application/json'
            },

            HoneycombShow: {
                type: 'geojson',
                data: webAPI.const.layerIP + '/geoserver/CH_ZHWT/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CH_ZHWT:WT_FWFX&outputFormat=application/json'
            },
            clusterShow: {
                type: 'geojson',
                data: webAPI.const.layerIP + '/geoserver/CH_ZHWT/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CH_ZHWT:WT_GDSJ&outputFormat=application/json',
                cluster: true,
                clusterMaxZoom: 16, // Max zoom to cluster points on
                clusterRadius: 70 // 改变聚类的范围Radius of each cluster when clustering points (defaults to 50)
            }

        },
        layers: [{
                id: 'background',
                type: 'background',
                paint: {
                    'background-color': '#000000'
                },
                interactive: true
            },
            {
                id: 'SuZhou_CGS84',
                source: 'X_SuZhou_Region',
                'source-layer': 'X_SuZhou_Region',
                type: 'fill',
                layout: {},
                paint: {
                    'fill-color': '#000002'
                }
            },
            {
                id: 'SZ_SIPSD_CGS84',
                source: 'SuZhou_SIPSD_Region_CGS84',
                'source-layer': 'SuZhou_SIPSD_Region_CGS84',
                type: 'fill',
                layout: {},
                paint: {
                    'fill-color': '#091220'
                }
            },
            {
                id: 'SuZhou_Rivers_CGS84',
                source: 'S_SuZhou_River_CGS84',
                'source-layer': 'S_SuZhou_River_CGS84',
                type: 'fill',
                layout: {},
                paint: {
                    'fill-color': '#12223d'
                }
            },
            {
                id: 'SuZhou_Droad_CGS84',
                source: 'D_SuZhou_Droad_CGS84',
                'source-layer': 'D_SuZhou_Droad_CGS84',
                type: 'fill',
                layout: {},
                paint: {
                    'fill-color': '#113549'
                }
            },
            {
                id: 'SuZhou_Droad_CGS84_symbol',
                source: 'D_SuZhou_Droad_CGS84',
                'source-layer': 'D_SuZhou_Droad_CGS84',
                type: 'symbol',
                layout: {
                    'text-field': '{MC}',
                    'text-size': 13,
                    'symbol-placement': 'line',
                    'symbol-spacing': 250,
                    'text-max-angle': 30,
                    'text-pitch-alignment': 'viewport'
                },
                paint: {
                    'text-color': '#2dc4bb'
                },
                interactive: true
            }
        ]
    },

    heatmap_Heatmap: {
        id: 'heatmap_Heatmap',
        type: 'heatmap',
        source: 'heatmapShow',
        maxzoom: 15,
        paint: {
            'heatmap-intensity': [
                'interpolate', ['linear'],
                ['zoom'],
                10, 0,
                15, 1
            ],
            // 密度颜色选定
            'heatmap-color': [
                'interpolate', ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.1, 'rgb(103,169,207)',
                0.2, 'rgb(209,229,240)',
                0.5, 'rgb(253,219,199)',
                0.6, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
            ],
            // 热点图密度范围，数值越大，效果越明显
            'heatmap-radius': [
                'interpolate', ['linear'],
                ['zoom'],
                10, 2,
                15, 10
            ],
            // 热点图的透明度随ZOOM变化
            'heatmap-opacity': 0.9
        }
    },
    heatmap_Circle: {
        id: 'heatmap_Circle',
        type: 'circle',
        source: 'heatmapShow',
        minzoom: 15, // 调节点显示
        paint: {
            'circle-radius': 5,
            // Color circle by earthquake magnitude
            'circle-color': "rgb(178,24,43)",
            'circle-stroke-color': 'white',
            'circle-stroke-width': 2,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': 0.8
        }
    },
    Honeycomb: {
        'id': 'Honeycomb',
        'type': 'fill-extrusion',
        'source': 'HoneycombShow',
        'paint': {
            'fill-extrusion-color': [
                'match', ['get', 'DJDL'],
                '社区财产',
                '#147131',
                '社区物业',
                'rgb(26, 150, 65)',
                '市容市貌',
                'rgb(106, 188, 88)',
                '市政设施',
                'rgb(179, 222, 118)',
                '环境保护',
                'rgb(230, 244, 167)',
                '医疗卫生',
                'rgb(254, 232, 165)',
                'rgb(215, 25, 28)'
            ],

            'fill-extrusion-height': ['*', ['to-number', ['get', 'Num']], 10],
            'fill-extrusion-opacity': 0.5
        }
    },

    clusters: {
        'id': 'clusters',
        'type': 'circle',
        'source': 'clusterShow',
        filter: ['has', 'point_count'],
        'maxzoom': 16,
        'paint': {
            'circle-color': [
                'step', ['get', 'point_count'],
                '#51bbd6',
                12,
                '#f1f075',
                20,
                '#f28cb1'
            ],
            'circle-radius': [
                'step', ['get', 'point_count'],
                20,
                15, // 第一级个
                30,
                40, // 第二级个
                40
            ]
        }
    },

    cluster_count: {
        id: 'cluster_count',
        type: 'symbol',
        source: 'clusterShow',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 35
        }
    }

}