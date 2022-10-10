# HoneyWorks Info

## Develop

### Vue 3 Composition API Conventions

#### setup function order

1. props definition
2. page options (e.g. `useRoute()`, `useDisplay()`, ...)
3. user options (ref definition, e.g. `const showEvolved = ref(false);`)
4. fetch, filter and paginate data (if need)
5. watches (if need)
6. function parsing from fetched data to data displayed on page, and (e.g. `relatedResources`)
