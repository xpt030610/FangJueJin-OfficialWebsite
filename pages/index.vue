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
            <aside class="index-aside">
                <div class="banImage" v-if="isBan">
                    <img :src="banRes" alt="小册的图" loading="lazy" />
                    <div class="banClose" @click="banClose()"></div>
                </div>
                <div class="author-list">
                    <div class="nav">🎖️作者榜</div>
                    <ul class="list">
                        <li>
                            <img
                                :src="authorImgs[0]"
                                alt="作者1头像"
                                loading="lazy"
                            />
                            <a href="https://juejin.cn/user/937216171846712">{{
                                author1.attributes.name
                            }}</a>
                        </li>
                        <li>
                            <img
                                :src="authorImgs[1]"
                                alt="作者2头像"
                                loading="lazy"
                            />
                            <a href="https://juejin.cn/user/937216171846712">{{
                                author2.attributes.name
                            }}</a>
                        </li>
                        <li>
                            <img
                                :src="authorImgs[2]"
                                alt="作者3头像"
                                loading="lazy"
                            />
                            <a href="https://juejin.cn/user/937216171846712">{{
                                author3.attributes.name
                            }}</a>
                        </li>
                    </ul>
                </div>
            </aside>
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

//小册的图片
const { data: bannerImage } = await useFetch(
    'http://localhost:1337/api/banner-images/1?populate=*',
);
const banRes =
    'http://localhost:1337' +
    bannerImage.value.data.attributes.image.data.attributes.url;
let isBan = ref(true);
const banClose = () => {
    isBan.value = false;
    console.log(isBan);
};

//获取作者榜单信息
const { data: artistList } = await useFetch(
    `http://localhost:1337/api/artists/?populate=*`,
);
const [author1, author2, author3] = artistList.value.data;
const authorImgs = [
    `http://localhost:1337${author1.attributes.photo.data.attributes.formats.thumbnail.url}`,
    `http://localhost:1337${author2.attributes.photo.data.attributes.formats.thumbnail.url}`,
    `http://localhost:1337${author3.attributes.photo.data.attributes.formats.thumbnail.url}`,
];

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
    user-select: none;
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
        justify-content: center;
        top: -1px;
        width: 100%;
        height: 48px;
        overflow-y: hidden;
        overflow-x: scroll;
        z-index: 3;
        border-bottom: 1px solid;
        @include bg_color();
        @include border_color();
        &::-webkit-scrollbar {
            // width: 1px !important;
            height: 10px !important;
        }
        ul {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: space-between;
            width: 960px;
            @media screen and (max-width: 1024px) {
                left: 0;
                transform: translateX(0);
            }
            li {
                line-height: 46px;
                font-size: 1.16rem;
                padding: 0 0.5rem 0 0.5rem;
                margin-right: 1.2rem;
                @include font_sub_color();
                &:hover {
                    cursor: pointer;
                    color: $theme-color;
                }
                &.active {
                    color: $theme-color;
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
        @media screen and (max-width: 960px) {
            width: 100%;
        }
        .index-aside {
            position: relative;
            margin-left: 20px;
            width: 240px;
            @media screen and (max-width: 1023px) {
                display: none;
            }
            .banImage {
                position: sticky;
                top: 65px;
                height: 200px;
                margin-bottom: 30px;
                img {
                    width: 100%;
                    border-radius: 10px;
                }
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    background-color: rgba(0, 0, 0, 0.3);
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }
                &:hover::after {
                    opacity: 1;
                }
                .banClose {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    width: 20px;
                    height: 20px;
                    background-image: url('~/assets/image/close.webp');
                    background-size: cover;
                    cursor: pointer;
                    z-index: 2;
                }
            }
            .author-list {
                position: sticky;
                top: 300px;
                width: 240px;
                height: 280px;
                padding: 20px;
                border-radius: 10px;
                @include font_color();
                @include bg_color();
                .nav {
                    cursor: pointer;
                    font-size: 16px;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid;
                    @include border_color();
                    &:hover {
                        color: $theme-color;
                    }
                }
                ul {
                    display: flex;
                    flex-direction: column;
                    li {
                        position: relative;
                        height: 46px;
                        margin: 10px 0;
                        img {
                            position: absolute;
                            width: 46px;
                            height: 46px;
                            border-radius: 23px;
                        }
                        a {
                            position: absolute;
                            line-height: 46px;
                            left: 60px;
                            &:hover {
                                color: $theme-color;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>