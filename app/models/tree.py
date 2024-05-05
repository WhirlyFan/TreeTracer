from .db import db, is_production, SCHEMA, add_prefix_for_prod


tree_member = db.Table(
    'tree_member',
    db.Model.metadata,
    db.Column('tree_id', db.Integer, db.ForeignKey(add_prefix_for_prod('trees.id')), primary_key=True),
    db.Column('member_id', db.Integer, db.ForeignKey(add_prefix_for_prod('members.id')), primary_key=True)
)

if is_production:
    tree_member.schema = SCHEMA

class Tree(db.Model):
    __tablename__ = 'trees'

    if is_production:
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    parent_tree_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('trees.id')))
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    #relationships
    user = db.relationship('User', back_populates='trees', primaryjoin='User.id==Tree.user_id', cascade='all, delete-orphan')
    parent_tree = db.relationship('Tree', back_populates='trees', primaryjoin='Tree.parent_tree_id==Tree.id', cascade='all, delete-orphan')
    members = db.relationship('Member', secondary=tree_member, back_populates='trees', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'parent_tree_id': self.parent_tree_id,
            'name': self.name,
            'members': [member.to_dict_no_trees() for member in self.members],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict_no_members(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'parent_tree_id': self.parent_tree_id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
