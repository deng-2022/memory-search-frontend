<template>
  <div class="hello">
    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>

    <a-input-search
        v-model:value="searchText"
        placeholder="请输入搜索关键词"
        enter-button="搜索"
        size="large"
        @search="onSearch"
    />
  </div>
</template>

<script lang="ts" setup></script>

