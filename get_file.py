#!/usr/bin/python3

def get_file(file_id):
	import sqlite3

	conn = sqlite3.connect('game.db')

	c = conn.cursor()

	c.execute('SELECT * from file WHERE file_name=(?)', (file_id,))

	return c.fetchone()

	conn.commit()

	conn.close()
