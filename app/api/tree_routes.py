from flask import Blueprint
from flask_login import login_required
from app.models import Tree

tree_routes = Blueprint('trees', __name__)


@tree_routes.route('')
@login_required
def trees():
    """
    Query for all trees and returns those trees in a dictionary
    """
    trees = Tree.query.all()
    return {"trees": [tree.to_dict() for tree in trees]}


@tree_routes.route('/<int:id>')
@login_required
def tree(id):
    """
    Query for a specific tree and returns that tree in a dictionary
    """
    tree = Tree.query.get(id)
    return tree.to_dict()
