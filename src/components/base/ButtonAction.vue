<script setup lang='ts'>
/*
  This is a button with action.
  When onClick function is executing, the button shows as 'loading'.
  When onClick function finishes or throws error , the button shows as 'success' or 'fail',
  and will be reset to default status after 1 seconds (by default).
 */
import { reactive, ref, watchEffect } from 'vue';
import { useElementSize } from '@vueuse/core';
import sleep from '@/utils/time';
import type { ButtonSize } from '@/types/vuetify/button';

type Props = {
  disabled?: boolean;
  color?: string;
  size?: ButtonSize;
  // Vue can't listen on emitted function, so we use pass function as params
  onClick?: () => void | Promise<void>;
  // time to show success or fail status, default to 2000
  showResultTime?: number;
};
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  color: 'primary',
  size: 'default',
  onClick: undefined,
  showResultTime: 1000,
});

type Status = 'default' | 'loading' | 'success' | 'error';
const status = ref<Status>('default');
const buttonRef = ref();
const buttonWidthAtDefault = ref(0);
const buttonStyle = reactive({ width: '' });

async function onClick() {
  if (props.disabled || status.value !== 'default')
    return;

  status.value = 'loading';
  try {
    const result = props.onClick?.();
    if (result instanceof Promise)
      await result;
    status.value = 'success';
  }
  catch (e) {
    status.value = 'error';
    throw e;
  }
  finally {
    await sleep(props.showResultTime);
    status.value = 'default';
  }
}

const buttonWidth = useElementSize(
  buttonRef,
  { width: 0, height: 0 },
  { box: 'border-box' },
).width;

// to keep button's width consistency
// when status is default, we save current button's width
// when status is success or error, we set button's width to that value
watchEffect(() => {
  if (status.value === 'default')
    buttonWidthAtDefault.value = buttonWidth.value;
  if (['success', 'error'].includes(status.value))
    buttonStyle.width = `${buttonWidthAtDefault.value}px`;

  else
    buttonStyle.width = '';
});
</script>

<template>
  <v-btn
    ref="buttonRef"
    :disabled="disabled"
    :loading="status === 'loading'"
    :color="color"
    :size="size"
    :style="buttonStyle"
    @click="onClick"
  >
    <v-icon v-if="status === 'success'" class="mr-1">
      mdi-check
    </v-icon>
    <v-icon v-else-if="status === 'error'" class="mr-1">
      mdi-close
    </v-icon>
    <slot v-else />
  </v-btn>
</template>
