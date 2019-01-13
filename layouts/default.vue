<template>
    <div>
        <my-header />
        <nuxt class="content-container" />
        <my-footer />
    </div>
</template>

<script>
import MyFooter from '@components/Footer.vue'
import MyHeader from '@components/Header.vue'

export default {
    components: {
        MyFooter,
        MyHeader
    },
    mounted() {
    }
}
</script>

<style>
@import "static/quill/quill-font.css";
.container {
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button,
.button:visited {
  display: inline-block;
  color: #3b8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3b8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover,
.button:focus {
  color: #fff;
  background-color: #3b8070;
}

.title {
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
.content-container {
  width: 1200px;
  overflow-y: auto;
  height: 100%;
  margin: 20px auto;
  /* background-color: #F6F6F6; */
  padding-bottom: 20px;
}
</style>
