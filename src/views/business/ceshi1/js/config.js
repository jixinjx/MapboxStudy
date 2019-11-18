export const layerConfig = {
    map: {
        version: 8,
        name: "mapBox_dsj",
        glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        sprite: "mapbox://sprites/mapbox/streets-v8",
        sources: {
            XRegion_TownBoundary: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:XRegion_TownBoundary@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            XRegion_TownBoundaryCenterP: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:XRegion_TownBoundaryCenterP@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            XKS_ZHZS_RegionVillage: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:XKS_ZHZS_RegionVillage@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            DRoads: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:DRoads@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            DRoadsLine: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    //   webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:DRoads_CenterLine@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/bigmap:LINE_SPATIALJOIN2@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            SDroadOutSuZhou: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:SDroadOutSuZhou@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            JBuilding: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:JBuilding@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            SRiversSuZhou: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:SRiversSuZhou@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            WGrid_SecondGrid: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:WGrid_SecondGrid@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },

            WGrid_SecondGrid_CenterPoint: {
                type: "vector",
                scheme: "tms",
                tiles: [
                    webAPI.const.layerIP + "/geoserver/gwc/service/tms/1.0.0/KS_ZHZS:WGrid_SecondGrid_CenterPoint@EPSG:900913@pbf/{z}/{x}/{y}.pbf"
                ]
            },
        },
        layers: [{
                id: "background",
                type: "background",
                paint: {
                    "background-color": "#000000"
                },
                interactive: true
            },

            {
                id: "XKS_ZHZS_RegionVillage",
                source: "XKS_ZHZS_RegionVillage",
                "source-layer": "XKS_ZHZS_RegionVillage",
                type: "fill",
                layout: {},
                paint: {
                    // "fill-color": "#091220"
                    "fill-color": "#091220"
                }
            },

            {
                id: "SRiversSuZhou",
                source: "SRiversSuZhou",
                "source-layer": "SRiversSuZhou",
                type: "fill",
                layout: {},
                paint: {
                    "fill-color": "#12223d"
                }
            },

            {
                id: "DRoads",
                source: "DRoads",
                "source-layer": "DRoads",
                type: "fill",
                layout: {},
                paint: {
                    "fill-color": "#113549"
                }
            },
            {
                id: "SDroadOutSuZhou",
                source: "SDroadOutSuZhou",
                "source-layer": "SDroadOutSuZhou",
                type: "line",
                layout: {},
                paint: {
                    "line-color": "#113549",
                    "line-width": 3
                }
            },

            {
                id: "XRegion_TownBoundary_Line",
                source: "XRegion_TownBoundary",
                "source-layer": "XRegion_TownBoundary",
                type: "line",
                layout: {},
                paint: {
                    "line-color": "#627BC1",
                    "line-width": 2
                }
            },

            {
                id: "XRegion_TownBoundary",
                source: "XRegion_TownBoundary",
                "source-layer": "XRegion_TownBoundary",
                maxzoom: 12.5,
                type: "fill",
                layout: {},
                paint: {
                    "fill-color": [
                        "match", ["get", "XZQMC"],
                        "陆家镇",
                        "rgba(204,0,0,0.3)",
                        "rgba(0,153,153,0.3)"
                    ]
                }
            },

            {
                id: "3D-Building",
                source: "JBuilding",
                "source-layer": "JBuilding",
                type: "fill-extrusion",
                minzoom: 12.5,
                layout: {
                    visibility: "visible"
                },
                paint: {
                    "fill-extrusion-color": "rgb(94, 79, 162)",
                    "fill-extrusion-height": ["*", ["get", "DSCS"], 3],
                    "fill-extrusion-base": 0,
                    "fill-extrusion-opacity": 0.8
                }
            },

            {
                id: "XRegion_TownBoundaryCenterP",
                type: "symbol",
                source: "XRegion_TownBoundaryCenterP",
                "source-layer": "XRegion_TownBoundaryCenterP",
                layout: {
                    "text-field": "{XZQMC}",
                    "text-offset": [0, -0.5],
                    "text-max-width": 8
                },
                paint: {
                    "text-color": "hsl(0, 0%, 90%)",
                    "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
                    "text-halo-width": 1
                }
            },
        ]
    },
    /*3D建筑*/
    JBuilding: {
        id: "3D-Building",
        source: "JBuilding",
        "source-layer": "JBuilding",
        type: "fill-extrusion",
        minzoom: 12.7,
        layout: {
            visibility: "visible"
        },
        paint: {
            "fill-extrusion-color": "rgb(94, 79, 162)",
            "fill-extrusion-height": ["*", ["get", "DSCS"], 3],
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.8
        }
    },
    xzc_rk: {
        id: "xzc_rk",
        source: "WGrid_SecondGrid",
        "source-layer": "WGrid_SecondGrid",
        type: "fill-extrusion",
        maxzoom: 13.5,
        layout: {
            visibility: "visible"
        },
        filter: ["==", ["get", "类型"], "行政村"],
        paint: {
            "fill-extrusion-color": [
                "interpolate", ["linear"],
                ["to-number", ["get", "户籍人口"]],
                0,
                "#091220",
                1000,
                "rgb(253,251,194)",
                1300,
                "rgb(255,214,154)",
                1600,
                "rgb(252,170,120)",
                1900,
                "rgb(244,136,100)",
                2200,
                "rgb(239,95,105)",
                2500,
                "rgb(216,64,111)",
                2800,
                "rgb(174,58,119)",
                3100,
                "rgb(141,40,134)",
                3400,
                "rgb(107,30,126)",
                3700,
                "rgb(76,20,109)",
                4000,
                "rgb(32,19,72)"
            ],
            "fill-extrusion-height": ["/", ["to-number", ["get", "户籍人口"]], 10],
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.9
        }
    },
    sq_rk: {
        id: "sq_rk",
        source: "WGrid_SecondGrid",
        "source-layer": "WGrid_SecondGrid",
        type: "fill-extrusion",
        maxzoom: 13.5,
        layout: {
            visibility: "visible"
        },
        filter: ["==", ["get", "类型"], "社区"],
        paint: {
            "fill-extrusion-color": [
                "interpolate", ["linear"],
                ["to-number", ["get", "户籍人口"]],
                0,
                "#091220",
                1000,
                "rgb(253,251,194)",
                1300,
                "rgb(255,214,154)",
                1600,
                "rgb(252,170,120)",
                1900,
                "rgb(244,136,100)",
                2200,
                "rgb(239,95,105)",
                2500,
                "rgb(216,64,111)",
                2800,
                "rgb(174,58,119)",
                3100,
                "rgb(141,40,134)",
                3400,
                "rgb(107,30,126)",
                3700,
                "rgb(76,20,109)",
                4000,
                "rgb(32,19,72)"
            ],
            "fill-extrusion-height": ["/", ["to-number", ["get", "户籍人口"]], 10],
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.9
        }
    },
    xzc_rk_text: {
        id: "xzc_rk_text",
        type: "symbol",
        source: "WGrid_SecondGrid_CenterPoint",
        "source-layer": "WGrid_SecondGrid_CenterPoint",
        filter: ["==", ["get", "类型"], "行政村"],
        layout: {
            "text-field": "{NAME}",
            "text-offset": [0, -0.5],
            "text-max-width": 8
        },
        paint: {
            "text-color": "hsl(0, 0%, 90%)",
            "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
            "text-halo-width": 1
        }
    },
    sq_rk_text: {
        id: "sq_rk_text",
        type: "symbol",
        source: "WGrid_SecondGrid_CenterPoint",
        "source-layer": "WGrid_SecondGrid_CenterPoint",
        filter: ["==", ["get", "类型"], "社区"],
        layout: {
            "text-field": "{NAME}",
            "text-offset": [0, -0.5],
            "text-max-width": 8
        },
        paint: {
            "text-color": "hsl(0, 0%, 90%)",
            "text-halo-color": "hsla(0, 0%, 10%, 0.75)",
            "text-halo-width": 1
        }
    }
}