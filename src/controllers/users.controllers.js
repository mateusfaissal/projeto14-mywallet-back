import { db } from "../server.js";
import { v4 as uuid } from "uuid";
import  bcrypt  from "bcrypt";

export async function signUp(req, res) {

    const { name, email, password } = req.body

    const hash = bcrypt.hashSync(password, 10);
    

    try {

        const user = await db.collection("users").findOne({ email });
        if (user) return res.status(409).send("This email is already registred :(");

         await db.collection("users").insertOne({ name, email, password: hash });
        res.status(201).send("User registered succesfully :)");

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function signIn(req, res) {

    const { email, password } = req.body

    try {

        const user = await db.collection("users").findOne({ email });
        if (!user) return res.status(409).send("This user does not exists :(");

        const verifyPassword = bcrypt.compareSync(password, user.password);
        if (!verifyPassword) return res.status(401).send("Incorrect password :(");

        const token = uuid();
        await db.collection("sessions").insertOne({token, userID: user._id});
        res.send(token);



    } catch (err) {
        res.status(500).send(err.message);
    }
}