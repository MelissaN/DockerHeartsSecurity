#!/usr/bin/python3

def create_location(up):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('INSERT INTO location (up) VALUES (?)', (up,))

    conn.commit()

    conn.close()

create_location(1)
create_location(1)
create_location(1)
create_location(1)
create_location(1)
create_location(1)
create_location(1)
create_location(1)
create_location(1)
create_location(1)
create_location(1)
create_location(1)

