const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const jsonwebtoken=require('jsonwebtoken')
// const verifyToken=require('./middlewares/verifyToken')

userApp.use(exp.json())

let usersCollectionObj;
userApp.use((req,res,next)=>{
    usersCollectionObj=req.app.get('usersCollection')
    next()
})

userApp.post('/signup',async(req,res)=>{
    try {
        let newUser=req.body
    const dbUser=await usersCollectionObj.findOne({username:newUser.username})
    const { username, location, email, password } = req.body;
      const date = new Date();
     newUser={username, location, email, password,date}
    // if user already existed
    if(dbUser!=null){
        res.send({message:"Username has already taken"})
    }else{
        // hash the password
        const hashedPassword=await bcryptjs.hash(newUser.password,6)
        // replace plain password with hashed password
        newUser.password=hashedPassword
        // save user
        await usersCollectionObj.insertOne(newUser)
        res.send({message:"User created"})
    }
    } catch (error) {
        res.send({message:"Error while creating user"})
    }
    
})

userApp.post('/login',async(req,res)=>{
    // get users credentials obj
    const userCredObj=req.body
    // verify username
    const dbUser=await usersCollectionObj.findOne({email:userCredObj.email})
    if(dbUser==null){
        res.send({message:"Invalid email"})
    }else{
        // compare password
        const status=await bcryptjs.compare(userCredObj.password,dbUser.password)//sends boolean value as response
        if(!status){
            res.send({message:"Invalid password"})
        }else{
            // create token
            const signedToken=jsonwebtoken.sign({username:dbUser.username},'asdfghjkl',{expiresIn:20})
            // sending token to client as res
            res.send({message:"login success",token:signedToken})
        }
    }

})


module.exports=userApp