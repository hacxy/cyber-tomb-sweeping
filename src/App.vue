<script setup lang="ts">
import "@waline/client/style";
import { Waline } from "@waline/client/component";
import { ref } from "vue";
import { showToast, showConfirmDialog } from "vant";
import instance, { getFirstSacrifices, getCurrentCount } from "./service";
import { reactive } from "vue";
import { setIntervalAsync } from "tianjie";
import { WALINE_SERVICE_URL, WALINE_PATH } from "./config";
import { stringify } from "qs";
// const serverURL = "https://waline.hacxy.cn";
const showPopup = ref(false);
const currentNum = ref(0);
const name = ref("");
const leftContent = ref("");
const rightContent = ref("");
const avatar = ref("/avatar.jpg");
const sacrificesData = reactive({
  name: "",
  leftContent: "",
  rightContent: "",
  avatar: [],
});
const handleOversize = () => {
  showToast("头像大小不能超过5M");
};
const handleClickBtn = () => {
  showPopup.value = true;
};

const getSacrificesData = async () => {
  const res = await getFirstSacrifices();
  currentNum.value = await getCurrentCount();
  if (res) {
    name.value = res.name;
    leftContent.value = res.leftContent;
    rightContent.value = res.rightContent;
    avatar.value = res.avatar;
  } else {
    name.value = "";
    leftContent.value = "";
    rightContent.value = "";
    avatar.value = "/avatar.jpg";
  }
};
getSacrificesData();
const player = setIntervalAsync(async () => {
  await getSacrificesData();
}, 1000);

player.start();

const handleSubmit = async () => {
  const count = name.value ? currentNum.value + 1 : currentNum.value;
  showConfirmDialog({
    title: "提示",
    message: `您前面有 ${count} 个人, 是否确认登记?`,
    beforeClose: async () => {
      const formData = new FormData();
      formData.append("avatar", (sacrificesData.avatar as any)[0].file);
      const url = await instance
        .post("/sacrifices/upload", formData)
        .then((res) => res.data.data);
      const data = {
        ...sacrificesData,
        avatar: url,
      };

      await instance.post("/sacrifices", stringify(data)).then(() => {
        showToast("提交成功");
        sacrificesData.name = "";
        sacrificesData.leftContent = "";
        sacrificesData.rightContent = "";
        sacrificesData.avatar = [];
        showPopup.value = false;
      });
      return true;
    },
  });
};
</script>

<template>
  <VanSticky>
    <van-notice-bar left-icon="volume-o" text="赛博上坟, 船新版本, 船新体验" />
  </VanSticky>
  <div class="wrapper">
    <div class="content">
      <VanImage
        round
        class="avatar"
        width="70"
        height="70"
        :src="avatar"
        fit="cover"
      />

      <div class="name">{{ name }}</div>
      <div class="left-content">{{ leftContent }}</div>
      <div class="right-content">{{ rightContent }}</div>
      <img src="/01.gif" class="bg-image van-haptics-feedback" />
      <VanButton
        class="btn"
        type="primary"
        size="large"
        @click="handleClickBtn"
      >
        登记
      </VanButton>
      <div>当前排队人数: {{ currentNum }}</div>
      <van-divider />
      <div class="waline-wrapper">
        <Waline :serverURL="WALINE_SERVICE_URL" :path="WALINE_PATH" />
      </div>
    </div>
  </div>
  <VanPopup
    round
    v-model:show="showPopup"
    position="bottom"
    :style="{ height: '50%' }"
  >
    <div class="form-content">
      <h4 class="title">登记</h4>

      <VanForm @submit="handleSubmit">
        <van-field
          name="avatar"
          label="上传头像:"
          :rules="[
            {
              required: true,
              message: '请上传头像',
            },
          ]"
        >
          <template #input>
            <van-uploader
              :max-size="1024 * 1024 * 5"
              @oversize="handleOversize"
              accept=".png, .jpg, .jpeg, .gif"
              v-model="sacrificesData.avatar"
              :max-count="1"
            />
          </template>
        </van-field>

        <van-field
          v-model="sacrificesData.name"
          name="name"
          :maxlength="7"
          label="名称"
          placeholder="请输入名称"
          :rules="[{ required: true, message: '请填写名称' }]"
        />

        <van-field
          v-model="sacrificesData.leftContent"
          name="leftContent"
          label="左侧碑文"
          :maxlength="9"
          placeholder="请输入左侧碑文"
          :rules="[{ required: true, message: '请填写左侧碑文' }]"
        />
        <van-field
          v-model="sacrificesData.rightContent"
          name="rightContent"
          label="右侧碑文"
          :maxlength="9"
          placeholder="请输入右侧碑文"
          :rules="[{ required: true, message: '请填写右侧碑文' }]"
        />
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </VanForm>
    </div>
  </VanPopup>
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
