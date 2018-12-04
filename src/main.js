import {USERNAME, PASSWORD,TOKEN} from './login_info';
const axios = require('axios');
const vis = require('vis');

var followers = [];
var following = [];
const requisicao = async (followers) => {
	const api = axios.create({
		baseURL: 'https://api.github.com/users/' + USERNAME + '/followers',
		headers: {
			'Authorization': {
				username: USERNAME,
				password: PASSWORD
			}
		}
	});

	var response = await api.get('https://api.github.com/users/' + USERNAME + '/followers', {
		auth: {
			username: USERNAME,
			password: PASSWORD,
			token: TOKEN
		}
	})
		.then((response) => {
			var aux = response.data;
			aux.forEach(function (item, index) {
				followers.push({ 
					id: index, 
					shape:'image', 
					image: response.data[index].avatar_url, 
					name: response.data[index].login }
				);
			});
		})
		var fof = [];
		var j = 0;
	await followers.forEach(async (item,index)=>{
		var response2 = await api.get('https://api.github.com/users/' + item.name + '/followers', {
			auth: {
				username: USERNAME,
				password: PASSWORD,
				token: TOKEN
			}
		})
			.then((response2) => {
				var listUsers = [];
				response2.data.forEach((item,index2) =>{
					listUsers.push(item.login);
				})
				fof.push(listUsers);
			})
		});
}

 	document.addEventListener('DOMContentLoaded', function () {
	requisicao(followers).then((api) => {

		var container = document.querySelector('#graph');
		var data = {
			nodes: followers,
			edges: [{from:0, to:1}]
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
	})
