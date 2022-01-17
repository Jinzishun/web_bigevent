axios.defaults.baseURL='http://api-breakingnews-web.itheima.net';


// 请求拦截器
axios.interceptors.request.use(function(config){
    // 给/my开头的请求添加身份验证信息
    console.log(config);
    // 判断:只要包含/my/就添加token
    // if(config.url.indexOf('/my/')>=0){}
    if(config.url.includes('/my/')){
        config.headers.Authorization=localStorage.getItem('token')
    }
    // 必须要返回config
    return config
},function(error){
    return Promise.reject(error)
})


// 响应拦截器
axios.interceptors.response.use(function(response){
    // 如果身份验证失败,就跳转到登陆页面
    let obj=response.data
    if(obj.message==='身份验证失败'){
        // 页面跳转
    location.href='/login.html'
    // 删除无效token
    localStorage.removeItem('token')
    }
    return response
},function(error){
    return Promise.reject(error)
})


