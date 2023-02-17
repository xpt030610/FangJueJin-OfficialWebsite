<template>
    <div class="container">
        <div class="view-nav">
            <ul>
                <li v-for="v in artRes" :key="v.id">
                    {{ v.attributes.item }}
                </li>
            </ul>
        </div>
        <div class="view-container">
            <TheArticle></TheArticle>
            <aside class="index-aside">sas</aside>
        </div>
    </div>
</template>
<script setup>
// 改“首页”状态
const isIndex = useIsIndex();
isIndex.value = true;
//获取标签列表
const { data: artList } = await useFetch(
    'http://localhost:1337/api/article-tabs',
);
const artRes = artList.value.data;
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .view-nav {
        position: sticky;
        top: 0;
        width: 100%;
        height: 46px;
        background-color: #fff;
        z-index: 3;
        border-bottom: 1px solid $border-line;
        ul {
            position: -webkit-sticky; /* 兼容 Safari */
            position: sticky;
            display: flex;
            margin: auto;
            max-width: 960px;
        }
        li {
            line-height: 46px;
            padding: 0 1rem 0 0;
            margin-right: 1.2rem;
            color: $header-color;
        }
        li:hover {
            cursor: pointer;
            color: $theme-color;
        }
    }
    .view-nav .active {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .view-container {
        display: flex;
        justify-content: space-between;
        top: 20px;
        width: 960px;
        margin-top: 15px;

        .index-aside {
            width: 240px;
            background-color: blue;
        }
    }
}
</style>