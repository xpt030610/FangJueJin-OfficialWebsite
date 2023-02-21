<template>
    <div class="container">
        <div class="text-container">
            <div class="title"></div>
            <div class="info"></div>
            <TheArticle></TheArticle>
        </div>
    </div>
</template>

<script setup>
//“首页”标签设为false
const isIndex = useIsIndex();
isIndex.value = false;
const route = useRoute();
const id = route.params.id;
console.log(id);
//获取标签列表
const { data: artList } = await useFetch(
    `http://localhost:1337/api/articles?populate=*&filters[id]=${id}`,
);
const artRes = artList.value.data;
let markdownText = useMarkdown();
markdownText.value = artRes[0].attributes.text
</script>

<style lang="scss" scoped>
@import '~/assets/css/markdown.css';
.container{
    .text-container{
        padding-top: 20px;
        background: pink;
    }
}
</style>
