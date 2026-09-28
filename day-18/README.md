###
- Introduction of MongoDb, MongoDB Atlas setup
- in this day-18 learning, all controller code i used inside `Routes Dir`.
- implemented image upload using multer 

## Routes
**User Route**
- POST - `/user/signup`  User Registration
- POST - `/user/login`  User Login
- GET - `/user/profile` get user profile (jwt token auth required).
- PATCH - `/user/update`  update user name
- POST - `/uploadimg` user can upload image in disk storage(working folder)
---
**Admin Route (update admin in MongoDb atlas studio)**
- GET -  `/admin/alluser` - get all user data
- GET -  `/admin/user/:id` - get user by id

### file/image upload using multer

- Install Multer
- `pnpm add multer`
- Multer handles `multipart/form-data`, the format used for file uploads. With `upload.single('profileImage')`, it places the uploaded file information in `req.file`


## You have two choices:
| Goal                             | Multer storage     |       Save in MongoDB                               |
|----------------------------------|--------------------|-----------------------------------------------------|
| Keep image in a folder           | `diskStorage()`    | File path                                           |
| Keep image in memory temporarily | `memoryStorage()`  | Upload the buffer somewhere, then save its URL/path |


