## userApi -> 用户

#### `login`

- `/usrapi/login`
- methods : **post**
- params :`username/email,password`

#### `logout`

- `/usrapi/logout`
- methods : **get**

#### `register`

- `/usrapi/register`
- methods : **post**
- params : `username, password, email, verifyCode`

#### `verify`

- `/usrapi/verify`
- methods : **get**
- params : `email`

#### `getUser`

- `/usrapi/getUser`
- methods : **get**

### `findPassword`

- `/usrapi/findPassword`
- methods : **post**
- params : `email,password,verifyCode`

## adapi -> 管理员

### `admin`

- `/adapi`
- methods : **get**
- 由于`/adapi/`已经配置了拦截器，有权限才有返回

### `userList`用户列表

- `/adapi/userList`
- methods : **get**


### `userFreeze`冻结/解冻用户

- `/adapi/userList`
- methods : **post**
- params : `username`
<!-- 也能用邮箱 -->

### `userDelete`删除用户

- `/adapi/userDelete`
- methods : **post**
- params : `username`



<!-- Note that you must install either multer@1.x (Buffer) or multer@2.x (Streams):

npm install --save @koa/multer multer -->