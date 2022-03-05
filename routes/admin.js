//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const model = require('../models');
const admin = model.admin
//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    admin.findAll()
        .then(result => {
            res.json({
                admin: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

})
app.post("/", async (req, res) => {
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password)
    }
    try {
        let result = await admin.create(data)
        res.json({
            message: "berhasil",
            data: result
        })

    } catch (error) {
        res.json({
            message: error.message

        })
    }
})



app.put("/:id", async (req, res) => {
    let id = req.params.id
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password)
    }
    try {
        await admin.update(data, {
            where: {
                admin_id: id
            }
        })
        res.json(admin);
    } catch (err) {
        res.json(err);
    }
})
app.delete("/:id", async (req, res) => {
    let id = req.params.id
    try {
        await admin.destroy({
            where: {
                admin_id: id
            }
        })
        res.json({
            message: "berhasil"
        })
    } catch (err) {
        res.json(err);
    }
})

module.exports = app;
