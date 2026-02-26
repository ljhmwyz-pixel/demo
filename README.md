# VibeCoding Framework

一个现代化的前端开发框架，基于 React 18 + TypeScript + Vite 构建。

## 🚀 技术栈

- **核心框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **状态管理**: Redux Toolkit
- **样式方案**: Tailwind CSS + CSS Modules
- **路由管理**: React Router DOM
- **国际化**: i18next + react-i18next
- **HTTP客户端**: Axios
- **包管理**: pnpm

## 📁 项目结构

```
src/
├── assets/           # 静态资源文件
├── components/       # 公共组件
│   ├── Header/      # 头部组件
│   ├── Sidebar/     # 侧边栏组件
│   └── Footer/      # 底部组件
├── layouts/         # 布局组件
│   └── MainLayout/  # 主布局
├── pages/           # 页面组件
│   └── Home/        # 首页
├── routes/          # 路由配置
├── services/        # API服务层
├── store/           # Redux状态管理
├── styles/          # 全局样式
├── types/           # TypeScript类型定义
├── utils/           # 工具函数
├── hooks/           # 自定义Hooks
├── locales/         # 国际化配置
└── main.tsx         # 应用入口
```

## 🎯 核心特性

### 1. 国际化支持
- 云端语言包 + 本地缓存机制
- 首屏加载优化
- 切换时的延迟处理

### 2. 主题切换
- Light/Dark 主题模式
- 系统主题偏好自动检测
- 本地存储持久化

### 3. 响应式设计
- 基于 rem 的适配方案
- Tailwind CSS 实用类
- 移动端友好

### 4. 代码规范
- 严格的 TypeScript 类型检查
- 组件内代码顺序规范
- 导入顺序规范

## 🛠 开发指南

### 函数组件代码顺序规范
```typescript
const MyComponent = () => {
  // 1. refs
  const ref = useRef(null)
  
  // 2. state  
  const [state, setState] = useState()
  
  // 3. context
  const context = useContext(MyContext)
  
  // 4. Redux/store hooks
  const dispatch = useAppDispatch()
  const selector = useAppSelector()
  
  // 5. 其他 hooks (自定义 hooks)
  const customHook = useCustomHook()
  
  // 6. useMemo、useCallback、useEffect
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
  const handleClick = useCallback(() => {}, [])
  useEffect(() => {}, [])
  
  // 7. 普通辅助函数
  const helperFunction = () => {}
  
  // 8. 事件处理函数
  const handleEvent = () => {}
  
  // 9. render 逻辑
  const renderContent = () => {}
  
  // 10. return JSX
  return <div>Content</div>
}
```

### 导入顺序规范
```typescript
// 1. 第三方库（核心库优先）
import React from 'react'
import { useState, useEffect } from 'react'

// 2. 第三方 UI 库/工具库
import { Button } from 'antd'
import classNames from 'classnames'

// 3. 绝对路径导入
import { useAppDispatch } from '@/store'
import { useTheme } from '@/hooks/useTheme'

// 4. 相对路径导入
import styles from './index.module.css'
import { CustomComponent } from './components'

// 5. 样式文件
import './index.less'
```

## 📦 安装与启动

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 类型检查
pnpm type-check
```

## 🔧 配置说明

### 环境变量
在项目根目录创建 `.env` 文件：

```env
VITE_API_BASE_URL=https://api.example.com
```

### 路径别名
已配置 `@` 指向 `src` 目录：

```typescript
import { useAppDispatch } from '@/store'
```

## 🎨 样式规范

### CSS Modules 使用
```typescript
import styles from './index.module.css'

<div className={styles.container}>
  <h1 className={styles.title}>标题</h1>
</div>
```

### Tailwind CSS 结合使用
```css
/* index.module.css */
.button {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}
```

## 🌐 国际化配置

### 添加新语言
在 `src/locales/i18n.ts` 中添加语言包：

```typescript
const defaultResources = {
  'zh-CN': {
    translation: {
      welcome: '欢迎使用'
    }
  },
  'en-US': {
    translation: {
      welcome: 'Welcome'
    }
  }
}
```

## 📱 响应式断点

- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚀 性能优化

- **代码分割**: 基于路由的懒加载
- **图片优化**: 支持现代图片格式
- **缓存策略**: HTTP缓存头配置
- **打包优化**: Vite 生产构建优化

## 📝 License

MIT