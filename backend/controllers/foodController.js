import foodModel from "../models/foodModels.js";
import fs from "fs"; // fs is a Node.js module for reading and writing files

//add food item

const addFoodItem = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        
    })
    try{
        await food.save();
        res.json({success:true, message:"food item added successfully"})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"food item not added"})
    }
    }

    //all food list
    const allFoodList = async (req, res) => {
        try{
            const foods = await foodModel.find({});

            res.json({success:true, data:foods})
        }catch(error){
            console.log(error);
            res.json({success:false, message:"food list not found"})
        }
    }

    // remove food item
    const removeFoodItem = async (req, res) => {
        try{
            const food = await foodModel.findById(req.body.id);
            fs.unlink(`uploads/${food.image}`,(err)=>{  // isse image upload folder se delete ho jayega
                if(err) throw err;
                console.log("image deleted successfully");
            })
            await foodModel.findByIdAndDelete(req.body.id); // isse image(means id ka pura components hi delete ho jayega) database se delete ho jayega
            res.json({success:true, message:"food item removed successfully"})

        }
        catch(error){
            console.log(error);
            res.json({success:false, message:"food item not found"})

        }
    }
    export { addFoodItem , allFoodList, removeFoodItem };
