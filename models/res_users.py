# -*- coding: utf-8 -*-
from odoo import fields,models


class ResUser(models.Model):
    _inherit = 'res.users'

    weather_api_key = fields.Char('Weather API Key')