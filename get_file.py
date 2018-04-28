#!/usr/bin/python3

from sys import argv

import sqlite3

conn = sqlite3.connect('game.db')

c = conn.cursor()

c.execute('SELECT file_id from file WHERE file_name=(?)', (argv[1],))

string = str(c.fetchall())

print(string[2])

conn.commit()

conn.close()
