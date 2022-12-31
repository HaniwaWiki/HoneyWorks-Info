import { createPinia } from 'pinia';

// global stores are placed at /src/stores,
// while pages' stores are placed at /src/views/<page>/store.ts
const pinia = createPinia();
export default pinia;
