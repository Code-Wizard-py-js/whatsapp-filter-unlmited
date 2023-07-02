
const { Client, LocalAuth } = require("whatsapp-web.js")
var fs = require("fs");
const QRCode = require('qrcode')
var argv = require('yargs').argv;
var express = require('express');
const execSync = require('child_process').execSync;

try{
 execSync('mkdir qrcode', { encoding: 'utf-8' });
console.clear();
}catch(e){console.log("")}
console.clear()
var app = express();
const session = function (number) {
    
	let _this = this;

	this.thread = number;	
try{
	const client = new Client({
	
		authStrategy: new LocalAuth({
			clientId: String(number)
		  }),
		  puppeteer: {
            args: [
                '--disable-extensions',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
              ],
			headless:true,
			executablePath:'./chrome-win/chrome.exe',
		  }
	});
	
	client.initialize();

	client.on('qr', qr => {
        
        console.log("scan qrcode : file name *",number+".png")
		QRCode.toFile("./qrcode/"+number+'.png', qr, {
			color: {
			  dark: '#ffff',  // Blue dots
			  light: '#0000' // Transparent background
			}
		  }, function (err) {
			
			//console.log(err)
		  })
    });

	client.on(`auth_failure`, (msg) => {
		console.log(`auth_failure`, msg);
	});

	client.on('ready', async () => {
		_this.ready = true
		const filePath = "./qrcode/" + number + ".png";
        fs.unlink(filePath, (err) => {
            if (err) {
            
            } else {
            console.log("File deleted successfully:", filePath);
            }
        });
    console.log("ready")
    
    _this.checkPhone = async (phoneNumber) => {
        var icp= await client.getNumberId(phoneNumber)
    if(icp){
    return {

        "status": "VALID",
        "number": phoneNumber    

    }
    }
       else{
        
        return {

            "status":"INVALID",
            "number": phoneNumber  
        }}
    } 
    
    });

	client.on(`message`, async msg => {
		console.log('message', msg)
	});

	client.on(`disconnected`, (reason) => {
		console.log(`disconnected`, reason);
	});
}catch(e){console.log(e)}

};
console.clear()
const sessions = new session( argv.y);
app.get('/:thread/:number', async function(req, res) {
    try {
      let checkFunc = await sessions.checkPhone(req.params.number);
      res.send(checkFunc);
    } catch (error) {
      res.status(500).send({ "Error": error.message+" || Not ready Yet" });
    }
  });


app.listen(argv.x);
    


//process.exit(0);
//arugments node script.js -x 1010 -y 1
// to test whatsapp number : http://localhost:1010/prfilename/phonenumber (http://localhost:1010/newthread/8801321458)
