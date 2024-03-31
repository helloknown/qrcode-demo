<template>
    <CommpnPage>
      <main class="auto-bg h-full flex flex-col items-center">
        <div class="auto-bg2 m-6 flex-1 rounded-2 lg:w-[1200px] lg:px-0 w-90%">
          <div class="p-5 pt-2 pb-2 text-5 border-b-1px border-b-dashed border-b-#efefef">
            <p>QR码</p>
          </div>
          <div class="p-5 flex <sm:flex-col">
            <div class="w-full">
              <n-form
                :model="model"
                label-placement="left"
                label-width="auto"
                require-mark-placement="right-hanging"
                :size="size"
              >
                <n-form-item label="编码内容:" path="data">
                  <n-input
                    v-model:value="model.data"
                    placeholder="Textarea"
                    type="textarea"
                    :autosize="{
                      minRows: 3,
                      maxRows: 3
                    }"
                    :style="{ minWidth:'50%', maxWidth: '80%'}"
                  />
                </n-form-item>
                <n-form-item label="纠错等级:" path="errorCorrectLevel">
                  <!-- <n-select
                    v-model:value="model.errorCorrectionLevel"
                    placeholder=""
                    :options="errorCorrectionLevelOptions"
                    :style="{width:'50%'}"
                  /> -->
                  <n-radio-group v-model:value="model.errorCorrectLevel" >
                    <n-radio-button
                      v-for="errorCorrection in errorCorrectionLevelOptions" :key="errorCorrection.value" :value="errorCorrection.value"
                      :label="errorCorrection.label" size="small"
                    />                    
                  </n-radio-group>
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <SvgIcon name="svg-question" size="18px" :color="isDark ? '#fff' : '#111'" class="ml-4"/>
                    </template>
                    L 的容错率为 7%，M 容错率为 15%，Q 容错率为 25%，H 容错率为 30%
                  </n-tooltip>
                </n-form-item>
                <n-form-item label="版本:" path="typeNumber">  
                  <n-select v-model:value="model.typeNumber" :options="typeNumberOptions" :style="{width:'50%'}" />
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <SvgIcon name="svg-question" size="18px" :color="isDark ? '#fff' : '#111'" class="ml-4"/>
                    </template>
                    二维码一共有40个规格版本，是根据矩阵的行数、列数来区分的，从版本1到版本40共40种。版本越高，码点就越密集
                  </n-tooltip>
                </n-form-item>
                <n-form-item label="尺寸:" path="size">
                  <!-- <n-input-number v-model:value="model.size" :style="{width:'50%'}" :step="10" /> -->
                  <n-slider v-model:value="model.size" :step="10" :max=500 :min=100 :style="{width:'50%'}"/>
                </n-form-item>
                <n-form-item label="边距:" path="margin">
                  <n-slider v-model:value="model.margin" :step="2" :max="50" :style="{width:'50%'}"/>
                </n-form-item>

                <n-form-item label="前景色:" path="foregroundColor">
                  <n-color-picker v-model:value="model.foregroundColor" :show-preview="false"  size="small" :style="{width:'50%'}"/>
                </n-form-item>
                <n-form-item label="背景色:" path="backgroundColor">
                  <n-color-picker v-model:value="model.backgroundColor" :show-preview="false"  size="small" :style="{width:'50%'}"/>
                </n-form-item>
                <n-form-item label="区域颜色:" path="areaColor">
                  <n-color-picker v-model:value="model.areaColor" :show-preview="false" size="small" :style="{width:'50%'}"/>
                </n-form-item>
                <n-form-item label="前景图片:" >
                  <div>
                    <n-upload list-type="image-card" :max=1 @before-upload="beforeUpload1" @remove="handleRemove1" accept="image/png, image/jpeg"/>
                    <img style="width: 100%">
                  </div>                                  
                  <div class="<sm:flex-none flex flex-col w-full pl-4 pb-4" v-if="foregroundImage.foregroundImageSrc != ''">                    
                    <div class="<sm:flex-none md:flex justify-items-start items-center w-full pb-4">
                      <label class="w-10% mr-4">形状:</label>
                      <n-slider v-model:value="foregroundImage.foregroundImageBorderRadius" :step="5" :max="100" :style="{width:'30%'}" :tooltip="false"/>
                    </div>
                    <div class="<sm:flex-none md:flex justify-items-start items-center w-full">
                      <label class="w-10% mr-4">尺寸:</label><n-slider v-model:value="foregroundImage.foregroundImageWidth" :step="10"  :style="{width:'30%'}" :tooltip="false"/>
                    </div>
                  </div>                  
                </n-form-item>
                <n-form-item label="背景图片:" >
                  <div>
                    <n-upload list-type="image-card" name="bkname" :max=1 @before-upload="beforeUpload2" @remove="handleRemove2" accept="image/png, image/jpeg"/>
                    <img style="width: 100%">
                  </div>                                  
                  <div class="<sm:flex-none flex flex-col w-full pl-4 pb-4" v-if="backgroundImage.backgroundImageSrc != ''">                    
                    <div class="<sm:flex-none md:flex justify-items-start items-center w-full pb-4">
                      <label class="w-15% mr-4">尺寸:</label>
                      <n-slider v-model:value="backgroundImage.backgroundImageWidth" :step="10" :min="50" :max="500" :style="{width:'30%'}" />
                    </div>
                    <div class="<sm:flex-none md:flex justify-items-start items-center w-full">
                      <label class="w-15% mr-4">透明度:</label><n-slider v-model:value="backgroundImage.backgroundImageAlpha" :step="0.1" :max=1 :style="{width:'30%'}" :tooltip="false"/>
                    </div>
                  </div>
                  
                </n-form-item>
                
              </n-form>
            </div>
            <div class="w-full f-c-c flex-col bg-#fafafa dark:bg-#000 p-4">                        
              <div>
                <canvas ref="qrcodeCanvas" :width="model.dynamicSize" :height="model.dynamicSize"></canvas>
                <div class="mt-4">
                  <n-space vertical>
                    <n-slider v-model:value="pluginType" :marks="marks" :step="2" :max=6 :tooltip="false" >
                      
                    </n-slider>
                    <n-input v-if="pluginType == 6" size="small" placeholder="输入文字" v-model:value="inputWords" />
                  </n-space>
                </div>                
              </div>
              <!-- <div class="relative  top-0 left-0  ">
                <n-switch :round="false" v-model:value="useCodeTheme">
                <template #checked>
                  自定义
                </template>
                <template #unchecked>
                  使用主题
                </template>
              </n-switch>
              </div>
              <div class="w-full mt-8" v-if="useCodeTheme">
                <n-tabs type="line" animated >
                  <n-tab-pane name="obs" tab="抽象">
                    抽象
                  </n-tab-pane>
                </n-tabs>
              </div>               -->
            </div>
          </div>
        </div>
        <div class="auto-bg2 m-6 flex-1 rounded-2 lg:w-[1200px] lg:px-0 w-90%">
          <div class="p-5 pt-2 pb-2 text-5 border-b-1px border-b-dashed border-b-#efefef">
            <p>码元设置 <n-switch v-model:value="active" @update:value="handleChange" /></p>
          </div>
          <div class="p-5">
            <n-form
              :model="positionMode"
              label-placement="left"
              label-width="auto"
              require-mark-placement="right-hanging"
            >
              <n-form-item>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">定位区域背景色:</label><n-color-picker v-model:value="positionMode.positionProbeBackgroundColor" :show-preview="false"  size="small"/>
                </div>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">定位码点颜色:</label><n-color-picker v-model:value="positionMode.positionProbeForegroundColor" :show-preview="false"  size="small"/>
                </div>
              </n-form-item>
              <n-form-item>                
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">分割区域颜色:</label><n-color-picker v-model:value="positionMode.separatorColor" :show-preview="false"  size="small"/>
                </div>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <!-- <label class="w-50% text-right mr-4">暗块颜色: </label><n-color-picker v-model:value="positionMode.darkBlockColor" :show-preview="false"  size="small" /> -->
                </div>
              </n-form-item>
              <n-form-item>                
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">格式区域背景色:</label><n-color-picker v-model:value="positionMode.formatBackgroundColor" :show-preview="false"  size="small"/>
                </div>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">格式码点颜色: </label><n-color-picker v-model:value="positionMode.darkBlockColor" :show-preview="false"  size="small" />
                </div>
              </n-form-item>
              <n-form-item>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">时序区域背景色: </label><n-color-picker v-model:value="positionMode.timingBackgroundColor" :show-preview="false"  size="small" />
                </div>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">时序码点颜色: </label><n-color-picker v-model:value="positionMode.timingForegroundColor" :show-preview="false"  size="small" />
                </div>
              </n-form-item>
              <n-form-item>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">校正区域背景色: </label><n-color-picker v-model:value="positionMode.positionAdjustBackgroundColor" :show-preview="false"  size="small" />
                </div>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">校正码点颜色: </label><n-color-picker v-model:value="positionMode.positionAdjustForegroundColor" :show-preview="false"  size="small" />
                </div>                          
              </n-form-item>
              <n-form-item>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">版本信息区域背景色: </label><n-color-picker v-model:value="positionMode.typeNumberBackgroundColor" :show-preview="false"  size="small" />
                </div>
                <div class="<sm:flex-none md:f-b-c mr-4 w-50%">
                  <label class="w-50% text-right mr-4">版本信息码点颜色: </label><n-color-picker v-model:value="positionMode.typeNumberForegroundColor" :show-preview="false"  size="small" />
                </div>                          
              </n-form-item>                                        
            </n-form>
          </div>
        </div>
      </main>
    </CommpnPage>
  </template>
  
  <script setup lang="ts">
  import { useDark } from '@vueuse/core';
  import { constErrorCorrectionLevel, constTypeNumberOptions } from '@/constants/qrcode';
  import { Size } from 'naive-ui/es/form/src/interface';
  import UQRCode from '@/utils/qrcode/main'
  import { SelectOption, UploadFileInfo } from 'naive-ui';
  import { liquid, round, words } from '@/utils/qrcode/plugin'

  const isDark = useDark()
  const size = ref<Size>('medium')
  const model = ref({
    errorCorrectLevel: '1',
    typeNumber: '-1',
    data:'1234567',
    size: 200,
    margin: 2,
    useDynamicSize:true,
    dynamicSize: 200,
    areaColor: '#FFFFFF', // 码点颜色
    backgroundColor: '#FFFFFF', // 背景色
    foregroundColor: '#000000' // 前景色
  })

  const active = ref(false)
  const positionMode = ref({
    positionProbeBackgroundColor: model.value.backgroundColor, //定位角区域背景色
    positionProbeForegroundColor: model.value.foregroundColor, // 定位角码点颜色
    separatorColor: model.value.backgroundColor, // 分割区域颜色
    positionAdjustBackgroundColor: model.value.backgroundColor, // 对齐区域背景色
    positionAdjustForegroundColor: model.value.foregroundColor, // 对齐码点颜色
    timingBackgroundColor: model.value.backgroundColor, // 时序区域背景色
    timingForegroundColor: model.value.foregroundColor, // 时序码点颜色
    typeNumberBackgroundColor: model.value.backgroundColor, // 版本信息区域背景色
    typeNumberForegroundColor: model.value.foregroundColor, // 版本信息码点颜色
    darkBlockColor: model.value.foregroundColor, // 暗块颜色
    formatBackgroundColor: model.value.backgroundColor, // 格式区域背景颜色
  })

  const foregroundImage = ref({
    foregroundImageSrc: '',
    foregroundImageWidth: model.value.dynamicSize/4,
    foregroundImageBorderRadius:30,
    foregroundImagePadding: 1,
    foregroundPadding:0.0,
  })

  const backgroundImage = ref({
    backgroundImageSrc: '',
    backgroundImageWidth: model.value.dynamicSize,
    backgroundImageHeight: model.value.dynamicSize,
    backgroundImageBorderRadius:0,
    backgroundImageAlpha: 1,
    backgroundPadding:0.0,
  })

  const pluginType = ref(0)
  const inputWords = ref('8')
  const marks = {
    0: '直角',
    2: '圆角',
    4: '流体',
    6: '数字'
  }

  // const useCodeTheme = ref(false)

  watch([foregroundImage.value, positionMode.value, model.value, pluginType, inputWords], ()=>{
    setTimeout(() => {
      // backgroundImage.value.backgroundImageWidth = model.value.dynamicSize
      // backgroundImage.value.backgroundImageHeight = model.value.dynamicSize
      generateQRCode()
    },0)
  })

  watch([backgroundImage.value],()=>{
    setTimeout(() => {
      backgroundImage.value.backgroundImageWidth = backgroundImage.value.backgroundImageWidth
      backgroundImage.value.backgroundImageHeight = backgroundImage.value.backgroundImageWidth
      generateQRCode()
    },0)
  })
  // generate QRCode
  const qrcodeCanvas = ref<HTMLCanvasElement | null>(null);
 
  onMounted(()=>{
    generateQRCode()
  })

  // 纠错码
  const errorCorrectionLevelOptions = constErrorCorrectionLevel.map((e) => {
      const key = Object.keys(e)[0]
      const label = e[key]
      return {label:label, value:key}
    }
  )
  // 二维码版本，验证内容长度于版本的限制
  const currentTypeNumber = ref(40);
  const typeNumberOptions = ref<SelectOption[]>([]);
  watchEffect(() => {
    typeNumberOptions.value = constTypeNumberOptions.map((e) => {
        const key = Object.keys(e)[0]
        let label
        if (key === '-1') {
          label = e[key]
        } else {
          label = key + " (" + e[key] +")"
        }
        let disabled = false
        if (Number(key) !== -1 && Number(key) < currentTypeNumber.value) {
          disabled = true
        }
        return {label:label, value:key, disabled: disabled}
    })
  })
  
  // 图片上传
  // const fileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     // 当读取完成时触发load事件
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     // 读取文件时发生错误时触发error事件
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //     // 读取文件并将其转换为base64编码
  //     reader.readAsDataURL(file);
  //   });
  // };
  const beforeUpload = async (data: {file: UploadFileInfo}, setImageSrc: Function) => {
    const file = data.file.file as File
    if (file?.type !== 'image/png' && file?.type !== 'image/jpeg') {
      window.$message?.warning('仅支持png/jpeg/jpg格式，请重新上传')
      return false
    }
    const url = window.webkitURL.createObjectURL(file)
    // const url = await fileToBase64(file)
    setImageSrc(url)
    return true
  }

  const handleRemove = (setImageSrc: Function) => {
    setImageSrc('')
  }

  const beforeUpload1 = async (data: {file: UploadFileInfo}) => {
    return beforeUpload(data, (url: string) => {
      foregroundImage.value.foregroundImageSrc = url
    })
  }

  const handleRemove1 = () => {
    handleRemove(() => {
      foregroundImage.value.foregroundImageSrc = ''
    })
  }

  const beforeUpload2 = async (data: {file: UploadFileInfo}) => {
    return beforeUpload(data, (url: string) => {
      backgroundImage.value.backgroundImageSrc = url
    })
  }

  const handleRemove2 = () => {
    handleRemove(() => {
      backgroundImage.value.backgroundImageSrc = ''
    })
  }

  //-------------------------------------------
  const handleChange = (value:boolean)=>{
    active.value = value
    generateQRCode()
  }

  const loadImage = async (src: string) => {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.src = src;
      img.onload = function() {
        // resolve返回img
        resolve(img);
      }
      img.onerror = err => {
        // reject返回错误信息
        reject(err);
      }
    })
  }
  
  const pluginFunctions = {
    2: { register: round, drawCanvas: 'drawRoundCanvas' },
    4: { register: liquid, drawCanvas: 'drawLiquidCanvas'},
    6: { register: words, drawCanvas: 'drawWordsCanvas' }
  };

  const generateQRCode = () => {
    if (qrcodeCanvas.value) {
      // 创建新的uQRCode实例
      try {        
        const options = {
          ...model.value,
          errorCorrectLevel: Number(model.value.errorCorrectLevel),          
          ...foregroundImage.value,
          foregroundImageHeight: foregroundImage.value.foregroundImageWidth,
          ...backgroundImage.value,
          backgroundImageX: model.value.dynamicSize/2 - backgroundImage.value.backgroundImageWidth/2,
          backgroundImageY: model.value.dynamicSize/2 - backgroundImage.value.backgroundImageHeight/2,
          loadImage: loadImage,
          ...(active.value ? positionMode.value : {})
        }
        // console.log(options)
        const canvasContext = qrcodeCanvas.value.getContext("2d");
        var qr = new UQRCode(options, canvasContext);
        
        const selectedPlugin = pluginFunctions[pluginType.value];

        if (selectedPlugin) {
          qr.register(selectedPlugin.register);          
        } 
        qr.words = inputWords.value;
        qr.make();
        model.value.dynamicSize = qr.dynamicSize;
        currentTypeNumber.value = qr.minTypeNumber;
    
        if (!selectedPlugin) {
          qr.drawCanvas();
        } else {
          const drawFunction = selectedPlugin.drawCanvas;
          qr[drawFunction]();
        }
      } catch (error) {
        console.log(error)
      }
      
    }
  };
  </script>
  