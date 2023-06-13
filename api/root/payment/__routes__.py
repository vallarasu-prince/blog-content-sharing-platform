from root.payment.payment import InitiatePayment, RequestPaymentSuccess
from . import payment_api

payment_api.add_resource(InitiatePayment, '/pay')
payment_api.add_resource(RequestPaymentSuccess, '/payment/success')


