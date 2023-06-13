### Project setup

#### Flask framework

- py -3 -m venv .venv
- .venv\Scripts\activate
- pip install -r requirements.txt

<!-- pip freeze > requirements.txt --> => to save the packages
<!-- pip install -r requirements.txt --> => to install the packages




Admin User

{
    "_id" : "admin_001",
    "email" : "admin@blog.com",
    "name" : "Admin",
    "access" : "admin",
    "password" : "admin",
    "photoUrl" : "https://res.cloudinary.com/dz878qel5/image/upload/v1683974959/blogeee/blogeee_logo_pf6bgq.jpg"
}

{
    "_id" : "user_001",
    "email" : "user@blog.com",
    "name" : "User",
    "access" : "user",
    "password" : "user",
    "photoUrl" : "https://res.cloudinary.com/dz878qel5/image/upload/v1683974959/blogeee/blogeee_logo_pf6bgq.jpg"
}