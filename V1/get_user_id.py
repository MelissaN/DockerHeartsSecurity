#!/usr/bin/python3

def get_user_id(user_name, pass_wd):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT user_id from user WHERE user_name=(?) and pass_wd=(?)',
              (user_name, pass_wd))

    res = c.fetchone()
    if res == None:
        return -1
    return res[0]

    conn.commit()

    conn.close()

def get_all_users():
	import sqlite3
	conn = sqlite3.connect('game.db')
	c = conn.cursor()

	c.execute('SELECT * from user')
	return c.fetchone()
