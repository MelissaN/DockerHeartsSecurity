#!/usr/bin/python3

def get_config(user_id):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT config from user WHERE user_id=(?)', (user_id,))

    return c.fetchone()

    conn.commit()

    conn.close()
