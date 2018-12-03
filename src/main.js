import {USERNAME, PASSWORD,TOKEN} from './login_info';
const axios = require('axios');
const vis = require('vis');

var followers = [];

axios.get('https://api.github.com/users/vitorl-s/followers',{
	header:{
		user: USERNAME,
		password: PASSWORD,
		token: TOKEN
	}
})
.then((response,filter,role) => {
	var aux = response.data;
	aux.forEach(function (item, index) {
		followers.push({ login: response.data[index].login, image: response.data[index].avatar_url });;
	});
})

document.addEventListener('DOMContentLoaded', function () {
	var container = document.querySelector('#graph');
	var data = {
		nodes: [{ id: 1, shape: 'image', image: 'https://avatars2.githubusercontent.com/u/31254028?v=4' },
				{ id: 2, shape: 'image', image: 'https://avatars2.githubusercontent.com/u/31254028?v=4'}
			   ],
		edges: [{from:1, to:2}]
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