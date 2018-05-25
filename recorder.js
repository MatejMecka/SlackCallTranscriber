const puppeteer = require('puppeteer');
const config = require('./config.js');
const { exec } = require('child_process');
const os = require('os')

async function callEnded(page){
	const text = page.evaluate(() => document.querySelector('.scrape').textContent)
	if(text == "This call has ended."){
		return true
	}
	else{
		return false
	}
}

async function login(page){
	await page.type(config.emailField, config.email)
	await page.type(config.passwordField, config.password)
	await page.click(config.signinButton)
}

function platform(platform){
	if(platform == "darwin"){
		// Only Video So far
		return 'ffmpeg -f avfoundation -i "' + config.videoDevice + ':' + config.audioDevice + '" ' + config.fileName;
	}

	else if(platform == "linux"){
		// Only Video so far. 
		return 'ffmpeg -video_size' + config.videoSize + ' -framerate ' + config.framerate + ' -f x11grab -i :0.0 -f alsa -i default -preset ultrafast -crf 0' + config.fileName
	}

	else{
		// Only Video So far + Windows
		return 'ffmpeg -f dshow -i video="screen-capture-recorder" ' + config.fileName
	}
}

(async() => {
	console.log('Starting Recorder...')
	cmd = platform(os.platform())
	const browser = await puppeteer.launch({
		'headless':false, 
		args: ['--window-size=1200,1200', '--disable-infobars', '--start-fullscreen']
	});

    const page = await browser.newPage();
    await page.goto(config.url);
    await page.setViewport({ width: config.displayWidth, height: config.displayHeight })

    console.log('Logging in...')
   	login(page)
    await page.waitForNavigation({waitUntil: 'load'})

    exec(cmd, function(error, stdout, stderr) {
	    console.log(stdout)  		
	    console.log(stderr)
	    console.log(error)
	});

    setInterval(
    	function(){
    		if(callEnded(page)){
    			console.log('Call Ended. Exiting...')
    			browser.close();
    			process.exit(0);
    		}
    	},2000
    )


})()

