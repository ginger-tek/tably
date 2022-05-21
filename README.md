# tably
Simple VueJS data table component to use directly in a Vite/VueCLI project. Renders out a standard HTML5 `<table>` element, with automatic column parsing, filtering, and sorting.

Styling is up to implementation, allowing usage across UI frameworks like Bootstrap and Tailwind. The component provides the `.tably` and `.tably-table` classes, for styling the respective wrapper `<div>` and `<table>` elements.

---

## Versions
Separate Vue 2.x and Vue 3.x versions

---

## Props
- `items` : Array of objects to render for each row
- `fields` : Array of specified columns to show. Supports strings and objects (see example)
- `filter` : String by which to filter rows
- `loading` : Boolean switch to show a loading indicator row

---

## Examples

### Basic
```
<tably :items="data" />
```

### Filter
```
<input v-model="filter" placeholder="Quick filter" />
<tably :items="data" :filter="filter" />
```

### Fields
```
fields = [
  'column1',
  'column2',
  { name:'column3', label:'New Label' },
  { name:'column4', align:'right' }
]
...
<tably :items="data" :fields="fields" />
```

### Loading
```
isLoading = true|false
...
<tably :items="data" :loading="isLoading" />
```