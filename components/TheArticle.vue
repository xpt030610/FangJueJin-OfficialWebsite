<template>
    <div class="articles">
        <div class="article-bar">
            <ul>
                <li :class="[1 === activeIndex ? 'active' : '']" @click="changeNav(1)">推荐</li>
                <li :class="[2 === activeIndex ? 'active' : '']" @click="changeNav(2)">最新</li>
                <li :class="[3 === activeIndex ? 'active' : '']" @click="changeNav(3)">热榜</li>
            </ul>
        </div>
        <ul class="article">
            <!-- <RecycleScroller
                :items="itemArray"
                :item-size="132"
                style="height: 2640px"
            > -->
            <li v-for="art in artRes" :key="art.id">
                <nuxt-link :to="`/articles/${art.id}`">
                    <div class="meta-container">
                        <div class="artist">
                            <!-- 作者 -->
                            {{ art.attributes.artist }}
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
                            :src="`http://localhost:1337${art.attributes.cover.data.attributes.url}`"
                            :alt="art.attributes.title"
                            loading:lazy
                        />
                    </div>
                </nuxt-link>
            </li>
            <!-- </RecycleScroller> -->
        </ul>
    </div>
</template>
<script>
// import { RecycleScroller } from 'vue-virtual-scroller';

// export default {
//     components: {
//         RecycleScroller,
//     },
// };
// export const useArtList = () => useState('artList', () => await useFetch(
//   'http://localhost:1337/api/articles?populate=*',
// ));
</script>

<script setup>
import { useIsLabel } from '@/composables/states'
import { watch } from 'vue'
// 文章渲染列表
const artRes = ref({});
const { data: artList } = await useFetch(
    'http://localhost:1337/api/articles?populate=*',
);
artRes.value = artList.value.data;

let activeIndex = ref(1);
const changeNav = (id) => {
    activeIndex.value = id
    triggerRef(activeIndex)
};

//计算时间相差函数
const dateCount = (artdate) => {
    var now = new Date();
    var date = new Date(artdate);
    //计算时间间隔，单位为分钟
    var inter = parseInt((now.getTime() - date.getTime()) / 1000 / 60);
    if (inter <= 1) {
        return '刚刚';
    }
    //多少分钟前
    else if (inter < 60) {
        return inter.toString() + '分钟前';
    }
    //多少小时前
    else if (inter < 60 * 24) {
        return parseInt(inter / 60).toString() + '小时前';
    }
    //多少天前
    else if (inter < 60 * 24 * 30) {
        return parseInt(inter / (60 * 24)).toString() + '天前';
    }
    //多少月前
    else if (inter < 60 * 24 * 30 * 12) {
        return parseInt(inter / (60 * 24 * 12)).toString() + '个月前';
    }
    //太久远的就： 年月日时分
    else {
        return (
            date.getFullYear().toString() +
            '-' +
            (date.getMonth() + 1).toString() +
            '-' +
            date.getDate().toString() +
            ' ' +
            date.getHours() +
            ':' +
            (date.getMinutes() < 10
                ? '0' + date.getMinutes()
                : date.getMinutes())
        );
    }
};

//把markdown文章改成正常格式
const artCount = (art) => {
    const result = art.replace(
        /(\*{1,2}|_{1,2}|`{1,3}|#{1,6}\s+|!?\[.*?\]\(.*?\)|<.*?>|^\s*\d+\.\s+|\[|\]|\s+)/gm,
        '',
    );
    return result;
};
//根据标签内容筛选相应文章

const isLabel = useIsLabel();
watch(isLabel, async (newVal, oldVal) => {
    if (newVal != 1) {
        const { data: artList } = await useFetch(
            `http://localhost:1337/api/articles?populate=*&filters[article_tabs][id]=${newVal}`,
        );
        artRes.value = artList.value.data;
    } else {
        const { data: artList } = await useFetch(
            'http://localhost:1337/api/articles?populate=*',
        );
        artRes.value = artList.value.data;
    }
});
</script>

<style lang="scss" scoped>
.articles {
    width: 700px;
    background-color: #fff;
    .article-bar {
        height: 46px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        ul {
            display: flex;
            padding: 0 10px;
            li {
                margin: 16px 0;
                font-size: 14px;
                padding: 0 15px;
                color: $header-color;

                &:nth-child(1),
                &:nth-child(2) {
                    border-right: 1px solid $border-line;
                }
                &:hover {
                    cursor: pointer;
                    color: $theme-color;
                }
            }
            .active {
                color: $theme-color;
            }
        }
    }
    .article {
        li {
            box-sizing: content-box;
            height: 120px;
            position: relative;
            padding: 12px 20px 0;
            .meta-container {
                display: flex;
                height: 22px;
                font-size: 13px;
                color: $header-color;
                .artist,
                .date,
                .article-tab {
                    cursor: pointer;
                    margin: 5px 0;
                    padding: 0 10px;
                    border-right: 1px solid $border-line;
                }
                .artist {
                    padding-left: 0px;
                    color: $header-hover-color;
                    &:hover {
                        color: $theme-color;
                    }
                }
                .article-tab {
                    padding: 0;
                    border: 0;
                    display: flex;
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
                border-bottom: 1px solid $border-line;
                .content-main {
                    width: 516px;
                    margin-top: 8px;
                    .article-title {
                        font-style: 24px;
                        font-weight: 800;
                        margin-bottom: 8px;
                        color: #1d2129;
                    }
                    .article-text {
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
                }
            }
        }
    }
}
</style>