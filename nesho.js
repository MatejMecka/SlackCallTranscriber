const puppeteer = require('puppeteer');
const config = require('./config.js');
const { exec } = require('child_process');
const os = require('os')

async function login(page){
	await page.type(config.emailField, config.email)
	await page.type(config.passwordField, config.password)
	await page.click(config.signinButton)
}

function platform(platform){
	if(platform == "darwin"){
		// Only Video So far
		return 'ffmpeg -f avfoundation -i "1" ' + config.fileName;
	}

	else if(platform == "linux"){
		// Only Video so far. On t
		return "ffmpeg -f x11grab -i " + config.fileName
	}

	else{
		return 'ffmpeg -f dshow -i video="screen-capture-recorder" ' + config.fileName
	}
}

(async() => {

	cmd = platform(os.platform())
	const browser = await puppeteer.launch({
		'headless':false, 
		args: ['--window-size=1200,1200', '--disable-infobars', '--start-fullscreen']
	});

    const page = await browser.newPage();
    await page.goto('https://hackclub.slack.com/call/Nesho-RAU60PPU3');
    await page.setViewport({ width: config.displayWidth, height: config.displayHeight })

   	login(page)
    await page.waitForNavigation({waitUntil: 'load'})

    exec(cmd, function(error, stdout, stderr) {
	    console.log(stdout)  		
	    console.log(stderr)
	    console.log(error)
	});

    exec(cmd, (err, stdout, stderr) => {
	  if (err) {
	    return;
	  }
	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
	});


})()

