<script setup lang="ts">
import { Waline } from "@waline/client/component";
const serverURL = "https://waline.vercel.app";
import "@waline/client/style";
import { ref } from "vue";
const showPopup = ref(false);
const currentNum = ref(0);

const handleClickBtn = () => {
  showPopup.value = true;
};

const afterRead = (file: File) => {
  // 此时可以自行将文件上传至服务器
  console.log(file);
};
const name = ref("名字");
const leftContent = ref("左侧内容");
const rightContent = ref("右侧内容");
</script>

<template>
  <van-sticky>
    <van-notice-bar left-icon="volume-o" text="尊重逝者, 尊重他人." />
  </van-sticky>
  <div class="wrapper">
    <div class="content">
      <van-image
        round
        class="avatar"
        width="70"
        height="70"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <div class="name">{{ name }}</div>
      <div class="left-content">{{ leftContent }}</div>
      <div class="right-content">{{ rightContent }}</div>
      <img src="./assets/01.gif" class="bg-image van-haptics-feedback" />
      <van-button
        class="btn"
        type="primary"
        size="normal"
        @click="handleClickBtn"
        >加入祭祀</van-button
      >
      <div>当前祭祀人数: {{ currentNum }}</div>
      <van-divider />
      <div class="waline-wrapper">
        <Waline :serverURL="serverURL" path="/" />
      </div>
    </div>
  </div>
  <van-popup
    round
    v-model:show="showPopup"
    position="bottom"
    :style="{ height: '50%' }"
  >
    <div class="form-content">
      <h4 class="title">加入祭祀</h4>

      <van-field name="uploader" label="上传头像:">
        <template #input>
          <van-uploader />
        </template>
      </van-field>
      <van-field
        v-model="name"
        name="名称"
        label="名称"
        placeholder="请输入名称"
        :rules="[{ required: true, message: '请填写名称' }]"
      />

      <van-field
        v-model="leftContent"
        name="左侧内容"
        label="左侧内容"
        placeholder="请输入左侧内容"
        :rules="[{ required: true, message: '请填写左侧内容' }]"
      />
      <van-field
        v-model="rightContent"
        name="右侧内容"
        label="右侧内容"
        placeholder="请输入右侧内容"
        :rules="[{ required: true, message: '请填写右侧内容' }]"
      />
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
.wrapper {
  margin: 0 auto;
  max-width: 375px;
  width: 375px;
  .waline-wrapper {
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
  }

  .content {
    box-sizing: border-box;
    position: relative;
    margin-bottom: 30px;
    flex-direction: column;
    align-items: center;
    .name,
    .left-content,
    .right-content {
      position: absolute;
    }
    .name {
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
    }
    .left-content,
    .right-content {
      writing-mode: vertical-lr;
    }
    .left-content {
      top: 130px;
      left: 107px;
    }
    .right-content {
      top: 130px;
      right: 107px;
    }
    .btn {
      margin-top: 20px;
      width: 100%;
      margin-bottom: 20px;
    }
    .avatar {
      top: 125px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .bg-image {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  }
}
.form-content {
  padding: 0 20px;
  box-sizing: border-box;
  .title {
    text-align: center;
  }
}
</style>
