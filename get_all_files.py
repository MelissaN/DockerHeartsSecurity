#!/usr/bin/python3

def get_all_files():
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT * from file')

    return(c.fetchall())

    conn.commit()

    conn.close()
