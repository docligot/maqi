<img src="https://github.com/docligot/maqi/blob/main/images/maqi_logo.png" align="left" height="60" width="60" >

# Mobility over Air Quality Index (MAQI)

## Welcome to MAQI

This repository contains the worksheets, code, and materials used for MAQI developed for the [EO Dashboard Hackathon](https://www.eodashboardhackathon.org/). 

## Challenge: Multi-mission Earth Observation Data Visualization

MAQI is our answer to the [Multi-mission Earth Observation Data Visualization challenge](https://www.eodashboardhackathon.org/challenges/interactive-data-exploration/multi-mission-earth-observation-data-visualization/details) under the EO Dashboard hackathon. We’ve chosen to focus on Air Quality (NO2) and Google Mobility data. Logically movement and transportation could impact air pollution levels. During the COVID-19 lockdowns, communities all over the world experienced dramatic drops in mobility and improved air quality. Now that countries are recovering from the pandemic lockdowns, mobility is coming back and air quality is deteriorating again. 

NO2 Dashboard | Mobility Dashboard
--- | --- 
![NO2 Dashboard](https://github.com/docligot/maqi/blob/main/images/no2_eo_dashboard.PNG) | ![Mobility dashboard](https://github.com/docligot/maqi/blob/main/images/mobility_eo_dashboard.PNG)

Although mobility and air quality data are viewable separately on the EO Dashboard, it is not easy to relate these trends against each other. 

Our challenge is to devise a way to fuse information from mobility and air quality datasets together in an interactive way that can tell the story of how mobility affects air quality and also detect which areas are recovering their mobility without generating more pollution. 

## Developing the MAQI

MAQI combines various mobility indicators from Google with Tropospheric NO2 to generate an index of mobility against air quality. By combining these indicators, we can get a gauge not just of how mobility is recovering post-pandemic, but also whether an area is generating more or less NO2 relative to the mobility being measured. 

Google Mobility Indices | Mobility vs. NO2 | MAQI
--- | --- | ---
![Google Mobility Indices](https://github.com/docligot/maqi/blob/main/images/google_mobility_data.PNG) | ![Mobility vs. NO2](https://github.com/docligot/maqi/blob/main/images/Residential_NO2_Index.PNG) | ![Residential MAQI Index](https://github.com/docligot/maqi/blob/main/images/Residential_MAQI.PNG)

## Data preparation

We downloaded Google Mobility Data for a 1-year period from Google. We decided to go for regional disaggregation since only country level is available on EO Dashboard. 

To align the spatial coverage, we defined polygons on the Sentinel EO Playground API and FIS API to extract NO2 time-series from Sentinel 5P mission for those polygons. 

To align temporal coverage, although both mobility and NO2 data were available daily, there were some days when NO2 had missing values. For these cases, we substituted the most recent value for NO2 to complete the dataset. 

![Missing Values](https://github.com/docligot/maqi/blob/main/images/missing_values.PNG)

## Calculating MAQI

Min-max Scaling | Smoothing | MAQI Index
--- | --- | ---
To make the data comparable, we implemented Min-Max scaling for both the mobility and NO2 indicators. | We then created indices by smoothing both indicators using a 10-period moving average to remove the random fluctuations and see a more consistent trend. | We divide the mobility index by the NO2 index to create our MAQI value.
![Formula Min-max Scalar](https://github.com/docligot/maqi/blob/main/images/formula_scaling.PNG) | ![Formula Smoothing](https://github.com/docligot/maqi/blob/main/images/formula_moving_average.PNG) | ![Formula MAQI Index](https://github.com/docligot/maqi/blob/main/images/formula_maqi.PNG)
![Min-max Scalar](https://github.com/docligot/maqi/blob/main/images/mix_max_scalar.PNG) | ![Smoothing Index](https://github.com/docligot/maqi/blob/main/images/smoothing_index.PNG) | ![MAQI Index](https://github.com/docligot/maqi/blob/main/images/maqi_index.PNG)

## Impact and Usage

MAQI brings a better understanding of the air quality trends. When MAQI is high, it means societies are generating more movement compared to pollution. When MAQI is low, it means pollution is getting ahead of mobility. We are looking to visualize the regional disaggregated data of MAQI on the EO Dashboard, to make it possible to benchmark the MAQI performance within countries, and show which areas are recovering post-pandemic but keeping pollution in check. Since disaggregated mobility and NO2 data are available for all countries, MAQI can easily be adapted for use for any country or location. These can easily be integrated onto EO Dashboard with aligned spatial resolution (daily) and aggregation (region or state level) for better insight.

High-Low Trend | Chloropleth Visualization | Chloropleth Animation
--- | --- | ---
![High-Low Trend](https://github.com/docligot/maqi/blob/main/images/maqi_hi_low.PNG) | ![Chloropleth](https://github.com/docligot/maqi/blob/main/images/chloropleth_maqi.PNG) | ![Chloropleth Animation](https://github.com/docligot/maqi/blob/main/images/maqi.gif)

## Further Study

We studied each mobility metric and they have distinct effects and relationships with NO2. This can provide the foundation of doing more detailed multi-variate models of NO2 driven by mobility. 

![Scatterplot](https://github.com/docligot/maqi/blob/main/images/mobility_scatter_plots.PNG)

## Resources

We used the following to create MAQI: 
* [TROPOMI](http://www.tropomi.eu/)
* [Google Mobility](https://www.google.com/covid19/mobility/)
* [Sentinel Playground](https://www.sentinel-hub.com/explore/sentinelplayground/)
* [Sentinel FIS](https://www.sentinel-hub.com/develop/api/ogc/fis-request/)
* [EO Dashboard](https://eodashboard.org/)

## Authors

MAQI was developed by: 

* [Michael Lance Domagas](https://www.linkedin.com/in/catch2t8/) - Team Lead, Space Researcher
* [Arturo Caronongan III](https://www.linkedin.com/in/arturo-caronongan-130970a6/) - Data Researcher
* [Mark Neil Pascual](https://www.linkedin.com/in/markpascual1986/) - Data Engineer
* [Dominic Vincent Ligot](https://www.linkedin.com/in/docligot/) - Data Analyst

## License

This work is provided under the terms of Creative Commons Attribution Share Alike 4.0 International ([CC-BY-SA-4.0](https://choosealicense.com/licenses/cc-by-sa-4.0/)) license.
