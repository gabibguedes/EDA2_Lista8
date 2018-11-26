const axios = require('axios');

axios.get('https://api.twitter.com/1.1/users/show.json?user_id=2670498805')
.then((response) => {
	console.log(response.data)
})
