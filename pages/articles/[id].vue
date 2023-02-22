<template>
    <div class="main">
        <div class="container">
            <div class="text-container">
                <div class="title">{{ artRes[0].attributes.title }}</div>
                <div class="image">
                    <img :src="artistImage" alt="作者头像" />
                </div>
                <div class="info">
                    <div class="artist">
                        {{ artistName }}
                    </div>
                    <div class="date">{{ theDate }}</div>
                </div>
                <img :src="cover" alt="封面" />
                <TheArticle></TheArticle>
            </div>
            <div class="sidebar">
                <div class="author-block">
                    <div class="author-info">
                        <div class="author-image">
                            <img :src="artistImage" alt="作者头像" />
                        </div>
                        <div class="author-name">
                            {{ artistName }}
                        </div>
                    </div>
                    <button>关注</button>
                    <button>私信</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//“首页”标签设为false
const isIndex = useIsIndex();
isIndex.value = false;
const route = useRoute();
const id = route.params.id;

//获取文章
const { data: artList } = await useFetch(
    `http://localhost:1337/api/articles?populate=*&filters[id]=${id}`,
);
const artRes = artList.value.data;
const artistId = artRes[0].attributes.artist.data.id;
const artistName = artRes[0].attributes.artist.data.attributes.name;
const { data: artistList } = await useFetch(
    `http://localhost:1337/api/artists/${artistId}?populate=*`,
);
const artistImage =
    'http://localhost:1337' +
    artistList.value.data.attributes.photo.data.attributes.url;

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
const cover =
    'http://localhost:1337' + artRes[0].attributes.cover.data.attributes.url;
let markdownText = useMarkdown();
markdownText.value = artRes[0].attributes.text;
</script>

<style lang="scss" scoped>
.main {
    display: flex;
    justify-content: center;
    transition: all 0.3s linear;
    @include bg_sub_color();
    .container {
        display: flex;
        justify-content: center;
        padding-top: 20px;
        width: 100%;
        .text-container {
            box-sizing: border-box;
            width: 820px;
            border-radius: 10px;
            padding: 32px;
            @include bg_color();
            @media (max-width: 960px) {
                width: 100%;
            }
            .title {
                font-size: 32px;
                font-weight: 800;
                margin-bottom: 20px;
            }
            .image {
                display: inline-block;
                width: 48px;
                height: 48px;
                margin-right: 10px;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                }
            }
            .info {
                display: inline-block;
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
            img {
                width: 75%;
                margin-left: 12.5%;
            }
        }
        .sidebar {
            position: sticky;
            top: 20px;
            width: 300px;
            height: 600px;
            margin-left: 20px;
            @media (max-width: 1024px) {
                display: none;
            }
            .author-block {
                width: 100%;
                height: 200px;
                padding: 20px;
                border-radius: 10px;
                @include bg_color();
                .author-info {
                    position: relative;
                    height: 68px;

                    margin-bottom: 20px;
                    .author-image {
                        position: absolute;
                        img {
                            width: 48px;
                            height: 48px;
                            border-radius: 24px;
                        }
                    }
                    .author-name {
                        height: 40px;
                        line-height: 40px;
                        left: 64px;
                        position: absolute;
                        display: inline-block;
                    }
                }
                button {
                    width: 120px;
                    height: 40px;
                    margin: 0 5px;
                    font-size: 16px;
                    border: 1px solid $theme-color;
                    border-radius: 10px;
                    background-color: rgba(30, 128, 255, 0.05);
                    color: $theme-color;
                    cursor: pointer;
                    &:first-of-type {
                        background-color: $theme-color;
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>
