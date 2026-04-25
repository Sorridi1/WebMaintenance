-- 初始化数据库
CREATE DATABASE IF NOT EXISTS culture_media_demo DEFAULT CHARSET utf8mb4;
USE culture_media_demo;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS case_categories;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS admin_users;

-- 正式项目应始终使用 bcrypt 等安全哈希算法，不应保存明文密码
CREATE TABLE admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255) DEFAULT '',
  sort_order INT DEFAULT 99,
  status TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE case_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  sort_order INT DEFAULT 99,
  status TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cases (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  title VARCHAR(120) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  cover_url VARCHAR(255) DEFAULT '',
  content TEXT,
  publish_time DATETIME,
  status TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_case_category FOREIGN KEY (category_id) REFERENCES case_categories(id)
);

CREATE TABLE news (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  cover_url VARCHAR(255) DEFAULT '',
  content TEXT,
  publish_time DATETIME,
  status TINYINT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  status TINYINT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 密码: admin123456
INSERT INTO admin_users (username, password, nickname) VALUES
('admin', '$2a$10$7vS5Awd/7wRzOuGWp9JPDuS0W2wLthlt0I1GtIsfRSAxEPPYUajOC', '系统管理员');

INSERT INTO services (title, summary, description, icon, sort_order, status) VALUES
('企业形象策划', '品牌定位、品牌命名、视觉识别体系规划', '围绕企业目标受众制定品牌故事与视觉锚点，形成可执行品牌手册。', 'Promotion', 1, 1),
('文化艺术交流活动策划', '展览、沙龙、路演与文化主题活动全案执行', '提供从策划、招商、流程、现场执行到复盘的全链路服务。', 'Calendar', 2, 1),
('平面设计', '海报、画册、折页、IP 延展物料设计', '根据传播目标进行多终端视觉统一设计，提升品牌识别度。', 'Brush', 3, 1),
('数码摄影摄像', '企业宣传片、活动纪实、短视频拍摄制作', '配备专业摄影摄像团队，覆盖脚本、拍摄、剪辑与调色。', 'Camera', 4, 1),
('会务服务', '发布会、论坛、答谢会场务统筹执行', '提供舞美搭建、设备协调、嘉宾接待、会场执行等标准化服务。', 'OfficeBuilding', 5, 1),
('广告设计制作代理发布', '线上线下广告创意、投放与效果跟踪', '整合媒介渠道，帮助企业提升品牌曝光与转化效率。', 'DataLine', 6, 1);

INSERT INTO case_categories (name, sort_order, status) VALUES
('品牌视觉', 1, 1),
('活动策划', 2, 1),
('摄影摄像', 3, 1),
('会务执行', 4, 1),
('广告物料', 5, 1);

INSERT INTO cases (category_id, title, summary, cover_url, content, publish_time, status) VALUES
(1, '某科技企业品牌升级项目', '完成品牌定位、VI升级与官网视觉规范统一。', 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80', '项目背景：企业扩张需要统一品牌形象。\n实施内容：品牌调研、LOGO优化、视觉规范落地。\n展示效果：品牌识别度提升，线下物料一致性显著增强。', '2026-03-10 10:00:00', 1),
(2, '城市文化节开幕活动', '完成活动主题策划、流程统筹和现场执行。', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', '项目背景：提升城市文化影响力。\n实施内容：活动主视觉、舞台流程、传播内容。\n展示效果：到场人数超过预期，社媒互动显著提升。', '2026-03-20 09:30:00', 1),
(3, '企业宣传片拍摄制作', '为制造企业打造3分钟品牌宣传片。', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80', '项目背景：企业需要在招商会上展示核心能力。\n实施内容：脚本策划、分镜拍摄、后期剪辑。\n展示效果：提升招商会现场传播效果。', '2026-03-28 14:00:00', 1),
(4, '行业峰会会务执行项目', '负责论坛会务统筹、嘉宾接待与现场导览。', 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80', '项目背景：大型行业峰会需要高标准执行。\n实施内容：会务SOP、签到系统、会场动线。\n展示效果：活动流程顺畅，客户满意度高。', '2026-04-01 11:00:00', 1),
(5, '新品发布广告物料设计', '完成发布会KV、海报、易拉宝等视觉物料设计。', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', '项目背景：新品上市需快速形成传播阵地。\n实施内容：视觉创意、物料输出、线上适配。\n展示效果：线下曝光与线上点击率同步增长。', '2026-04-06 16:30:00', 1),
(1, '连锁品牌门店视觉规范', '统一门店导视系统和品牌应用规范。', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', '项目背景：多门店视觉不统一。\n实施内容：导视系统设计、应用模板沉淀。\n展示效果：门店品牌一致性显著提升。', '2026-04-10 15:00:00', 1);

INSERT INTO news (title, summary, cover_url, content, publish_time, status) VALUES
('禹治传媒完成春季品牌升级项目合集发布', '聚焦品牌策略与视觉升级案例，展示多行业合作成果。', 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80', '公司近期完成多家企业品牌升级服务，包含品牌调研、视觉升级与传播内容规划。', '2026-03-18 10:00:00', 1),
('文化活动执行团队再获客户好评', '在大型文化节项目中实现高效率协同执行。', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80', '活动项目覆盖前期策划、舞台执行、现场传播，客户反馈执行专业、沟通顺畅。', '2026-03-25 11:00:00', 1),
('摄影摄像业务推出企业短视频套餐', '面向中小企业推出轻量化内容拍摄方案。', 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80', '套餐包含脚本建议、拍摄制作及多平台分发素材，帮助企业高效开展内容传播。', '2026-04-02 09:00:00', 1),
('会务服务标准化流程升级', '针对论坛与发布会场景优化会务SOP模板。', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', '新版流程覆盖会前筹备、会中执行、会后复盘，提升项目可复制能力。', '2026-04-12 13:00:00', 1);

INSERT INTO contact_messages (name, phone, content, status) VALUES
('张先生', '13800138000', '想咨询企业宣传片拍摄套餐和报价。', 0),
('李女士', '13900139000', '我们计划做年度品牌活动，想预约方案沟通。', 1);
