#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals


class FieldLimiter(object):
    def __init__(self, *args, **kwargs):
        # Instantiate the superclass normally
        super(FieldLimiter, self).__init__(*args, **kwargs)

        if 'request' in self.context:
            fields = self.context['request'].query_params.get('fields')
            if fields:
                fields = fields.split(',')
                # Drop any fields that are not specified in the `fields` argument.
                allowed = set(fields)
                existing = set(self.fields.keys())
                for field_name in existing - allowed:
                    self.fields.pop(field_name)