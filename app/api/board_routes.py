from flask import Blueprint, request, session
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages, authorize
from app.models import db, Board
from app.forms.board_form import CreateBoardForm

board_routes = Blueprint('boards', __name__)

#GET ALL
@board_routes.route('', methods=['GET'])
@login_required
def boards():
    """
    Query for all boards and returns them in a list of board dictionaries
    """
    boards = Board.query.all()
    return {'boards': [board.to_dict() for board in boards]}

#GET A BOARD 
@board_routes.route('/<int:boardId>', methods=['GET'])
@login_required
def board(boardId):
    """
    Query for a board by id and returns that board in a dictionary
    """
    board = Board.query.get(boardId)
    if not board:
        return {'errors': ['Board not found']}, 404
    if not authorize(board.user_id):
        return {'errors': ['Unauthorized']}, 401
    return board.to_dict()

#GET ALL USER BOARD
@board_routes.route('users/<int:userId>', methods=['GET'])
@login_required
def user_boards(userId):
    """
    Query for all boards owned by a user and returns them in a list of board dictionaries
    """
    boards = Board.query.filter(Board.user_id==userId).all()
    if not boards:
        return {'errors': ['No boards found']}, 404
    if not authorize(userId):
        return {'errors': ['Unauthorized']}, 401
    return {'boards': [board.to_dict() for board in boards]}

#POST BOARD
@board_routes.route('', methods=['POST'])
@login_required
def create_board():
    """
    Create board
    """
    form = CreateBoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        board = Board(
            user_id=current_user.id,
            name=data['name'],
            avatar=data['avatar']
        )
        db.session.add(board)
        db.session.commit()
        return board.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#UPDATE BOARD
@board_routes.route('/<int:boardId>', methods=['PUT'])
@login_required
def update_board(boardId):
    """
    Updates board based by id
    """
    # NOTE: we could make another form for update 
    form = CreateBoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    board = Board.query.get(boardId)

    if not board:
        return {'errors': ['No board found']}, 404
    if not authorize(board.user_id):
        return {"errors": ["Unauthorized"]}, 401
    if board and form.validate_on_submit():
        board.name = data['name']
        board.avatar = data['avatar']
        db.session.commit()
        return board.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#DELETE BOARD
@board_routes.route('/<int:boardId>', methods=['DELETE'])
@login_required
def delete_board(boardId):
    """
    Deletes board based by id
    """
    board = Board.query.get(boardId)

    if not board:
        return {'errors': ['Board not found']}, 404
    if not authorize(board.user_id):
        return {'errors': ['Unauthorized']}, 401
    db.session.delete(board)
    db.session.commit()
    return {'message': 'Successfully deleted board', 'owner_id': current_user.id}
