### Starting the Server

To start the backend server, follow these steps:

**Step 1: Install Dependencies**

- Run `npm install` to install the required dependencies for the backend.

**Step 2: Start the Server**

- Run `npm start` to launch the server using Nodemon, which automatically restarts the server when changes are made. If you don't have Nodemon installed, you can do so globally by running `npm i -g nodemon`. This will install Nodemon globally on your PC.

These two steps will initiate the backend server, allowing you to access the APIs and services provided by the Social Media App Backend. Ensure that your environment variables are correctly set to enable seamless server operation.

## Environment Variables

To run and deploy the backend successfully, you need to configure the following environment variables based on your deployment environment (Development, Preview, Production):
You can edit below enviroment variable in the sample .env file present in the code base

```
// config.env
PASSWORD=Your_Password
DATABASE=mongodb+srv://username:<PASSWORD>@cluster0.jhs3v7u.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET = american_elite_market_12222222

/__test__/.env
DATABASE=mongodb+srv://testUsename:<PASSWORD>@cluster0.jhs3v7u.mongodb.net/?retryWrites=true&w=majority

```

## Documentation 
Link - https://documenter.getpostman.com/view/27140962/2sA2xh3t1T
```
Method: POST - Create/Signup

http://localhost:5006/api/user/create

Create your account

{
    "username":"rahulvs",
    "email:"rahulvs2809@gmail.com",
    "bio":"i am 2nd year ug student",
    "pic_url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuO6vZOYpxSm05AKYVnO2CEnXosZmBtmWjaTjBxwTOrw&s"
    
}

```

<br>


```
Method: POST - Login to your account

http://localhost:5006/api/user/login

Login through your "username"
{
   "username":"rahul"
}

```

<br>


```
Method: GET - View Profile
http://localhost:5006/api/user/profile

View your profile
```

<br>


```
Method: PATCH - Update your profile

http://localhost:5006/api/user/update

```

<br>


```
Method: DELETE - Delete a profile
http://localhost:5006/api/user/delete

```

<br>


```
Method: GET View Your all post
From these Route we can see all the post of user that were created

http://localhost:5006/api/post

```

<br>

```
Method:  POST
Create a Post
Create your post 
Note That : For creating you have to be authenicated (Logined in)

http://localhost:5006/api/post/create

{
    "text":"Today i have learned how to use Docker and more about containers"
}

```

<br>

```
Method: GET - View a Post
Like id ("65ecb025284a1d79abb2a6df") of post

http://localhost:5006/api/post/:id

```


<br>

```
Method: PATCH - Update a Post

http://localhost:5006/api/post/update
{
"username":"india2809"
}

```

<br>


```
Method: DELETE - Delete a Post

http://localhost:5006/api/post/delete/774477484fff

Delete the post using the id

```



<br>


```
Method: GET - Follow Other

http://localhost:5006/api/user/follow/dkfdkjfkkf
Follow the Other by their id
```

<br>

```
Method: GET - Unfollow Other

http://localhost:5006/api/user/unfollow/dkfdkjfkkf
Unfollow the other with the help of id
```

<br>

```
Method: GET - List of All followers/following
http://localhost:5006/api/user/list

```

<br>


```
Method: GET - List of Other followers/following
http://localhost:5006/api/user/other/:id
Get the list of user whose he following and also the follower
```


<br>

```
Method: GET - 
http://localhost:5006/api/user/
Get all the post of user whom you are following in sorted order - the latest post come first
```

<br>


```
Method: GET - get your all followers

http://localhost:5006/api/user/other/65ecad557bab7de578eb23c5
get all the data whom you follow and who is following you

```


