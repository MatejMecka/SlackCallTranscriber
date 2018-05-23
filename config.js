const config = {
	emailField: '#email' ,
	passwordField: '#password',
	signinButton: '#signin_btn',
	inputField:'#msg_input',
	url: 'https://[SLACK WORKSPACE NAME].slack.com/call/[SLACK CALL ID]/',
	email: '[EMAIL HERE]',
	password: '[PASSWORD]',
	displayHeight: 1080, // Customize based on your own needs
	displayWidth: 1440, // Customize based on your own needs
	fileName: 'output.mkv',
	videoDevice: 1, // Mac Only
	audioDevice: 0, // Mac Only
	videoSize: '1920x1080', // Linux Only
	framerate:25 // Linux Only
}

module.exports = config
