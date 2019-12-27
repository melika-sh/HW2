const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;
var serveIndex = require('serve-index')
var path = require('path')
var serveStatic = require('serve-static')

var forms = [];
var data = fs.readFileSync('forms.json', 'utf-8');
var dataJson = JSON.parse(data.toString());
var forms = dataJson["forms"];
var found = false;
console.log(path.join(__dirname, 'build'));
express()
    .use(express.json())
    .get('/api/forms', (req, res) => {
        res.json(forms);
    })
    .get('/api/forms/:Id', (req, res) => {
        forms.forEach(function(form) {
            found = false;
            if (form["id"] == req.params["Id"]) {
                found = true;
                res.json(form);
            }
        });
        if (!found)
            res.send("Form not found");
    })
    .get('/', (req, res) => res.send("Worked ..."))
    .use('/build', express.static('build'))
    /**for files */
    //.use(serveStatic(path.join(__dirname, 'build')))
    /**for directory */
    //.use('/', express.static('build'), serveIndex('build', { 'icons': true }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))