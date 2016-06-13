const obj = {
  // 贷款类型
  loanType: [
    { name: '全部', key: -1 },
    { name: '人品贷', key: 3 },
    // { name: '账单分期', key: 4 },
  ],

  // 银行卡类型
  bankCardType: [
    { name: '全部', key: -1 },
    { name: '借记卡', key: 1 },
    { name: '信用卡', key: 2 },
  ],

  // 所属渠道
  channelId: [
    { name: '全部', key: -1 },
    { name: '富友', key: 1 },
  ],

  // 维护类型
  fixType: [
    { name: '全部', key: -1 },
    { name: '系统维护', key: 1 },
    { name: '限额维护', key: 2 },
  ],

  // 银行列表
  bankId: [
    { name: '全部', key: -1 },
    { name: '招商银行', key: 1 },
    { name: '广发银行', key: 2 },
    { name: '光大银行', key: 3 },
    { name: '华夏银行', key: 4 },
    { name: '建设银行', key: 5 },
    { name: '民生银行', key: 6 },
    { name: '农业银行', key: 7 },
    { name: '浦发银行', key: 8 },
    { name: '兴业银行', key: 9 },
    { name: '中国银行', key: 10 },
    { name: '中信银行', key: 11 },
    { name: '工商银行', key: 12 },
    { name: '交通银行', key: 13 },
    { name: '邮储银行', key: 14 },
    { name: '平安银行', key: 15 },
    { name: '深发银行', key: 16 },
    { name: '宁波银行', key: 17 },
    { name: '北京银行', key: 18 },
    { name: '徽商银行', key: 22 },
    { name: '上海银行', key: 33 },
    { name: '杭州银行', key: 40 },
    { name: '江苏银行', key: 41 },
    { name: '包商银行', key: 44 },
    { name: '南京银行', key: 71 },
    { name: '浙江隆泰', key: 72 },
    { name: '上海农商', key: 73 },
  ],

  // 验证项
  verifyType: [
    { name: '全部', key: -1 },
    { name: '通讯录授权', key: 1 },
    { name: '真实信息填写', key: 2 },
    { name: '手机号绑定', key: 3 },
    { name: '人脸识别', key: 4 },
    { name: '运营商认证', key: 5 },
    { name: '企业邮箱认证', key: 6 },
    { name: '信用卡账单', key: 7 },
    { name: '储蓄卡流水导入', key: 8 },
    { name: '公积金账号绑定', key: 9 },
    { name: '征信报告查询', key: 10 },
    { name: '淘宝认证', key: 11 },
  ],

  // 是否发送短信
  msgSend: [
    { name: '是', key: true },
    { name: '否', key: false },
  ],

  paramDesc: [
    { name: '抱歉，本日申请名额已满，请您明天再试	', key: 1 },
    { name: '抱歉，x月x日暂停申请', key: 2 },
    { name: '每日自动审核通过金额(元)', key: 3 },
  ],

  // 是否有效
  isValid: [
    { name: '是', key: 1 },
    { name: '否', key: 0 },
  ],

  // 是否必填
  mandatory: [
    { name: '是', key: 0 },
    { name: '否', key: 1 },
  ],

  // 提额/降息
  quotaStatus: [
    { name: '提额', key: 1 },
    { name: '降息', key: 2 },
  ],
};

const params = {

  getKey(type, val) {
    if (obj[type]) {
      const item = obj[type].find(o => o.name === val);
      return item ? item.key : '';
    }
    throw new Error('obj[type] is undefined');
  },

  getName(type, key) {
    if (obj[type]) {
      const item = obj[type].find(o => o.key === key);
      return item ? item.name : '';
    }
    throw new Error('obj[type] is undefined');
  },

  getItem(type, options) {
    if (options) {
      if (options.filter) {
        return obj[type].filter(item => item.name !== options.filter);
      }
    } else {
      if (obj[type]) {
        return obj[type];
      }
    }

    throw new Error('obj[type] is undefined');
  },
};

export default params;
