// pretend this is firebase, netlify, or auth0's code.
// you shouldn't have to implement something like this in your own app

const localStorageKey = '__auth_provider_token__'
const localStorageUserData = '__auth_provider_user_data__'

async function getToken() {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return await window.localStorage.getItem(localStorageKey)
  // await Promise.resolve(window.localStorage.getItem(localStorageKey))
}

async function getUserFromToken(token) {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's information. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  return await window.localStorage.getItem(localStorageUserData)
  // await Promise.resolve(window.localStorage.getItem(localStorageUserData))
}

function handleUserResponse({user}) {
  console.log('user', user)
  window.localStorage.setItem(localStorageKey, user.token)
  window.localStorage.setItem(localStorageUserData, user.username)
  return user
}

function login({username, password}) {
  console.log('login called')
    //  dummy code to make the app work
    const token = Math.random().toString(36).substr(2);
    if (username === 'vmartinetti@gmail.com' && password === '123123123') {
      // return handleUserResponse({user: {token, username}})
    return Promise.resolve(handleUserResponse({user: {token, username}}))
    }
    return Promise.reject(null)
    // return null
    // end of dummy code
    // 
  // return client('login', {username, password})
  // .then(handleUserResponse)
  // .catch(error => {
  //   console.log(error)
  //   return error
  // })
}

function register({username, password}) {
  return client('register', {username, password}).then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
const authURL = process.env.REACT_APP_AUTH_URL || 'http://localhost:8080'

async function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {getToken, getUserFromToken, login, register, logout, localStorageKey}