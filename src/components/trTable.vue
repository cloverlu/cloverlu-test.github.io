<script>
const MIN_NO = 1;

function ismoment() {
  throw new Error("moment 时间库没有吧");
}
export default {
  name: "TrTable",
  props: {
    columns: Array,
    data: Array,
    filterWidth: Number,
    selection: Boolean,
    selectionWidth: Number,
    isActionColumn: {
      type: Boolean,
      default: true
    },
    // 是否有操作项
    option: {
      type: Boolean,
      default: true
    },
    empty: {
      type: String,
      default: () => "--"
    }
  },
  data() {
    return {
      checkList: this.columns.filter(v => !v.unchecked).map(v => v.label)
    };
  },
  watch: {
    columns: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.checkList = newVal.filter(v => !v.unchecked).map(v => v.label);
          this.min = MIN_NO + newVal.filter(d => d.hidden).length;
        }
      }
    }
  },
  render(h) {
    const columns = this.columns.filter(v => this.checkList.includes(v.label));
    return (
      <el-table
        data={this.data}
        tooltip-effect="light"
        stripe
        border={true}
        on-selection-change={val => this.selectionValue(val)}
      >
        {this.selection ? (
          <el-table-column
            type="selection"
            fixed
            width={this.selectionWidth || 55}
            key={new Date().getTime()}
          ></el-table-column>
        ) : (
          <el-table-column key={new Date().getTime()} fixed type="index" />
        )}
        {columns.map((column, index) => (
          <el-table-column
            key={column.label + "_" + index}
            label={column.label}
            show-overflow-tooltip={true}
            fixed={column.fixed}
            className={column.className}
            width={column.width}
            scopedSlots={{
              header: (a, b) => {
                let column = a.column || b.column;
                let l = column.label.length;
                let f = 16;
                column.minWidth = f * l + 30;
                return h("span", [column.label]);
              },
              default: _value => {
                const row = _value.row;
                const prop = column.prop;
                const value = row[prop];
                const { isEmpty, compose, formatAt, getlabel } = this;
                let data = Object.assign(
                  {},
                  column.formatter && column.formatter(prop, row)
                );

                if (column.options) {
                  const fn = compose(
                    getlabel.bind(null, column.options),
                    isEmpty
                  );
                  data = fn(value);
                  data = { ...data, label: isEmpty(data.label) };
                }

                if (column.type === "time") {
                  const fn = compose(
                    formatAt.bind(null, this.$moment),
                    isEmpty
                  );
                  data.label = fn(value);
                }
                const defaultpl = (
                  <span
                    on-click={() =>
                      column.handleClick && column.handleClick(row)
                    }
                    class={data.class || ""}
                    style={{ color: data.color }}
                  >
                    {data.label || value}
                  </span>
                );
                const othertpl = (
                  <div>
                    {this.$scopedSlots[column.prop] &&
                      this.$scopedSlots[column.prop](_value)}
                  </div>
                );
                return this.$scopedSlots[column.prop] ? othertpl : defaultpl;
              }
            }}
          />
        ))}

        {this.isActionColumn ? (
          <el-table-column
            label="操作"
            width={!this.$scopedSlots.default ? 30 : this.filterWidth || 150}
            fixed="right"
            scopedSlots={{
              default: value => {
                return (
                  <div>
                    {this.$scopedSlots.default &&
                      this.$scopedSlots.default(value)}
                  </div>
                );
              },
              header: () => {
                let filteredValue = this.columns
                  .map(v => !v.hidden && v.label)
                  .filter(d => d);
                return (
                  <div class="filter">
                    {this.$scopedSlots.default ? <span>操作</span> : null}
                    <el-popover trigger="click" popper-class="m-filter">
                      <el-checkbox-group value={this.checkList} min={this.min}>
                        {filteredValue.map(v => (
                          <el-checkbox
                            on-change={d => {
                              this.updateCheckList(v, d);
                            }}
                            label={v}
                          />
                        ))}
                      </el-checkbox-group>
                      <el-tooltip
                        effect="light"
                        content="自定义列表项"
                        placement="top-start"
                        slot="reference"
                      >
                        <el-button class="icon">
                          <i class="iconfont icon-shezhi" />
                        </el-button>
                      </el-tooltip>
                    </el-popover>
                  </div>
                );
              }
            }}
          />
        ) : null}
      </el-table>
    );
  },
  methods: {
    updateCheckList(list, flag) {
      if (flag && !this.checkList.includes(list)) {
        this.checkList.push(list);
      } else {
        this.checkList = this.checkList.filter(d => d !== list);
      }
    },
    selectionValue(val) {
      this.$emit("selection-change", val);
    },
    isEmpty(value) {
      return value || value === 0 ? value : this.empty;
    },
    formatAt(moment = ismoment(), value) {
      return value === this.empty
        ? value
        : moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    formatArr(value) {
      return value === this.empty
        ? value
        : [
            this.$moment(value).format("YYYY-MM-DD"),
            this.$moment(value).format("HH:mm:ss")
          ];
    },
    getlabel(data, value) {
      if (value === this.empty) return this.empty;
      return data.find(v => v.value === value) || {};
    },
    compose(...funcs) {
      if (funcs.length === 0) {
        return arg => arg;
      }
      if (funcs.length === 1) {
        return funcs[0];
      }
      return funcs.reduce((a, b) => (...args) => a(b(...args)));
    },
    labelHead(h, { column }) {
      let l = column.label.length;
      let f = 16;
      column.minWidth = f * l + 30;
      return h("span", [column.label]);
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-table--border
  margin-top: 15px;
  border 0
  &:after
  &:before
    width 0
    height 0
  >>>
    th
      height 30px
      line-height @height
      font-size: 14px
      z-index 1
      overflow: visible
      border-right: 0
      color #444444
      background #edeef4
      padding 0
      font-weight normal
      border-bottom 1px solid #cbccd2 !important
      border-right 1px solid rgba(203, 204, 210, .68)
      box-sizing border-box
    td
      border-right 0
      padding: 4px 0
      font-size 12px
      border-bottom: 1px solid #ebeef5;
      .el-checkbox__input
        line-height: 12px !important
      .el-checkbox__inner
        height 14px !important
        line-height: 12px !important

.m-filter
  max-height 355px
  overflow auto
  .el-checkbox
    display block
    line-height: 23px
    &+.el-checkbox
      margin-left 0
      font-size: 12px
    .el-checkbox__label
      font-size: 12px
.popover-operation
  min-width 80px
.filter
  width 100%
  line-height 14px
  div
    line-height 20px
  .icon
    position absolute
    right 5px
    top 0
    cursor pointer
    width 20px
    height @width
    padding 0
    margin 0
    vertical-align middle
    i
      font-size 12px
    &:active
    &:focus
      background:#1f60bd
      color #fff
</style>
