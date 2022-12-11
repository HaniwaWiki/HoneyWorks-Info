<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '../../../stores/settings';
import { colors } from '../../../palette';

const settingsStore = useSettingsStore();
const inputColor = ref(settingsStore.primaryColor);
const { t } = useI18n();

const inputColorRules = [
  (v: string) => {
    const isValid = /^#[A-Fa-f0-9]{6}$/.test(v);
    return isValid || t('settings.invalid_color_value');
  },
];
const inputColorIsValid = computed(() => inputColorRules.every(rule => rule(inputColor.value) === true));

function setPrimaryColor(val: string) {
  inputColor.value = val;
  settingsStore.setPrimaryColor(val);
}
</script>

<template>
  <span>
    <v-icon size="small" icon="mdi-palette" class="mr-1" />
    <span v-t="'settings.color'" />
  </span>

  <v-item-group
    :model-value="settingsStore.primaryColor"
    selected-class="preview-color-selected"
    mandatory
    @update:model-value="(val: string) => setPrimaryColor(val)"
  >
    <div class="mt-2 d-flex justify-start flex-wrap">
      <v-item
        v-for="color in colors"
        :key="color"
        v-slot="{ selectedClass, toggle }"
        :value="color"
      >
        <div
          class="preview-color ma-1 elevation-2 flex-shrink-0"
          :class="selectedClass"
          :style="{ backgroundColor: color }"
          @click="toggle"
        />
      </v-item>
    </div>
  </v-item-group>

  <div
    id="custom-color-input"
    class="d-flex align-center mt-4"
  >
    <v-text-field
      v-model="inputColor"
      :rules="inputColorRules"
      :counter="7"
      :label="$t('settings.custom_color')"
      variant="solo"
      density="comfortable"
    >
      <template #append-inner>
        <div
          class="preview-color"
          :style="{ backgroundColor: inputColorIsValid ? inputColor : 'transparent' }"
        />
      </template>
      <template #append>
        <v-btn
          :disabled="!inputColorIsValid"
          color="primary"
          @click="setPrimaryColor(inputColor)"
        >
          {{ $t('settings.apply_color') }}
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<style lang="scss" scoped>
.preview-color {
  height: 24px;
  width: 24px;
  padding: 0;

  &-selected {
    border: 2px solid #fff;
  }
}

#custom-color-input :deep(.v-input__append), :deep(.v-field__append-inner) {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
