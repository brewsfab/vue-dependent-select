import { mount } from "@vue/test-utils";
import LegacySelect from "../../../components/LegacySelect.vue";

describe("Test LinkSelected component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LegacySelect);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("has a select", () => {
    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("has default name set", async () => {
    expect(wrapper.find("select").attributes("name")).toBe("");
  });

  it("sets the passed name of the select", async () => {
    const name = "sample";
    await wrapper.setProps({ name });
    expect(wrapper.find("select").attributes("name")).toBe(name);
  });

  it("has only the null option by default ", () => {
    const allOptions = wrapper.findAll("option");
    expect(allOptions.length).toBe(1);
    expect(allOptions.at(0).text()).toBe("---");
  });

  it("has the null option string passed", async () => {
    const nullString = "xxx";
    await wrapper.setProps({ nullString });
    const allOptions = wrapper.findAll("option");
    expect(allOptions.length).toBe(1);
    expect(allOptions.at(0).text()).toBe(nullString);
  });

  it("has the options set from array of string all default", async () => {
    const optionsString = ["A", "B", "C"];
    await wrapper.setProps({ options: optionsString });
    const allOptions = wrapper.findAll("option");

    expect(allOptions.length).toBe(optionsString.length + 1);
    expect(allOptions.at(0).text()).toBe("---");
    expect(allOptions.at(1).text()).toBe(optionsString[0]);
  });

  it("has the options set from array of dict all default", async () => {
    const optionsDictDefaultLabel = [
      { label: "A" },
      { label: "B" },
      { label: "C" },
    ];
    await wrapper.setProps({ options: optionsDictDefaultLabel });
    const allOptions = wrapper.findAll("option");

    expect(allOptions.length).toBe(optionsDictDefaultLabel.length + 1);
    expect(allOptions.at(0).text()).toBe("---");
    expect(allOptions.at(1).text()).toBe(optionsDictDefaultLabel[0].label);
  });

  it("has the options set from array of dict with non default label name", async () => {
    const optionsDictChangedLabel = [
      { element: "A" },
      { element: "B" },
      { element: "C" },
    ];
    const newlabel = "element";
    await wrapper.setProps({
      options: optionsDictChangedLabel,
      label: newlabel,
    });
    const allOptions = wrapper.findAll("option");

    expect(allOptions.length).toBe(optionsDictChangedLabel.length + 1);
    expect(allOptions.at(0).text()).toBe("---");
    expect(allOptions.at(1).text()).toBe(optionsDictChangedLabel[0][newlabel]);
  });
});
