from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo


class RegistrationForm (FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=5, max=15)])
    email = StringField("Email", validators=[DataRequired(), Email(),Length(max=50)])
    password = PasswordField("Password", validators=[DataRequired(),Length(max=50)])
    confirm_password = PasswordField("Confirm Password", validators=[DataRequired(), EqualTo("password")])
    submit = SubmitField("Sign Up")

class LoginForm (FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email(),Length(max=50)])
    password = PasswordField("Password", validators=[DataRequired(),Length(max=50)])
    remember = BooleanField("Remember me!")
    submit = SubmitField("Log in")