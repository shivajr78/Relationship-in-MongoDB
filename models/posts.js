const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


//creating schema
const userSchema = new Schema({
    username: String,
    email: String,
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

//creating model
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post",postSchema);

//add data function

const addData = async()=>{
    //adding user info
    // let user1 = new User({
    //     name : "Shreya123",
    //     email : "Shreyakaushik@gmail.com"
    // }); 
    
    // As user is already saved in database so to new post we don't need to defined user details again.. that's why we just 
    // we abstract the user from db 

    let user = await User.findOne({name : "Shreya123"});

    //adding post info
    let post2 = new Post({
        content : "Data Structures and Algorithms using Java - by Apnacollege's Alpha",
        likes : 305,
    })

    // post1.user = user1; // post1 k user field variable m user1 ko initialize kr diya
    post2.user = user;

    // await user1.save(); // save user1 data into database
    // await post1.save(); // save post1 data into database


    await post2.save(); // save post2 data into database
}

// addData(); //calling function

const del = async ()=>{
    await User.findByIdAndDelete("652e930670271337112f0f53")
}
del();