<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { mobileRules, passwordRules, codeRules } from "@/utils/rules";
import { showToast, showSuccessToast } from "vant";
import { loginAPI, sendCodeAPI, loginByCodeAPI } from "@/services/user";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const store = useUserStore();
const gender = ref(0);
const mobile = ref("13211112222");
const password = ref("abc12345");
const agree = ref(false);
// 控制密码是否显示
const show = ref(false);
// 表单提交
const onLogin = async () => {
  if (!agree.value) {
    showToast("请勾选我已同意");
    return;
    // 验证完毕，进行登录
  }
  // const res = await loginAPI(mobile.value, password.value);
  const res = isPass.value
    ? await loginAPI(mobile.value, password.value)
    : loginByCodeAPI(mobile.value, code.value)
  store.saveUser(res.data);
  showSuccessToast("登录成功");
  router.push("/");
};

const isPass = ref(true)
const code = ref("")

const second = ref(0)
let timerId: number

const sendCode = async() => {
  const { data } = await sendCodeAPI(mobile.value)
  showSuccessToast('发送成功')
  code.value = data.code
  second.value = 60
  timerId = setInterval(() => {
      second.value --
      if (second.value === 0) clearInterval(timerId)
    }, 1000)
}

onUnmounted(() => {
  clearInterval(timerId)
})
    

</script>

<template>
  <div class="login-page">
    <CpNavBar rightText="注册" />
    <div class="login-head">
      <h3>{{ isPass? '密码登录':'短信验证码登录'}}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass? '密码登录':'短信验证码登录' }}</span>
        <van-icon name="arrow" />
      </a>
    </div>
    <van-form autocomplete="off" @submit="onLogin">
      <van-field
        placeholder="请输入手机号"
        type="tel"
        v-model="mobile"
        :rules="mobileRules"
      />
      <van-field
        v-if="isPass"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
        v-model="password"
        :rules="passwordRules"
      >
        <template #button>
          <cp-icon
            @click="show = !show"
            :name="`login-eye-${show ? 'on' : 'off'}`"
          />
        </template>
      </van-field>

      <van-field
        v-if="!isPass"
        placeholder="请输入验证码"
        :type="show ? 'text' : 'password'"
        v-model="code"
        :rules="codeRules"
      >
        <template #button>
          <span v-if="second" >{{second}}s后再次发送</span>
          <span v-else class="btn-send" @click="sendCode">发送验证码</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round native-type="submit" type="primary"
          >登录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码</a>
      </div>
    </van-form>
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }

  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 14px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
  color: var(--cp-primary);
}
}
</style>
