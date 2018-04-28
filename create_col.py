#!/usr/bin/python3

def create_col(user_id, file_id):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('INSERT INTO collection VALUES (?, ?)', (user_id, file_id))

    conn.commit()

    conn.close()
