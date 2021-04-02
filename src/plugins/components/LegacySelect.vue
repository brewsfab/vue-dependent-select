<template>
  <div>
    <select @change="updateValue($event.target.value)" :name="name">
      <option :value="null">{{ nullString }}</option>
      <option v-for="option in options" :key="sortAndStringify(option)">
        {{ getOptionLabel(option) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    name: {
      type: String,
      default: "",
    },
    options: {
      type: [Array],
      default: () => [],
    },
    nullString: {
      type: String,
      default: "---",
    },
    label: {
      type: String,
      default: "label",
    },
  },
  methods: {
    sortAndStringify(sortable) {
      const ordered = {};

      Object.keys(sortable)
        .sort()
        .forEach((key) => {
          ordered[key] = sortable[key];
        });

      return JSON.stringify(ordered);
    },
    getOptionLabel(option) {
      if (typeof option === "object") {
        if (Object.prototype.hasOwnProperty.call(option, this.label)) {
          return option[this.label];
        }
      }
      return option;
    },
    updateValue: function (value) {
      let vh;
      if (value) {
        vh = this.options.find(
          (option) => this.getOptionLabel(option) === value
        );
        if (vh.skip) {
          vh = null;
        }
      } else {
        vh = null;
      }
      this.$emit("input", vh);
    },
  },
};
</script>