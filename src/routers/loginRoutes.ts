import { Router, Request, Response, NextFunction } from "express";
const loginRoute = Router();
import path from "path";

const rrequireAuth  = (req:Request, res: Response, next: NextFunction): void =>{
  if(req.session && req.session.loggedIn){
    next();
    return
  }else{
    res.send("Not permitted.")
  }
};

loginRoute.get("/", (req: Request,res: Response)=>{
  if(req.session && req.session.loggedIn){
    res.send(`
    <div>
      Welcome to the Dashboard.
      <div><a href="/logout">Logout</a></div>
    </div>
    `)
  }else{
    res.send(`
    <div>
    <h1>Welcome to the course</h1>
    <a href="/login">Login</a>
    </div>
    `)
  }
 
});
loginRoute.get("/login", (req:Request , res: Response)=>{
  res.send(`
    <form method="POST">
    <label>Email </label>
      <input name="email">
    <label>Password </label>
      <input name="password" type="password">
    <div>
    <button>Submit</button>
    </div>
    </form>
  `);
})
loginRoute.post("/login", (req: Request, res: Response)=>{
  const { email , password} = req.body;
  if(email === "destiny@korapay.com"){
    req.session = { loggedIn: true};
    res.redirect("/")
  }else{
    res.send("Not authorised.")
  }
});

loginRoute.get("/logout", (req:Request, res: Response)=>{
  req.session = undefined;
  res.redirect("/")
});

loginRoute.get("/permit",rrequireAuth, (req:Request,res: Response)=>{
  res.redirect("/")
})


export { loginRoute}