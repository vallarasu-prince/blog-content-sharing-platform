from marshmallow import Schema, fields



class AddPostSchema(Schema):
    _id = fields.Str(required=True)
    title = fields.Str(required=True)
    post = fields.Dict(required=True)
    content = fields.Str(required=True)
    tags = fields.Str(required=True)