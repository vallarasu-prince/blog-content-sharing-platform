from root.post.post import AddPost, FileUpload, GetAllPosts, GetPostById
from . import post_api


### Add Post
post_api.add_resource(AddPost, '/post/add')

### View post by using post id
post_api.add_resource(GetPostById, '/post/<postId>')

post_api.add_resource(GetAllPosts, '/posts/all')


post_api.add_resource(FileUpload, '/file/upload')






