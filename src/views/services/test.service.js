import Vue from 'vue';

class EventEmitter {
  constructor() {
    this.eventList = {};
  }

  $on(eventName, handler, times) {
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = [];
    }

    this.eventList[eventName].push({
      handler,
      times,
    });
  }

  $once(eventName, handler) {
    this.$on(eventName, handler, 1);
  }

  $off(eventName, handler) {
    const handlers = this.eventList[eventName];
    this.eventList[eventName] = handlers.filter((func) => handler !== func.handler);
  }

  $emit(eventName, ...args) {
    const handlers = this.eventList[eventName];

    handlers.map((func) => {
      func.handler.apply(this, args);
      if (func.times) {
        func.times -= 1;
      }
    });

    handlers.map((func) => { // 清理事件
      if (func.times && func.times <= 0) {
        this.$off(eventName, func.handler);
      }
    });
  }
}

class TestService extends Vue{
  setEnabledMap(enabledMap) {
    this.enabledMap = enabledMap;
    this.$emit('ENABLED_MAP_UPDATE', enabledMap);
  }

  getEnabledMap() {
    return this.enabledMap;
  }

  watchEnabledMap(updateHandler) {
    updateHandler(this.enabledMap);
    this.$on('ENABLED_MAP_UPDATE', updateHandler);
    return function destroy() {
      this.$off('ENABLED_MAP_UPDATE', updateHandler);
    }
  }
}

export default new TestService();
