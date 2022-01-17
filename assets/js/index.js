$(function(){
    let layer=layui.layer
   $('#logout').on('click',function(){
    layer.confirm('确认退出登录吗?', {icon: 3, title:'提示'}, function(index){
    //    跳转页面到登录页,清除token
    location.href='/login.html'
        localStorage.removeItem('token')
        layer.close(index);
      });
   })

//    需求2:渲染用户名和头像
getUserInfo()
})

function getUserInfo(){
    axios({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')
        // }
    }).then((res)=>{
        console.log(res.data);
        // 判断
        if(res.data.status!==0){
            return layui.layer.msg(res.data.message)
        }
        // 渲染用户名和头像
        renderUserInfo(res.data.data)
    })
}


function renderUserInfo(user){
// 优先赋值昵称,不存在赋值登录昵称
let name=user.nickname || user.username
// 欢迎赋值
$('.welcome').html('欢迎&nbsp;&nbsp;'+name)
// 判断有没有图片头像
if(user.user_pic==null){
// 显示文字头像,隐藏图片头像
$('.avatar-text').show().html(name[0].toUpperCase())
$('.avatar-img').hide()
}else{
    // 隐藏文字头像,显示图片头像
    $('.avatar-text').hide()
    $('.avatar-img').show().attr('src',user.user_pic)
}


}
