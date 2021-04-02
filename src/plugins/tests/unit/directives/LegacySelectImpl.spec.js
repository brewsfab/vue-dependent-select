import { commonDirectiveTests } from "./commonSuiteImpl.js";
import LegacySelect from "../../../components/LegacySelect.vue";

const stringOptions = ["A", "B", "C"];

const dictOptions = [
  { label: "A", id: 1 },
  { label: "B", id: 2 },
  { label: "C", id: 3 },
];

const simpleImplementation = {
  template: `
            <div>
    <legacy-select :options="options" v-model="select1"></legacy-select>
    <legacy-select :options="options" v-model="select2" v-linked="{parent: select1}"></legacy-select>
    <legacy-select :options="options" v-model="select3" v-linked="{parent: select2, sibling: select4}" ></legacy-select>
    <legacy-select :options="options" v-model="select4" v-linked="{parent: select2, sibling: select3}" ></legacy-select>
    <legacy-select :options="options" v-model="select5" v-linked="{parent: [select3, select4]}"></legacy-select>
            </div>
            `,
  components: {
    LegacySelect,
  },
};

// Tests implementation
commonDirectiveTests(
  "LegacySelect with string options",
  stringOptions,
  LegacySelect,
  simpleImplementation
);

// Tests implementation
commonDirectiveTests(
  "LegacySelect with dict options",
  dictOptions,
  LegacySelect,
  simpleImplementation
);

const customLabelDictOptions = [
  { name: "A", id: 1 },
  { name: "B", id: 2 },
  { name: "C", id: 3 },
];
const customLabelOptionsImplementation = {
  template: `
            <div>
    <legacy-select :options="options" label="name" v-model="select1"></legacy-select>
    <legacy-select :options="options" label="name" v-model="select2" v-linked="{parent: select1}"></legacy-select>
    <legacy-select :options="options" label="name" v-model="select3" v-linked="{parent: select2, sibling: select4}" ></legacy-select>
    <legacy-select :options="options" label="name" v-model="select4" v-linked="{parent: select2, sibling: select3}" ></legacy-select>
    <legacy-select :options="options" label="name" v-model="select5" v-linked="{parent: [select3, select4]}"></legacy-select>
            </div>
            `,
  components: {
    LegacySelect,
  },
};

// Tests implementation
commonDirectiveTests(
  "LegacySelect with custom label dict options",
  customLabelDictOptions,
  LegacySelect,
  customLabelOptionsImplementation
);
