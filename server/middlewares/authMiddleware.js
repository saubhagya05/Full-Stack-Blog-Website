import jwt from "jsonwebtoken"
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated=async(req,res,next)=>{
    let token;
    const {authorization}=req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try{
            token=authorization.split(" ")[1];
            //verify token
            const {userID}=jwt.verify(token,"pleaseSubscribe");
            //get user from token
            req.user=await authModel.findById(userID).select("--password");
            next();
        }catch(error){
            return res.status(401).json({message:"Unauthorised User"});
        }
    }else{
        return res.status(401).json({message:"Unauthorised User"});
    }
};

export default checkIsUserAuthenticated;