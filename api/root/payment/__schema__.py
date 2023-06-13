from marshmallow import fields, Schema

class PaymentSuccessSchema(Schema):
    razorpay_payment_id = fields.Str(required=True)
    razorpay_order_id = fields.Str(required=True)
    razorpay_signature = fields.Str(required=True)
    http_status_code = fields.Int(required=False)
