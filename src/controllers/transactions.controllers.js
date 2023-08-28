import { db } from "../server.js";
import dayjs from "dayjs";

export async function postTransactions(req, res) {

    const { type } = req.params
    const { value, description } = req.body
    const { userAuth } = res.locals

    try {

        await db.collection("transactions").insertOne({id_user: userAuth.userID, description, value, type, date: dayjs().format("DD/MM")})

        res.status(200).send("Transaction saved successfully :)")

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getTransactions(req, res) {

    const { userAuth } = res.locals;

    try {

        const allTransactions = (await db.collection("transactions").find({id_user: userAuth.userID}).toArray()).reverse();

        const userName = await db.collection("users").findOne({_id: userAuth.userID});

        res.status(200).send({name: userName.name, allTransactions});

    } catch (err) {
        res.status(500).send(err.message)
    }

}