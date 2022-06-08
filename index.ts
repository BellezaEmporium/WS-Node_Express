const express = require("express")
const app = express()

const sensors = [
    {id: 1, type: "alpha", datas: [1,2,3]},
    {id: 2, type: "beta", datas: [1,2,3], metrics: false},
    {id: 3, type: "omega", datas: {a:1,b:2}},
]

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Woosh, ceci est un test.")
})

app.get("/sensors", (req,res) => {
    res.json({response: true, sensors})
})

app.get("/sensors/:id", (req, res) => {
    if ((sensors.find(x => x.id == req.params.id)) === undefined) {
        res.status(404).json({response: false, data: "No data found on sensor " + req.params.id})
    }
    else {
        res.status(200).json(sensors.find(x => x.id == req.params.id))
    }
})

app.post("/add_sensor", (req, res) => {
    if(req.body.id == null) {
        res.status(403).json({response: false, data: "Identifier is required for sensor addition."})
    } else if (isNaN(req.body.id)) {
        res.status(403).json({response: false, data: "Identifier is defined with a number only. No strings allowed."})
    } else {
        res.status(201).json({
            response: true,
            sentData: req.body
        });
    }
})

app.listen('8080');
module.exports = app;
