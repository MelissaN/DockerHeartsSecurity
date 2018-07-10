#!/usr/bin/env python3
''' function for getting values from database '''

import sqlite3


def get_value(table_name, search_name, search_value, output_name):
        '''
        table_name ex: player, file ...
        input_name/output_name: player_id, player_name ...
        input value ex: 56, miranda
        '''

        conn = sqlite3.connect('game.db')

        c = conn.cursor()

        c.execute('SELECT ? from ? WHERE ?=?',
                 (output_name, table_name, search_name, search_value))
 
        return c.fetchone()[0]
