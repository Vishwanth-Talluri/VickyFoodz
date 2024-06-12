const exp=require('express')
const ordersApp=exp.Router()

ordersApp.use(exp.json())

let ordersCollectionObj;
ordersApp.use((req,res,next)=>{
    ordersCollectionObj=req.app.get('ordersCollection')
    next()
})

ordersApp.post('/checkout',async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{order_date:req.body.order_date})
    let eId = await ordersCollectionObj.findOne({'email':req.body.email})
    if(eId===null){
        try{
            let eId = await ordersCollectionObj.findOne({ email: req.body.email });
        if (eId === null) {
            // Create new order
            await ordersCollectionObj.insertOne({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            // Update existing order
            await ordersCollectionObj.updateOne(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
        }catch(err){
            res.send("Server Error",err.message)
        }
    }
    else{
        try{
            await ordersCollectionObj.findOneAndUpdate({email: req.body.email},
            {$push:{order_data:data}}).then(()=>{
                res.json({success:true})
            })
        }catch(err){
            res.send("Server Error",err.message)
        }
    }
})

ordersApp.post('/my-orders',async(req,res)=>{
    try{
        let myData= await ordersCollectionObj.findOne({'email':req.body.email})
        res.json({orderData:myData})
    }catch(err){
        res.send("Server Error",err.message)
    }
})



module.exports=ordersApp