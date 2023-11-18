<template>
  <a-list
      item-layout="horizontal"
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :data-source="props.pictureList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable class="pictureList">
          <!--图片-->
          <template #cover>
            <img :src="item.url"/>
          </template>
          <!--标题-->
          <a-card-meta :title="item.title"/>
          <!--下载-->
          <div>
            <a-button @click="showModal(item.title)" type="primary" shape="round">
              <template #icon>
                <DownloadOutlined/>
                Download
              </template>
            </a-button>
            <a-modal v-model:visible="visible[item.title]" title="图片链接" @ok="handleOk(item.title)">
              <p>{{ item.url }}</p>
            </a-modal>
          </div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import {withDefaults, defineProps, ref} from "vue";
import {
  DownloadOutlined
} from '@ant-design/icons-vue';

// 点击弹窗
const visible = ref({})

const showModal = (id: any) => {
  visible.value[id] = true;
};

const handleOk = (id: any) => {
  visible.value[id] = false;
};

interface Props {
  pictureList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  pictureList: () => [],
});
</script>

<style>
.pictureList {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

</style>
