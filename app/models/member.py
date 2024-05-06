from typing import List, Type
from .db import db, is_production, SCHEMA, add_prefix_for_prod

member_parent = db.Table(
    'member_parent',
    db.Model.metadata,
    db.Column('parent_member_id', db.Integer, db.ForeignKey(add_prefix_for_prod('members.id')), primary_key=True),
    db.Column('child_member_id', db.Integer, db.ForeignKey(add_prefix_for_prod('members.id')), primary_key=True)
)

class Member(db.Model):
    __tablename__ = 'members'

    if is_production:
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    alternate_name = db.Column(db.String(255), nullable=True)
    # TODO: integrate image hosting service for pictures
    picture = db.Column(db.String(255), nullable=False, default="https://p1.hiclipart.com/preview/804/495/734/person-silhouette-portrait-man-photography-profile-of-a-person-bust-stock-photography-png-clipart.jpg")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    #relationships
    parents = db.relationship('Member', secondary=member_parent, primaryjoin=id==member_parent.c.child_member_id, secondaryjoin=id==member_parent.c.parent_member_id, backref='children')
    trees = db.relationship('Tree', secondary='tree_member', back_populates='members')
    # user = db.relationship('User', back_populates='member', primaryjoin='User.id==Member.id', cascade='all, delete-orphan')

    def add_parents(self, parents: List[Type['Member']]):
        for parent in parents:
            if parent not in self.parents:
                self.parents.append(parent)

    def remove_parents(self, parents):
        for parent in parents:
            if parent in self.parents:
                self.parents.remove(parent)


    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'alternate_name': self.alternate_name,
            'picture': self.picture,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
