import { db } from "../server.js";

export async function validateAuth(req, res, next) {

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.status(401).send("You need a token to acess this :(")

    try {
        const userAuth = await db.collection("sessions").findOne({token});

        if(!userAuth) return res.status(404).send("Invalid token :(")

        res.locals.userAuth = userAuth;

        next();

    } catch(err) {
        res.status(500).send(err.message);
    }

}