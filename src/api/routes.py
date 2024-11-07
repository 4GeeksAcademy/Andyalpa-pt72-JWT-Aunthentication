"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import hashlib

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def sign_up():
    body = request.get_json()
    user_email = body['email']
    user_password = hashlib.sha256(body['password']).encode("utf-8")
    new_user = User(email = user_email, password = user_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify('New user created'), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    user_email = body['email']
    user_password = hashlib.sha256(body['password']).encode("utf-8")
    user = User.query.filter_by(email = user_email, password = user_password)
    if user and user.password == user_password:
        access_token = create_access_token(identity = user.id)
        return jsonify(access_token = access_token, user = user)
    else:
        return jsonify('User does not exist'), 200
    
@api.route('/profile', methods=['GET'])
@jwt_required
def get_user():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id = user_id).first()
    return jsonify(email = user.email, name = user.name), 200
    

