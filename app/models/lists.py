from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash

class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    #relationships
    board = db.relationship('Board', back_populates='lists') #foreign_keys=[board_id]
    jobapps = db.relationship('JobApps', back_populates='list', primaryjoin='List.id==JobApps.list_id', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'board_id': self.board_id,
            'created_at': self.created_at
        }
