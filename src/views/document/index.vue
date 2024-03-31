<template>
    <CommpnPage>
      <main class="auto-bg h-full flex flex-col items-center">
        <div class="auto-bg2 m-6 flex-1 rounded-2 lg:w-[1200px] lg:px-0 w-90%">
          <div class="p-5 pt-2 pb-2 text-5 border-b-1px border-b-dashed border-b-#efefef">
            <p>QR 码知识 Q&A</p>
          </div>
          <div class="p-5 flex flex-col">
            <n-collapse default-expanded-names="1" >
              <n-collapse-item title="什么是 QR 码？" name="1">
                <p>QR 码是 Quick Response code 的缩写，全称为快速响应矩阵图码，是二维码的一种。通常由黑色方块组成矩阵形码，
                  QR 码使用四种标准化编码模式（数字、字母数字、字节（二进制）和日文（Shift_JIS））来存储数据，可以存储多种类型的信息，如文本、数字、链接等。
                </p>
              </n-collapse-item>
              <n-collapse-item title="QR 码的发展？" name="2">
                <p>QR 码是1994年日本汽车零组件大厂电装公司的工程师原昌宏发明的，初衷是为了快速识别零部件在生产过程中的信息，提高生产效率。</p>
              </n-collapse-item>
              <n-collapse-item title="QR 码的结构是怎样的？" name="3">
                <div class="flex <sm:flex-col">
                  <div class="flex-col">
                    <p >QR 码由定位标识、时序型圆点、功能图形和数据区组成。编码信息时，数据被分成块，每个块通过数据编码方式转换成二进制数据，再按照 QR 码规范进行排列。</p>
                    <p>QR 码最大特征为其左上，右上，左下三个大型的如同“回”字的黑白间同心方图案，为 QR 码识别定位标记，失去其中一个会影响识别。</p>
                  </div>
                  <n-image src="/src/assets/icons/svg/QRStruct.svg" :width="isMobile? '360px':'540px'" :show-toolbar="false"/>
                  <!-- <SvgIcon name="svg-QRStruct" size="460px" :color="isDark ? '#fff' : '#666'" /> -->
                </div>
              </n-collapse-item>
              <n-collapse-item title="QR 码可以用黑白以外的颜色（红色、蓝色等）吗？" name="5">
                <p>QR 码扫描仪是通过红色光的照明捕捉 QR 码的，如果背景和打印的颜色为反射（或吸收）红光的组合，就无法识别 QR 码，则无法完成读取。反言之，如果是背景反射红色、打印的颜色为吸收红色的组合，就可以读取。</p>
                <p>例如，白背景上配红色码、绿背景上配蓝色码，是无法读取的，但白色或黄色等背景上配蓝色或绿色，就有可能读取。</p>
              </n-collapse-item>
              <n-collapse-item title="QR 码有几种版本？不同版本的QR码有何区别" name="4">
                <p>QR 码一共提供40种不同版本存储密度的结构，对应指示图的“版本信息”，版本1为21×21模块（模块为QR码中的最小单元），每增加一个版本，长宽各增加4个模块，最大的版本40为177×177模块。</p>
                <p>版本为1、纠错级别为L时：最多可以有数据比特数量 152 个、数字 25 个、二进制 17 个、汉字 10 个。</p>
                <p>版本为40、纠错级别为L时：最多可以有数据比特数量 23648 个、数字 7089 个、二进制 2953 个、汉字 1817 个。</p>
                <n-data-table size="small" :columns="columns" :data="data" :single-line="false" />
              </n-collapse-item>              
              <n-collapse-item title="QR 码的纠错能力是如何实现的？" name="6">
                <p>当我们使用 QR 码时，数据往往会受到各种干扰，比如刮伤、污渍、模糊等，这可能导致解码错误。为了提高 QR 码的可靠性，QR 码引入了容错纠错功能。</p>
                <p>QR 码的纠错功能通过在编码时添加冗余数据来实现，这些冗余数据被称为纠错码，它们被计算出来并添加到原始数据中，形成最终的 QR 码。当 QR 码在扫描解码时遇到干扰导致部分数据错误时，纠错码可以帮助恢复原始数据。</p>
                <p>QR 码的纠错能力是基于Reed-Solomon纠错码实现的。Reed-Solomon 码是一种具有强大纠错能力的编码技术，广泛应用于数据通信和存储中，包括QR码中的纠错码部分。</p>
                <ol>
                  <li><p><strong>Reed-Solomon 码的数学原理</strong>：</p>
                  <ul>
                  <li>Reed-Solomon 码利用多项式运算来进行错误检测和纠正。在编码时，原始数据被视为多项式的系数，通过对这些系数进行运算，生成纠错码。</li><li>纠错码的计算和应用基于有限域上的数学运算，通常是在有限域GF(2^8)（即在模256的情况下进行计算）上进行。</li><li>Reed-Solomon 码通过添加冗余信息（纠错码）来增强数据的容错性，使得即使数据有部分损坏或丢失，接收端仍能恢复原始数据。</li></ul>
                  </li><li><p><strong>举例说明</strong>：<br> 假设我们有一个简化的 Reed-Solomon 码如下：</p>
                  <ul>
                  <li>原始数据：[1, 2, 3, 4, 5]（以数字表示）</li><li><p>纠错码：[A, B, C]（假设为字母表示）</p>
                  <p>在传输过程中，原始数据可能受损，接收端收到的数据可能变为：[1, X, 3, Y, 5]。</p>
                  </li><li><p>接收端利用 Reed-Solomon 码进行计算，通过多项式插值和数学算法，确定 X 和 Y 的正确值，并将其修正为 2 和 4。</p>
                  </li><li>最终，接收端成功恢复了原始数据 [1, 2, 3, 4, 5]，即使在传输过程中部分数据受损。</li></ul>
                  </li>
                </ol>
              </n-collapse-item>
              <n-collapse-item title="QR 码的生成过程" name="7">
                <div class="w-full markdown-body">
                  <h3>1. 数据编码</h3>
                  <ul>
                    <li>选择编码模式：根据要编码的数据类型（数字、字母数字、二进制数据等），选择合适的编码模式。</li>
                    <li>数据编码：将输入数据转换成相应的编码模式。例如，数字会被编码为数字模式，文本会被编码为字母数字模式。</li>
                    <li>添加填充字符：如果数据不足以填满预设的版本和纠错等级的容量，需要添加填充字符。</li>
                  </ul>
                  <h3>2. 生成纠错码</h3>
                  <ul>
                  <li>确定纠错等级：根据要求选择纠错等级（L、M、Q、H），纠错等级越高，二维码可承受的破损程度越高。</li>
                  <li>生成纠错码：使用事先定义好的纠错算法（通常为Reed-Solomon码）生成纠错码，将它们插入到编码的数据中。</li>
                  </ul>
                  <h3>3. 排布模块</h3>
                  <ul>
                  <li>选择版本：根据数据量和纠错等级选择合适的QR码版本，版本影响二维码的大小。</li>
                  <li>模块排布：将编码的数据和纠错码转换成二维码中的黑白模块（点）。每个模块代表一个二进制位（0或1）。</li>
                  </ul>
                  <h3>4. 应用掩码</h3>
                  <ul>
                  <li>选择掩码图案：掩码是为了提高二维码的读取能力，避免某些图案影响识别。选择一个掩码图案应用在已经排布好的模块上。</li>
                  <li>应用掩码规则：按照掩码的规则，对模块的某些位置进行翻转（0变1，1变0），确保二维码具有足够的对比度和结构。</li>
                  </ul>
                  <h3>5. 插入格式信息</h3>
                  <ul>
                  <li>格式信息：包含纠错等级和掩码图案信息，这些信息被编码到二维码的特定区域。</li>
                  <li>定位图案：在二维码的角落放置大块的定位图案，帮助读取器定位二维码。</li>
                  </ul>
                  <h3>6. 插入版本信息（如果需要）</h3>
                  <ul>
                  <li>版本信息：如果版本大于等于7，需要添加版本信息，它被编码在二维码的特定位置。</li>
                  </ul>
                  <h3>7. 完成二维码</h3>
                  <ul>
                  <li>完成模块排布：将所有必要的信息（数据、纠错码、格式和版本信息）按照既定规则排布成二维码图案。</li>
                  <li>生成二维码图形：这一步在程序中意味着生成一个图像文件，如果是手动绘制，则根据模块排布直接绘制。</li>
                  </ul>
                  <a class="text-blue" href="https://www.nayuki.io/page/creating-a-qr-code-step-by-step" target="_blank">二维码生成步骤示例 https://www.nayuki.io/page/creating-a-qr-code-step-by-step</a>
                  </div>
              </n-collapse-item>
              <n-collapse-item title="QR 码的解码过程" name="8">
                <h3>1. 图像预处理</h3>
                <ul>
                <li>获取图像：从扫描仪、相机或文件中获取包含QR码的图像。</li>
                <li>灰度转换：将彩色图像转换为灰度图像，简化后续处理。</li>
                <li>二值化：使用阈值方法将灰度图像转换为二值图像，使得QR码部分为黑色，背景为白色。</li>
                </ul>
                <h3>2. 定位QR码</h3>
                <ul>
                <li>查找定位模式：在二值图像中寻找大块的定位模式，通常为三个方块组成的L形结构。用于确定二维码的位置和方向。</li>
                </ul>
                <h3>3. 提取模块信息</h3>
                <ul>
                <li>确定二维码大小：根据定位模式的尺寸和间距计算二维码的大小。</li>
                <li>提取模块信息：根据二维码大小将二值图像切割成模块，并提取每个模块的黑白信息。</li>
                </ul>
                <h3>4. 解码数据</h3>
                <ul>
                <li>解析格式信息：根据特定规则解析格式信息，其中包含纠错等级和掩码图案信息。</li>
                <li>解析版本信息（如果存在）：根据特定规则解析版本信息，获取二维码的版本。</li>
                <li>解码数据和纠错码：根据版本、纠错等级和编码规则，对模块信息进行解码，恢复原始数据，并检查纠错码以修复可能的错误。</li>
                </ul>
                <h3>5. 数据重构</h3>
                <ul>
                <li>重构数据：根据编码规则和纠错码，将解码后的数据重构成初始的输入数据。</li>
                <li>去除填充字符：如果有添加填充字符，则需要将其删除，恢复原始数据的长度。</li>
                </ul>
                <h3>6. 输出结果</h3>
                <ul>
                <li>输出解码结果：将恢复的数据转换为适当的格式（文本、数字等），得到最终的解码结果。</li>
                </ul>
                <p>QR码解码过程涉及到图像处理、定位、解码和数据重构等步骤。具体实现方式可能因使用的库或算法而有所不同，但整体流程大致相似。</p>
              </n-collapse-item>
            </n-collapse>
          </div>
        </div>
      </main>
    </CommpnPage>
  </template>
  
  <script setup lang="ts">
  import { useDark } from '@vueuse/core';
  import { DataTableColumns } from 'naive-ui'
  import { useAppStore } from '@/store'

  import dataJson from './data.js'

  const isDark = useDark()
  const appStore = useAppStore()
  const isMobile = appStore.isMobile
  
  const pagination = ref({
    pageSize: 10
  })

  type RowData = {
    key: number
    type: string
    codeElement: string
    level: string
    dataBit: number,
    digital: number,
    letter: number,
    binary: number,
    hanzi: number
  }

  const columns: DataTableColumns<RowData> = [
    {
      title: '版本',
      key: 'type',
      rowSpan: (rowData, rowIndex) => 4, 
    },
    {
      title: '码元素',
      key: 'codeElement',
      rowSpan: (rowData, rowIndex) => 4,
    },
    {
      title: '纠错级别',
      key: 'level',
    },
    {
      title: '数据比特量',
      key: 'dataBit',
    },
    {
      title: '数字',
      key: 'digital',
    }
    ,
    {
      title: '字母',
      key: 'letter',
    }
    ,
    {
      title: '二进制',
      key: 'binary',
    }
    ,
    {
      title: '汉字',
      key: 'hanzi',
    }
  ]

  
  const data = dataJson

  </script>
  