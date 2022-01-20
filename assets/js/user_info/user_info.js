jQuery(function () {
  // 1. 昵称验证
  let form = layui.form
  form.verify({
    nickname: [
      /^[\S]{1,10}$/,
      '昵称的长度为1-10的非空字符串'
    ]
  })

  //  2. 获取用户信息，封装一个函数，并渲染页面
  initUserInfo()

  function initUserInfo() {
    axios({
      url: '/my/userinfo',
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      form.val('formUserInfo', res.data)
    });
  }

  // 3. 重置功能、
  $('#btnReset').on('click', function (e) {
    e.preventDefault()

    initUserInfo()
  })

  // 4. 修改用户信息
  $('form').on('submit', function (e) {
    e.preventDefault()

    axios({
      url: '/my/userinfo',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }

      layui.layer.msg('恭喜您！信息修改成功')
      window.parent.getUserInfo()

    });
  })


})