from flask import Blueprint
from flask_login import login_required
from app.models import Member

member_routes = Blueprint('members', __name__)


@member_routes.route('')
@login_required
def members():
    """
    Query for all members and returns those members in a dictionary
    """
    members = Member.query.all()
    return {"members": [member.to_dict() for member in members]}


@member_routes.route('/<int:id>')
@login_required
def member(id):
    """
    Query for a specific member and returns that member in a dictionary
    """
    member = Member.query.get(id)
    return member.to_dict()
