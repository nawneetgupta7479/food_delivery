import express from 'express';
import { addFoodItem,allFoodList,removeFoodItem } from '../controllers/foodController.js';
import multer from 'multer';

const foodRoute = express.Router();

//image storage

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
       return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});

foodRoute.post("/add",upload.single("image"),addFoodItem);
foodRoute.get("/list",allFoodList);
foodRoute.post("/remove",removeFoodItem);


export default foodRoute;