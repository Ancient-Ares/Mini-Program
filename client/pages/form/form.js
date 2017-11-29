// pages/form/form.js

var util = require('../../utils/util.js')
var formatLocation = util.formatLocation
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    userName: '',
    userPhone: '',
    userWords: '',
    userAddress: '',
    location: {}
  },
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          location: formatLocation(res.longitude, res.latitude),
          userAddress: res.address
        })
      }
    })
  },
  bindName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  bindPhone: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
  bindWords: function (e) {
    this.setData({
      userWords: e.detail.value
    })
  },
  bindAddress: function (e) {
    this.setData({
      userAddress: e.detail.value
    })
  },
  submit: function () {
    wx.showLoading({
      title: '提交中...',
    })
    var that = this
    wx.request({
      url: 'https://653976696.jsnmnb.xyz/weapp/formList',
      method: 'POST',
      dataType: 'json',
      data: {
        userName: that.data.userName,
        userAddress: that.data.userAddress,
        userPhone: that.data.userPhone,
        userWords: that.data.userWords
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === 0) {
          wx.showModal({
            title: '信息',
            content: '提交成功！',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          wx.showModal({
            title: '信息',
            content: '提交失败',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      },
      fail: function (e) {
        wx.hideLoading()
        wx.showModal({
          title: '信息',
          content: '网络错误，稍后再试！',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      type: options.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onLaunch: function (options) {

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