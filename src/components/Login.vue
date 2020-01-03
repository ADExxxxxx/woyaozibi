<!-- 登录组件 -->
<template>
    <div class="login_container">
        <!-- 登录框 -->
        <div class="login_box">
            <!-- 登录框上方头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>

            <!-- 登录表单区 :model绑定数据列表, rules:验证规则列表 -->
            <el-form ref="loginFormRef" :rules="loginFormRules" label-width="0px" class="login_form" :model="loginForm">
                <!-- 用户名 prop属性定义验证规则-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont iconxingmingyonghumingnicheng"></el-input>
                </el-form-item>

                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont iconmima" type="password"></el-input>
                </el-form-item>

                <!-- 按钮区 -->
                <el-form-item class="btns">
                    <el-button @click="login()" type="primary">登录</el-button>
                    <el-button @click="resizeLoginForm()" type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      // 这是登录的数据对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单验证列表
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置表单
    resizeLoginForm () {
      // resetFields是element自带的函数，找到dom节点进行调用
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // validate函数预验证，接收回调函数，通过返回的bool值判断是否验证通过
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return valid
        }
        // 添加await 处理promise数据，要使用await处理要添加async异步处理
        const { data: res } = await this.$http.post('login.php', this.loginForm)
        if (res.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 将token存放到session中
        window.sessionStorage.setItem('token', res.token)
        // 发生页面跳转
        this.$router.push('/home')
      })
    }
  }
}

</script>
<!-- scope表示当前文件生效，否则全局生效 -->

<style lang="less" scoped>

.login_container{
    /*background-color: #2b4b6b;*/
    background-image: url('../assets/5b7cd535bf512.jpg');
    background-size: 100% 100%;
    //background-attachment: fixed;
    background-repeat:repeat;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    /* 相对于左上角居中 */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}

.login_form{
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns{
    display: flex;
    justify-content: flex-end;
}

</style>
