<template>
    <div class="container">
        <div class="view-container">
            <div class="articles">
                <div class="article-bar">
                    <ul>
                        <li>推荐</li>
                        <li>最新</li>
                        <li>热榜</li>
                    </ul>
                </div>
                <ul class="article">
                    <li>
                        <div class="meta-container">
                            <div class="artist">Hsiao</div>
                            <div class="date">2月前</div>
                            <ul class="article-tab">
                                <li>前端</li>
                                <li>js</li>
                                <li>html</li>
                            </ul>
                        </div>
                        <div class="content-wrapper">
                            <div class="content-main">
                                <div class="article-title">我是标题</div>
                                <div class="article-text">
                                    我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本我是文本
                                </div>
                            </div>
                            <img src="~/assets/simple.png" alt="" />
                        </div>
                    </li>
                </ul>
            </div>
            <aside class="index-aside">sas</aside>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    position: relative;
    display: flex;
    justify-content: center;
    .view-container {
        position: absolute;
        display: flex;
        justify-content: space-between;
        top: 20px;
        width: 960px;

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
                }
            }
            .article {
                li {
                    height: 120px;
                    position: relative;
                    padding: 12px 20px 0;
                    border-bottom: 1px solid $border-line;
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
                }
            }
        }
        .index-aside {
            width: 240px;
            background-color: blue;
        }
    }
}
</style>