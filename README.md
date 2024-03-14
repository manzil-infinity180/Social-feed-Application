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

https://social-feed-application.onrender.com/api/user/create

Create your account by mentioning these data no need to fill the uuid(unique id for identification) we will generate it automatically by timestamps

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

https://social-feed-application.onrender.com/api/user/login

Login through your "username"
{
   "username":"rahul"
}

```

<br>


```
Method: GET - View Profile
View your profile - your profile data 

https://social-feed-application.onrender.com/api/user/profile


```

<br>


```
Method: PATCH - Update your profile

https://social-feed-application.onrender.com/api/user/update

{
"username":"rahulvs"
}

```

<br>


```
Method: DELETE - Delete a profile

https://social-feed-application.onrender.com/api/user/delete

```

<br>


```
Method: GET View Your all post
From these Route we can see all the post of user that were created

https://social-feed-application.onrender.com/api/post

```

<br>

```
Method: POST - Create a Post

Create your post there is no need to mention the userid because we can easily get it from the logined user

Note That : For creating you have to be authenicated (Logined in)

https://social-feed-application.onrender.com/api/post/create

{
    "text":"Today i have learned how to use Docker and more about containers"
}

```

<br>

```
Method: GET - View a Post

Like id ("65ecb025284a1d79abb2a6df") of post
For getting any specific post you have to mention the id field into the api endpoint and we can get the data using req.params.id

https://social-feed-application.onrender.com/api/post/:id

```


<br>

```
Method: PATCH - Update a Post
We have to mention the id whose you want to update the data 

https://social-feed-application.onrender.com/api/post/update/:id

{
"username":"india2809"
}

```

<br>


```
Method: DELETE - Delete a Post
Same goes with these also - Delete the post using the id

https://social-feed-application.onrender.com/api/post/delete/:id



```



<br>


```
Method: GET - Follow Other
Follow the Other by their id - Just by mentioning the id of that user you want to follow we can handle the case 

https://social-feed-application.onrender.com/api/user/follow/dkfdkjfkkf

```

<br>

```
Method: GET - Unfollow Other
Same as Follow routes - Unfollow the other with the help of id

https://social-feed-application.onrender.com/api/user/unfollow/dkfdkjfkkf

```

<br>

```

Method: GET - List of All followers/following
User can see the full list of follwer and following list
No need to mention any id - we are checking for the authencated user

https://social-feed-application.onrender.com/api/user/list

```

<br>


```
Method: GET - List of Other followers/following
Get the list of user whose he following and also the follower

https://social-feed-application.onrender.com/api/user/other/:id

```

<br>


```
Method: GET - get your all followers
get all the data whom you follow and who is following you

https://social-feed-application.onrender.com/api/user/other/65ecad557bab7de578eb23c5


```


