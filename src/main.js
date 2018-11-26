import {USERNAME, PASSWORD} from './login_info';
const axios = require('axios');

axios.get('https://api.github.com/repos/gabibguedes/JogoDaVida',{
	header:{
		login: USERNAME,
		password: PASSWORD
	}
})
.then((response) => {
	console.log(response.data)
})
