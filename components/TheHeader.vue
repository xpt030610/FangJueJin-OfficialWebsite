<template>
    <div>
        <div class="header">
            <div class="main-header-box">
                <div class="container">
                    <a href="" class="icon">
                        <img src="~/assets/icon.png" alt="" />
                        稀土掘金
                    </a>
                    <div class="main-nav">
                        <div class="main-nav-list">
                            <ul>
                                <li v-for="v in mainRes" :key="v.id">
                                    {{ v.attributes.item }}
                                </li>
                            </ul>
                        </div>
                        <div class="right-side-nav">这边是用户信息</div>
                    </div>
                </div>
            </div>
            <div class="view-nav">
                <ul>
                    <li v-for="v in artRes" :key="v.id">
                        {{ v.attributes.item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
const { data: mainList } = await useFetch('http://localhost:1337/api/top-tabs');
const { data: artList } = await useFetch(
    'http://localhost:1337/api/article-tabs',
);
const mainRes = mainList.value.data;
const artRes = artList.value.data;
</script>

<style  lang="scss" scoped>
.header {
    height: 106px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    .main-header-box {
        height: 60px;
        border-bottom: 1px solid #eee;
        .container {
            display: flex;
            margin: auto;
            max-width: 1440px;
            height: 100%;
            .icon {
                display: inline-block;
                height: 32px;
                margin-right: 1rem;
                margin-left: 24px;
                width: auto;
                line-height: 60px;
                font-weight: 500;
                font-size: 20px;
                img {
                    height: 100%;
                    vertical-align: middle;
                }
            }
            .main-nav {
                display: flex;
                justify-content: space-between;
                height: 100%;
                flex: 1 0 auto;
                line-height: normal;
                .main-nav-list {
                    height: 100%;
                    // background-color: green;
                    ul {
                        display: flex;
                        li {
                            box-sizing: border-box;
                            line-height: 60px;
                            margin: 0 10px;
                            color: $header-color;
                        }
                        li:hover {
                            cursor: pointer;
                            border-bottom: 2px solid $theme-color;
                            color: $header-hover-color;
                        }
                    }
                }
                .right-side-nav {
                    height: 100%;
                    line-height: 60px;
                }
            }
        }
    }

    .view-nav {
        height: 46px;
        ul {
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
}
</style>