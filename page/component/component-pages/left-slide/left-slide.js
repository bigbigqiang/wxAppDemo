Page({
  data: {
    delBtnWidth: 180//删除按钮宽度单位（rpx）
  },
  onLoad: function (options) {
  // 页面初始化 options为页面跳转所带来的参数
    this.initEleWidth();
    this.tempData();
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },

  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      let moveX = e.touches[0].clientX;
      //获取手指触摸的是哪一项
      let index = e.target.dataset.index;

      let list = this.data.list;

      //手指起始点位置与移动期间的差值
      let disX = this.data.startX - moveX;
      let delBtnWidth = this.data.delBtnWidth;
      let txtStyle = "";
      let open = list[index].open;
      if (open){
        if (disX <=0) {
          //如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:-" + (delBtnWidth + disX) + "px";
          if (-disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:0px";
            open = false;
          }
        } else{
          //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }else{
        if (disX<=0) {
          //如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:0px";
        } else{
          //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "px";
            open = true;
          }
        }
      }    
      this.updateList(index, txtStyle, open);
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      let endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      let disX = this.data.startX - endX;
      let delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      let txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      let index = e.target.dataset.index;
      let list = this.data.list;
      let open = list[index].open;
      this.updateList(index, txtStyle, open);
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    let real = 0;
    try {
      let res = wx.getSystemInfoSync().windowWidth;
      let scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      returnfalse;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    let delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  updateList(index, txtStyle, open){
    let list = this.data.list;
    list[index].txtStyle = txtStyle;
    list[index].open = open;
    //更新列表的状态
    this.setData({
      list: list
    });
  },
  //点击删除按钮事件
  delItem: function (e) {
    //获取列表中要删除项的下标
    let index = e.target.dataset.index;
    let list = this.data.list
    //移除列表中下标为index的项
    list.splice(index, 1);
    //更新列表的状态
    this.setData({
      list: list
    });
  },
  //测试临时数据
  tempData: function () {
    let list = [
      {
        txtStyle: "left:0px",
        txt: "向左滑动可以删除",
        open:false
      },
      {
        txtStyle: "left:0px",
        txt: "微信小程序|联盟（wxapp-union.com）",
        open: false
      }
    ];
    this.setData({
      list: list
    });
  }
})