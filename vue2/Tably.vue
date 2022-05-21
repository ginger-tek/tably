<script>
export default {
  props: {
    items: Array,
    fields: Array,
    filter: String,
    loading: Boolean
  },
  data: () => ({
    sortBy: '',
    sortDir: 1
  }),
  methods: {
    isSort(cn) {
      if (cn != this.sortBy) return null
      return ['sort', {
        asc: this.sortDir == 1,
        desc: this.sortDir == -1
      }]
    },
    tglSort(cn) {
      this.sortBy = cn
      this.sortDir *= -1
    }
  },
  computed: {
    rows() {
      if (!this.items) return []
      const f = this.filter?.toLowerCase()
      let arr = !f ? this.items : this.items.filter(i => {
        let is = Object.values(i).join(' ').toLowerCase()
        return is.indexOf(f) > -1
      })
      return arr.sort((a, b) => {
        if (a[this.sortBy] > b[this.sortBy]) return 1 * this.sortDir
        else if (a[this.sortBy] < b[this.sortBy]) return -1 * this.sortDir
        else return 0
      })
    },
    cols() {
      let cs = this.fields || Object.keys(this.items ? this.items[0] : {})
      return cs.map(c => ({
        n: c.name || c,
        l: c.label || (c.name || c).split(/_|-|(?=[A-Z])/).map(w => w[0].toUpperCase() + w.substring(1)).join(' '),
        a: c.align || false
      }))
    }
  }
}
</script>

<template>
  <div :class="['tably', loading]">
    <table class="tably-table">
      <thead>
        <tr>
          <th v-for="c in cols" :key="c.n" :class="isSort(c.n)" :style="{ 'text-align': (c.a ? 'right' : 'left') }"
            @click="tglSort(c.n)">{{
                c.l
            }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="props.loading">
          <td :colspan="cols.length">
            <slot name="loading">
              <div style="text-align:center">Loading...</div>
            </slot>
          </td>
        </tr>
        <tr v-for="(r, i) in rows" :key="i">
          <td v-for="c in cols" :key="c.n" :style="{ 'text-align': (c.a ? 'right' : 'left') }">
            <slot :name="c.n" :="r">{{ r[c.n] }}</slot>
          </td>
        </tr>
        <tr v-if="filter && rows.length == 0">
          <td :colspan="cols.length">
            <slot name="emptyFiltered">
              <div style="text-align:center">No items by that filter</div>
            </slot>
          </td>
        </tr>
        <tr v-else-if="!filter && rows.length == 0">
          <td :colspan="cols.length">
            <slot name="empty">
              <div style="text-align:center">No data</div>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.sort.asc::after {
  float: left;
  content: '\25B2';
}

.sort.desc::after {
  float: left;
  content: '\25BC';
}
</style>