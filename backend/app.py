from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    is_master = db.Column(db.Boolean, default=False)

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    driver = db.Column(db.String(150), nullable=False)
    reason = db.Column(db.String(300), nullable=False)
    destination = db.Column(db.String(300), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

# Routes
@app.route('/')
def home():
    return jsonify(message="Welcome to the backend of my fullstack app!")

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password, is_master=data.get('is_master', False))
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully!")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username, 'is_master': user.is_master})
        return jsonify(access_token=access_token)
    return jsonify(message="Invalid credentials"), 401

@app.route('/vehicles', methods=['POST'])
@jwt_required()
def add_vehicle():
    current_user = get_jwt_identity()
    if not current_user['is_master']:
        return jsonify(message="Permission denied"), 403
    data = request.get_json()
    new_vehicle = Vehicle(name=data['name'])
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify(message="Vehicle added successfully!")

@app.route('/schedules', methods=['POST'])
@jwt_required()
def add_schedule():
    data = request.get_json()
    vehicle_id = data['vehicle_id']
    start_time = data['start_time']
    end_time = data['end_time']
    existing_schedule = Schedule.query.filter(
        Schedule.vehicle_id == vehicle_id,
        Schedule.start_time < end_time,
        Schedule.end_time > start_time
    ).first()
    if existing_schedule:
        return jsonify(message="Vehicle already scheduled for this time"), 400
    new_schedule = Schedule(
        vehicle_id=vehicle_id,
        user_id=get_jwt_identity()['id'],
        driver=data['driver'],
        reason=data['reason'],
        destination=data['destination'],
        start_time=start_time,
        end_time=end_time
    )
    db.session.add(new_schedule)
    db.session.commit()
    return jsonify(message="Schedule added successfully!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=3000)