$(function () {
    $('.login-box a').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('.reg-box a').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // console.log(layui);
    let form = layui.form
    // console.log(layui.form);
    // verify()值是一个对象
    form.verify({
        // 属性是规则名称,值可以是数组或者函数
        pwd: [
            // 第一个值是校验规则
            /^[\S]{6,15}$/,
            // 报错信息
            '密码长度为6-15个字符,且不能包含空格!'
        ],
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次输入的密码不一致'
            }
        }
    })


    // 注册axios
    let layer = layui.layer
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        axios({
            method: 'POST',
            url: '/api/reguser',
            data: $('#form-reg').serialize(),
        }).then((res) => {
            // console.log(res.data);
            // 判断状态码
            if (res.data.status !== 0) {
                return alert(res.data.message)
            }
            // 注册成功
            // alert(res.data.message)
            layer.msg('恭喜您,注册成功!')
            // 清空表单
            $('#form-reg')[0].reset()
            // 切换到登录区域
            $('.reg-box a').click()
        })

    })


    // 登录
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        axios({
            method: 'POST',
            url: '/api/login',
            data: $('#form-login').serialize()
        }).then((res) => {
            if (res.data.status != 0) {
                return layer.msg(res.data.message)
            }
            // 成功提示
            layer.msg('恭喜您,登陆成功!')
            location.href = '/index.html'
            localStorage.setItem('token', res.data.token)
        })
    })
})