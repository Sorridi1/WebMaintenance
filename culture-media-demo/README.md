# culture-media-demo

杭州禹治文化传媒工作室「企业官网 + 简易后台管理系统」展示型 Demo。

## 1. 项目整体说明

本项目用于实习汇报演示，覆盖网站建设与维护岗位的关键工作：

- 企业官网前端页面设计与实现（Vue3 + Vite + Element Plus）
- 后端 RESTful 接口设计与实现（Node.js + Express）
- MySQL 数据库建模、初始化脚本与演示数据
- 前后台数据联动、内容维护流程、登录鉴权流程

## 2. 目录结构

```text
culture-media-demo/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── db.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── public.js
│   │   │   └── admin.js
│   │   └── utils/
│   │       └── response.js
│   ├── scripts/
│   │   └── init.sql
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── api/request.js
│   │   ├── router/index.js
│   │   ├── layouts/
│   │   │   ├── PublicLayout.vue
│   │   │   └── AdminLayout.vue
│   │   ├── views/
│   │   │   ├── public/
│   │   │   │   ├── Home.vue
│   │   │   │   ├── About.vue
│   │   │   │   ├── Services.vue
│   │   │   │   ├── Cases.vue
│   │   │   │   ├── CaseDetail.vue
│   │   │   │   ├── News.vue
│   │   │   │   ├── NewsDetail.vue
│   │   │   │   └── Contact.vue
│   │   │   └── admin/
│   │   │       ├── Login.vue
│   │   │       ├── Dashboard.vue
│   │   │       ├── ServiceManage.vue
│   │   │       ├── CaseManage.vue
│   │   │       ├── NewsManage.vue
│   │   │       └── MessageManage.vue
│   │   ├── styles/main.css
│   │   ├── App.vue
│   │   └── main.js
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── README.md
└── README.md
```

## 3. 先搭建后端

### 3.1 初始化数据库

```bash
cd backend
cp .env.example .env
mysql -u root -p < scripts/init.sql
```

### 3.2 启动后端

```bash
npm install
npm run dev
```

服务默认端口 `3000`，接口根路径为 `http://localhost:3000/api`。

## 4. 再搭建前端

```bash
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

前端默认地址 `http://localhost:5173`。

## 5. 后端接口清单

### 公开接口
- GET `/api/public/services`
- GET `/api/public/cases`
- GET `/api/public/cases/:id`
- GET `/api/public/news`
- GET `/api/public/news/:id`
- POST `/api/public/messages`

### 后台接口
- POST `/api/admin/login`
- GET `/api/admin/dashboard`
- GET/POST/PUT/DELETE `/api/admin/services`
- GET/POST/PUT/DELETE `/api/admin/cases`
- GET/POST/PUT/DELETE `/api/admin/news`
- GET `/api/admin/messages`
- PUT `/api/admin/messages/:id/status`
- DELETE `/api/admin/messages/:id`

## 6. Demo 功能演示流程（实习汇报建议顺序）

1. 启动 MySQL，执行 `backend/scripts/init.sql`。
2. 启动后端服务（`backend`）。
3. 启动前端服务（`frontend`）。
4. 访问前台首页 `/`，展示 Banner、核心服务、精选案例与公司优势。
5. 进入 `/services` 查看服务项目列表和详情弹窗。
6. 进入 `/cases`，进行分类筛选并打开某个案例详情 `/cases/:id`。
7. 进入 `/news`，查看新闻列表并打开详情 `/news/:id`。
8. 进入 `/contact`，提交一条咨询留言。
9. 打开后台登录 `/admin/login`。
10. 使用 `admin / admin123456` 登录。
11. 进入 `/admin/dashboard` 查看统计数据。
12. 进入 `/admin/services` 修改一个服务项目并保存。
13. 进入 `/admin/cases` 新增一个案例。
14. 进入 `/admin/messages` 查看刚提交的留言。
15. 将留言标记为“已处理”。
16. 回到前台页面刷新数据，演示前后台联动维护成果。

## 7. 可选后续完善方向

- 增加图片上传（multer + OSS/本地存储）。
- 增加富文本编辑器（如 wangEditor/TipTap）。
- 增加分页、搜索、排序与操作日志。
- 增加多角色权限系统与细粒度鉴权。
- 增加接口参数校验（Joi/Zod）与单元测试。
- 增加 Docker Compose 一键本地启动。
