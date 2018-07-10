#!/usr/bin/python3

def get_user_location(user_id):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT loc_id from user WHERE user_id=(?)', (user_id,))

    res = c.fetchone()
    if res == None:
        return None
    return res[0]

    conn.commit()

    conn.close()

def create_file(file_name, user_id):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    loc_id = get_user_location(user_id)

    c.execute('INSERT INTO file (file_name, loc_id, user_id) VALUES (?, ?, ?)',
              (file_name, loc_id, user_id))

    conn.commit()

    conn.close()
