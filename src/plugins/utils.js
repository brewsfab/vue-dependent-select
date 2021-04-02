const getActiveLinkedSelection = function(parents) {
  let activeParent;
  if (Array.isArray(parents)) {
    activeParent = parents.find((el) => el);
  } else {
    activeParent = parents;
  }
  return activeParent;
};

const getElement = function(e) {
  var el = e.nodeName == "SELECT" ? e : e.querySelector("select");
  return el;
};
const resetElement = function(e) {
  var event = new Event("change");
  var el = getElement(e);

  el.selectedIndex = 0;
  el.dispatchEvent(event);
  return false;
};
const disableElement = function(e) {
  var el = getElement(e);
  el.disabled = true;
};
const enableElement = function(e) {
  var el = getElement(e);
  el.disabled = false;
};

export {
  getActiveLinkedSelection,
  resetElement,
  disableElement,
  enableElement,
};
