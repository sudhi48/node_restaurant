const express=require('express');
const router=express.Router();
const MenuItem=require('../models/MenuItem')


router.post('/',async(req,res) => {
    try{
        const data=req.body;
        const menuItem=new MenuItem(data);
        const response=await menuItem.save();
        console.log("saved");
        res.status(500).json(menuItem)
    }
    catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error'});
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server error'})
    }
})

router.get('/:tasteType', async(req,res) => {
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=="sweet"||tasteType=="sour"||tasteType=="spicy"){
            const response=await MenuItem.find({taste: tasteType})
            console.log('fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid taste type'});
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.put('/:id', async(req,res) =>{
    try{
        const menuId = req.params.id;
        const updatedMenuItem = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuItem)
        if(!response){
            res.status(404).json({error: 'Menu Item Not Found'})
        }
        console.log('data updated')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Serverr Error'})
    }
})

router.delete('/:id',async(req,res) => {
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId,{
            new: true,
            runValidators: true
        });
        if(!response){
            res.status(404).json({error: 'Menu Item Not Found'})
        }
        console.log("deleted")
        res.status(200).json({message: 'Menu Item Deleted Successfully'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports=router;