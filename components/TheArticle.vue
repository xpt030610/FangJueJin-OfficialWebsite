<template>
    <div v-if="container" v-html="container" class="my-vhtml"></div>
</template>


<script lang="ts">
export default defineComponent({
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


