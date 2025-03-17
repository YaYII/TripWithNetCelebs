# 行程列表页面更新文档

## 更新概述

本次更新将行程列表页面进行了重构，将行程分为"推荐行程"和"即将开始的行程"两个部分。用户报名的行程会显示在"即将开始的行程"部分，未报名的行程则显示在"推荐行程"部分。

## 更新内容

### HTML 结构更新

1. 将原有的单一行程列表分为两个部分：
   - 即将开始的行程（用户已报名）
   - 推荐行程（用户未报名）

2. 为每个部分添加了标题和独立的容器
3. 在即将开始的行程卡片中添加了倒计时显示

### CSS 样式更新

1. 添加了行程分类区域的样式：
   ```css
   .trip-section {
       margin-bottom: 24px;
   }

   .section-header {
       padding: 16px 16px 8px;
       display: flex;
       justify-content: space-between;
       align-items: center;
   }

   .section-header h2 {
       font-size: 18px;
       font-weight: 600;
       color: #333;
       margin: 0;
   }
   ```

2. 添加了倒计时标签的样式：
   ```css
   .trip-countdown {
       position: absolute;
       bottom: 12px;
       left: 12px;
       padding: 4px 8px;
       border-radius: 4px;
       font-size: 12px;
       font-weight: 500;
       background-color: rgba(0, 0, 0, 0.6);
       color: white;
       display: flex;
       align-items: center;
       gap: 4px;
   }
   ```

3. 调整了行程列表的内边距，使其与新的布局结构匹配

### JavaScript 功能更新

1. 添加了用户已报名行程ID的模拟数据：
   ```javascript
   // 用户已报名的行程ID列表
   enrolledTripIds: [101, 105], // 模拟数据，实际应从API获取
   ```

2. 添加了两个新的计算属性：
   - `upcomingTrips`：用户已报名的行程，按剩余天数排序
   - `recommendedTrips`：用户未报名的行程，根据筛选条件过滤

3. 添加了计算行程剩余天数的方法：
   ```javascript
   calculateDaysLeft(dateString) {
       const tripDate = new Date(dateString);
       const today = new Date();
       
       // 重置时间部分，只比较日期
       tripDate.setHours(0, 0, 0, 0);
       today.setHours(0, 0, 0, 0);
       
       // 计算相差的毫秒数并转换为天数
       const diffTime = tripDate.getTime() - today.getTime();
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
       
       return diffDays > 0 ? diffDays : 0;
   }
   ```

4. 在页面初始化时为所有行程计算剩余天数

## 功能说明

1. **即将开始的行程**：
   - 只有用户已报名的行程才会显示在此部分
   - 按照距离开始日期的天数排序，最近的行程排在前面
   - 显示倒计时，提醒用户行程即将开始
   - 如果用户没有报名任何行程，此部分不会显示

2. **推荐行程**：
   - 显示用户未报名的所有行程
   - 可以通过搜索框和标签过滤器进行筛选
   - 点击行程卡片可以查看详情并报名

3. **搜索和筛选**：
   - 搜索和标签筛选功能影响的是"推荐行程"部分
   - 搜索区域默认隐藏，点击搜索图标显示
   - 向下滚动页面时，搜索区域会自动隐藏

## 后续优化方向

1. 添加"查看全部"按钮，允许用户查看更多行程
2. 为即将开始的行程添加快捷操作按钮，如"查看详情"、"取消报名"等
3. 实现真实的用户报名数据获取和处理
4. 优化行程卡片的交互效果，提升用户体验 