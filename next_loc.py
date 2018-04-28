#!/usr/bin/python3

def update_user_loc(user_id, direc):
    import sqlite3

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    c.execute('SELECT loc_id from user WHERE user_id=(?)', (user_id,))

    current_loc = c.fetchone()[0]

    new_loc = next_loc(current_loc, direc)

    if new_loc == 0:
        return;

    c.execute('UPDATE user SET loc_id=(?) WHERE user_id=(?)', (new_loc, user_id))

    conn.commit()

    conn.close()

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

    return c.fetchone()[0]

    conn.commit()

    conn.close()
