// pages/pull/pull.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    films: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.request({
      url: `https://m.maizuo.com/gateway?cityId=440300&pageNum=${this.data.pageNum}&pageSize=10&type=1&k=8909958`,
      data: {},
      header: {
        'X-Host': 'mall.film-ticket.film.list',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'GET',
      dataType: 'json',
      success: (result) => {
        let res = result.data;
        if (res.status === 0) {
          let newFilms = this.data.films;
          newFilms = newFilms.concat(res.data.films);
          this.setData({
            films: newFilms
          })
        }
      }
    });
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
    this.setData({
      pageNum: 1,
      films: []
    })
    wx.request({
      url: `https://m.maizuo.com/gateway?cityId=440300&pageNum=${this.data.pageNum}&pageSize=15&type=1&k=8909958`,
      data: {},
      header: {
        'X-Host': 'mall.film-ticket.film.list',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'GET',
      dataType: 'json',
      success: (result) => {
        let res = result.data;
        if (res.status === 0) {
          let newFilms = this.data.films;
          newFilms = newFilms.concat(res.data.films);
          this.setData({
            films: newFilms
          })
        }
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    wx.request({
      url: `https://m.maizuo.com/gateway?cityId=440300&pageNum=${this.data.pageNum}&pageSize=15&type=1&k=8909958`,
      data: {},
      header: {
        'X-Host': 'mall.film-ticket.film.list',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'GET',
      dataType: 'json',
      success: (result) => {
        let res = result.data;
        if (res.status === 0) {
          let newFilms = this.data.films;
          newFilms = newFilms.concat(res.data.films);
          this.setData({
            films: newFilms
          })
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
