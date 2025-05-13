import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../models/User.js"

//register

    export const registerUser = async(req,res)=>{
    const {username,email,password} = req.body;

    try{

      const checkUser = await User.findOne({ email });
      if (checkUser)
        return res.json({
          success: false,
          message: "User Already exists with the same email! Please try again",
        });

        const hashedPassword =  await bcrypt.hash(password,12);
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        }) 

        await newUser.save(); 
        res.status(200).json({success:true,
            message:"Registration successful"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Some error occured"
        })
    }
}

//login

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return res.json({
          success: false,
          message: "User doesn't exist"
        });
      }
  
      // Check password match
      const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
      if (!checkPasswordMatch) {
        return res.json({
          success: false,
          message: "Incorrect password, Please try again"
        });
      }
  
     
      const token = jwt.sign(
        {
          id: checkUser._id,
          role: checkUser.role,
          email: checkUser.email,
          username:checkUser.username
        },
        'CLIENT_KEY', 
        { expiresIn: '60m' }
      );
  
      
      
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.username,

      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
  

//logout 

export const logout = (req,res)=>{
    res.clearCookie('token').json({

        success : true,
        message: 'Logged out successfully'

    })
}


//auth middleware

export const authMiddleware = async (req, res, next) => {
    console.log("Cookies:", req.cookies); // Ensure this is properly logging the token
  
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized User!',
      });
    }
  
    try {
      const decoded = jwt.verify(token, 'CLIENT_KEY');
      console.log("Decoded JWT:", decoded);
      req.user = decoded; // Attach the decoded token data to the request
      next();
    } catch (e) {
      console.error(e);
      res.status(401).json({
        success: false,
        message: 'Unauthorized User!',
      });
    }
  };

  export const getCurrentUser = (req, res) => {
    res.json({ success: true, user: req.user });
  };