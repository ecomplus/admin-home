import { $ecomConfig } from '@ecomplus/utils'
import ecomAuth from '@ecomplus/auth'
import setup from './'
import 'bootstrap-vue/dist/bootstrap-vue.css'

if (!ecomAuth.checkLogin()) {
  const username = window.localStorage.getItem('username')
  if (username) {
    ecomAuth.login(username, window.localStorage.getItem('password'))
    $ecomConfig.set('lang', window.localStorage.getItem('lang') || 'pt_br')
  }
}

setup()
