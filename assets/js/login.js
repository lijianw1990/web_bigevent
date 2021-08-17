$(function() {
    // 设置登录注册页面切换
    $("#link_reg").on("click", function() {
        console.log("点击去注册");
        $(".login_box").hide();
        $(".register_box").show();

    })
    $("#link_login").on("click", function() {
            console.log("点击去登录");
            $(".login_box").show();
            $(".register_box").hide();
        })
        // 设置表单密码格式验证
        // 引入layui的form样式并赋值给form
    var form = layui.form;
    // 引入弹出层组件
    var layer = layui.layer;
    form.verify({
            // 验证密码格式
            pass: [
                /^[\S]{6,12}$/,
                '密码必须6到12位，且不能出现空格'
            ],
            // 判断两次密码是否一致
            reppass: function(value) {
                var pwd = $('.register_box [name=password]').val()
                if (pwd !== value) {
                    return "两次密码不一致";
                }

            }

        })
        // 发起注册用户的Ajax请求
    $("#form_red").on("submit", function(e) {
            e.preventDefault()
            $.ajax({
                url: "/api/reguser",
                method: "POST",
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {

                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    $("#link_login").click();
                }
            })
        })
        // 发起登录的Ajax请求
    $("#login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {

                    return layer.msg("用户名或密码错误")
                }

                layer.msg("登录成功");
                localStorage.setItem("token", res.token);
                location.href = "/index.html"
            }
        })
    })
})