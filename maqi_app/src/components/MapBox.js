import React, { useRef, useState } from "react";
import { useEffect } from "react";

import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import HeatMap from "jsheatmap";
import { useSelector } from "react-redux";

const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZG9jbGlnb3QiLCJhIjoiY2p3MHQ5MTViMGVvNzQzdGdicTlwM2o3NCJ9.j4qYChJYSxUy8hNnlXrD-g";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = new ReactMapboxGl({
    accessToken: MAPBOX_TOKEN,
});

const PHLboundingBox = [
    [117.17427453, 5.58100332277],
    [126.537423944, 18.5052273625]]


function MapBox() {

    const selectedDate = useSelector(state => state.selectedDate)
    
    const [viewport, setViewport] = useState({
        style: "mapbox://styles/mapbox/dark-v10",
        containerStyle: {
            height: "100vh",
            width: "100vw",
        },

        zoom: [4],
        fitBoundsOptions: {
            offset: [0, 0],
            padding: {
                top: 150,
                bottom: 150,
                left: 150,
                right: 150,
            },
        },
        fitBounds: PHLboundingBox,
    });
    const [regions, setRegions] = useState([]);
    const [regionLayers, setRegionLayers] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [heatMapColors, setHeatMapColors] = useState([])
    const layerCount = useRef(0);

    const getRegionsData = async () => {
        let response = await axios.get("../data/sample.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        let data = await response.data;
        return await data;
    };

    const getGeoJsonRegionData = async () => {
        let response = await axios.get("../data/regions.geojson", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        await setRegions(response.data.features);
        return await response.data.features;
    };

    const generateColor = (rgb) => {
        return `rgb(${rgb.red * 100}%, ${rgb.green * 100}%, ${rgb.blue * 100}%)`;
    }

    useEffect(() => {

        getRegionsData().then((response) => {
            let mappedData = [];
            for (let [key, value] of Object.entries(response)) {
                mappedData.push(value);
            }
            
            let data = mappedData.filter(data => data.date === selectedDate).pop()
            
            const headings =  Object.keys(data).slice(1)
            const rows = [
                [Object.keys(data).shift(), [...Object.values(data).slice(1,)]]
            ]
            const heatMap = new HeatMap(headings, rows);
            const heatMapData =  heatMap.getData()
            const heatMapColors = heatMapData.rows.pop().cells.colors
            setHeatMapColors(heatMapColors)

            getGeoJsonRegionData().then((response) => {
                let regions = response;
    
                let mappedRegion = regions.map((region, index) => {
                    layerCount.current++;
                    return {
                        data: { ...region },
                        source: {
                            id: `region-source-${layerCount.current}`,
                            type: "geojson",
                            geoJsonSource: { type: "geojson", data: region },
                        },
                        coloredLayer: {
                            id: `region-layer-${layerCount.current}-${layerCount.current}`,
                            sourceId: `region-source-${layerCount.current}`,
                            type: "fill",
                            paint: {
                                "fill-color": generateColor(heatMapColors[index]),
                            },
                        },
                        
                        lineLayer: {
                            id: `region-layer-${layerCount.current}`,
                            sourceId: `region-source-${layerCount.current}`,
                            type: "line",
                            paint: {
                                "line-color": "#fff",
                                "line-width": 0.5,
                            },
                        },
                    };
                });
                setRegionLayers(mappedRegion);
            });

        });

        return () =>{
            setRegionLayers([]);
        }
        
    }, [selectedDate]);

    return (
        <Map {...viewport}>
            {regionLayers.map((region, index) => {
                return (
                    <>
                        <Source {...region.source} key={`region-${index}`} />
                        <Layer
                            {...region.lineLayer}
                            key={`region-line-${index}`}
                        />
                        <Layer
                            {...region.coloredLayer}
                            key={`region-fill-${index}`}
                        />
                    </>
                );
            })}
        </Map>
    );
}

export default MapBox;
