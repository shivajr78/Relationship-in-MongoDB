const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

//example for :  one to few
// like in Zomato app One user can have few address like home, office or gym etc to order the food

//Defined Schema
const userSchema = new Schema({
    username : String,
    addresses : [
        {   
            _id : false, //don't want special object ids to addresses
            location: String,
            city: String
        },
    ],
})

//Define model
const User = mongoose.model("User",userSchema);

//Make function to enter the data in Schema
const addUser = async()=>{
    let user1 = new User({
        username : "Shreya123",
        addresses : [{  //address 1 define here 
            location : "Sainik Nagar",
            city : "Bahadurgarh",
        }]
    });
    user1.addresses.push({ //address 2 , define here, with another technique
        location : "Kriti Nagar", 
        city : "Delhi" 
    })

   let result =  await user1.save();
   console.log(result);
}


addUser(); //calling the above function here