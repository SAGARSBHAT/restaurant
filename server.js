const express=require('express');
const path=require('path');
const http=require('http');
const bodyparser=require('body-parser');

const app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,'build/index.html'));
})

const port=process.env.PORT || '3046';

app.set('port',port);

var server=http.createServer(app);


server.listen(port,()=>
{
    console.log(`Server running on port localhost:${port}`)
})