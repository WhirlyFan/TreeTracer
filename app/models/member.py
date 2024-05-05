from .db import db, is_production, SCHEMA, add_prefix_for_prod


class Member(db.Model):
    __tablename__ = 'members'

    if is_production:
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    parent_member_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('members.id')))
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    alternate_name = db.Column(db.String(255))
    # TODO: integrate image hosting service for pictures
    picture = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    #relationships
    parent_member = db.relationship('Member', back_populates='members', primaryjoin='Member.parent_member_id==Member.id', cascade='all, delete-orphan')
    trees = db.relationship('Tree', secondary='tree_member', back_populates='members', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'parent_member_id': self.parent_member_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'alternate_name': self.alternate_name,
            'picture': self.picture,
            'trees': [tree.to_dict_no_members() for tree in self.trees],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict_no_trees(self):
        return {
            'id': self.id,
            'parent_member_id': self.parent_member_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'alternate_name': self.alternate_name,
            'picture': self.picture,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
