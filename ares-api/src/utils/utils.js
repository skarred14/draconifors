
const fetch = require('node-fetch');

fetcher = async(route, method, data) =>{
    let result
    await fetch(route, {
      method: method,
      mode:'cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => result = res.json())

    return result
}

module.exports = { fetcher }