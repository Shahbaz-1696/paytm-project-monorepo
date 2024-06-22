import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here
    //TODO: HDFC bank should send a secret token so we know it is sent
    const paymentInformation: {
        token: string,
        amount: number,
        userId: number,
    } = {
        token: req.body.token,
        amount: req.body.amount,
        userId: req.body.user_identifier,
    }
    
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: paymentInformation.userId,
                },
                data: {
                    amount: {
                        increment: paymentInformation.amount,
                    }
                }
            }),

            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success",
                }
            })
        ]);
    } catch (error) {
        console.log(error);
        res.status(411).json({
            message: "Error while processing webhook",
        });
    }
});

app.listen(3003);