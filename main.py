from flask import Flask, render_template, url_for, redirect, request, session
from flask_sqlalchemy import SQLAlchemy

users_online = []
uygulama = Flask(__name__)



uygulama.config["SECRET_KEY"] = "5b67e0f2050ef0afe2737e9d8320e6e1"
uygulama.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

db = SQLAlchemy(uygulama)


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"Company('{self.id}','{self.name}','{self.email}', '{self.password}')"


@uygulama.route('/tables')
def tabs():
    if "existing_user_by_email" in session:
        return render_template('tables.html')
    else:
        return redirect(url_for("login"))


@uygulama.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == "POST":
        cname = request.form.get("cname")
        email = request.form.get("email")
        psw = request.form.get("psw")

        if Company.query.filter_by(email=email).first():
            return redirect(url_for("register"))

        else:
            c = Company(name=cname, email=email, password=psw)
            db.session.add(c)
            db.session.commit()
            return redirect(url_for("login"))
    return render_template('register.html')


@uygulama.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        psw = request.form.get("psw")
        existing_user_by_email = Company.query.filter_by(email=email).first()

        if existing_user_by_email and existing_user_by_email.password == psw:
            session["existing_user_by_email"] = email
            print(existing_user_by_email)
            users_online.append(existing_user_by_email.id)
            return redirect(url_for("tabs"))
        else:
            return redirect(url_for("login"))

    else:
        if "existing_user_by_email" in session:
            return redirect(url_for("tabs"))
        else:
            return render_template('login.html', warning_2=" ")


@uygulama.route('/logout')
def logout():
    session.pop("existing_user_by_email", None)
    return redirect(url_for("login"))


@uygulama.route('/')
def home():
    if "existing_user_by_email" in session:
        return redirect(url_for("tabs"))
    else:
        return redirect(url_for("login"))





@uygulama.route('/test', methods=['POST', 'GET'])
def test():
    cname = request.form.get("cname")
    email = request.form.get("email")
    psw = request.form.get("psw")
    psw_cnfrm = request.form.get("psw_cnfrm")
    if psw == psw_cnfrm:
        c = Company(name=cname, email=email, password=psw)
        db.session.add(c)
        db.session.commit()
        return redirect(url_for("register"))  # sayfayı redirect edersen form bilgileri reset olur

    else:

        return render_template('register.html')


if __name__ == '__main__':
    uygulama.run(debug=True)
