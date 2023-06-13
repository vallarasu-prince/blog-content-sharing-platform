from marshmallow import Schema, fields



class UserDetailsSchema(Schema):
    firstname = fields.Str()
    lastname = fields.Str()
    email =  fields.Str()
    mobile =  fields.Str()
    password =  fields.Str()

class RegisterSchema(Schema):
    fullName = fields.Str(required=True, error_messages={"required": "Full Name is required"})
    username = fields.Str(required=True, error_messages={"required": "Username is required"})
    email =  fields.Str(required=True, error_messages={"required": "Email is required"})
    password =  fields.Str(required=True, error_messages={"required": "Password is required"})