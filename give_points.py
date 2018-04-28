#!/usr/bin/python3

def score_from_file(file_name, collector_id, dropper_id):
    my_file = open(file_name, 'r')

    heart_break = my_file.read(1)

    give_points(collector_id, dropper_id, int(heart_break))

    my_file.close()


def give_points(collector_id, dropper_id, heart_break):
    import sqlite3
    from get_score import get_score
    from update_score import update_score

    conn = sqlite3.connect('game.db')

    c = conn.cursor()

    col_score = get_score(collector_id)
    drop_score = get_score(dropper_id)

    if heart_break == 3:
        update_score(dropper_id, col_score + drop_score)
        update_score(collector_id, 0)
    else:
        update_score(dropper_id, drop_score + 2)
        update_score(collector_id, col_score + 10)

    conn.commit()

    conn.close()
