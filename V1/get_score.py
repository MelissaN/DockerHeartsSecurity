#!/usr/bin/python3

def get_score(user_id):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT score from user WHERE user_id=(?)', (user_id,))

    return c.fetchone()[0]

    conn.commit()

    conn.close()
