###
- Introduction of MongoDb, MongoDB Atlas setup
- 

## Routes
- POST - `/user/signup`  User Registration
- POST - `/user/login`  User Login
- GET - `/user/profile` get user profile (jwt token auth required).
- PATCH - `/user/update`  update user name
---
- GET -  `/admin/alluser` - get all user data
- GET -  `/admin/user/:id` - get user by id

### file upload using multer

- Install Multer
- `pnpm add multer`
- Multer handles `multipart/form-data`, the format used for file uploads. With `upload.single('profileImage')`, it places the uploaded file information in `req.file`


## You have two choices:
| Goal                             | Multer storage     |       Save in MongoDB                               |
|----------------------------------|--------------------|-----------------------------------------------------|
| Keep image in a folder           | `diskStorage()`    | File path                                           |
| Keep image in memory temporarily | `memoryStorage()`  | Upload the buffer somewhere, then save its URL/path |


