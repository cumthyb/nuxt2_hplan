<template>
    <div class='finish_room'>
        <div class='finish_room2'>
            <div v-for='(item ,index ) in imgs'
                class='room_img'>
                <img v-if="item.url.startsWith('data:image')" :src="item.url">
                <span v-else="item.url.startsWith('data:image')"
                    class="file-name">{{item.name.substring(0,10) }}</span>
                <span class="delete-btn"
                    @click='delete_img(index)'><img src="../static/delete.png"></span>
            </div>
            <div class='room_add_img'
                v-if='multiple||imgs.length!=1'>
                <span><img src="../static/add.png"></span>
                    <span>加载文件</span>
                    <input @change='add_img' type="file">
           </div>
            </div>
        </div>

</template>

<script >


export default {
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        value:{
            type:Array,
            default:()=>[]
        }
    },
    data: function () {
        return {
            imgs: [],
        }
    },
    watch:{
        value(val){
            this.imgs=[].concat(val)
        }
    },
    methods: {
        delete_img(item) {
            this.imgs.splice(item, 1);
        },
        add_img(event) {
            var reader = new FileReader();
            var img1 = event.target.files[0];
            let file = { name: img1.name }
            reader.readAsDataURL(img1);
            var that = this;
            reader.onloadend = () => {
                file.url = reader.result
                this.imgs.push(file);
                this.$emit('input', this.imgs)
            }

        }
    }


}

</script>
<style  lang="less">
.finish_room {
    width: 430px;
    height: auto;
    .finish_room2 {
        width: 100%;
        height: auto;
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        align-items: center;
        // border-bottom: 2px solid #e1e1e1;
        .room_img {
            width: 150px;
            height: 100px;
            margin-right: 10px;
            border: 1px solid #e1e1e1;
            position: relative;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
            .file-name {
                position: absolute;
                display: inline-block;
                max-width: 110px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
            .delete-btn {
                position: absolute;
                width: auto;
                height: auto;
                right: 5px;
                bottom: 3px;
            }
        }
    }
    .room_add_img {
        width: 148px;
        height: 98px;
        border: 1px solid #e1e1e1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
        span:nth-child(1) {
            margin-top: 20px;
            width: 40px;
            height: 40px;
            overflow: hidden;
        }
        span:nth-child(2) {
            margin-bottom: 10px;
        }
        input {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 99999;
            opacity: 0;
        }
    }
}
</style>