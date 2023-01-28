# tably
Simple Vue.js data table component to use in a project or directly in the browser. Renders out a standard HTML5 `<table>` element, with overflow wrapper, automatic column parsing, filtering, and sorting.

Styling is up to implementation, allowing usage across UI frameworks like Bootstrap and Tailwind. You can pass a string of classes to the `<table>` element itself via the `styles` prop.

The component also provides the `.tably` and `.tably-table` classes, for styling the respective wrapper `<div>` and `<table>` elements via CSS.

---

## Props
- `items` : Array of objects to render for each row
- `fields` : Array of specified columns to show. Supports strings and objects (see example)
- `filter` : String by which to filter rows
- `loading` : Boolean switch to show a loading indicator row
- `styles` : String of CSS class names to style the `<table>` element

---

## Examples

### Basic
```html
<tably :items="data" />
```

### Filter
```html
<input v-model="filter" placeholder="Quick filter" />
<tably :items="data" :filter="filter" />
```

### Fields
```js
fields = [
  'column1',
  'column2',
  { name:'column3', label:'New Label' },
  { name:'column4', align:'right' }
]
```
```html
<tably :items="data" :fields="fields" />
```

### Field Templates
You can customize the rendering of any field's column in the table by inserting a `<template>` element, and using the dynamic prop naming syntax in Vue (`#` is the shorthand) to bind each row's data to that template. You can even destructure the data bind for only the poperties of the row you need.

```html
<tably :items="data" :fields="fields">
  <template #fieldName="row">
    {{ row.someProperty }}
  </template>
  <template #fieldName="{ someId, someProperty }">
    <a :href="'/path/to/thing/' + someId">{{ someProperty }}</a>
  </template>
  <template #someUTCDateField="{ someUTCDateProperty }">
    {{ new Date(someUTCDateProperty).toLocaleString() }}
  </template>
  <template #someCurrencyField="{ someCurrencyProperty }">
    {{ formatAsMoney(someCurrencyProperty) }}
  </template>
</tably>
```

### Loading
```js
isLoading = true
```
```html
<tably :items="data" :loading="isLoading" />
```

### Styling
Example using Bootstrap's `table-bordered` utility class
```html
<tably :items="data" styles="table-bordered" />
```
This will apply the class to the `<table>` element only
```html
<div class="tably">
  <table class="tably-table table-bordered">
  ...
</div>
```
You can pass in any number of classes