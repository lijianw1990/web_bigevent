$(function() {
    var form = layui.form
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在 1 ~ 6 个字符之间！'
                }
            }
        })
        // 调用初始化用户信息函数
    initUserInfo()
        // 定义初始化信息函数
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('信息获取失败');
                }
                console.log(res.data);
                // 利用layui表单赋值 / 取值模块快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置按钮设置
    $("#btnReset").on("click", function(e) {
            // 阻止表单默认提交行为
            e.preventDefault();
            // 从新调用initUserInfo函数获取用户信息
            initUserInfo();
        })
        // 更新用户的基本信息
    $(".layui-form").on("submit", function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起 ajax 数据请求
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改用户信息失败')
                }
                window.parent.getUserInfo()
            }
        })

    })
})