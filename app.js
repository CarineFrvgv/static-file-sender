const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


const file = path.resolve(__dirname, 'static');

app.get('/', (req, res) => {
    res.send('');
})

// middleware to log url/time
app.use((req, res, next) => {
    console.log(`url: ${req.url}`)
    console.log(`time: ${new Date()}`);
    next();
});

// middleware to check if url is a existing file 
app.use((req, res, next) => {
    const filepath = path.join(__dirname, 'static', req.url);
    fs.stat(filepath, (err, data) => {
        if (err){
            next();
            return;
        }
        if (data.isFile()) {
            res.sendFile(filepath);
        } else {
            next();
        }
    });
});

// not found middleware
app.use((req, res) => {
    res.status(401).send('File not found.');
});

app.listen(3000, () => {
    console.log('Static-file is running on port 3000')
});