$(function() {
    // 定义密码效验规则
    var form = layui.form;
    form.verify({
            // 定义密码 效验规则
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 新密码效验规则
            newPwd: function(value) {
                if (value === $("[name=oldPwd]").val()) {
                    return "新密码与原密码一致，请重新输入"
                }
            },
            // 确认密码效验规则
            rePwd: function(value) {
                if (value !== $("[name=newPwd]").val()) {
                    return "两次密码不一致，请重新输入"
                }
            }
        })
        // 发起请求实现重置密码的功能
    $(".layui-form").on("submit", function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("更新密码失败");
                }
                layui.layer.msg("更新密码成功");
                $(".layui-form")[0].reset()
            }
        })
    })
})