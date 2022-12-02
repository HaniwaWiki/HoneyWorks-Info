<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useSettingsStore } from '../../../stores/settings';
import { colors } from '../../../palette';

const settingsStore = useSettingsStore();
const inputColor = ref(settingsStore.primaryColor);
const inputColorValid = ref(true);

const inputColorRules = [
  (v: string) => {
    const isValid = /^#[A-Fa-f0-9]{6}$/.test(v);
    return isValid || 'Invalid color value';
  },
];

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
    <v-container>
      <v-row>
        <v-col
          v-for="color in colors"
          :key="color"
          :cols="1"
        >
          <v-item
            v-slot="{ selectedClass, toggle }"
            :value="color"
          >
            <div
              v-ripple
              class="preview-color elevation-2"
              :class="selectedClass"
              :style="{ backgroundColor: color }"
              @click="toggle"
            />
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>

  <div
    id="custom-color-input"
    class="d-flex align-center pt-2"
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
          :style="{ backgroundColor: inputColorValid ? inputColor : 'transparent' }"
        />
      </template>
      <template #append="{ isValid }">
        <v-btn
          :disabled="!isValid"
          color="primary"
          @click="setPrimaryColor(inputColor)"
        >
          Apply
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<style lang="scss" scoped>
.preview-color {
  height: 24px;
  width: 24px;
  margin: auto;
  padding: 0 8px;

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
