# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash

# class JobPostings(db.Model):
#     __tablename__ = 'job_postings'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}
    
#     id = db.Column(db.Integer, primary_key=True)
#     company = db.Column(db.String, nullable=False)
#     job_title = db.Column(db.String, nullable=False)
#     due_date = db.Column(db.String)
#     job_type = db.Column(db.String) #full time, part time, internship
#     status = db.Column(db.String) #open or closed job
#     instructions = db.Column(db.String)
#     description = db.Column(db.String)
#     location = db.Column(db.String)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

#     #relationships
#     postuser = db.relationship('User', back_populates='jobpostings') # foreign_keys=[user_id]

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'company': self.company,
#             'job_title': self.job_title,
#             'due_date': self.due_date,
#             'job_type': self.job_type,
#             'status': self.status,
#             'instructions': self.instructions,
#             'description': self.description,
#             'location': self.location,
#             'user_id': self.user_id,
#             'created_at': self.created_at,
#             'updated_at': self.updated_at
#         }
