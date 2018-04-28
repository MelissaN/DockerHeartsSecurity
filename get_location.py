#!/usr/bin/python3

def get_location(user_id):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT loc_id from location WHERE user_id=(?)', (user_id,))

    return c.fetchall()

    conn.commit()

    conn.close()
