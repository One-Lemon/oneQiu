// pages/maizuo/maizuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    animation: {}
  },
  goRight() {
    let animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    });
    animation.translateX(45);
    this.setData({
      animation: animation.export()
    })
    console.log(this.data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'https://m.maizuo.com/gateway?type=2&cityId=440300&k=9383551',
      header: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15596204765093831213613"}',
        'X-Host': 'mall.cfg.common-banner'
      },
      method: 'GET',
      success: (result) => {
        if (result.data.status === 0) {
          this.setData({
            banner: result.data.data
          })
        }
      }
    });
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
