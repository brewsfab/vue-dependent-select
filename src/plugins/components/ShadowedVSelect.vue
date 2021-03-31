<template>
<div>
    <!-- <p>Selected v-select: {{selected || "null"}}</p> -->
    <v-select @input="hasChanged" :disabled="disabled" v-model="selected" :name="name" :placeholder="nullString" :options="options"></v-select>
    <select hidden @change="hasChanged" :disabled="disabled" :name="name" :ref="refname" v-model="selected">
        <option :value="null">{{nullString}}</option>
            <option v-for="option in options" :key="sortAndStringify(option)">{{getOptionLabel(option)}}</option>
    </select>
    </div>
</template>

<script>
export default {
    name: "ShadowSelect",
    props:{
        options: {
        type: Array,
        default: () => [],
        },
        name:{
            type:String,
            default: ''
        },
        label: {
	type: String,
	default: "label"
},
    nullString: {
      type: String,
      default: "---",
    },
    },
    data(){
        return {
            selected:null,
            disabled: false,
        }
    },
    computed:{
        refname(){
            return 'shadow_'+this.name
        },
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
    methods:{
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
        hasChanged(e){
            //Update the disabled status after every change
            this.disabled = this.$refs[this.refname].disabled

            let vh = null

            let value = null

            //The changed value could be either from legacy select or v-select
            // e.target.value exist if legacy
            // direct value if v-select thus e = null when reset
            if(e){
                value = e.target ? e.target.value : this.getOptionLabel(e)
            }

            if(value){
                vh = this.options.find(option => this.getOptionLabel(option)===value)

                if(vh.skip){
                    vh = null
                }
            }

            //Emit the changed value
            this.$emit('input', vh)//this.selected)
        }
    }

}
</script>