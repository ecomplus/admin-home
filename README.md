# E-Com Plus Admin Home

[![Publish](https://github.com/ecomplus/admin-home/workflows/Publish/badge.svg)](https://github.com/ecomplus/admin-home/actions?workflow=Publish) [![CodeFactor](https://www.codefactor.io/repository/github/ecomplus/admin-home/badge/master)](https://www.codefactor.io/repository/github/ecomplus/admin-home/overview/master) [![npm version](https://img.shields.io/npm/v/@ecomplus/admin-home.svg)](https://www.npmjs.org/@ecomplus/admin-home)

E-Com Plus dashboard homepage with Vue 2 SPA

[CHANGELOG](https://github.com/ecomplus/admin-home/blob/master/CHANGELOG.md)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

To login on dev server you should set _username_ and _password_ on `localStorage` with your credential for demo store (1011):

```js
localStorage.setItem('store_id', 1011)
localStorage.setItem('username', 'myuser')
localStorage.setItem('password', 'mypassword')
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
