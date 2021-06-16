import createDom from '../createDom';
import DialogMessage from '../../components/MyComponents/DialogMessage.vue';
// 设置localStorage的值
// storage.set("test", "你好", expirse_time);
// 获取localStorage的值
// var data = storage.get("test");
const storage = {
  // 存储,可设置过期时间
  set(key, value, expires) {
    const params = { key, value, expires };
    if (expires) {
      // 记录何时将值存入缓存，毫秒级
      const data = Object.assign(params, { startTime: new Date().getTime() });
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      if (Object.prototype.toString.call(value) === '[object Object]') {
        value.$set(value, JSON.stringify(value));
      }
      if (Object.prototype.toString.call(value) === '[object Array]') {
        value.$set(value, JSON.stringify(value));
      }
      localStorage.setItem(key, value);
    }
  },
  // 取出
  get(key) {
    let item = localStorage.getItem(key);
    if (!item) {
      createDom(
        DialogMessage,
        {},
        {
          content: `<div style="text-align:center">无账号信息，请先去登录!</div>
                    `,
          confirmBtn: true,
        },
      );
    }
    // 先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item);
    } catch (error) {
      // eslint-disable-next-line no-self-assign
      item = item;
    }
    // 如果有startTime的值，说明设置了失效时间
    if (item && item.startTime) {
      const date = new Date().getTime();
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        localStorage.removeItem(key);
        createDom(
          DialogMessage,
          {},
          {
            content: `<div style="text-align:center">账号过期，请重新登录!</div>
                     `,
            confirmBtn: true,
          },
        );
      }
      return item.value;
    }
    return item;
  },
  // 删除
  remove(key) {
    localStorage.removeItem(key);
  },
  // 清除全部
  clear() {
    localStorage.clear();
  },
};

export default storage;
