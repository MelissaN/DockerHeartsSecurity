#!/usr/bin/python3

def create_file(file_name, loc_id, user_id):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('INSERT INTO file (file_name, loc_id, user_id) VALUES (?, ?, ?)',
              (file_name, loc_id, user_id))

    conn.commit()

    conn.close()
'''
def get_file(file_name):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT file_id from file WHERE file_name=(?)', (file_name,))

    return c.fetchall()

    conn.commit()

    conn.close()

def update_file_name(file_name):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    file_id = get_file(file_name)

    c.execute('UPDATE file SET file_name=(?) WHERE file_name =(?)',
              (file_name,'{}{}'.format(file_name, file_id)))

    conn.commit()

    conn.close()
'''
