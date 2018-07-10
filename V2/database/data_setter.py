#!/usr/bin/env python3
''' function for setting values from database '''

import sqlite


def data_setter(table_name, update_name, update_value, search_name, search_value):
        '''
        table_name ex: player, file ...
        input_name/output_name: player_id, player_name ...
        input value ex: 56, miranda
        '''

        conn = sqlite3.connect('game.db')

        c = conn.cursor()

        c.execute('UPDATE ? SET ?=? WHERE ?=?',
                 (table_name, update_name, update_value, search_name, search_value))
 
        conn.commit()

        conn.close()
