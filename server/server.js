const express = require('express');
const cors = require("cors");
const ytdl = require('ytdl-core');
let spawn = require('child_process').spawn;

const fs = require('fs');
const cp = require('child_process');
const readline = require('readline');

const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const ffmpeg = require('ffmpeg-static');

app.use(cors());
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'client/build')));
let url = "";
let video = ""
let pyVideo =""
let audio = ""
const call = {
    message: ""
}
let pyOpt1 = "0.2"
let pyOpt2 = "no"


async function downloadVideo(url){

    if(!ytdl.validateURL(url)){
        call.message="400"
        console.log("url 오류")
    }
    else{
    
        this.video = `../src/${url.split("v=")[1].substr(-4)}.mp4`
        pyVideo = url.split("v=")[1].substr(-4) 
        await new Promise((resolve) => {
        ytdl(url, { quality: 'highest' }).pipe(fs.createWriteStream(this.video)).
        on('close', () => {
            call.message ="200"
            resolve(); // finish
          })
        })
       
       
    }

}


function scirptPython(res){
    console.log("python Running")
    /*
    try{
    const result = spawn("python3",['../model/whisperX/model.py',pyVideo,pyOpt1,pyOpt2])
    result.stdout.on('data', (data)=> {
        console.log(data.toString());
    });
    }
    catch(e)
    {
        console.log("python error")
    }
    */

    const python = spawn("python3",['../model/whisperX/model.py',pyVideo,pyOpt1,pyOpt2])
    python.stdout.on('data', (data)=> {
        console.log(data.toString());
    });
    python.on('close',(code)=>{
        
    })
    
}
    


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });


app.post("/post", async (req, res) => {
    
    url = req.body.name;
    //let keyword1 = req.body;
    pyOpt1 = req.body.keyword1;
    pyOpt2 = req.body.keyword2;

    console.log(`keyword1: ${pyOpt1}`)
    console.log(`keyword1: ${pyOpt2}`)

    await console.log(`client: ${req.body.name}`);
    //await console.log(url.split("v=")[1])
    await downloadVideo(url);
    await console.log("videoDownloading");
    //await scirptPython(res);
    //await res.json(call); 
    const python = spawn("python3",['../model/whisperX/model.py',pyVideo,pyOpt1,pyOpt2])
    python.stdout.on('data', (data)=> {
        console.log(data.toString());
    });
    python.on('close',(code)=>{
        res.json(call)
    })

});

  
app.listen(5000,() => {console.log("Server started on port 5000")});
