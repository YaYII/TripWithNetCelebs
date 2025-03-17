# 行程管理与报名系统更新文档

## 更新概述

本次更新主要针对网红行程管理和粉丝报名系统进行了全面优化，实现了网红与粉丝之间的安全互动模式。新系统确保网红可以查看报名情况并与粉丝联系，同时保护网红的隐私信息不被泄露。此外，系统还增加了自动成团和取消功能，提高了行程管理的自动化程度。

## 主要功能更新

### 1. 行程管理功能

- **行程管理页面**：新增行程管理页面，网红可以查看自己发布的所有行程
- **行程分类**：支持按"全部行程"、"即将开始"、"进行中"和"已结束"进行分类查看
- **行程状态**：直观显示行程的报名情况、截止日期等关键信息
- **快捷操作**：提供"查看报名"和"编辑行程"两个快捷操作按钮

### 2. 报名管理功能

- **报名情况概览**：显示已报名人数、总名额、已支付人数和待支付人数
- **报名进度**：直观的进度条显示报名完成情况
- **参与者分类**：支持按"全部"、"已支付"、"待支付"和"已取消"进行分类查看
- **参与者信息保护**：显示参与者信息时对手机号进行掩码处理，保护用户隐私
- **联系功能**：网红可以直接联系报名的粉丝，无需暴露自己的联系方式

### 3. 自动成团与取消功能

- **最小成团人数**：为每个行程设置最小成团人数
- **自动成团**：达到报名截止日期时，如果报名人数达到最小成团人数，则自动确认成团
- **自动取消**：达到报名截止日期时，如果报名人数未达到最小成团人数，则自动取消所有订单
- **取消通知**：自动取消时向已报名用户发送通知，说明取消原因

### 4. 用户界面更新

- **个人中心**：在个人中心页面添加"行程管理"入口
- **支付状态标识**：使用不同颜色标识参与者的支付状态（绿色表示已支付，黄色表示待支付，红色表示已取消）
- **倒计时显示**：在行程详情页面显示距离报名截止还有多少天

## 技术实现

### 行程管理页面

```html
<!-- 行程卡片 -->
<div class="trip-card" v-for="trip in filteredTrips" :key="trip.id">
    <div class="trip-header">
        <div class="trip-title">{{ trip.title }}</div>
        <div class="trip-status" :class="trip.status.type">{{ trip.status.text }}</div>
    </div>
    <div class="trip-content" @click="viewTripDetail(trip.id)">
        <!-- 行程内容 -->
    </div>
    <div class="trip-footer">
        <div class="trip-deadline">
            <i class="bi bi-alarm"></i>
            <span>报名截止：{{ trip.enrollmentDeadline }}</span>
        </div>
        <div class="trip-actions">
            <button class="trip-action-btn" @click="viewParticipants(trip.id)">
                查看报名
            </button>
            <button class="trip-action-btn primary" @click="editTrip(trip.id)">
                编辑行程
            </button>
        </div>
    </div>
</div>
```

### 报名管理页面

```html
<!-- 行程信息 -->
<div class="trip-info-card" v-if="!loading">
    <div class="trip-title">{{ trip.title }}</div>
    <!-- 行程基本信息 -->
    <div class="enrollment-summary">
        <div class="enrollment-count">
            <div class="count-label">已报名</div>
            <div class="count-value">{{ trip.currentParticipants }}</div>
        </div>
        <div class="enrollment-count">
            <div class="count-label">总名额</div>
            <div class="count-value">{{ trip.maxParticipants }}</div>
        </div>
        <div class="enrollment-count">
            <div class="count-label">已支付</div>
            <div class="count-value">{{ paidParticipants }}</div>
        </div>
        <div class="enrollment-count">
            <div class="count-label">待支付</div>
            <div class="count-value">{{ trip.currentParticipants - paidParticipants }}</div>
        </div>
    </div>
    <!-- 进度条和截止日期 -->
</div>
```

### 自动成团与取消功能

```javascript
// 检查是否需要自动取消
checkAutoCancellation() {
    // 如果已经确认成团，则不需要检查
    if (this.trip.isConfirmed) {
        return;
    }
    
    // 检查是否已过截止日期
    const today = new Date();
    const deadline = new Date(this.trip.enrollmentDeadline);
    
    if (today > deadline) {
        // 检查是否达到最小成团人数
        if (this.trip.currentParticipants < this.trip.minParticipants) {
            // 未达到最小成团人数，需要自动取消所有订单
            this.autoCancelOrders();
        } else {
            // 达到最小成团人数，确认成团
            this.confirmTrip();
        }
    }
}
```

## 用户体验改进

1. **网红隐私保护**：粉丝无法直接获取网红的联系方式，必须通过系统提供的联系功能
2. **报名状态透明**：网红可以清晰地看到行程的报名情况，包括已支付和待支付的人数
3. **自动化流程**：系统自动处理成团和取消流程，减少人工操作
4. **信息安全**：对用户手机号进行掩码处理，保护用户隐私

## 后续优化建议

1. **支付提醒**：对待支付的用户发送支付提醒，提高支付转化率
2. **行程推荐**：基于用户历史报名记录，推荐相似的行程
3. **评价系统**：行程结束后，允许粉丝对行程进行评价
4. **数据分析**：提供行程数据分析功能，帮助网红优化行程设计
5. **退款流程**：完善自动取消后的退款流程 