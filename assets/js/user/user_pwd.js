$(function () {
    let form = layui.form
    console.log(form);
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // 新密码校验
        newPwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码和原密码相同!'
            }
        },
        // 确认新密码校验
        rePwd: function (value) {
            // 判断和新密码相同
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码输入不一致!'
            }
        }
    })


    // 需求2:修改密码 提示成功
    let layer = layui.layer
    $('#formPwd').on('submit', function (e) {
        e.preventDefault()
        axios({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize()
        }).then(res => {
            if (res.data.status !== 0) {
                return layer.msg(res.data.message)
            }
            layer.msg('恭喜您,修改密码成功!')
            //    清空表单
            $('#formPwd')[0].reset()
            // 跳转页面
            // window.parent.location.href = '/login.html'
        })
    })

})