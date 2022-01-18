// 入口函数
jQuery(function () {
  // 1.1 点击登录的a链接
  $('.login .link').on('click', function () {
    // 注册模块显示
    $('.register').show()
    // 登录模块隐藏
    $('.login').hide()
  })

  // 1.2点击注册的a链接
  $('.register .link').on('click', function () {
    // 登录模块显示
    $('.login').show()
    // 注册模块隐藏
    $('.register').hide()
  })

  // 1.3 表单验证,自定义校验规则
  const form = layui.form
  form.verify({
    username: [
      /^[a-zA-Z0-9]{1,10}$/,
      '用户名必须是1-10位字母和数字'
    ],
    password: [
      /^[\S]{6,15}$/,
      '密码长度必须是6-15位的非空字符串'
    ],
    // 确认密码的规则：密码和确认密码一致  做判断就是判断两个条件不一致
    rePwd: function (value) {
      if (value !== $('.register [name="password"]').val()) {
        return '密码个确认密码不一致'
      }


    }
  })

  // 1.4 ajax的注册请求
  const layer = layui.layer
  $('#formReg').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/api/reguser',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {

      if (res.status !== 0) {
        return layer.msg(res.message)
      }

      // 清空表单
      $(this)[0].reset()

      // 切换点击登录事件 
      $('.register .link').click()
    });
  })

  // 1.5 登录功能
  $('#formLogin').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }

      // 存储token
      localStorage.setItem('token', res.token)

      // 跳转到登录页面
      location.href = '/index.html'
    });
  })
})