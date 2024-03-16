from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Board

#Need validation for valid avatar import

class CreateBoardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Board name is required"), Length(
        min=2, max=40, message='List name must be between 2 and 40 characters long.')])
    avatar = StringField('avatar')
