<template>
    <div class="header">
        <div class="main-header-box">
            <div class="container">
                <NuxtLink to="/" class="icon">
                    <img src="~/assets/icon.png" alt="" />
                    稀土掘金
                </NuxtLink>
                <div class="main-nav">
                    <div class="main-nav-list">
                        <ul>
                            <nuxt-link to="/">
                                <li :class="{ active: isIndex }">首页</li>
                            </nuxt-link>
                            <li v-for="v in mainRes" :key="v.id">
                                {{ v.attributes.item }}
                            </li>
                        </ul>
                    </div>
                    <div class="right-side-nav">这边是用户信息</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
//渲染列表
const { data: mainList } = await useFetch('http://localhost:1337/api/top-tabs');

const mainRes = mainList.value.data;
//设置初始为“首页”
const isIndex = useIsIndex();
isIndex.value = true;
</script>

<style  lang="scss" scoped>
.header {
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    z-index: 2;
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
                    ul {
                        display: flex;
                        li {
                            box-sizing: border-box;
                            line-height: 60px;
                            margin: 0 10px;
                            color: $header-color;
                            &:hover {
                                cursor: pointer;
                                border-bottom: 2px solid $theme-color;
                                color: $header-hover-color;
                            }
                        }
                        .active {
                            color: $theme-color;
                            &:hover {
                                color: $theme-color;
                            }
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
}
</style>