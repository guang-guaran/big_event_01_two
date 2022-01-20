 jQuery(function () {
   // 1.1 获取裁剪区域的 DOM 元素
   var $image = $('#image')
   // 1.2 配置选项
   const options = {
     // 纵横比
     aspectRatio: 1,
     // 指定预览区域
     preview: '.img-preview'
   }
   // 1.3 创建裁剪区域
   $image.cropper(options)

   $('#fileBtn').on('click', function () {
     $('#fileIpt').click()
   })

   $('#fileIpt').on('change', function () {
     let file = this.files[0]

     if (file == undefined) {
       return layui.layer.msg('上传头像失败，不能为空')
     }

     let url = URL.createObjectURL(file)
     //     销毁旧的裁剪区域  // 销毁旧的裁剪区域   // 重新初始化裁剪区域
     $image.cropper('destroy').attr('src', url).cropper(options)
   })

   $('#uploadBtn').on('click', function () {
     var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
       width: 100,
       height: 100
     }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

     axios({
       url: '/my/update/avatar',
       method: 'POST',
       data: 'avatar=' + encodeURIComponent(dataURL)
     }).then(({
       data: res
     }) => {
       console.log(res)
       if (res.status !== 0) {
         return layui.layer.msg(res.message)
       }
       layui.layer.msg('恭喜您！头像上传更改')
       window.parent.getUserInfo()

     });

   })
 })