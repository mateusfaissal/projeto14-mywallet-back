import { db } from "../server.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
//import { ObjectId } from "mongodb";

export async function signUp(req, res) {

    const { name, email, password } = req.body

    const hash = bcrypt.hashSync(password, 10);


    try {

        const user = await db.collection("users").findOne({ email });
        if (user) return res.status(409).send("This email is already registred :(");

        const teste2 = await db.collection("users").insertOne({ name, email, password: hash });
        console.log(teste2);
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
       const teste = await db.collection("sessions").insertOne({ token, userID: user._id });
       console.log(teste);
        res.send(token);



    } catch (err) {
        res.status(500).send(err.message);
    }
}


/*export async function loggedUser(req, res) {

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).send("Token does not exist :(");

    try {

        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Invalid token :(");
        console.log(session)

        const user = await db.collection("sessions").findOne({ _id: new ObjectId(session.userID) });
        console.log(user);
        //delete user.password

        res.send(user);

    } catch (err) {
        res.status(500).send(err.message);
    }
}*/

/*export async function getUsuarios(req, res) {

    try {
        const users = await db.collection("users").find().toArray()
        
        res.send(users)
    } catch (err) {
       res.status(500).send(err.message)
    }
}*/

/*export async function getSessions(req, res){
    try{
        const sessions = await db.collection("sessions").find().toArray();
        return res.send(sessions);
    } catch(err){
        return res.sendStatus(500);
    }
}*/