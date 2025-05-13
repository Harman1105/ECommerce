    import express from "express"
    import dotenv from "dotenv"
    import dbconnection from "./database/dbconnection.js";
    import cookieParser from "cookie-parser";
    import cors from "cors"
    import authRouter from "./routes/auth/auth-routes.js"
  
  
  
    dotenv.config();

    const app = express();
    dbconnection();

    app.use(
        cors({
            origin : 'http://localhost:5173',
            methods : ['GET' , 'POST' , 'DELETE' , 'PUT'],
            credentials : true,
            allowedHeaders: [
                "Content-Type",
                "Authorization",
                "Cache-Control",
                "Expires",
                "Pragma",
              ],

        })
    )

    const PORT = process.env.PORT || 5000;

    app.use(cookieParser());
    app.use(express.json());

    app.use('/api/auth' , authRouter);


    app.listen(PORT,()=>{
        console.log(`App is running on ${PORT}`);
    })



