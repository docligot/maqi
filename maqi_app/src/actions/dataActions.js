import axios from "axios";


export const getRegionsData = async () => {
    let response = await axios.get("../data/sample.json", {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    let data = await response.data;
    return await data
};


