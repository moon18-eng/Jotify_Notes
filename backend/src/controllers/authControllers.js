import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export const SignUp = async(req,res) => {
    const {username, display_name, password, confirm_password} = req.body;
    
    if(!username || !display_name || !password || !confirm_password){
        return res.status(400).json({success:false,message:"Data required, please fill all sections."})
    }
    
    if(password !== confirm_password){
        return res.status(400).json({success:false,message:"Passwords does not match!"})
    }

    try{
        const userCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        if( userCheck.rows.length > 0 ){
            return res.status(400).json({success:false,message:"Username already exist!"})
        }

        const key = 10
        const passwordhash = await bcrypt.hash(password,key)

        const newUser = await pool.query("INSERT INTO users (username,display_name,password_hash) VALUES ($1,$2,$3) RETURNING id, username, display_name",[username,display_name,passwordhash ])
        const user = newUser.rows[0];
        const token = jwt.sign(
            {id:user.id, username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        ) 
        res.status(201).json({success:true, data: {user, token}})
        
    }catch(err){
        res.status(500).json({success:false, message:"Inernal server error"})
    }
}


export const LogIn = async(req,res) => {
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({success:false,message:"data required"})
    }

    try{
        const userCheck = await pool.query("SELECT * FROM users WHERE username = $1",[username])
        if(userCheck.rows.length === 0 ){
            return res.status(400).json({success:false,message:"User does not exist! please try again."})
        }
        const user = userCheck.rows[0]
        const isMatch = await bcrypt.compare(password,user.password_hash)
        if(!isMatch){
            return res.status(400).json({success:false, message:"Wrong password! please try again."})
        }

        const token = jwt.sign(
            {id:user.id, username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        
        res.status(201).json({success:true, data:
             {user:{id:user.id, username:user.username, display_name:user.display_name}
            , token}})

    }catch(err){
        res.status(500).json({success:false, message:"Internal server error"})
    }
}