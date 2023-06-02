from main import *

with app.app_context():
    me = User('test@test.com',"123")
    db.session.add(me)
    db.session.commit()

    s1 = Subscription('Month Sub',30,60)
    db.session.add(s1)
    db.session.commit()