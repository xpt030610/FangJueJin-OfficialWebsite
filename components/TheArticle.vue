<template>
    <div v-if="container" v-html="container" class="my-vhtml"></div>
</template>


<script lang="ts">
export default defineComponent({
    head() {
        return {
            link: [
                {
                    rel: 'stylesheet',
                    href: '/css/markdown.css',
                },
            ],
        };
    },
    data() {
        return {
            container: '',
        };
    },
    mounted() {
        let markdownText = useMarkdown();
        const NuxtApp = useNuxtApp();
        this.container = NuxtApp.markdownToHtml(markdownText.value);
    },
});
</script>

<style  scoped>
.my-vhtml img {
    width: 700px;
}
</style>
