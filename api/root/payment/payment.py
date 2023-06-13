from flask_restful import Resource
from flask import request
from root import   mongo
import razorpay

from root.config import RAZORPAY_KEY, RAZORPAY_SECRET
from root.payment.__schema__ import PaymentSuccessSchema


# RAZORPAY_KEY = "rzp_test_mb4Rk5VyeSsKy3",
# RAZORPAY_SECRET = "OX7u4kOwwSIpoA1374eklfWS"


#mongoDB
mdb = mongo

# {
#   "id": "order_KD1SGEDAcXhVy0",
#   "entity": "order",
#   "amount": 500,
#   "amount_paid": 0,
#   "amount_due": 500,
#   "currency": "INR",
#   "receipt": "order_rcptid_11",
#   "offer_id": null,
#   "status": "created",
#   "attempts": 0,
#   "notes": [],
#   "created_at": 1662119679
# }


class InitiatePayment(Resource):
    # @jwt_required()
    def get(self):
        client = razorpay.Client(auth=(RAZORPAY_KEY, RAZORPAY_SECRET))

        data = { "amount": 500 * 100, "currency": "INR", "receipt": "order_rcptid_11" }

        payment = client.order.create(data=data)
        
        razorpay_order = {
                "order_id": payment["id"],
                "key": RAZORPAY_KEY,
                "amount": payment["amount"]  ,
                "currency":payment["currency"],
                "name": "Acme Corp",
                "description": "Test Transaction",
                "created_at": payment["created_at"],
                "image": " ",
                "prefill": {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9999999999"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
        }

        return {
            "status" : 1,
            "class" : "success",
            "message": "Payment Initiated Successfully!",
            "payload": razorpay_order
        }   
        


# razorpay_payment_id: 'pay_KD5hXLUdpntd3E',
# razorpay_order_id: 'order_KD5hTDyswTudMv',
# razorpay_signature: '1d26823809248c411b7680d6186c476da46e7f8b7901b2e40bad01cfb89b8558'


class RequestPaymentSuccess(Resource):
    def post(self):
        input = request.get_json(silent=True)
        print('input: ', input)
        data = input["data"]
        print('data: ', data)
        form = PaymentSuccessSchema().load(data)
        client = razorpay.Client(auth = (RAZORPAY_KEY, RAZORPAY_SECRET))
        


        response = client.utility.verify_payment_signature(form)

        return {
            "status" : 1,
            "class" : "success",
            "message": "successfully",
            "payload": response
        }   
