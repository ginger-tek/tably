<template>
  <div :class="['tably',{loading: loading}]">
    <table>
      <thead>
        <tr>
          <th v-for="c in cols" :key="c.name" :class="{num:c.num}">{{ c.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r,i) in rows" :key="i">
          <td v-for="c in cols" :key="c.name" :class="{num:c.num}">
            <slot :name="c.name" :data="r">{{ r[c.name] }}</slot>
          </td>
        </tr>
        <tr v-if="filter && rows.length == 0">
          <td :colspan="cols.length">
            <slot name="filteredEmpty">No filtered results</slot>
          </td>
        </tr>
        <tr v-else-if="!filter && rows.length == 0">
          <td :colspan="cols.length">
            <slot name="noData">No data</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    fields: Array,
    filter: String,
    loading: Boolean
  },
  methods: {
    wordize(s) {
      if(s.name) s = s.name
      return s.split(/-|_|(?=[A-Z])/).map(w=>w[0].toUpperCase() + w.substring(1)).join(' ')
    }
  },
  computed: {
    cols() {
      let keys = []
      if(this.fields) keys = this.fields
      else if(this.items && this.items[0]) keys = Object.keys(this.items[0])
      return keys.map(k=>({
        name: (k.name || k),
        label: (k.label || this.wordize(k)),
        num: (k.num || false)
      }))
    },
    rows() {
      if(!this.filter) return this.items
      else {
        let f = this.filter.toLowerCase()
        return this.items.filter(i=>{
          let iStr = Object.values(i).join('|').toLowerCase()
          return iStr.indexOf(f) > -1
        })
      }
    }
  }
}
</script>

<style scoped>
  .tably {
    overflow: auto;
  }
  table {
    border-collapse: collapse;
  }
  th, td {
    padding: 5px 10px;
  }
  th {
    text-align: left;
    border-bottom: 1px solid;
  }
  td {
    border-bottom: 1px solid lightgray;
  }
  .num {
    text-align: right;
  }
</style>
