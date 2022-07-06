import { $ecomConfig } from '@ecomplus/utils'
import ecomAuth from '@ecomplus/auth'
import setup from './'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const urlParams = new URLSearchParams(window.location.search)

if (!ecomAuth.checkLogin()) {
  const { localStorage } = window
  const username = localStorage.getItem('username')
  if (urlParams.get('access_token')) {
    ecomAuth.setSession({
      username,
      store_id: parseInt(urlParams.get('store_id'), 10),
      my_id: urlParams.get('my_id'),
      access_token: urlParams.get('access_token'),
      expires: urlParams.get('expires') || new Date(Date.now() + 60000).toISOString()
    })
  } else if (username) {
    ecomAuth.login(username, localStorage.getItem('password'))
    $ecomConfig.set('lang', localStorage.getItem('lang') || 'pt_br')
    $ecomConfig.set('currency', localStorage.getItem('currency') || 'BRL')
    $ecomConfig.set('currency_symbol', localStorage.getItem('currency_symbol') || 'R$')
  }
}

setup()
