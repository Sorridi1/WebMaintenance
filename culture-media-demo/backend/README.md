# Backend

## 启动方式

1. 复制环境变量：

```bash
cp .env.example .env
```

2. 安装依赖并启动：

```bash
npm install
npm run dev
```

默认端口：`3000`。

## 数据库初始化

```bash
mysql -u root -p < scripts/init.sql
```

## 主要接口

- 公开接口前缀：`/api/public`
- 后台接口前缀：`/api/admin`
- 健康检查：`GET /api/health`
