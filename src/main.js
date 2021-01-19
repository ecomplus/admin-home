import ecomAuth from '@ecomplus/auth'
import setup from './'

if (!ecomAuth.checkLogin()) {
  const username = window.localStorage.getItem('username')
  if (username) {
    ecomAuth.login(username, window.localStorage.getItem('password'))
  }
}

setup()
