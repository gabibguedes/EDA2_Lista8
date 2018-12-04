import {USERNAME, PASSWORD,TOKEN} from './login_info';
const axios = require('axios');
const vis = require('vis');



var git = document.getElementById("git");
var btn = document.getElementById("btn");

var followers = [];
var following = [];
	
const addTask = () =>{
	const requisicao = async (followers) => {
		console.log('começando requisições');
		console.log(git.value);
		const api = axios.create({
			baseURL: 'https://api.github.com/users/' + git.value + '/followers',
			headers: {
				'Authorization': {
					username: USERNAME,
					password: PASSWORD
				}
			}
		});
	
		var response = await api.get('https://api.github.com/users/' + git.value + '/following', {
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
	
	
	
		for (const item in followers) {
			var response2 =  await api.get('https://api.github.com/users/' + followers[item].name+ '/followers', {
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
		}
	
		for(var i = 0 ; i < followers.length; i++){
			for(var j = 0; j< fof[i].length; j++){
				for(var k = 0; k< followers.length; k++){
					if(fof[i][j] == followers[k].name){
						following.push({from: i, to: k});
					}
				}
			}				
		}
		
	}

	document.addEventListener('DOMContentLoaded', function () {
		requisicao(followers).then((api) => {
			console.log('requisição feita')
			var container = document.querySelector('#graph');
			var data = {
				nodes: followers,
				edges: following
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
					arrows: {
						to:     {enabled: false, scaleFactor:1, type:'arrow'},
						middle: {enabled: false, scaleFactor:1, type:'arrow'},
						from:   {enabled: true, scaleFactor:1, type:'arrow'}
					  },
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

}
btn.onclick = addTask;




