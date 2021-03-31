<template>
  <div>
    <select @change="updateValue($event.target.value)" :name="name">
      <option :value="null">{{ nullString }}</option>
      <option
        v-for="option in options"
        :key="sortAndStringify(option)"
      >
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
  data() {
    return {
      // selected: null,
    };
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
    getOptionLabel(option){
        if(typeof option === 'object'){
            if (Object.prototype.hasOwnProperty.call(option, this.label)){
                return option[this.label]
            }
        }
        return option
    },
    updateValue: function (value) {
      // console.log(v.target.value)
      // const value = v.target.value ? v.target.value : null;
      let vh
      if(value){
        vh = this.options.find(option => this.getOptionLabel(option)===value)
                if(vh.skip){
                    vh = null
                }
      }else{
        vh = null
      }
      this.$emit("input", vh);
      // if(value){
      //   this.$emit('option:selected',value)
      // }else{
      //   this.$emit('option:deselected')
      // }
    },
  },
  computed: {
    // alteredOptions: function () {
    //   // Assuming the provided options are always arrays
    //   if (typeof this.options[0] === "object") {
    //     //verify the first option has the key label
    //     if (!this.options[0][this.label]) {
    //       return [];
    //     } else {
    //       return this.options
    //                 // debugger; // eslint-disable-line no-debugger
    //     }
    //   } else {
    //     //Assume it is a string or number
    //     return this.options.map((e) => {
    //       return {
    //         [this.label]: e,
    //       };
    //     }); //Force to string in case of int
    //     // debugger; // eslint-disable-line no-debugger
    //   }
    // },
  },
};
</script>