#!/usr/bin/env python3

import database


class Player():
        ''' character controlled by user '''

        def __init__(self, **kwargs):
                ''' either create new or recreate from old id '''
                if id not in kwargs.keys():
                        database.row_create(**kwargs)
                self.id = ''
                self.x = 0
                self.y = 0
                self.score = 1
                self.files_uploaded = []
                self.files_collected = []

        def execute_file(self, file):
                result = file.run_file()
                if result == 0:
                        new_score = database.data_getter(player, player_id, self.id, score) + 1
                        database.data_setter(player, new_score, update_value, player_id, self.id)
                elif result == 3:
                        database.data_setter(player, 0, update_value, player_id, self.id)
