$(function(){
    // - 找到剪裁区的图片 （img#image）
var $image = $('#image');
// - 设置配置项
var option = {
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
};
// - 调用cropper方法，创建剪裁区
$image.cropper(option);


// 需求2:选择图片
$('#changeImageBtn').on('click',function(){
    $('#changeImageInp').click()
})


// 需求3:渲染预览区域
let layer=layui.layer
$('#changeImageInp').on('change',function(e){
// console.log(this.value);
// 拿到用户选择文件
var file=e.target.files[0]
// 非空校验
if(file===undefined){
    return layer.msg('请选择上传头像!')
}
// 根据选择的文件,创建一个对应的URL地址
var newImgURL = URL.createObjectURL(file);
$image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(option)        // 重新初始化裁剪区域
})


// 需求4:上传头像
$('#uploadAvatar').on('click',function(){
    var dataURL=$image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
    // encodeURIComponent:把特殊符号一起编译
    axios({
        method:'POST',
        url:'/my/update/avatar',
        data:'avatar='+encodeURIComponent(dataURL)
    }).then(res=>{
     if(res.data.status!==0){
         return layer.msg(res.data.message)
     }
    //  成功提示,刷新index.html里的头像
     layer.msg('恭喜您,更换头像成功!')
     window.parent.getUserInfo()
    })
})
})