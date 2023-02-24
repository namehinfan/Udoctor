<script setup lang="ts">
// import router from '@/router';
import { useRouter } from 'vue-router';

interface Props {
  title?: string;
  rightText?: string;
  onBack?: () => void
}
interface Emits {
  (name: "click"): void;
}

const clickLeft = () => {
  if (prop.onBack) {
    return prop.onBack()
  }
  router.back()
}
const prop = defineProps<Props>();
const router = useRouter()
const emit = defineEmits<Emits>();
</script>

<template>
  <van-nav-bar left-arrow fixed placeholder :title="title" :right-text="rightText" @click-right="emit('click')"
    @click-left="clickLeft" />
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
    }
  }
}
</style>
