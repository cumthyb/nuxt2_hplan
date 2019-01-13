<template>
  <div>
    <div class='login-panel'>
      <Login />
    </div>
  </div>

</template>

<script>
import Login from '@components/Login.vue'
export default {
  components: {
    Login
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style lang="less">
.login-panel {
    width: 300px;
    display: inline-block;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
