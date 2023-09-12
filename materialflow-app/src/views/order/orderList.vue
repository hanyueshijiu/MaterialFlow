<template>
  <!-- 页面标题 -->
  <div class="header">
    <p>订 单</p>
    <p>信 息</p>
  </div>
  <div class="container">
    <!-- 搜索框 -->
    <div class="searchBox">
      <div class="searchType">电话</div>
      <div class="inputBox">
        <input type="text" placeholder="输入电话号码搜索" />
      </div>
      <div class="btn">搜索</div>
    </div>
    <!-- 分类bar -->
    <div class="kindsBox">
      <div class="kind focus">全部</div>
      <div class="kind">已入库</div>
      <div class="kind">运输中</div>
      <div class="kind">已送达</div>
    </div>
    <!-- 订单详情列表 -->
    <div class="orderListBox">
      <div class="orderItem" v-for="item in 3">
        <div class="top">
          <div class="leftBox">
            <p>订单号： xxxxxxxxxxxxxxxx</p>
            <p>下单时间： xxxxxxxxxx</p>
          </div>
          <div class="rightBox">
            <div>订单项请 ></div>
          </div>
        </div>
        <div class="middle">
          <div class="start">发货地址:XXXXXXXXXXXX</div>
          <div class="title">运输中</div>
          <div class="end">收货地址:XXXXXXXXXXXXXXXX</div>
        </div>
        <div class="bottom">运费： XXX元</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";
// import { showToast } from "vant";
import "vant/es/toast/style";
</script>

<style lang="less" scoped>
.header {
  text-align: right;
  padding: 1rem 1rem 0;
  p {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
  }
}
.container {
  .searchBox {
    margin: 1rem;
    border-radius: 1.3rem;
    height: 2.4rem;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    font-size: 1rem;
    .searchType {
      width: 4rem;
      margin-left: 1rem;
      color: #fff;
    }
    .inputBox {
      flex: 1;
      margin-left: 2rem;
      input {
        border: 0;
        outline: none;
        background-color: rgba(0, 0, 0, 0);
        font-size: 1rem;
        color: #fff;
      }
    }
    .btn {
      width: 6rem;
      height: 2.2rem;
      line-height: 2.2rem;
      border-radius: 1.3rem;
      border: 1px solid #000;
      text-align: center;
      background: #000;
      color: #fff;
      font-size: 1rem;
    }
  }
  .kindsBox {
    margin: 1rem;
    margin-top: 1.5rem;
    border-radius: 1.3rem;
    height: 2.4rem;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    font-size: 1rem;
    overflow: hidden;
    .kind {
      flex: 1;
      height: 2.4rem;
      line-height: 2.4rem;
      text-align: center;
    }
    .kind:nth-child(0) {
      border-top-left-radius: 1.3rem;
      border-bottom-left-radius: 1.3rem;
    }
    .focus {
      background: rgba(0, 0, 0, 0.8);
      color: #fff;
    }
  }
  .orderListBox {
    height: 60vh;
    width: 88vw;
    margin: 0 1.5rem;
    overflow-y: scroll;
    .orderItem {
      width: 100%;
      height: 10rem;
      background: #fff;
      border-radius: 1rem;
      padding: 1rem;
      box-sizing: border-box;
      margin-bottom: 1rem;
      .top {
        display: flex;
        justify-content: space-between;
        .leftBox {
          width: 70%;
          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-top: 0.5rem;
          }
        }
      }
      .middle {
        display: flex;
        text-align: center;
        margin: 1rem 0;
        .start,
        .end {
          width: 40%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .title {
          width: 20%;
          font-size: 1rem;
          color: #cab6b6;
          text-align: center;
        }
      }
      .bottom {
        text-align: right;
      }
    }
  }
}
</style>
