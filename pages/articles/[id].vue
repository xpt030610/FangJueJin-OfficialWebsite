<template>
    <div class="main">
        <div class="container">
            <div class="text-container">
                <div class="title">{{ artRes[0].attributes.title }}</div>
                <div class="info">
                    <div class="artist">{{ artRes[0].attributes.artist }}</div>
                    <div class="date">{{ theDate }}</div>
                </div>
                <img :src="cover" alt="" />
                <TheArticle></TheArticle>
            </div>
            <div class="sidebar"></div>
        </div>
    </div>
</template>

<script setup>
//“首页”标签设为false
const isIndex = useIsIndex();
isIndex.value = false;
const route = useRoute();
const id = route.params.id;

//获取标签列表
const { data: artList } = await useFetch(
    `http://localhost:1337/api/articles?populate=*&filters[id]=${id}`,
);
const artRes = artList.value.data;

//日期显示
const date = new Date(artRes[0].attributes.date);
const theDate =
    date.getFullYear() +
    '年' +
    date.getMonth() +
    '月' +
    date.getDate() +
    '日 ' +
    date.getHours() +
    ':' +
    date.getMinutes();
//封面图
const cover ='http://localhost:1337'+ artRes[0].attributes.cover.data.attributes.url;
console.log(cover);
let markdownText = useMarkdown();
markdownText.value = artRes[0].attributes.text;
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: center;
    @include bg_sub_color();
    .container {
        display: flex;
        padding-top: 20px;
        .text-container {
            box-sizing: border-box;
            width: 820px;
            margin-right: 20px;
            padding: 32px;
            @include bg_color();
            .title {
                font-size: 32px;
                font-weight: 800;
                margin-bottom: 20px;
            }
            .info {
                height: 48px;
                margin-bottom: 20px;
                .artist {
                    font-size: 16px;
                    line-height: 24px;
                    height: 24px;
                    @include font_color();
                }
                .date {
                    font-size: 14px;
                    line-height: 24px;
                    height: 24px;
                    @include font_sub_color();
                }
            }
            img{
                width: 756px;
                height: 425px;
            }
        }
        .sidebar {
            width: 300px;
            height: 600px;
            background-color: blue;
        }
    }
}
</style>
