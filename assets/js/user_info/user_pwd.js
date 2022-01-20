jQuery(function () {
  // 1. 昵称验证
  let form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,15}$/,
      '密码的必须是6-15位的非空字符'
    ],

    newPwd: function (value) {
      let v1 = $('[name="oldPwd"]').val()
      if (v1 === value) {
        return '新旧密码不能相同！'
      }
    },

    rePwd: function (value) {
      let v2 = $('[name="newPwd"]').val()
      if (v2 !== value) {
        return '两次新密码不一致！'
      }
    }


  })

  $('#formPwd').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/my/updatepwd',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      layui.layer.msg('恭喜您！密码修改成功')
      $('#formPwd')[0].reset()
      setTimeout(() => {
        window.parent.location.href = '/login.html'
      }, 1000);
    });
  })

})