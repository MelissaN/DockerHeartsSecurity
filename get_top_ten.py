#!/usr/bin/python3

def get_top_ten():
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT user_name, score from user order by score desc limit 10');

    return c.fetchall()

    conn.commit()

    conn.close()
