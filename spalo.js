/* spalo functions */

const axios = require('axios')

async function getToken(url, param) {

  try {

    const res = await axios.post(url, param)

    if (res.status === 200) {

      return res.data.accessToken

    } else {

      return console.log(res.data.message)

    }

  } catch (err) {

    return console.log(err)

  }
  
}


async function getData(path, token) {

  try {

    const instance = axios.create({

      headers: {
        'Authorization': `Bearer ${token}`,
      }

    })
    
    const res = await instance.get(path)

    if (res.status === 200) {

      return res.data

    } else {

      return console.log(res.data.error)

    }
    
  } catch (err) {

    return console.log(err)

  }

}

module.exports = {
  getToken,
  getData
}