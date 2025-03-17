# 订单中心页面更新文档

## 更新概述

本次更新修复了订单中心页面的CSS样式问题，特别是顶部导航栏的样式，并添加了底部导航栏组件，使页面与应用的其他部分保持一致的用户界面和体验。

## 更新内容

### CSS 样式更新

1. 添加了顶部导航栏的样式：
   ```css
   .header {
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding: 0 16px;
       height: 56px;
       background-color: #ff6b00;
       color: #fff;
       position: sticky;
       top: 0;
       z-index: 100;
   }
   ```

2. 添加了返回按钮的样式：
   ```css
   .back-btn {
       width: 24px;
       height: 24px;
       display: flex;
       align-items: center;
       justify-content: center;
       cursor: pointer;
   }

   .back-btn i {
       font-size: 20px;
       color: #fff;
   }
   ```

3. 修改了页面标题的样式，使其在顶部导航栏中居中显示：
   ```css
   .page-title {
       font-size: 18px;
       font-weight: bold;
       text-align: center;
       margin: 0;
       color: #fff;
       flex: 1;
   }
   ```

4. 添加了提示框样式，用于显示操作反馈：
   ```css
   .toast {
       position: fixed;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%) scale(0.8);
       background-color: rgba(0, 0, 0, 0.7);
       color: #fff;
       padding: 10px 20px;
       border-radius: 4px;
       font-size: 14px;
       z-index: 1000;
       opacity: 0;
       transition: all 0.3s;
   }

   .toast.show {
       opacity: 1;
       transform: translate(-50%, -50%) scale(1);
   }
   ```

5. 优化了响应式布局，使页面在大屏设备上有更好的显示效果：
   ```css
   @media screen and (min-width: 768px) {
       .order-list {
           max-width: 800px;
           margin-left: auto;
           margin-right: auto;
       }
       
       .header, .tab-bar {
           max-width: 800px;
           margin-left: auto;
           margin-right: auto;
       }
   }
   ```

### HTML 结构更新

1. 添加了底部导航栏组件：
   ```html
   <!-- 底部导航栏组件 -->
   <iframe src="../components/bottom-nav.html" class="bottom-nav-container" frameborder="0"></iframe>
   ```

2. 更新了Vue.js的引用路径，使用CDN链接确保稳定加载：
   ```html
   <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
   ```

## 功能说明

1. **顶部导航栏**：
   - 左侧返回按钮可返回上一页
   - 中间显示"订单中心"标题
   - 使用橙色背景，与应用整体风格一致

2. **标签栏**：
   - 可切换不同状态的订单（全部、待确认、已确认、已完成、已取消）
   - 当前选中的标签下方有橙色指示线

3. **订单列表**：
   - 显示订单卡片，包含订单号、状态、行程信息、佣金等
   - 根据订单状态显示不同的操作按钮
   - 空状态时显示提示信息和引导按钮

4. **底部导航栏**：
   - 通过iframe引入公共组件，保持应用导航的一致性

## 后续优化方向

1. 添加订单详情页面，展示更详细的订单信息
2. 优化订单状态流转逻辑，增加更多状态和操作
3. 添加订单搜索和筛选功能
4. 实现订单数据的后端存储和同步
5. 添加订单评价和反馈功能 