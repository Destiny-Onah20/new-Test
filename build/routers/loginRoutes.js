"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = require("express");
const loginRoute = (0, express_1.Router)();
exports.loginRoute = loginRoute;
const rrequireAuth = (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    else {
        res.send("Not permitted.");
    }
};
loginRoute.get("/", (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
    <div>
      Welcome to the Dashboard.
      <div><a href="/logout">Logout</a></div>
    </div>
    `);
    }
    else {
        res.send(`
    <div>
    <h1>Welcome to the course</h1>
    <a href="/login">Login</a>
    </div>
    `);
    }
});
loginRoute.get("/login", (req, res) => {
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
});
loginRoute.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "destiny@korapay.com") {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else {
        res.send("Not authorised.");
    }
});
loginRoute.get("/logout", (req, res) => {
    req.session = undefined;
    res.redirect("/");
});
loginRoute.get("/permit", rrequireAuth, (req, res) => {
    res.redirect("/");
});
