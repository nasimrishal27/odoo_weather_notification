# -*- coding: utf-8 -*-
import requests
from odoo import http


class WeatherNotification(http.Controller):
    @http.route('/weather/notification', type='json', auth='user')
    def weather_notification(self):
        weather_data = {'data': False}
        try:
            url = 'https://api.openweathermap.org/data/2.5' \
                  f'/weather?q={http.request.env.user.partner_id.city}&appid={http.request.env.user.weather_api_key}'
            city_req = requests.get(url, timeout=20)
            if city_req.status_code == 200:
                weather_data = city_req.json()
        except Exception:
            pass
        print(weather_data)
        return weather_data