---
title: ComfyUI 入门
tags:
  - ComfyUI
  - AI
createTime: 2026/08/12 17:07:26
permalink: /blog/dchqjtje/
---

ComfyUI 零基础入门：SD1.5 标准基础出图工作流｜原理、接线、踩坑、最佳参数（可长期复用）
## 0. 前言
ComfyUI 基于节点式流水线执行 AI 图像生成，相较于一键式绘图工具，具备完全可拆解、可定制、可迭代的优势。新手入门最大难点为：节点职责混淆、张量链路理解缺失、Latent 与图像通道混淆导致无法出图。
本文记录 SD1.5 官方标准最简可运行工作流，为所有 ComfyUI 高阶玩法（图生图、ControlNet、动画、超分）的底层基座，稳定、通用、无冗余，适合长期复用与进阶学习。
## 1. 环境与模型基线
硬件：RTX3060 6G Laptop（显存受限，仅适配 FP16 轻量化模型）
基础模型：v1-5-pruned-emaonly-fp16.safetensors
模型特性：SD1.5 FP16 剪枝精简版，显存占用低、兼容性极强，为新手唯一稳定起步基线。
## 2. 核心执行原理（流水线架构）
SD 生成本质为：文本编码 → 潜空间迭代降噪 → VAE 解码映射至 RGB 图像空间。
ComfyUI 严格遵循链式执行顺序：
模型加载 → 文本条件编码 → 初始化空潜变量画布 → KSampler 迭代降噪 → VAE 解码 → 图像输出保存
## 3. 标准工作流节点清单（最小完备集）
本次可用、无冗余、工业标准基础节点共 6 个：
1. CheckpointLoaderSimple（简易模型加载）
2. CLIPTextEncode ×2（正向/反向文本条件编码）
3. EmptyLatentImage（空潜变量画布初始化）
4. KSampler（迭代降噪采样核心）
5. VAEDecode（潜空间转 RGB 解码）
6. SaveImage（图像导出）
## 4. 各节点技术职责（精准定义）
### 4.1 CheckpointLoaderSimple
![20260812172322425](https://cdn.jsdelivr.net/gh/Withnoidea/images/20260812172322425.png)
加载 Stable Diffusion 权重，输出三大核心资源：
- Model（紫色）：扩散模型主体，用于降噪迭代
- CLIP（黄色）：文本编码器，将自然语言映射为文本条件向量
- VAE（红色）：变分自编码器，负责潜空间与图像空间互转
### 4.2 CLIPTextEncode
![20260812171623793](https://cdn.jsdelivr.net/gh/Withnoidea/images/20260812171623793.png)
接收 CLIP 模型与文本 Prompt，输出 Condition 条件向量，约束 KSampler 生成倾向。
- 正向 Prompt：定义目标画面特征、风格、画质
- 反向 Prompt：压制瑕疵、畸形、低质特征
关键避坑：SD1.5 仅支持原生 CLIPTextEncode，禁止使用 SDXL 专用编码器，会导致向量维度不匹配、黑屏、报错。
### 4.3 EmptyLatentImage
![20260812171741671](https://cdn.jsdelivr.net/gh/Withnoidea/images/20260812171741671.png)
初始化空白潜变量张量，而非可视图片。SD 所有迭代计算均在 Latent 潜空间 完成，计算效率远高于 RGB 空间。
适配 6G 显存标准参数：512×512，batch_size=1
### 4.4 KSampler（核心降噪器）
![20260812171827604](https://cdn.jsdelivr.net/gh/Withnoidea/images/20260812171827604.png)
整个工作流的计算核心，依据文本条件，对空白潜变量进行多步反向扩散降噪，逐步生成画面结构。
通用最优参数（SD1.5 通用标准答案）：
- Sampler：dpmpp_2m
- Scheduler：karras
- Steps：22–28
- CFG Scale：7
### 4.5 VAEDecode
![20260812171851718](https://cdn.jsdelivr.net/gh/Withnoidea/images/20260812171851718.png)
将 KSampler 输出的 Latent 潜变量张量 解码为标准 RGB 图像。
核心知识点：Latent 数据无法直接输出图片，必须经过 VAE 解码，这是新手 90% 接线失败的根源。
### 4.6 SaveImage
![20260812171910742](https://cdn.jsdelivr.net/gh/Withnoidea/images/20260812171910742.png)
接收 RGB 图像张量，执行本地写入与预览输出。
## 5. 标准固定链路（可永久复用）
![20260812172037751](https://cdn.jsdelivr.net/gh/Withnoidea/images/20260812172037751.png)
以下为 SD1.5 官方标准拓扑，不可乱序：
1. Checkpoint Model → KSampler Model
2. Checkpoint CLIP → 两个 CLIPTextEncode CLIP 输入端
3. Checkpoint VAE → VAEDecode VAE
4. 正负 CLIPTextEncode Condition → KSampler Positive/Negative
5. EmptyLatentImage → KSampler Latent
6. KSampler Latent 输出 → VAEDecode Latent
7. VAEDecode Image → SaveImage
## 6. 新手核心踩坑总结（精准复盘）
- 维度不匹配：误用 SDXL 文本节点对接 SD1.5 模型，向量维度报错
- 链路断层：Latent 直接接 SaveImage，未经过 VAE 解码，无法出图
- 条件失效：未接入 CLIP 线路，Prompt 完全不生效
- 显存溢出：6G 设备不可超过 512×512 基础分辨率
## 7. 可直接复用的高质量 Prompt（二次元动漫风）
正向 Prompt
masterpiece, best quality, ultra detailed, anime illustration, clean line art, soft cel shading, cinematic lighting, 1girl, solo, delicate facial features, subtle color grading, clean background, soft depth of field
反向 Prompt
lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, ugly, deformed, disfigured
## 8. 进阶学习路线
本工作流为所有高阶功能的底层基座，后续可在此基础上无缝叠加：
- 图生图 Latent 重绘
- ControlNet 骨骼/线稿/姿态控制
- 超分高清放大
- AnimateDiff 动态视频生成
- IP-Adapter 风格复刻
## 9. 总结
ComfyUI 的核心不在于“点点出图”，而在于理解扩散模型的计算链路。掌握这套 SD1.5 标准基础工作流，即掌握了所有 AI 绘图节点逻辑的底层范式，后续所有复杂工作流均可基于此结构迭代扩展。