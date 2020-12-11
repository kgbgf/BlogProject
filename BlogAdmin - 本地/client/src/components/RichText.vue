<template>
    <div>
        <textarea  ref="demo" :value="value" id="demo" style="display: none;"></textarea>
    </div>
</template>

<script>
    export default {
        name: "RichText",

        data(){
            return {
                layedit : null,
                index : 0
            }
        },

        props:["value"],

        watch:{
            value(){
                this.$refs.demo.value = this.value;
                layui.use('layedit', ()=>{
                    this.layedit = layui.layedit;
                    this.index = this.layedit.build('demo');
                });
            }
        },

        computed : {
            content(){
                return this.layedit.getContent(this.index);
            }
        },

        mounted() {
            layui.use('layedit', ()=>{
                this.layedit = layui.layedit;
                this.index = this.layedit.build('demo');
            });
        }
    }
</script>

<style scoped>

</style>