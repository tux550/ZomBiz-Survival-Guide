from main import *

with app.app_context():
    me = User('test@test.com',"123")
    db.session.add(me)
    db.session.commit()