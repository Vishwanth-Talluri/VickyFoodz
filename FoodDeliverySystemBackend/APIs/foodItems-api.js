const exp=require('express')
const foodItemsApp=exp.Router()

foodItemsApp.use(exp.json())

let foodItemsCollectionObj;
let foodCategoriesObj;
foodItemsApp.use((req,res,next)=>{
    foodItemsCollectionObj=req.app.get('foodItems')
    foodCategoriesObj=req.app.get('foodCategories')
    next()
})

// route to get all food items
foodItemsApp.get('/food-items-list',async(req,res)=>{
    foodItemsList=await foodItemsCollectionObj.find().toArray()
    foodCategoriesList=await foodCategoriesObj.find().toArray()
    res.send([foodItemsList,foodCategoriesList])

})

module.exports=foodItemsApp;