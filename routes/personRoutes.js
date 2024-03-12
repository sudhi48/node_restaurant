const express = require('express');
const router = express.Router();
const Person=require('./../models/Person')
const {jwtAuthMiddleware, generateToken}=require('./../jwt')

router.post('/signup',async (req,res) => {

    try{
        const data = req.body;// body in the req has the data

        //creating a new person document using mongoose model
        const newPerson=new Person(data);
        // we can directly send the data variable to  Person schema otherwise we can use following thats gonna take lots of memeory and time 
        /*newPerson.name=data.name;
        newPerson.age=data.age;
        newPerson.work=data.work;
        newPerson.mobile=data.mobile;
        newPerson.email=data.email;
        newPerson.address=data.address;
        newPerson.salary=data.salary;*/

        const response= await newPerson.save();
        console.log('data saved');

        const payload={
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token= generateToken(payload);
        console.log('Token is :', token);
        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
        
    }
})

//login router
router.post('/login',async(req,res)=>{
    try {
        const {username,password}=req.body;

        const user=await Person.findOne({username: username})

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'})

        }
        //generate token
        const payload={
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload)
        res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server Error'})
    }
})

router.get('/profile',jwtAuthMiddleware, async(req,res)=>{
    try{
        const userData= req.user;
        console.log("user data: ",userData)
        const userId=userData.id;
        const user= await Person.findById(userId)
        res.status(200).json({user})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        const data= await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})




router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType =='chef' || workType =='manager' || workType == 'waiter'){
            const response=await Person.find({work: workType});
            console.log("data fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id',async (req,res)  =>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true, //updates the response with updated data
            runValidators: true, //checks the schema
        });

        if(!response){
            res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated')
        res.status(200).json(response)

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server error'})
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const personId=req.params.id;

        const response=await Person.findByIdAndDelete(personId,{
            new: true,
            runValidators:true
        })
        if(!response){
            res.status(404).json({error: 'Person not found'})
        }
        console.log('data deleted')
        res.status(200).json({message: 'Person deleted successfully'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports=router;