from root.admin.dashboard import DashboardUtils
from . import users_api
from root.admin.users import AddUser, UsersList


users_api.add_resource(UsersList, '/admin/userslist')
users_api.add_resource(AddUser, '/admin/user/add')


### Dashboard
users_api.add_resource(DashboardUtils, '/admin/dashboard/utils')