import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MapBox from "./components/MapBox";
import DateSlider from "./components/DateSlider";
import { Provider } from "react-redux";
import store from "./store";
import { Card, CardMedia, CardContent } from "@material-ui/core";
import heatmap_legend from "./images/heatmap_legend.png";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Card style={{ position: "absolute", top: 20, right: 20, zIndex:999, backgroundColor:'transparent', boxShadow:'none' }}>
                <CardContent>
                    <img src={heatmap_legend} style={{width:150, height: 'auto'}}/>
                </CardContent>
            </Card>
            <MapBox />
            <DateSlider />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
