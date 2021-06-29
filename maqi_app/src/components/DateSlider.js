import { Slider, Paper, Typography, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRegionsData } from "../actions/dataActions";
import { setDate } from "../actions/selectedDateActions";

const useStyles = makeStyles({
    markLabel: {
        color: 'transparent',
    },
    thumb:{
        transform: 'scale(2)'
    },
    track:{
        height:10
    },
    rail:{
        height:10
    },
    mark:{
        display:'none'
    }
})



function DateSlider() {
    const [selectedDate, setSelectedDate] = useState("1/1/2020");
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles()

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

    useEffect(() => {
        getRegionsData().then((response) => {
            setData(response);
            let mappedData = [];
            for (let [key, value] of Object.entries(response)) {
                mappedData.push(value);
            }
            let dates = mappedData.map((data, index) => {
                return { label: data.date, value: index };
            });

            setDates(dates);
        });
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                bottom: 0,
                right: "50%",
                transform: "translateX(50%)",
            }}
        >
            <Paper style={{ width: "80vw", padding:5, backgroundColor:'transparent' }}>
                <Typography variant='h6' style={{padding:5, color:'#fff'}}>Date: { selectedDate }</Typography>
                <Slider
                    classes={classes}
                    defaultValue={0}
                    marks={dates}
                    onChange={(e, newValue) => {
                        let dateSelected = dates[newValue].label;
                        dispatch(setDate(dateSelected));
                        setSelectedDate(dateSelected)
                    }}
                    scale={(x) => x}
                    max={dates.length - 1}
                />
            </Paper>
        </div>
    );
}

export default DateSlider;
