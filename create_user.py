#!/usr/bin/python3

def create_user(user_name, pass_wd):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('INSERT INTO user (user_name,pass_wd,loc_id,score) VALUES (?, ?, ?, ?)',
              (user_name, pass_wd, 1, 0))

    conn.commit()

    conn.close()
