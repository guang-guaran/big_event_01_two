jQuery(function () {

  getUserInfo()
})


function getUserInfo() {
  axios({
    url: '/my/userinfo',
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token')
    }
  }).then(({
    data: res
  }) => {
    console.log(res)
    if (res.status !== 0) {
      return layer.msg(res.message)
    }

  });
}

function renderAvatar() {

}