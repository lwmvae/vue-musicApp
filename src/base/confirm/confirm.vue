<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showConfirm">
      <div class="confirm-wrapper">
        <div class="confirm-container">
          <div class="confirm-title">
            <p>{{title}}</p>
          </div>
          <div class="confirm-btn">
            <div class="btn left" @click="cancelBtn">{{cancelBtnText}}</div>
            <div class="btn" @click="confirmBtn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'confirm',
  props: {
    title: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data() {
    return {
      showConfirm: false
    }
  },
  methods: {
    show() {
      this.showConfirm = true
    },
    cancelBtn() {
      this.hide()
      this.$emit('cancel')
    },
    confirmBtn() {
      this.hide()
      this.$emit('confirm')
    },
    hide() {
      this.showConfirm = false
    }
  }
}

</script>
<style scoped lang="less">
.confirm {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;
    .confirm-container {
      animation: confirm-zoom 0.3s;
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
}

@keyframes confirm-zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.confirm-wrapper {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.confirm-container {
  width: 270px;
  background-color: #999;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
}

.confirm-title {
  padding: 20px 0;
}

.confirm-btn {
  display: flex;

  .btn {
    height: 40px;
    line-height: 40px;
    flex: 1;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }

  .left {
    border-right: 1px solid rgba(0, 0, 0, 0.3);
  }
}

</style>
