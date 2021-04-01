import LegacySelect from "./components/LegacySelect.vue";
import ShadowedVSelect from "./components/ShadowedVSelect.vue";

import {
  getActiveLinkedSelection,
  resetElement,
  disableElement,
  enableElement,
} from "./utils.js";

const VueDependentSelect = {
  install(Vue) {
    Vue.component("legacy-select", LegacySelect);
    Vue.component("shadowed-v-select", ShadowedVSelect);


    let parentHasReset = false;

    Vue.directive("linked", {

      bind: function(el, ) {
        //Wrap the vnode here
        disableElement(el);
        resetElement(el);
      },
      componentUpdated: function(el, binding) {
        //Change happened
        const oldV = binding.oldValue;
        const newV = binding.value;
        const parentChanged =
          getActiveLinkedSelection(oldV.parent) !==
          getActiveLinkedSelection(newV.parent);
        const siblingChanged =
          getActiveLinkedSelection(oldV.sibling) !==
          getActiveLinkedSelection(newV.sibling);

        if (parentChanged) {
          //get only the changed select
          if (getActiveLinkedSelection(newV.parent)) {
            enableElement(el);
            resetElement(el);
          } else {
            parentHasReset = true;
            disableElement(el);
            resetElement(el);
          }
        }
        if (siblingChanged) {
          //get only the changed select
          if (getActiveLinkedSelection(newV.sibling)) {
            parentHasReset = false;
            disableElement(el);
            resetElement(el);
          } else {
            if (!parentHasReset) {
              enableElement(el);
            }
            resetElement(el);
          }
        }
      },
    });
  },
};

export default VueDependentSelect

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueDependentSelect)
}