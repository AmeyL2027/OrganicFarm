const fs = require('fs');  // This module is used for the File System interaction
const http = require('http')
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
//----------File System--------------------
// Blocking Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut = `This is what we know about Avocado ${textIn}. \n Created on ${Date.now()}.`
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('Created output File');

// Non-blocking Asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err,data1)=>{  // These arrow functions are the new ES6 feature, it wasn't there before
//     console.log(data1);
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8', err =>{
//                 console.log('Files have been written');
//             });
//         });
//     });
// });

// -------------------SERVER------------------

const tempOverview = fs.readFileSync(`${__dirname}/templates/templateoverview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/templatecards.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/templateproduct.html`,'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data); // This is an array of all the objects in data.json
// console.log(dataObj);

const server = http.createServer((req,res) => {
    //basic routing
    // console.log(url.parse(req.url, true));
    const { query, pathname } = url.parse(req.url, true);
    // const pathName = req.url;

    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        // We are iterating through the array(dataObj) and replacing the place holders
        // in the product template with values from dataObj
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('') //the last join is used to join all the arrays into a string
        //and finally we have to replace the {%PRODUCT_CARDS%} with the string of the data which is cardsHtml
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }else if (pathname === '/product'){
        res.writeHead(200, { 'Content-type': 'text/html'});
        const product = dataObj[query.id];
        // console.log(query.id);
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    }else if (pathname === '/api'){
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
});
 