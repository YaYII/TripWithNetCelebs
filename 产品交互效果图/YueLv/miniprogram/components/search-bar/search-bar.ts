Component({
  properties: {
    placeholder: {
      type: String,
      value: '搜索景点、导游或活动'
    },
    value: {
      type: String,
      value: ''
    },
    defaultCity: {
      type: String,
      value: '香港'
    }
  },

  data: {
    selectedCity: '香港',
    showCitySelector: false,
    searchValue: '',
    cities: ['香港', '澳门', '深圳', '广州', '上海', '北京']
  },

  lifetimes: {
    attached() {
      this.setData({
        selectedCity: this.properties.defaultCity,
        searchValue: this.properties.value
      });
    }
  },

  methods: {
    // 切换城市选择器的显示状态
    toggleCitySelector() {
      this.setData({
        showCitySelector: !this.data.showCitySelector
      });
    },

    // 选择城市
    selectCity(e: WechatMiniprogram.TouchEvent) {
      const { city } = e.currentTarget.dataset as { city: string };
      this.setData({
        selectedCity: city,
        showCitySelector: false
      });

      // 触发城市变更事件
      this.triggerEvent('cityChange', { city });
    },

    // 输入事件
    onInput(e: WechatMiniprogram.Input) {
      const { value } = e.detail;
      this.setData({
        searchValue: value
      });

      // 触发输入事件
      this.triggerEvent('input', { value });
    },

    // 搜索确认事件
    onConfirm(e: WechatMiniprogram.Input) {
      const { value } = e.detail;
      this.triggerEvent('search', {
        value,
        city: this.data.selectedCity
      });
    },

    // 点击搜索图标事件
    onSearch() {
      this.triggerEvent('search', {
        value: this.data.searchValue,
        city: this.data.selectedCity
      });
    }
  }
}); 