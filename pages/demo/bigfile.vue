<template>
    <div>
        <upload @uploadFinish='onUploadFinish'></upload>
    </div>
</template>

<script>
import upload from '@components/UploadBigFileCloud'
export default {
    components: {
        upload
    },
    data() {
        return {

        }
    },
    methods: {
        onUploadFinish(files){
            console.log(files)
        }
    },
}
</script>

<style lang="less">
</style>
