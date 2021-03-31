require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const port = process.env.PORT || 80

app.use(bodyParser.json())

// CONFIGS
const sleepTimeMs = 180000


//event names for ifttt webhooks
const PORCH_LIGHT_ON_EVENT = "turn_porch_light_on"
const PORCH_LIGHT_OFF_EVENT = "turn_porch_light_off"

function touchWebhookWithEvent(event){
    const iftttWebhookUrl = `https://maker.ifttt.com/trigger/${event}/with/key/${process.env.IFTTT_WEBHOOK_KEY}`
    axios.get(iftttWebhookUrl)
            .then(res => res.ok)
            .catch(e => console.log(e))
}

//smart object
const PORCH_LIGHT = {
    turnOn: () => touchWebhookWithEvent(PORCH_LIGHT_ON_EVENT),
    turnOff: () => touchWebhookWithEvent(PORCH_LIGHT_OFF_EVENT)
}

function sleep (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

app.post('/porch-action', async (req, res) => {
    console.log(req.body)
    if(req.body.auth === process.env.SECRET_KEY){
        res.sendStatus(200)
        //turn lights on
        PORCH_LIGHT.turnOn()
        await sleep(sleepTimeMs)
        PORCH_LIGHT.turnOff()

        // wait then turn off
    } else {
        res.sendStatus(403)
    }
})

app.listen(port, () => {
    console.log(`Smarthome app listening at http://localhost:${port}`)
})

