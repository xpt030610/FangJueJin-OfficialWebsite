<template>
    <div v-if="container" v-html="container"></div>
</template>

<!-- <script setup>
// import marked from 'marked';
const markdownText = '# Hello, world!';
// const $content = useContent();
</script> -->

<script lang="ts">
export default defineComponent({
    data() {
        return {
            markdownText: '# Hello, World!',
            container: '',
        };
    },
    mounted() {
        const NuxtApp = useNuxtApp();
        this.container = NuxtApp.markdownToHtml('### 什么是前端\n\n- 解决GUI人机交互问题\n- 跨终端\n  - PC/移动浏览器\n  - 客户…前端应该关注哪些方面\n\n- 功能\n- 美观\n- 无障碍\n- 安全\n- 性能\n- 兼容\n- 用户体验');
        console.log('this',this.container);
        console.log(useNuxtApp());
    },
});
</script>
