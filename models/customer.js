const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

//example for :  one to upto 1000;
//In Amazon app one user can order multiple orders

// Note : calling one function at a time.. and other function are comment out 
// first we have call addOrder function to add the order than comment out
// second we have to call addcustomer function to add the customer than comment out
// third call populate function to store object id in variable as _id

//Defined orderSchema 
const orderSchema = new Schema({
    item: String,
    price: Number,
});

//Defined customerSchema
const customerSchema = new Schema({
    name: String,
    order: [
        {
            type: Schema.Types.ObjectId, // to take the object id from collections
            ref: "Order",  //this will tell objectid is from which collections
        }
    ]
});


//Define models
const Customer = mongoose.model("Customer", customerSchema);
const Order = mongoose.model("Order", orderSchema);

                                                //adding data to models
//const addCustomer = async () => {
    // let cus1 = new Customer({
    //     name : "Shreya Kaushik",
    // });

    // // abstract info of the orders 
    // let order1 = await Order.findOne({item : "MacBook"});
    // let order2 = await Order.findOne({item : "Airpods"});

    // cus1.order.push(order1);
    // cus1.order.push(order2);

    //    let result =  await cus1.save();
    // console.log(result);
//};

// addCustomer(); //calling above function


                                                // populate function
// const findCustomer = async () => {
//     let result =  await Customer.find({}).populate("order");
//     console.log(result[1]);
// }

// findCustomer();


                                                    //add order information 
// const addOrder = async () => {
//     let result = await Order.insertMany([
//         //order1
//         {
//             item: "MacBook",
//             price: 220000
//         },
//         //order2
//         {
//             item: "Iphone 15",
//             price: 180000
//         },
//         //order3
//         {
//             item: "Airpods",
//             price: 22000
//         }
//     ]);
//     console.log(result);
// }

// addOrder(); //calling above function