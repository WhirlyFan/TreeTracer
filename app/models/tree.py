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
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    #relationships
    user = db.relationship('User', back_populates='trees', primaryjoin='User.id==Tree.user_id')
    members = db.relationship('Member', secondary=tree_member, back_populates='trees')

    def add_members(self, members):
        for member in members:
            if member not in self.members:
                self.members.append(member)

    def remove_members(self, members):
        for member in members:
            if member in self.members:
                self.members.remove(member)

    def get_members(self):
        return self.members

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
