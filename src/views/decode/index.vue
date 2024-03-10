<template>
    <CommpnPage>
      <main class="auto-bg h-full flex flex-col items-center">
        <div class="auto-bg2 m-6 flex-1 rounded-2 lg:w-[1200px] lg:px-0 w-90%">
          <div class="p-5 pt-2 pb-2 text-5 border-b-1px border-b-dashed border-b-#efefef">
            <p>QR码解码</p>
          </div>
          <div class="p-5 flex flex-col">
            <div class="w-full">
              <n-upload
                list-type="image"
                @before-upload="beforeUpload"
                @remove="handleRemove"
                :max="1"
                accept="image/png, image/jpeg"
              >
                <n-upload-dragger>
                  <div style="margin-bottom: 12px">
                    <SvgIcon name="svg-imgupload" size="48px" :color="isDark ? '#fff' : '#666'" class="ml-4"/>
                  </div>
                  <n-text style="font-size: 16px">
                    点击或者拖拽图片到该区域来上传
                  </n-text>
                  <n-p depth="3" style="margin: 8px 0 0 0">
                    上传的图片不会做任何形式的存储
                  </n-p>
                </n-upload-dragger>
              </n-upload>
            </div>
            <div class="mt-4" v-if="decodeContent">
              识别结果：
              <n-input v-model:value="decodeContent" type="textarea" />
            </div>
          </div>
        </div>
      </main>
    </CommpnPage>
  </template>
  
  <script setup lang="ts">
  import { useDark } from '@vueuse/core';
  import { UploadFileInfo } from 'naive-ui';
  import QrcodeDecoder from 'qrcode-decoder';
  const isDark = useDark()

  const decodeContent = ref<string>('')

  const beforeUpload = (data: {file: UploadFileInfo}) => {
    const file = data.file.file as File
    let url = '';
    if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    const qr = new QrcodeDecoder()
    const res = qr.decodeFromImage(url)

    res.then(res => {
      if (res.data) {
        decodeContent.value = res.data
      } else {
        window.$message?.info("二维码识别失败！")
      }
    }).catch(err => {
      window.$message?.error(JSON.stringify(err))
    })
  }

  
  const handleRemove = () => {
    decodeContent.value = ''
  }
  </script>
  