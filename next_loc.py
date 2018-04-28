#!/usr/bin/python3

def next_loc(current_loc, direc):

    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    if direc == 'up':
        c.execute('SELECT up from location WHERE loc_id=(?)', (current_loc,))
    elif direc == 'down':
        c.execute('SELECT down from location WHERE loc_id=(?)', (current_loc,))
    elif direc == 'right':
        c.execute('SELECT right from location WHERE loc_id=(?)', (current_loc,))
    elif direc == 'left':
        c.execute('SELECT left from location WHERE loc_id=(?)', (current_loc,))
    else:
        return 0

        return c.fetchall()

        conn.commit()

        conn.close()
