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
    weather: {},
    nowTime: '',
    address: {},
    gps: {
      latitude: '',
      longitude: '113.88308'
    }
  },
  // 设置随机颜色
  chgCentigradeColor() {
    let color = '#';
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 6; i++) {
      color += arr[Math.floor(Math.random() * 16)];
    }
    this.setData({
      centigradeColor: color
    })
  },
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
      mask: true,
      duration: 3000
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
          this.setData({
            weather: data,
            nowTime: data.update_time.split(' ')[0]
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
  onLoad: function (options) {
    this.chgCentigradeColor();
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
