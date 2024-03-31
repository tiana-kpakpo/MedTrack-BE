import { isValidObjectId } from "mongoose";
import User from "../model/user.js"
import bcrypt from 'bcryptjs'
import jwt  from "jsonwebtoken";


// get  req route: /api/user
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({users})
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({message: 'Internal Server Error, Try again later'})
    }

}

//post req route: /api/user
export const createUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
           return res.status(400).json({message: 'All fields are required'})
        }

        const existingUser = await User.findOne({ email })
        if(existingUser) {
           return res.status(400).json({message: 'Cannot create user: User already exists'})
        }


        //hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save();
       res.status(201).json({message: 'User successfuly created', user: newUser})


    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({message: 'Internal Server Error, Try again later'})
    }
   
}

//patch req route: /api/user/:id
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if(!isValidObjectId(userId)){
            res.status(400).json({message: 'Invalid user ID'})
        }

        const { name, email,password } = req.body;

        const user = await User.findById(userId)

        if(!user){
            res.status(404).json({message: 'User not found'})
        }

        //updating user fields
        if(name) user.name = name;
        if(email) user.email = email;
        if(password) user.password = password;
        
        await user.save();

        res.status(200).json({message: `User ${userId} successfully updated`})
        
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({message: 'Internal Server Error, Try again later'}) 
    }
    
}

//delete req route: /api/user/:id
export const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id;

        if(!isValidObjectId(userId)) {
            res.status(400).json({message: 'Invalid user ID'})
        }

        
        //deleting user 
        // await user.remove();
        
        const user = await User.deleteOne({_id: userId });

        if(user.deletedCount === 0) {
            res.status(404).json({message: 'User not found'})
        }

        res.status(200).json({message: `User ${userId} successfully deleted`})
        
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({message: 'Internal Server Error, Try again later'}) 
    }
   
}


//POST req route: /api/user/login
export const loginUser = async(req, res) => {
    try {
       const { email, password } = req.body;

       if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
       
       //finding user by mail in db
       const user = await User.findOne({ email });

       if(!user){
        return res.status(404).json({message: "User not found"})
       }

       const validPassword = await bcrypt.compare(password, user.password)

       if (!validPassword){
       return res.status(401).json({message: "Invalid password"})
       }


       const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
    }

       if(validPassword) {
        const token = generateToken(user._id);

        //set cookies for subsequent request
        res.cookie("jwt", token, {
            maxAge: 3 * 24 * 60 * 60 *1000,
            httpOnly: true,
        });

        res.status(200).json({
            _id: user._id,
            email: user.email
        });
       }else {
        res.status(401);
        throw new Error('wrong email or password')
       } 
    

       //successful login 
       res.status(200).json({message: "Login successful", user} )
   
    } catch (error) {
        console.error("Error logging in:", error)
        res.status(500).json({message: 'Internal Server Error, Try again later'}) 
    
    }
}

//POST req route: /api/user/logout
export const logoutUser = (req, res) => {
    res.cookie("jwt", "", { maxAge: -1 });
  
    res.sendStatus(200);
  };