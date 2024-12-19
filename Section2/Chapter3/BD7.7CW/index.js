require('./db/db.connect');

const Post = require('./models/post.model');
const User = require('./models/user.model'); 

// Dummy data for user
const userData ={
    name:"John",
    email:"johnEgmail.com"
}

const addUser = async ()=>{
    try {
        const newUser = new User(userData)
        await newUser.save()
        console.log("user added sucessfully")
        console.log(newUser)
    } catch (error) {
        throw error
    }
}

// addUser() // invoke the function to add new user in db

// Dummy data for post
const postData = {
    title: "Greeting",
    content: "Have a good day!",
    author: '6763ecc1aa5496ca2109d5fb',
}

// function to add post data in db
const addPost = async()=>{
    try {
        const newPost = new Post(postData)
        await newPost.save()
        console.log("post added sucessfully")
        console.log(newPost)
    } catch (error) {
        throw error;
    }
}

// addPost()

// Get all the posts

const getAllPosts = async()=>{
    try {
        const allPosts = await Post.find().populate("author");
        console.log("All Posts:- ", allPosts)
    } catch (error) {
        throw error;
    }
}

getAllPosts()