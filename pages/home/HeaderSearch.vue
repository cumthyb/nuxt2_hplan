<template>
    <div class='header-container'>
        <div class="h-logo">
            <img src="https://static1.51cto.com/edu/center/images/home/logo.png"
                 width="157"
                 height="34">
        </div>
        <div class="h-slogan">
            <img src="https://static1.51cto.com/edu/center/images/home/logo2.png"
                 width="157"
                 height="34">
        </div>
        <div class="h-search">
            <Input class="input-search"
                   search
                   enter-button
                   placeholder="课程搜索" />
        </div>
    </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.header-container {
  width: 1200px;
  height: 62px;
  display: flex;
  flex-direction: row;
  position: relative;
  .h-logo {
    flex: 1;
    height: 100%;
  }
  .h-slogan {
    flex: 1;
    height: 100%;
  }
  .h-search {
    flex: 3;
    height: 100%;
    display: flex;
    align-items: center;
  }
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
