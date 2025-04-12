import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongobd.js'
import router from './routes/auth_routes.js'
import userouter from "./routes/user_routes.js";
import productrouter from "./routes/product_routes.js"
import uploadrouter from "./routes/upload_routes.js"
import categoryrouter from "./routes/category_routes.js"
import subcategoryrouter from "./routes/subcategory_routes.js"
import connectcloudinary from "./config/cloudinary.js";
import sellerrouter from "./routes/sellerroutes.js";
import clientrouter from "./routes/clientroute.js";

const app = express();
const port = process.env.port || 7000
connectDB();
connectcloudinary()
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'], // Explicitly allow your frontend URL
  credentials: true // Allow cookies and auth headers
}));
  

// API End-points--
app.use('/api/auth',router)
app.use('/api/user',userouter)
app.use('/api/product',productrouter)


app.use("/api", uploadrouter);

// Serve uploaded images
app.use("/uploads", express.static("uploads"));
app.use('/api',productrouter)
app.use('/api',categoryrouter)
app.use('/api',subcategoryrouter)
app.use("/api/seller",sellerrouter)
app.use("/api/client",clientrouter)
//app.use('/',(req,res)=>res.json({ message: "API working..." }));

app.listen(port, ()=> console.log(`Server started on ${port}.........`));

