import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { loginRoute } from "./routers/loginRoutes";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieSession({keys: ["hello"]}));
app.use(loginRoute)

app.listen(3000,()=>{
  console.log("Port connected 3000");
  
});