# -*- coding: utf-8 -*-
{
    'name': "Weather Notification",
    'version': '1.0',
    'depends': ['base'],
    'sequence': 2,
    'author': "Suni",
    'category': 'All',
    'description': """
    """,
    'data': [
        'views/res_user_views.xml',
    ],
    'assets': {
       'web.assets_backend': [
           'weather_notification/static/src/js/systray_icon.js',
           'weather_notification/static/src/xml/systray_icon.xml',
       ],
    },
    'installable': True,
    'license': 'LGPL-3',
}

