#!/usr/bin/env python3
''' one-time script to create game database '''

import sqlite3

conn = sqlite.connect('game.db')

c.execute('''CREATE TABLE player (
        player_id integer PRIMARY KEY AUTOINCREMENT,
        player_name text,
        password text,
        score integer
)
''')

c.execute('''CREATE TABLE file (
        file_id integer PRIMARY KEY AUTOINCREMENT,
        file_name text,
        player_id int
)
''')

conn.commit()
conn.close()
