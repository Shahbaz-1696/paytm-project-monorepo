"use client"
import { Center } from "@repo/ui/center"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { Button } from "@repo/ui/button"
import { p2pTransfer } from "../app/lib/actions/p2pTransfer"

export const SendCard = () => {
    const [amount, setAmount] = useState("");
    const [number, setNumber] = useState("");
    return <div>
        <Center>
            <Card title="Send">
                <div className="pt-2 min-w-72">
                    <TextInput label={"Number"} placeholder={"Number"} onChange={(value) => {
                        setNumber(value);
                    }} />
                    <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                        setAmount(value);
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            await p2pTransfer(number, Number(amount) * 100);
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}