$(function(){
    // 渲染用户信息
    let layer=layui.layer
    let form=layui.form
    initUserInfo()
    function initUserInfo(){
        // 获取用户信息
        axios({
            method:'GET',
            url:'/my/userinfo',
            // headers:{
            //     Authorization:localStorage.getItem('token')
            // }
        }).then((res)=>{
            // console.log(res.res.data);
    //    判断
    if(res.data.status!==0){
        return layer.msg(res.data.message)
    }
    // 赋值
    form.val('formUserInfo',res.data.data)
        })
    }

    // 自定义校验
    form.verify({
        nickname:function(value){
            if(value.length>10){
                return '用户昵称1-10之间!'
            }
        }
    })


    // 修改用户信息 
    $('form').on('submit',function(e){
e.preventDefault()
axios({
    method:'POST',
    url:'/my/userinfo',
    data:$('form').serialize(),
    // headers:{
    //     Authorization:localStorage.getItem('token')
    // }
}).then((res)=>{
    if(res.data.status!==0){
    return layer.msg(res.data.message)
    }
    // 刷新index.html中的用户名
    layer.msg('恭喜您,修改用户信息成功!')
    window.parent.getUserInfo()
})
    })


    // 需求4:重置 - 按钮的点击事件呵form的重置事件
    $('form').on('reset',function(e){
         e.preventDefault()
         initUserInfo()
    })



    

})