---
title: Hello-Agents
tags:
  - agent
  - python
permalink: /hello-agents/
createTime: 2026/09/10 15:15:03
---

<div align="center">

# 🤖 Hello Agents HW

### *一个从零手搓的 ReAct 智能体（Agent）学习仓库*

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Agent](https://img.shields.io/badge/Agent-ReAct__Loop-FF6F00)](https://arxiv.org/abs/2210.03629)
[![LLM](https://img.shields.io/badge/LLM-OpenAI__Compatible-412991?logo=openai&logoColor=white)](https://platform.openai.com/)
[![Weather](https://img.shields.io/badge/Weather-wttr.in-00A3FF)](https://wttr.in/)
[![Search](https://img.shields.io/badge/Search-Tavily-0052CC?logo=tavily&logoColor=white)](https://tavily.com/)
[![License](https://img.shields.io/badge/License-MIT-green?logo=opensourceinitiative&logoColor=white)](LICENSE)

> 📚 **Hello-Agents 教程学习记录** —— 包含可运行的代码、配套笔记与踩坑总结

</div>

---

## ✨ 项目简介

本仓库记录了我在学习 **Hello-Agents** 教程过程中的实践代码。核心是一个**不依赖任何 Agent 框架**、完全从零实现的 **ReAct（Reasoning + Acting）智能体**。

它以「智能旅行助手」为场景，能够：

- 🌤️ 调用 `wttr.in` 查询任意城市的实时天气
- 🧭 根据天气与城市，使用 `Tavily` 搜索并推荐合适的旅游景点
- 🔁 在 `Thought → Action → Observation` 的循环中自主决策，直到任务完成

整个 Agent 的「大脑」是一个兼容 OpenAI 接口的 LLM，工具调用与循环调度全部由不到 200 行原生 Python 实现。

---

## 📁 项目结构

```text
hello-agents-hw/
├── FirstAgentTest.py   # 核心：手搓的 ReAct 旅行 Agent
├── .env                # 密钥与模型配置（已 gitignore，勿提交）
├── .gitignore          # 忽略 .env 与 Python 缓存
└── README.md           # 你正在看的这份文档
```

---

## 🚀 快速开始

### 1. 准备环境

```bash
# 克隆并进入仓库
git clone git@github.com:Withnoidea/Hello-Agents-HW.git
cd hello-agents-hw

# 创建虚拟环境（可选但推荐）
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# 安装依赖
pip install openai requests tavily-python python-dotenv
```

### 2. 配置 `.env`

复制以下模板并填入你自己的凭证：

```ini
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
OPENAI_BASE_URL=https://api.openai.com/v1   # 任意兼容 OpenAI 的地址
MODEL_NAME=gpt-4o-mini
TAVILY_API_KEY=tvly-xxxxxxxxxxxxxxxx
```

> ⚠️ `.env` 已在 `.gitignore` 中忽略，请**切勿**将其提交到仓库。

### 3. 运行 Agent

```bash
python FirstAgentTest.py
```

运行后，Agent 会默认处理请求：

> *“请帮我查询今天北京的天气，然后根据天气推荐一个合适的旅游景点。”*

并在终端打印完整的思考—行动—观察过程，最终给出答案。

---

## 🧠 它是怎么工作的？

Agent 的主循环遵循经典的 **ReAct** 范式，最多迭代 5 轮：

```text
用户输入
   │
   ▼
┌─────────────────────────────┐
│  LLM 生成 Thought + Action  │
└─────────────────────────────┘
   │
   ├── Action: get_weather("北京")
   │        │
   │        ▼
   │   Observation: 北京当前天气：晴，气温 22 摄氏度
   │        │
   ├── Action: get_attraction("北京", "晴")
   │        │
   │        ▼
   │   Observation: 推荐前往颐和园……
   │
   └── Action: Finish[最终答案]  →  ✅ 任务结束
```

系统提示词约束 LLM **每次只输出一对 `Thought` / `Action`**，并通过正则解析出工具名与参数，安全执行后把结果作为 `Observation` 回填进上下文，形成闭环。

---

## 🔧 可调参数

| 位置 | 说明 |
| --- | --- |
| `AGENT_SYSTEM_PROMPT` | 定义 Agent 的角色、可用工具与输出格式 |
| `available_tools` 字典 | 注册所有可调用工具，新增工具只需在此挂载 |
| `for i in range(5)` | 主循环最大迭代次数，防止无限循环 |
| `.env` 中的 `MODEL_NAME` | 切换不同模型，无需改动业务代码 |

---

## 📝 学习笔记 & 踩坑

- **工具调用格式**：LLM 有时会在一次回复中多输出几对 `Thought-Action`，代码通过正则 `re.search` 截断到第一对，保证只执行一个动作。
- **异常兜底**：网络请求、JSON 解析、API 调用均做了 `try/except`，错误会以自然语言 `Observation` 形式反馈给 LLM，而非直接崩溃。
- **密钥隔离**：所有敏感信息通过 `python-dotenv` 从 `.env` 读取，运行过程中再注入环境变量。

---

## 📄 许可证

本项目以 [MIT](LICENSE) 许可证开源，可自由用于学习与交流。

---

<div align="center">

**Happy Hacking & Keep Building Agents 🚀**

</div>
