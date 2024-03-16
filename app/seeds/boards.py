from app.models import db, Board, environment, SCHEMA

def seed_boards():
    board1 = Board(
        user_id=1,
        name='Board1'
    )
    board2 = Board(
        user_id=2,
        name='Board2'
    )
    board3 = Board(
        user_id=3,
        name='Board3'
    )

    db.session.add(board1)
    db.session.add(board2)
    db.session.add(board3)
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM boards")
        
    db.session.commit() 
