from main import *

with app.app_context():
    u1 = User('test@test.com',"123")
    db.session.add(u1)
    db.session.commit()

    u2 = User('test2@test.com',"456")
    db.session.add(u2)
    db.session.commit()

    s1 = Subscription('Suscripción Mensual',30,60)
    db.session.add(s1)
    db.session.commit()
    
    s2 = Subscription('Suscripción Anual',365,600)
    db.session.add(s2)
    db.session.commit()