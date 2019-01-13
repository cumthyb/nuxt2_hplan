<!--  -->
<template>
    <div class='edit'>
        <Input v-model="inputValue"
               ref='input'
               placeholder="Enter something..."
               style="width: 300px"
               @on-focus="onInputFocus"
               @on-blur='onInputBlur' />
        <button class="btn edit-btn"
                v-if='viewModel'
                @click='onModefy'>
            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY29uX2VkaXQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIHNrZXRjaHRvb2wuPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IueKtuaAgSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Iui0puaIt+iuvue9rl/plJnor6/mj5DnpLoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05NDguMDAwMDAwLCAtNTk3LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTQ4LjAwMDAwMCwgNTk3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yMTEiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbD0iI0Q4RDhEOCIgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTMuODAxODczNiwzLjcxNDAzODQzIEwxMi4yNzcxMDkxLDIuMTk3MDY2MTUgQzEyLjAxMzAwNDYsMS45MzQzMTEyOCAxMS42MDQ4MTk3LDEuOTM0MzExMjggMTEuMzQwNjUxMiwyLjE5NzA2NjE1IEwxMC4xNDAwODg3LDMuMzkxNTU2OSBMMTIuNjczMzUxMyw1LjkxMTg3MzQyIEwxMy44MDE4NzM2LDQuNjQ1NzEwNjYgQzE0LjA2NjA0MjEsNC4zODI4OTIxNCAxNC4wNjYwNDIxLDMuOTc2ODU2OTYgMTMuODAxODczNiwzLjcxNDAzODQzIEwxMy44MDE4NzM2LDMuNzE0MDM4NDMgWiBNMiwxMS40MTgzMTA3IEwyLDEzLjkzODYyNzMgTDQuNTMzMzI2NTIsMTMuOTM4NjI3MyBMMTEuODY4OTI0Myw2LjU2ODc2MDU3IEw5LjMzNTY2MTc0LDQuMDQ4NDY1MjkgTDIsMTEuNDE4MzEwNyBMMiwxMS40MTgzMTA3IFogTTcuMzYwOTc2OTIsMTIuNjY3ODgxNiBDNi45OTA4NTk0NywxMi42Njc4ODE2IDYuNjkwODQxNDcsMTIuOTY2MzY2NCA2LjY5MDg0MTQ3LDEzLjMzNDU5MjQgQzYuNjkwODQxNDcsMTMuNzAyODE4NCA2Ljk5MDg1OTQ3LDE0LjAwMTMwMzIgNy4zNjA5NzY5MiwxNC4wMDEzMDMyIEM3LjczMTA5NDM3LDE0LjAwMTMwMzIgOC4wMzExMTIzNywxMy43MDI4MTg0IDguMDMxMTEyMzcsMTMuMzM0NTkyNCBDOC4wMzExMTIzNywxMi45NjYzNjY0IDcuNzMxMDk0MzcsMTIuNjY3ODgxNiA3LjM2MDk3NjkyLDEyLjY2Nzg4MTYgTDcuMzYwOTc2OTIsMTIuNjY3ODgxNiBaIE0xMC4wNDE1MTg3LDEyLjY2Nzg4MTYgQzkuNjcxNDAxMjYsMTIuNjY3ODgxNiA5LjM3MTM4MzI1LDEyLjk2NjM2NjQgOS4zNzEzODMyNSwxMy4zMzQ1OTI0IEM5LjM3MTM4MzI1LDEzLjcwMjgxODQgOS42NzE0MDEyNiwxNC4wMDEzMDMyIDEwLjA0MTUxODcsMTQuMDAxMzAzMiBDMTAuNDExNjM2MiwxNC4wMDEzMDMyIDEwLjcxMTY1NDIsMTMuNzAyODE4NCAxMC43MTE2NTQyLDEzLjMzNDU5MjQgQzEwLjcxMTY3NTUsMTIuOTY2MzY2NCAxMC40MTE2MzYyLDEyLjY2Nzg4MTYgMTAuMDQxNTE4NywxMi42Njc4ODE2IEwxMC4wNDE1MTg3LDEyLjY2Nzg4MTYgWiBNMTIuNzIyMDgxOCwxMi42Njc4ODE2IEMxMi4zNTE5NjQ0LDEyLjY2Nzg4MTYgMTIuMDUxOTQ2NCwxMi45NjYzNjY0IDEyLjA1MTk0NjQsMTMuMzM0NTkyNCBDMTIuMDUxOTQ2NCwxMy43MDI4MTg0IDEyLjM1MTk2NDQsMTQuMDAxMzAzMiAxMi43MjIwODE4LDE0LjAwMTMwMzIgQzEzLjA5MjE5OTMsMTQuMDAxMzAzMiAxMy4zOTIyMTczLDEzLjcwMjgxODQgMTMuMzkyMjE3MywxMy4zMzQ1OTI0IEMxMy4zOTIyMTczLDEyLjk2NjM2NjQgMTMuMDkyMTk5MywxMi42Njc4ODE2IDEyLjcyMjA4MTgsMTIuNjY3ODgxNiBMMTIuNzIyMDgxOCwxMi42Njc4ODE2IFoiIGlkPSJTaGFwZS1Db3B5LTYiIGZpbGw9IiMwMDdGRkYiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
                 width="18"
                 height="18"
                 class="icon">
            <span>修改</span>
        </button>
        <button class="btn confim-btn"
                v-if='!viewModel'
                @click="onSaveEdit">保存</button>
        <button class="btn cancel-btn"
                v-if='!viewModel'
                @click="onCanelEdit">取消</button>
    </div>
</template>

<script>
export default {
  props: {
    value: ''
  },
  data() {
    return {
      inputValue: '',
      viewModel: true
    }
  },

  components: {},

  watch: {
    value(val) {
      this.inputValue = val
    }
  },

  mounted() {
    this.inputValue = this.value
  },

  methods: {
    onInputFocus() {
      this.viewModel = false
    },
    onInputBlur() {
      setTimeout(() => {
        this.viewModel = true
      }, 1000)
    },
    onSaveEdit() {
      this.$emit('input', this.inputValue)
      this.viewModel = true
    },
    onCanelEdit() {
      this.viewModel = true
    },
    onModefy() {
      this.viewModel = false
      this.$refs['input'].focus()
    }
  }
}
</script>
<style lang='less'>
.edit {
  input {
    border: none;
    &:foucs {
      border: none;
    }
  }

  .btn {
    margin-left: 1rem;
    background-color: transparent;
    color: #007fff;
    font-size: 1.2rem;
    padding: 0;
    white-space: nowrap;
    border: none;
    font-size: 14px;
    cursor: pointer;
    &:foucs {
      border: none;
      outline: none;
    }
    img {
      vertical-align: bottom;
      height: 1.5rem;
      margin-right: 0.6rem;
      border: none;
    }
  }
  .cancel-btn {
    color: #909090;
  }
}
</style>