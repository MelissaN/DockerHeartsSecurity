#!/usr/bin/python3

def create_location(loc_id, check_pt, up, down, right, left):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('INSERT INTO location VALUES (?, ?, ?, ?, ?, ?)',
              (loc_id, check_pt, up, down, right, left))

    conn.commit()

    conn.close()
