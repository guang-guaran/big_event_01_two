jQuery(function () {
  // 点击登录的a链接
  $('.login .link').on('click', function () {
    // 注册模块显示
    $('.register').show()
    // 登录模块隐藏
    $('.login').hide()
  })

  // 点击注册的a链接
  $('.register .link').on('click', function () {
    // 登录模块显示
    $('.login').show()
    // 注册模块隐藏
    $('.register').hide()
  })


})