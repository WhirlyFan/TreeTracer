from flask.cli import AppGroup
from .users import seed_users, undo_users
from .members_and_trees import seed_members_and_trees, undo_members_and_trees

from app.models.db import db, is_production, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if is_production:
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_members_and_trees()
    seed_users()
    seed_members_and_trees()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_members_and_trees()
    # Add other undo functions here
