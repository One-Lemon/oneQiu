// pages/index/index.js
// 引入md5
import md5 from '../../utils/md5';
// 秘钥
const QQMapKey = 'ZTABZ-WJMRG-UFGQQ-ITT77-3WJIS-UGBSY';
// SK
const SK = 'Mumf3hqTUyyZUpHh2c3Uu9FOSVoQCfUS';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    centigradeColor: '#000',
    weather: {
      'country': '中国',
      'city': '北京'
    },
    weekData: [{
      tem1: '',
      tem2: ''
    }],
    nowTime: '',
    address: {},
    gps: {
      latitude: 0,
      longitude: 0
    }
  },
  // 随机颜色算法
  colorFn() {
    let color = '#';
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 6; i++) {
      color += arr[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  // // 设置今天天气的随机颜色
  // chgCentigradeColor() {

  //   this.setData({
  //     centigradeColor: this.colorFn()
  //   })
  // },
  // 设置到date中
  updateLocation(res) {
    let newGps = {
      latitude: res.latitude,
      longitude: res.longitude
    }
    this.setData({
      gps: newGps
    })
    this.getAddress(newGps)
  },
  // 获取GPS位置
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (result) => {
        wx.showToast({
          title: '我知道你在哪了!!',
          icon: 'none',
          duration: 2000,
          mask: false
        });
        wx.stopPullDownRefresh();
        this.updateLocation(result);
      },
      fail: (e) => {
        console.log(e)
      }
    });
  },
  // 根据经纬度，逆向地址解析
  getAddress(gps) {
    // wx.request中没有正确的this指向
    var that = this;
    let lat = gps.latitude,
      lon = gps.longitude;
    wx.showLoading({
      title: '定位中',
      mask: true
    });
    let SIG = md5("/ws/geocoder/v1?key=" + QQMapKey + "&location=" + String(lat) + "," + String(lon) + SK)
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1',
      data: {
        key: QQMapKey,
        location: `${lat},${lon}`,
        sig: SIG
      },
      success: (result) => {
        if (result.statusCode === 200) {
          that.setData({
            address: result.data.result.address_component
          })
          wx.hideLoading();
          that.getWeather();
        }
      },
      fail: (e) => {
        console.log(e);
      }
    });

  },
  // 发送请求获取天气
  getWeather() {
    let city = this.data.address.city;
    if (city.indexOf('市') !== -1) {
      city = city.split('市')[0]
    }
    wx.request({
      url: 'https://www.tianqiapi.com/api/',
      data: {
        version: 'v1',
        city: city
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        if (result.statusCode === 200) {
          let data = result.data;
          let weekData = data.data.map(item => {
            let day = item.day;
            let index = day.indexOf('（');
            day = day.substr(index + 1, 2);
            item.day = day;
            item.bgColor = this.colorFn();
            return item;
          })
          this.setData({
            weather: data,
            nowTime: data.update_time.split(' ')[0],
            weekData: weekData
          })
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // this.chgCentigradeColor();
    this.getLocation();
    setInterval(() => {
      this.setData({
        centigradeColor: this.colorFn()
      })
    }, 500);
  },
  onPullDownRefresh: function () {
    this.getLocation();
  },
  chgAddress() {
    wx.chooseLocation({
      success: (result) => {
        let gps = {
          latitude: result.latitude,
          longitude: result.longitude
        };
        this.setData({
          gps
        })
        this.getAddress(gps);
      }
    });
  },
  onShareAppMessage() {
    return {
      title: '震惊！这个小程序里面居然能看到...',
      path: 'pages/index/index'
    }
  }
})
