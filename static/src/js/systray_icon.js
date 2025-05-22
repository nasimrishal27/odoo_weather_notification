/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

class WeatherSystray extends Component {
    setup() {
        this.state = useState({
            city: "",
            main: "",
            description: "",
            temp: "",
            temp_min: "",
            temp_max: "",
            humidity: "",
            wind_speed: "",
            rain: "",
            icon: "",
            updated_at: "",
        });

        onWillStart(async () => {
            const result = await rpc("/weather/notification", {});
            const main = result.main;
            const weather = result.weather[0];

            this.state.city = result.name;
            this.state.main = weather.main;
            this.state.description = weather.description;
            this.state.temp = (main.temp - 273.15).toFixed(1);
            this.state.temp_min = (main.temp_min - 273.15).toFixed(1);
            this.state.temp_max = (main.temp_max - 273.15).toFixed(1);
            this.state.humidity = main.humidity;
            this.state.wind_speed = result.wind.speed;
            this.state.rain = result.rain?.["1h"] || "0";
            this.state.icon = weather.icon;

            const date = new Date(result.dt * 1000); // Convert from epoch
            this.state.updated_at = date.toLocaleString();
        });
    }
}

WeatherSystray.template = "weather_notification.WeatherSystray";

export const systrayWeatherItem = {
    Component: WeatherSystray,
};
registry.category("systray").add("weather_notification.systray", systrayWeatherItem, { sequence: 1 });
