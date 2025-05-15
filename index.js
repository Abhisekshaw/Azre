const express = require('express');
const app = express ();

app.use(express.json());

app.get('/',(req, res)=>{
    console.log("Server is running welcome to our server");
    res.send('Server is running')
})

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || `http://localhost:${PORT}`;

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${HOST}`)
})