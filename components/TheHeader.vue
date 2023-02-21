<template>
    <div class="header">
        <div class="main-header-box">
            <div class="container">
                <NuxtLink to="/" class="icon">
                    <img src="~/assets/image/icon.png" alt="" />
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
                    <div class="right-side-nav">
                        <img
                            src="~/assets/image/moon.png"
                            @click="changeTheme()"
                            class="moonIcon"
                            v-if="!isSun"
                        />
                        <img
                            src="~/assets/image/sun.png"
                            @click="changeTheme()"
                            class="sunIcon"
                            v-if="isSun"
                        />
                    </div>
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
<script>
export default {
    data() {
        return {
            isSun: true,
            theme: 1,
        };
    },
    methods: {
        changeTheme() {
            this.isSun = !this.isSun;
            if (this.theme == 1) {
                this.theme = 2;
                document.documentElement.setAttribute('data-theme', 'theme2');
            } else if (this.theme == 2) {
                this.theme = 1;
                document.documentElement.setAttribute('data-theme', 'theme');
            }
        },
    },
};
</script>
<style  lang="scss" scoped>
.header {
    border-bottom: 1px solid;
    z-index: 2;
    @include bg_color();
    @include font_color();
    @include border_color();
    .main-header-box {
        height: 60px;
        .container {
            display: flex;
            margin: auto;
            max-width: 1440px;
            height: 100%;
            .icon {
                display: flex;
                align-items: center;
                height: 60px;
                margin-right: 1rem;
                margin-left: 24px;
                width: auto;
                line-height: 60px;
                font-weight: 500;
                font-size: 20px;
                img {
                    height: 70%;
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
                            height: 60px;
                            line-height: 60px;
                            margin: 0 10px;
                            @include font_sub_color();
                            &:hover {
                                cursor: pointer;
                                border-top: 3px solid $theme-color;
                                @include font_color();
                            }
                            &.active {
                                color: $theme-color;
                                &:hover {
                                    @include font_color();
                                }
                            }
                        }
                    }
                }
                .right-side-nav {
                    height: 100%;
                    line-height: 60px;
                    img {
                        position: absolute;
                        width: 30px;
                        height: 30px;
                        margin: 15px 0;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
</style>