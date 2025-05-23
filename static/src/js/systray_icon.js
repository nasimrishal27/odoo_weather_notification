/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";

class WeatherSystray extends Component {
    static template = "weather_notification.WeatherSystray";

    setup() {
        this.state = useState({
            city: "",
            main: "",
            description: "",
            temp: "",
            temp_min: "",
            temp_max: "",
            icon: "",
            updated_at: "",
        });

        onWillStart(() => this.fetchWeatherData());
    }

    async fetchWeatherData(city = null) {
        try {
            const result = await rpc("/weather/notification", { city });
            const main = result.main;
            const weather = result.weather[0];
            this.state.data = !!result.data;
            console.log(this.state.data)
            this.state.city = result.name;
            this.state.main = weather.main;
            this.state.description = weather.description;
            this.state.temp = (main.temp - 273.15).toFixed(1);
            this.state.temp_min = (main.temp_min - 273.15).toFixed(1);
            this.state.temp_max = (main.temp_max - 273.15).toFixed(1);
            this.state.icon = weather.icon;

            const date = new Date(result.dt * 1000);
            this.state.updated_at = date.toLocaleString();
        } catch (error) {
            console.error("Weather fetch error:", error);
        }
    }

    async searchCityWeather(ev) {
        if (ev.key === "Enter") {
            const city = document.getElementById('cityInput').value
            console.log(city)
            if (city) {
                await this.fetchWeatherData(city);
            }
        }
    }
}

export const systrayWeatherItem = {
    Component: WeatherSystray,
};
registry.category("systray").add("weather_notification.systray", systrayWeatherItem, { sequence: 1 });
