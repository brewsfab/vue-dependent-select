import { commonDirectiveTests } from "./commonSuiteImpl";
import ShadowedVSelect from "../../../components/ShadowedVSelect.vue";
import vSelect from "vue-select";

const stringOptions = ["A", "B", "C"];

const dictOptions = [
  { label: "A", id: 1 },
  { label: "B", id: 2 },
  { label: "C", id: 3 },
];

const simpleImplementation = {
  template: `
            <div>
    <shadowed-v-select name="1" :options="options" v-model="select1"></shadowed-v-select>
    <shadowed-v-select name="2" :options="options" v-model="select2" v-linked="{parent: select1}"></shadowed-v-select>
    <shadowed-v-select name="3" :options="options" v-model="select3" v-linked="{parent: select2, sibling: select4}" ></shadowed-v-select>
    <shadowed-v-select name="4" :options="options" v-model="select4" v-linked="{parent: select2, sibling: select3}" ></shadowed-v-select>
    <shadowed-v-select name="5" :options="options" v-model="select5" v-linked="{parent: [select3, select4]}"></shadowed-v-select>
            </div>
            `,
  components: {
    ShadowedVSelect,
  },
};

// Tests implementation
commonDirectiveTests(
  "ShadowedVSelect with string options",
  stringOptions,
  ShadowedVSelect,
  simpleImplementation,
  [{ name: "v-select", comp: vSelect }]
);

// Tests implementation
commonDirectiveTests(
  "ShadowedVSelect with dict options",
  dictOptions,
  ShadowedVSelect,
  simpleImplementation,
  [{ name: "v-select", comp: vSelect }]
);

const customLabelDictOptions = [
  { name: "A", id: 1 },
  { name: "B", id: 2 },
  { name: "C", id: 3 },
];
const customLabelOptionsImplementation = {
  template: `
            <div>
    <shadowed-v-select name="1" label="name" :options="options" v-model="select1"></shadowed-v-select>
    <shadowed-v-select name="2" label="name" :options="options" v-model="select2" v-linked="{parent: select1}"></shadowed-v-select>
    <shadowed-v-select name="3" label="name" :options="options" v-model="select3" v-linked="{parent: select2, sibling: select4}" ></shadowed-v-select>
    <shadowed-v-select name="4" label="name" :options="options" v-model="select4" v-linked="{parent: select2, sibling: select3}" ></shadowed-v-select>
    <shadowed-v-select name="5" label="name" :options="options" v-model="select5" v-linked="{parent: [select3, select4]}"></shadowed-v-select>
            </div>
            `,
  components: {
    ShadowedVSelect,
  },
};

// Tests implementation
commonDirectiveTests(
  "ShadowedVSelect with custom label dict options",
  customLabelDictOptions,
  ShadowedVSelect,
  customLabelOptionsImplementation,
  [{ name: "v-select", comp: vSelect }]
);
