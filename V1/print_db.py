#!/usr/bin/python3

def print_all():
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT * from user')

    print('user: ', c.fetchall())

    c.execute('SELECT * from file')

    print('file: ', c.fetchall())

    c.execute('SELECT * from location')

    print('location: ', c.fetchall())

    c.execute('SELECT * from collection')

    print('collection: ', c.fetchall())

    conn.commit()

    conn.close()
