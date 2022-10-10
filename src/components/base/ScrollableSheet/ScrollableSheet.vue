<!--
  a horizontal sheet that is scrollable
  please put ScrollableSheetItem in it
-->
<template>
  <div class="scrollable-container">
    <div class="scrollable-sheet">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrollable-container {
  width: 100%;
  max-width: 100%;
}

.scrollable-sheet {
  text-align: center;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>
