<template>
  <div class="advantage-panel">
    <div class="advantage-row">
      <div v-for='(item,index) in data'
           :key='index'
           class="advantage-col">
        <Card class="advantage-cad">
          <p slot="title">{{item.label}}</p>
          <p>{{item.desc}}</p>
          <p>{{item.desc}}</p>
          <p>{{item.desc}}</p>
        </Card>
        </div>
      </div>

    </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      defatult: () => []
    }
  }
}
</script>
<style lang="less">
.advantage-panel {
  padding: 20px;
  .advantage-row {
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .advantage-col {

      width: 280px;
      .advantage-cad {
        width: 250px;
        height: 300px;
        margin: 0 auto;
        text-align: center;
      }
    }
  }
}
</style>
