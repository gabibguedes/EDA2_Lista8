import {USERNAME, PASSWORD,TOKEN} from './login_info';
const axios = require('axios');
const vis = require('vis');

var followers = [];
var followers_img = [];

axios.get('https://api.github.com/users/vitorl-s/followers',{
	header:{
		user: USERNAME,
		password: PASSWORD,
		token: TOKEN
	}
})
.then((response,filter,role) => {
	console.log(response.data)
	var aux = response.data;
	aux.forEach(function(item,index){
		followers.push(response.data[index].login);
	});
	aux.forEach(function (item, index) {
		followers_img.push(response.data[index].avatar_url);
	});
	console.log(followers_img);
})

document.addEventListener('DOMContentLoaded', function () {
	

	var container = document.querySelector('#graph');

	var data = {
		nodes: [
			{
				id: 1,
				shape: 'image',
				image: 'https://lenguajehtml.com/img/html5-logo.png',
				label: 'HTML5'
			},
			{
				id: 2,
				shape: 'image',
				image: 'https://lenguajecss.com/img/css3-logo.png',
				label: 'CSS3'
			},
		],
		edges: [
			{ from: 1, to: 2 }
		]
	}

	var options = {
		nodes: {
			borderWidth: 0,
			size: 42,
			color: {
				border: '#222',
				background: 'transparent'
			},
			font: {
				color: '#111',
				face: 'Walter Turncoat',
				size: 16,
				strokeWidth: 1,
				strokeColor: '#222'
			}
		},
		edges: {
			color: {
				color: '#CCC',
				highlight: '#A22'
			},
			width: 3,
			length: 500,
			hoverWidth: .05
		}
	}

	var network = new vis.Network(container, data, options);

});