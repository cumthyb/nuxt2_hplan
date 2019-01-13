<template>
    <div class="com-course-carousel">
        <Carousel autoplay
                  v-model="value2"
                  loop
                  :height='500'
                  class="course-carousel">
            <CarouselItem>
                <div class="demo-carousel">
                    <span>课程1</span>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <span>课程2</span>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <span>课程3</span>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <span>课程4</span>
                </div>
            </CarouselItem>
        </Carousel>

        <div class="slot-card">
            <slot name='card'></slot>
        </div>

    </div>

</template>
<script>
export default {
  data() {
    return {
      value2: 0
    }
  }
}
</script>
<style lang="less">
.com-course-carousel {
  position: relative;
  .course-carousel {
    .demo-carousel {
      width: 100%;
      height: 100%;
      background-color: #506b9e;
      font-size: 30px;
      color: aliceblue;
      text-align: center;
      position: relative;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .slot-card {
    width: 224px;
    height: 292px;
    background-color: aliceblue;
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    border-radius: 5px;
    box-shadow: #666 0px 0px 10px;
  }
}
</style>
