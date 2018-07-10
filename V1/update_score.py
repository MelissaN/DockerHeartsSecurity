#!/usr/bin/python3

def update_score(user_id, score):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('UPDATE user SET score=(?) WHERE user_id=(?)', (score, user_id))

    conn.commit()

    conn.close()
