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

#### split files into modules

1. if the source code of file is more than 200 lines, it's recommend to split into multiple files.
2. Also, if one part of a file work separately with other parts, or with little data to share, it's also recommend to split into multiple files.
3. When considering splitting a part of code,
  a. if the code is re-usable for other pages, it's recommend to put the code into upper code folder ([`components`](/src/components), [`composables`](/src/composables), [`utils`](/src/utils)).
  b. if the code is only needed in current page, it's recommend to put the code to internal folder, [CharacterCardDetail.vue](/src/views/Info/CharacterCards/CharacterCardDetail/CharacterCardDetail.vue)
    is an example.