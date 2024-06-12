const express=require('express')
const app=express()
const foodItemsApp=require('./APIs/foodItems-api')
const userApp=require('./APIs/users-api')
const ordersApp=require('./APIs/orders')
const cors=require('cors')
const bodyParser=require('body-parser')

app.use(cors())
app.use(bodyParser.json())

app.use('/foodItems-api',foodItemsApp)
app.use('/users',userApp)
app.use('/orders',ordersApp)


const mc=require('mongodb').MongoClient
mc.connect('mongodb://localhost:27017')
.then(client=>{
    const dbObj=client.db('vickyfoodz')
    const foodItemsObj=dbObj.collection('foodItems')
    const usersCollectionObj=dbObj.collection('usersCollection')
    const foodCategoriesObj=dbObj.collection('foodCategories')
    const ordersCollectionObj=dbObj.collection('ordersCollection')
    app.set('foodItems',foodItemsObj)
    app.set('usersCollection',usersCollectionObj)
    app.set('foodCategories',foodCategoriesObj)
    app.set('ordersCollection',ordersCollectionObj)
    console.log('db connected successfully')
})
.catch(err=>{
    console.log('db connection error',err)
})

app.use((err,req,res,next)=>{
    res.send({errMessage:err.message})
})

// assign port number
app.listen(4000,()=>console.log('http server running on 4000.......'))