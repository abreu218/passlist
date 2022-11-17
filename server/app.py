from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask(__name__)
cors = CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'app.sqlite')
db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(40), nullable=False, unique=True)
    userPass = db.Column(db.String, nullable=False, unique=False)
    
    def __init__(self, user, userPass):
        self.user = user
        self.userPass = userPass
        
class UserSchema(ma.Schema):
    class Meta:
        fields=('id', 'user','userPass')
        
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class Vault(db.Model):
    vaultID = db.Column(db.Integer, primary_key=True)
    userID = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    vaultAppName = db.Column(db.String, nullable=False)
    vaultUsername = db.Column(db.String, nullable=False)
    vaultPassword = db.Column(db.String, nullable=False)

    def __init__(self, userID, vaultAppName, vaultUsername, vaultPassword):
        self.userID = userID
        self.vaultAppName = vaultAppName
        self.vaultUsername = vaultUsername
        self.vaultPassword = vaultPassword

class VaultSchema(ma.Schema):
    class Meta:
        fields=('vaultID', 'userID', 'vaultAppName', 'vaultUsername', 'vaultPassword')

vault_schema = VaultSchema()
vaults_schema = VaultSchema(many=True)


# TODO Create a helper function to check request data type
def check_type():
    pass
    

# Create a User
@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    
    user = data.get('user')
    userPass = data.get('userPass')
    
    new_user = User(user, userPass)
    
    db.session.add(new_user)
    db.session.commit()
    
    result = user_schema.dump(new_user)
    
    return jsonify({
        'success': True,
        'message': 'User created successfully',
        'user': result
    })
    
# Delete a User
@app.route('/user', methods=['DELETE'])
def delete_user():
    data = request.get_json()
    userID = data.get('id')
    
    user = User.query.filter_by(id = userID).first()
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'user': {}
    })
    
# Update a User
@app.route('/user', methods=['PUT'])
def edit_user():
    data = request.get_json()
    userName = data.get('user')
    userID = data.get('id')
    password = data.get('userPass')
    
    user = User.query.filter_by(id = userID).first()
    user.user = userName
    user.userPass = password
    
    db.sesion.commit()
    
    updated_user = User.query.filter_by(id = userID).first()
    
    result = user_schema.dump(updated_user)
    
    return jsonify({
        'success': True,
        'message': 'User Updated',
        'user': result
    })
    
# Get Users
@app.route('/user', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    
    return jsonify({
        'success': True,
        'message': 'All Users',
        'user': result
})
    
# Login User
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    userName = data.get('user')
    password = data.get('userPass')
    
    user = User.query.filter_by(user = userName).first()
    
    if user.userPass != password:
        return jsonify({
            'success': False,
            'message': 'Incorrect Password'
        })
        
    result = user_schema.dump(user)
        
    return jsonify({
        'success': True,
        'message': 'Login successful',
        'user': result
    })

#TODO Create App info
@app.route('/vault/<int:userID>', methods = ['POST'])
def vault_post(userID):
    data = request.get_json()
    vaultAppName = data.get('vaultAppName')
    vaultUsername = data.get('vaultUsername')
    vaultPassword = data.get('vaultPassword')
    
    newVaultEntry = Vault(userID, vaultAppName, vaultUsername, vaultPassword)
    
    db.session.add(newVaultEntry)
    db.session.commit()
    
    result = vault_schema.dump(newVaultEntry)
    
    return jsonify({
        'success': True,
        'message': 'Vault entry created successfully',
        'vault_entry': result
    })
    
#TODO Get app info
@app.route('/vault/<int:userID>', methods = ['GET'])
def vault_get(userID):
    all_entries = Vault.query.filter_by(userID=userID)
    result = vaults_schema.dump(all_entries)
    
    return jsonify({
        'success': True,
        'message': 'All Entries',
        'vault_entry': result
})
    
#TODO Update App info
app.route('/vault/<int:userID>', methods = ['PUT'])
def vault_update(userID):
    data = request.get_json()
    vaultAppName = data.get('vaultAppName')
    vaultUsername = data.get('vaultUsername')
    vaultPassword = data.get('vaultPassword')
    
    vault_entry = Vault.query.filter_by(userID=userID).first()
    vault_entry.vaultAppName = vaultAppName
    vault_entry.vaultUsername = vaultUsername
    vault_entry.vaultPassword = vaultPassword
    
    db.sesion.commit()
    
    updated_entry = Vault.query.filter_by(userID = userID).first()
    
    result = vault_schema.dump(updated_entry)
    
    return jsonify({
        'success': True,
        'message': 'Entry Updated',
        'vault_entry': result
    })
#TODO Delete App info
@app.route('/vault/<int:userID>', methods=['DELETE'])
def delete_vault_entry(userID):
    data = request.get_json()
    vaultID = data.get('vaultID')
    
    vault_entry=Vault.query.filter_by(userID=userID, vaultID=vaultID).first()
    db.session.delete(vault_entry)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'vault_entry': {}
    })    
    
    
    
if __name__ == '__main__':
    app.run(debug=True)
    