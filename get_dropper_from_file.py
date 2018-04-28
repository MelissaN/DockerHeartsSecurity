#!/usr/bin/python3

def get_dropper_from_file(file_id):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT user_id from file WHERE file_id=(?)', (file_id,))

    return c.fetchone()[0]

    conn.commit()

    conn.close()
