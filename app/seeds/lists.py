from app.models import db, List, environment, SCHEMA

def seed_lists():
    list1 = List(
        name = 'List1',
        board_id = 1
    )
    list2 = List(
        name = 'List2',
        board_id = 2
    )
    list3 = List(
        name = 'List3',
        board_id = 3
    )

    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")
        
    db.session.commit()   
