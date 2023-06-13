from root.user.account import CurrentUser
from root.user.auth import Login, Register
from . import user_api

##auth
user_api.add_resource(Login, '/login')
user_api.add_resource(Register, '/register')

### Current user
user_api.add_resource(CurrentUser, '/currentUser')





