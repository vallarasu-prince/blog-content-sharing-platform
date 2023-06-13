
from marshmallow import Schema, fields


class AddUserSchema(Schema):
    _id = fields.String(required=False)
    username = fields.String(required=True, error_messages={"required": "Username is required"})
    password = fields.String(required=True, error_messages={"required": "Password is required"})
    fullName = fields.String(required=True, error_messages={"required": "Full Name is required"})
    email = fields.String(required=True, error_messages={"required": "Email is required"})
    access = fields.String(required=True, error_messages={"required": "Access Level is required"})

