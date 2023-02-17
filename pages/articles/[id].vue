<template>
    <div>
        <h1>这是文章详情页 {{ $route.params.id }}</h1>
        <NuxtLink to="/">回首页</NuxtLink>
    </div>
</template>

<script setup>
const isIndex = useIsIndex();
isIndex.value = false;
</script>