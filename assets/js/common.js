axios.defaults.baseURL = 'http://www.liulongbin.top:3007'

// 请求拦截器 设置免登陆
axios.interceptors.request.use(function (config) {
  // console.log(config)
  if (config.url.indexOf('/my/') != -1) {
    config.headers.Authorization = localStorage.getItem('token')
  }

  return config
}, function (error) {

  return Promise.reject(error)
})

// 响应拦截器 登录拦截
axios.interceptors.response.use(function (response) {
  // console.log(response)
  if (response.data.message == '身份认证失败！') {
    // 跳回登录页
    location.href = '/login.html'
    // 销毁token
    localStorage.removeItem('token')
  }
  return response
}, function (error) {

  return Promise.reject(error)
})