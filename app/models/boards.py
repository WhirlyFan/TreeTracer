from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False) 
    name = db.Column(db.String(40), nullable=False)
    avatar = db.Column(db.String, default='https://purepng.com/public/uploads/large/purepng.com-direction-sign-boardobjectsarrowsignobjectdirection-6315218837425dgim.png')
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    #relationships 
    user = db.relationship('User', back_populates='boards') #foreign_keys=[user_id]
    lists = db.relationship('List', back_populates='board', primaryjoin='Board.id==List.board_id', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'avatar': self.avatar,
            'created_at': self.created_at
        }
