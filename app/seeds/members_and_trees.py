from sqlalchemy import text
from app.models import db, Member, Tree, is_production, SCHEMA

silhouette_portrait = "https://p1.hiclipart.com/preview/804/495/734/person-silhouette-portrait-man-photography-profile-of-a-person-bust-stock-photography-png-clipart.jpg"
# Adds a demo user, you can add other users here if you want

def seed_members_and_trees():
    grandma1 = Member(first_name="Jane", last_name="Smith", alternate_name="Grandma Smith", picture=silhouette_portrait)
    grandpa1 = Member(first_name="John", last_name="Smith", alternate_name="Grandpa Smith", picture=silhouette_portrait)
    aunt1 = Member(first_name="Jill", last_name="Doe", alternate_name="Aunt Jill", picture=silhouette_portrait)
    uncle1 = Member(first_name="Jack", last_name="Doe", alternate_name="Uncle Jack", picture=silhouette_portrait)
    cousin1 = Member(first_name="Jenny", last_name="Doe", alternate_name="Cousin Jenny", picture=silhouette_portrait)
    cousin2 = Member(first_name="Jimmy", last_name="Doe", alternate_name="Cousin Jimmy", picture=silhouette_portrait)
    cousin3 = Member(first_name="Jeffery", last_name="Doe", alternate_name="Cousin Jeffery", picture=silhouette_portrait)
    dad = Member(first_name="Joe", last_name="Smith", alternate_name="Dad", picture=silhouette_portrait)
    mom = Member(first_name="Joana", last_name="Smith", alternate_name="Mom", picture=silhouette_portrait)
    brother = Member(first_name="Jim", last_name="Smith", alternate_name="Brother Jim", picture=silhouette_portrait)
    sister = Member(first_name="Jill", last_name="Smith", alternate_name="Sister Jill", picture=silhouette_portrait)
    ego = Member(first_name="Jacob", last_name="Smith", alternate_name="Ego", picture=silhouette_portrait)

    aunt1.add_parents([grandma1, grandpa1])
    cousin1.add_parents([aunt1, uncle1])
    cousin2.add_parents([aunt1, uncle1])
    cousin3.add_parents([aunt1, uncle1])
    dad.add_parents([grandma1, grandpa1])
    brother.add_parents([dad, mom])
    sister.add_parents([dad, mom])
    ego.add_parents([dad, mom])

    tree1 = Tree(user_id=1, name="Demo Tree")
    tree2 = Tree(user_id=2, name="Marnie's Tree")
    tree3 = Tree(user_id=3, name="Bobbie's Tree")

    tree1.add_members([grandma1, grandpa1, aunt1, uncle1, cousin1, cousin2, cousin3, dad, mom, brother, sister, ego])
    tree2.add_members([aunt1, uncle1, cousin1, cousin2, cousin3])
    tree3.add_members([dad, mom, brother, sister, ego])

    db.session.add_all([grandma1, grandpa1, aunt1, uncle1, cousin1, cousin2, cousin3, dad, mom, brother, sister, ego, tree1, tree2, tree3])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_members_and_trees():
    if is_production:
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.member_parent RESTART IDENTITY CASCADE;"))
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.tree_member RESTART IDENTITY CASCADE;"))
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;"))
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.trees RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM member_parent"))
        db.session.execute(text("DELETE FROM tree_member"))
        db.session.execute(text("DELETE FROM members"))
        db.session.execute(text("DELETE FROM trees"))

    db.session.commit()
