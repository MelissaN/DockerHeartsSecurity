#!/usr/bin/env python3
''' inputs and instance into a table '''

import sqlite


def row_create(table_name, **kwargs):
        '''
        table_name ex: player
        kwargs is column names and values
        '''

        conn = sqlite3.connect('game.db')

        c = conn.cursor()

        sql_command = 'INSERT INTO ? (' + '?,' * len(kwargs) +
                      ') VALUES (' + '?,' * len(kwargs) + ')'


        input_values = kwargs.keys()
        input_values += [kwargs[key] for key in input_values]

        c.execute(sql_command, tuple(input_values))
 
        conn.commit()

        conn.close()
