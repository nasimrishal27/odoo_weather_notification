# -*- coding: utf-8 -*-
import requests
from odoo import http


class WeatherNotification(http.Controller):
    @http.route('/weather/notification', type='json', auth='user')
    def weather_notification(self, city=''):
        weather_data = {'data': False}
        weather_api = http.request.env['ir.config_parameter'].sudo().get_param('res.config.settings.weather_api_key')
        if city:
            city_name = city
        else:
            city_name = http.request.env.user.partner_id.city
        try:
            url = f'https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={weather_api}'
            city_req = requests.get(url, timeout=20)
            if city_req.status_code == 200:
                weather_data = city_req.json()
        except Exception:
            pass
        return weather_data
