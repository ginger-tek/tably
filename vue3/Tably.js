const { reactive, computed } = Vue

const template = `<div :class="['tably', loading]" style="overflow:auto">
  <table :class="['tably-table', props.styles]">
    <thead>
      <tr>
        <th v-for="c in cols" :key="c.n" :class="isSort(c.n)" :style="{ 'text-align': (c.a ? 'right' : 'left') }"
          @click="tglSort(c.n)">{{
              c.l
          }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(r, i) in rows" :key="i">
        <td v-for="c in cols" :key="c.n" :style="{ 'text-align': (c.a ? 'right' : 'left') }">
          <slot :name="c.n.toLowerCase()" :="r">{{ r[c.n] }}</slot>
        </td>
      </tr>
      <tr v-if="props.loading">
        <td :colspan="cols.length">
          <slot name="loading">
            <div style="text-align:center">Loading...</div>
          </slot>
        </td>
      </tr>
      <tr v-else-if="props.filter && rows.length == 0">
        <td :colspan="cols.length">
          <slot name="emptyFiltered">
            <div style="text-align:center">No items by that filter</div>
          </slot>
        </td>
      </tr>
      <tr v-else-if="!props.filter && rows.length == 0">
        <td :colspan="cols.length">
          <slot name="empty">
            <div style="text-align:center">No data</div>
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</div>`

export default {
  template,
  props: {
    items: Array,
    fields: Array,
    filter: String,
    loading: Boolean,
    styles: String
  },
  setup(props) {
    const data = reactive({ sortBy: '', sortDir: 1 })

    const rows = computed(() => {
      if (!props.items) return []
      const f = props.filter?.toLowerCase()
      let arr = !f ? props.items : props.items.filter(i => {
        let is = Object.values(i).join(' ').toLowerCase()
        return is.indexOf(f) > -1
      })
      return arr.sort((a, b) => {
        if (a[data.sortBy] > b[data.sortBy]) return 1 * data.sortDir
        else if (a[data.sortBy] < b[data.sortBy]) return -1 * data.sortDir
        else return 0
      })
    })

    const cols = computed(() => {
      let cs = props.fields || Object.keys(props.items?.length > 0 ? props.items[0] : {})
      return cs.map(c => ({
        n: c.name || c,
        l: c.label || (c.name || c).split(/_|-|(?=[A-Z])/).map(w => w[0].toUpperCase() + w.substring(1)).join(' '),
        a: c.align || false
      }))
    })

    function isSort(cn) {
      if (cn != data.sortBy) return null
      return ['sort', {
        asc: data.sortDir == 1,
        desc: data.sortDir == -1
      }]
    }

    function tglSort(cn) {
      data.sortBy = cn
      data.sortDir *= -1
    }

    return { data, props, cols, rows, isSort, tglSort }
  }
}