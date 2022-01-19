jQuery(function () {

  // 1. 发送ajax渲染头像
  getUserInfo()

  // 2. 退出登录
  $('#loginout').on('click', function () {
    // 弹出层询问
    layer.confirm('确认退出登录吗？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      // 跳回登录页
      location.href = '/login.html'
      // 销毁token
      localStorage.removeItem('token')

      layer.close(index);
    });
  })

})


function getUserInfo() {
  axios({
    url: '/my/userinfo',
    // method: 'GET',
    // headers: {
    //   Authorization: localStorage.getItem('token')
    // }
  }).then(({
    data: res
  }) => {
    console.log(res)
    if (res.status !== 0) {
      return layer.msg(res.message)
    }
    renderAvatar(res.data)
  });
}

function renderAvatar(user) {
  // 1. 渲染欢迎词 优先渲染昵称 没有再渲染用户名渲染
  let name = user.nickname || user.username
  $('.welcome').html('欢迎你！ ' + name)

  // 2. 渲染头像 判断用户是否有头像
  if (user.user_pic !== null) {
    // 2.1 如果有 就显示图片头像  隐藏文字头像 
    $('.layui-nav-img').show().prop('src', user.user_pic)
    $('.avatar-text').hide()
  } else {
    // 2.2 如果没有 显示文字头像 隐藏图片头像 
    $('.layui-nav-img').hide()
    // 把用户名的首字母改为大写 作为头像渲染到页面上
    $('.avatar-text').show().html(name[0].toUpperCase())
  }
}