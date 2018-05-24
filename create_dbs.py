#!/usr/bin/python3

import sqlite3

conn = sqlite3.connect('game.db')

c = conn.cursor()

c.execute('''CREATE TABLE user (
user_id integer PRIMARY KEY AUTOINCREMENT,
user_name text,
pass_wd text,
loc_id integer,
score integer,
config text
)
''')

c.execute('''CREATE TABLE file (
file_id integer PRIMARY KEY AUTOINCREMENT,
file_name text,
loc_id integer,
user_id integer
)
''')

c.execute('''CREATE TABLE location (
loc_id integer PRIMARY KEY AUTOINCREMENT,
up integer
)
''')

c.execute('''CREATE TABLE collection (
user_id integer,
file_id integer
)
''')

conn.commit()

conn.close()
