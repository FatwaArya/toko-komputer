//import
const express = require('express');
const cors = require('cors');
const admin = require('./routes/admin');
//implementasi
const app = express();
app.use(cors());
app.use("/admin", admin);

//endpoint nanti ditambahkan di sini

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})

