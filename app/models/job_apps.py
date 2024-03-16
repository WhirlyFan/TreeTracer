from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash

class JobApps(db.Model):
    __tablename__ = 'job_apps'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String, nullable=False)
    job_title = db.Column(db.String, nullable=False)
    post_url = db.Column(db.String)
    salary = db.Column(db.Integer)
    location = db.Column(db.String)
    description = db.Column(db.String)
    deadline = db.Column(db.String)
    notes = db.Column(db.String)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    #relationships
    list = db.relationship('List', back_populates='jobapps') #foreign_keys=[list_id]

    def to_dict(self):
        return {
            'id': self.id,
            'company': self.company,
            'job_title': self.job_title,
            'post_url': self.post_url,
            'salary': self.salary,
            'location': self.location,
            'description': self.description,
            'deadline': self.deadline,
            'notes': self.notes,
            'list_id': self.list_id,
            'created_at': self.created_at
        }
