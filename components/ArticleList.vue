<template>
    <div class="articles">
        <div class="article-bar">
            <ul>
                <li
                    :class="[1 === activeIndex ? 'active' : '']"
                    @click="changeNav(1)"
                >
                    推荐
                </li>
                <li
                    :class="[2 === activeIndex ? 'active' : '']"
                    @click="changeNav(2)"
                >
                    最新
                </li>
            </ul>
        </div>
        <ul class="article">
            <li>
                <a
                    href="https://juejin.cn/video/7202149403342143520?utm_source=timeline1&utm_medium=banner&utm_campaign=xiaoce_nuxt3_20230301"
                >
                    <div class="meta-container">
                        <div class="artist">掘金小册</div>
                        <div class="date">2天前</div>
                        <div class="ads">广告</div>
                    </div>
                    <div class="content-wrapper">
                        <div class="content-main">
                            <div class="article-title">
                                小册上新｜Nuxt 3.0 全栈开发
                            </div>
                            <div class="article-text">
                                🔥
                                视频+图文形式，内容涵盖：核心知识、工程架构、全栈进阶、
                                项目实战，帮你快速精通 Nuxt3 开发！
                            </div>
                        </div>
                        <img
                            src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/310ed8b04f8948e486e604d1322a53fe~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?"
                            alt="掘金小册封面"
                            loading:lazy
                        />
                    </div>
                </a>
            </li>
            <li v-for="art in artRes" :key="art.id">
                <nuxt-link :to="`/articles/${art.id}`">
                    <div class="meta-container">
                        <div class="artist">
                            <!-- 作者 -->
                            {{ art.attributes.artist.data.attributes.name }}
                        </div>
                        <div class="date">
                            <!-- 距离现在的时间 -->
                            {{ dateCount(art.attributes.date) }}
                        </div>
                        <ul class="article-tab">
                            <li
                                v-for="tab in art.attributes.article_tabs.data"
                                :key="tab.id"
                            >
                                <!-- 标签分类 -->
                                {{ tab.attributes.item }}
                            </li>
                        </ul>
                    </div>
                    <div class="content-wrapper">
                        <div class="content-main">
                            <div class="article-title">
                                <!-- 标题 -->
                                {{ art.attributes.title }}
                            </div>
                            <div class="article-text">
                                <!-- 正文 -->
                                {{ artCount(art.attributes.text) }}
                            </div>
                        </div>
                        <img
                            :src="`http://localhost:1337${art.attributes.cover.data.attributes.formats.small.url}`"
                            :alt="art.attributes.title"
                            loading:lazy
                        />
                    </div>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
//引用
import { useIsLabel } from '@/composables/states';
import { watch } from 'vue';

//全局变量 表示现在是在第几个标签
let labelValue = 1;
//全局变量 表示现在是在什么排序
let navValue = 1;

// 文章渲染列表
const artRes = ref({});
const { data: artList } = await useFetch(
    'http://localhost:1337/api/articles?populate=*',
);
artRes.value = artList.value.data;
//设置“active”的标签
let activeIndex = ref(1);
const changeNav = async (id) => {
    activeIndex.value = id;
    triggerRef(activeIndex);
    if (id === 1 || id === 2) {
        navValue = id;
        const sortQuery = id === 2 ? '&sort[0]=date%3Adesc' : '';
        const filterQuery =
            labelValue === 1 ? '' : `&filters[article_tabs][id]=${labelValue}`;
        const { data: artList } = await useFetch(
            `http://localhost:1337/api/articles?populate=*&${filterQuery}${sortQuery}`,
        );
        artRes.value = artList.value.data;
    }
};

//计算时间相差函数
const MINUTE = 60; // 一分钟有60秒
const HOUR = MINUTE * 60; // 一小时有60分钟
const DAY = HOUR * 24; // 一天有24小时
const MONTH = DAY * 30; // 一个月有30天
const YEAR = MONTH * 12; // 一年有12个月

const dateCount = (artdate) => {
    const now = new Date();
    const date = new Date(artdate);
    const interval = parseInt((now.getTime() - date.getTime()) / 1000 / 60); // 时间间隔，单位为分钟

    if (interval <= 1) {
        return '刚刚';
    } else if (interval < MINUTE) {
        // 多少分钟前
        return `${interval}分钟前`;
    } else if (interval < HOUR) {
        // 多少小时前
        return `${parseInt(interval / MINUTE)}小时前`;
    } else if (interval < DAY) {
        // 多少天前
        return `${parseInt(interval / HOUR)}天前`;
    } else if (interval < MONTH) {
        // 多少月前
        return `${parseInt(interval / DAY)}个月前`;
    } else if (interval < YEAR) {
        // 多少年前
        return `${parseInt(interval / MONTH)}年前`;
    } else {
        // 太久远的就： 年-月-日 时:分
        return `${date.getFullYear()}-${
            date.getMonth() + 1
        }-${date.getDate()} ${date.getHours()}:${
            date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        }`;
    }
};

//把markdown文章改成正常格式
const artCount = (art) => {
    const result = art
        .replace(
            /(\*{1,2}|_{1,2}|`{1,3}|#{1,6}\s+|!?\[.*?\]\(.*?\)|<.*?>|^\s*\d+\.\s+|\[|\]|\s+)/gm,
            '',
        )
        .slice(0, 100);
    return result;
};

//根据标签内容筛选相应文章
const isLabel = useIsLabel();
//监视isLabel变化
watch(isLabel, async (newVal, oldVal) => {
    let url = 'http://localhost:1337/api/articles?populate=*';
    if (newVal !== 1) {
        url = `http://localhost:1337/api/articles?populate=*&filters[article_tabs][id]=${newVal}`;
        if (navValue === 2) {
            url += '&sort[0]=date%3Adesc';
        }
    } else if (navValue === 2) {
        url =
            'http://localhost:1337/api/articles?populate=*&sort[0]=date%3Adesc';
    }
    const { data: artList } = await useFetch(url);
    artRes.value = artList.value.data;
    labelValue = newVal;
});
</script>

<style lang="scss" scoped>
.articles {
    max-width: 700px;
    min-height: 1200px;
    border-radius: 10px;
    margin-bottom: 20px;
    @include bg_color();
    @media screen and (max-width: 960px) {
        width: 100%;
    }
    .article-bar {
        height: 46px;
        box-sizing: border-box;
        border-bottom: 1px solid;
        @include border_color;
        @media screen and (max-width: 960px) {
            width: 100%;
            font-size: 8px;
        }
        ul {
            display: flex;
            padding: 0 10px;
            li {
                margin: 16px 0;
                font-size: 14px;
                padding: 0 15px;
                @include font_sub_color();

                &:nth-child(1),
                &:nth-child(2) {
                    border-right: 1px solid;
                    @include border_color();
                }
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
    .article {
        padding: 0;
        width: 100%;
        li {
            box-sizing: content-box;
            height: 120px;
            position: relative;
            padding: 12px 20px 0;
            max-width: 660px;
            .meta-container {
                display: flex;
                height: 22px;
                font-size: 13px;
                @include font_sub_color();
                .ads,
                .artist,
                .date,
                .article-tab {
                    cursor: pointer;
                    margin: 5px 0;
                    padding: 0 10px;
                    border-right: 1px solid;
                    @include border_color();
                }
                .ads {
                    position: absolute;
                    border: 1px solid;
                    padding: 5px;
                    top: 0;
                    right: 20px;
                    border-radius: 5px;
                    @include font_sub_color();
                }
                .artist {
                    padding-left: 0px;
                    @include font_color();
                    &:hover {
                        color: $theme-color;
                    }
                }
                .article-tab {
                    padding: 0;
                    border: 0;
                    overflow: hidden;
                    display: flex;
                    @media screen and (max-width: 480px) {
                        display: none;
                    }
                    li {
                        position: relative;
                        height: 13px;
                        padding: 0 10px;
                        border: 0;
                        &::after {
                            position: absolute;
                            right: -1px;
                            top: 5px;
                            display: block;
                            content: ' ';
                            width: 2px;
                            height: 2px;
                            border-radius: 50%;
                            background: #4e5969;
                        }
                        &:last-child::after {
                            width: 0px;
                            height: 0px;
                        }
                    }
                }
            }
            .content-wrapper {
                display: flex;
                margin-top: 6px;
                padding-bottom: 12px;
                border-bottom: 1px solid;
                @include border-color();
                .content-main {
                    max-width: 516px;
                    margin-top: 8px;
                    .article-title {
                        font-style: 24px;
                        font-weight: 800;
                        margin-bottom: 8px;
                        @include font_color();
                    }
                    .article-text {
                        width: 100%;
                        font-weight: 400;
                        font-size: 13px;
                        line-height: 22px;
                        height: 44px;
                        color: #86909c;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                img {
                    width: 120px;
                    height: 80px;
                    margin-left: 24px;
                    object-fit: cover;
                    overflow-clip-margin: content-box;
                    overflow: clip;
                    @media screen and (max-width: 700px) {
                        width: 80px;
                    }
                }
            }
        }
    }
}
</style>