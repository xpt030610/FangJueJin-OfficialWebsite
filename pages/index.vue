<template>
    <div class="container">
        <div class="view-nav">
            <ul>
                <li
                    :class="[1 === activeIndex ? 'active' : '']"
                    @click="changeLabel(1)"
                >
                    综合
                </li>
                <li
                    :class="[v.id === activeIndex ? 'active' : '']"
                    v-for="v in artRes"
                    :key="v.id"
                    @click="changeLabel(v.id)"
                >
                    {{ v.attributes.item }}
                </li>
            </ul>
        </div>
        <div class="view-container">
            <ArticleList></ArticleList>
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

// 将label的值改为id
const isLabel = useIsLabel();
let activeIndex = ref(1);
const changeLabel = (id) => {
    isLabel.value = id;
    activeIndex.value = id;
    triggerRef(activeIndex);
};
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    @include bg_sub_color();
    transition: all 0.3s linear;

    .view-nav {
        position: sticky;
        display: flex;
        justify-content: center;
        top: 0;
        width: 100%;
        height: 46px;
        z-index: 3;
        border-bottom: 1px solid;
        @include bg_color();
        @include border_color();
        ul {
            position: -webkit-sticky; /* 兼容 Safari */
            position: sticky;
            display: flex;
            max-width: 960px;
            li {
                line-height: 46px;
                font-size: 1.16rem;
                padding: 0 1rem 0 1em;
                margin-right: 1.2rem;
                @include font_sub_color();
                &:hover {
                    cursor: pointer;
                    color: $theme-color;
                }
                &.active {
                    color: $theme-color;
                }
                @media screen and (max-width: 1023px) {
                    display: none;
                    &:nth-child(1),
                    &:nth-child(2),
                    &:nth-child(3),
                    &:nth-child(4) {
                        display: block;
                    }
                }
            }
        }
    }

    .view-container {
        display: flex;
        justify-content: center;
        top: 20px;
        width: 960px;
        margin-top: 15px;
        @media (max-width: 960px) {
            width: 100%;
        }
        .index-aside {
            margin-left: 20px;
            width: 240px;
            background-color: blue;
            @media screen and (max-width: 1023px) {
                display: none;
            }
        }
    }
}
</style>