// pages/post/post-detail.js
import { DBPost } from '../../../db/DbPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
    post: this.postData
    })
  },
  setAniation: function () {
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })

    this.animationUp = animationUp
  },
  onCollectionTap: function (event) {
    var newData = this.dbPost.collect();

    // 重新绑定数据。注意，不要将整个newData全部作为setData的参数，
    // 应当有选择的更新部分数据

    this.setData({
      'post.collectionStatus': newData.collectionStatus,
      'post.CallingNum': newData.CallingNum
    })

    // 交互反馈
    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },
  onUpTap: function (event) {
    var newData = this.dbPost.up();

    this.setData({
      'post.upStatus': newData.upStatus,
      'post.ReadingNum': newData.ReadingNum
    }),

      this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.setNavigationBarTitle({
        title: this.postData.Title,
      })
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