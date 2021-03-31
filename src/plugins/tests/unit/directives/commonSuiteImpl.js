import { createLocalVue, mount } from '@vue/test-utils'
import linkedSelectPlugin from '../../../index.js'

export const commonDirectiveTests = (implementationName, options, component, componentImplementation, addedComponents=null, addedPlugins=null)=>{






const setSelection = async function (Wrapper, pos = 0) {
    const options = Wrapper.findAll('option')
    await options.at(pos).setSelected()
}

const findSelectWrapper = (Wrapper, pos = 0,) => {
    return findSelectParentComponent(Wrapper, pos).find('select')
}

const findSelectParentComponent = (Wrapper, pos = 0,) => {
    return Wrapper.findAllComponents(component).at(pos)
}
const selectMultiAtFirst = async function(...args){

    for (const selector of args){
        await setSelection(selector, 1);
    }

}

describe(`Verify the dependent links for ${implementationName}`, () => {

    let wrapper
    let firstSelectWrapper, secondSelectWrapper, thirdSelectWrapper, fourthSelectWrapper, fifthSelectWrapper 


    beforeEach(async () => {
        const localVue = createLocalVue()

        //Register additional plugins
        if(addedPlugins && Array.isArray(addedPlugins)){
            addedPlugins.forEach(plugin =>{
                // console.log('Adding PLUGINS')
                localVue.use(plugin)
            })
        }

        //Register additional components
        if(addedComponents && Array.isArray(addedComponents)){
            addedComponents.forEach(comp =>{
                // console.log('Adding COMPONENTS')
                // localVue.component(comp.name, comp.component)
                localVue.component(comp.name, comp.comp)
                // console.log(localVue)
            })
        }
        
        localVue.use(linkedSelectPlugin)

        // wrapper = shallowMount(dependentImplementation, {
        wrapper = mount(componentImplementation, {
            localVue,
            data() {
                return {
                    options,
                    select1: null, //needs to be a dict with at least "selected" key
                    select2: null,
                    select3: null,
                    select4: null,
                    select5: null,
                }
            },
        })
        // console.log(Object.keys(wrapper.vm.$options.components))

        firstSelectWrapper = findSelectWrapper(wrapper, 0)
        secondSelectWrapper = findSelectWrapper(wrapper, 1)
        thirdSelectWrapper = findSelectWrapper(wrapper, 2)
        fourthSelectWrapper = findSelectWrapper(wrapper, 3)
        fifthSelectWrapper = findSelectWrapper(wrapper, 4)

    })

    afterEach(() => {
        wrapper.destroy()
    })


    it('should the parent always enable and all children be disabled from the start', () => {
        expect(firstSelectWrapper.element.disabled).toBe(false) //standalone parent should be on
        expect(firstSelectWrapper.find('option:checked').element.value).toBe('') //Empty value from start
        expect(secondSelectWrapper.element.disabled).toBe(true)
        expect(thirdSelectWrapper.element.disabled).toBe(true)
        expect(fourthSelectWrapper.element.disabled).toBe(true)
        expect(fifthSelectWrapper.element.disabled).toBe(true)

    })

    it('should enable the second child and keep descendant disabled after first parent selected', async () => {

        await setSelection(firstSelectWrapper, 1)

        expect(firstSelectWrapper.find('option:checked').element.value).toBe('A')
        expect(secondSelectWrapper.element.disabled).toBe(false)
        expect(thirdSelectWrapper.element.disabled).toBe(true)
        expect(fourthSelectWrapper.element.disabled).toBe(true)
        expect(fifthSelectWrapper.element.disabled).toBe(true)

    })

    it('should enable the third child and fourth child keep descendant disabled after first parent and second parent are selected', async () => {

        expect(firstSelectWrapper.element.disabled).toBe(false)
        await setSelection(firstSelectWrapper, 1)
        expect(firstSelectWrapper.find('option:checked').element.value).toBe('A')

        expect(secondSelectWrapper.element.disabled).toBe(false)
        await setSelection(secondSelectWrapper, 1)
        expect(secondSelectWrapper.find('option:checked').element.value).toBe('A')

        expect(thirdSelectWrapper.element.disabled).toBe(false)
        expect(thirdSelectWrapper.find('option:checked').element.value).toBe('')
        expect(fourthSelectWrapper.element.disabled).toBe(false)
        expect(fourthSelectWrapper.find('option:checked').element.value).toBe('')

        expect(fifthSelectWrapper.element.disabled).toBe(true)

    })

    it('should enable the fifth parent if either the third or fourth is selected and toogle disable between the third and fourth', async () => {

        expect(firstSelectWrapper.element.disabled).toBe(false)
        await setSelection(firstSelectWrapper, 1)
        expect(firstSelectWrapper.find('option:checked').element.value).toBe('A')

        expect(secondSelectWrapper.element.disabled).toBe(false)
        await setSelection(secondSelectWrapper, 3)
        expect(secondSelectWrapper.find('option:checked').element.value).toBe('C')

        //Select the thirdSelect
        expect(thirdSelectWrapper.element.disabled).toBe(false)
        await setSelection(thirdSelectWrapper, 2)
        expect(thirdSelectWrapper.find('option:checked').element.value).toBe('B')



        expect(fourthSelectWrapper.element.disabled).toBe(true)

        expect(fifthSelectWrapper.element.disabled).toBe(false)
        expect(fifthSelectWrapper.find('option:checked').element.value).toBe('')


        //Reset the thirdSelect
        await setSelection(thirdSelectWrapper, 0)
        expect(thirdSelectWrapper.element.disabled).toBe(false)
        expect(thirdSelectWrapper.find('option:checked').element.value).toBe('')

        expect(fourthSelectWrapper.element.disabled).toBe(false)
        expect(fourthSelectWrapper.find('option:checked').element.value).toBe('')

        expect(fifthSelectWrapper.element.disabled).toBe(true)

        //Select the fourthSelect
        expect(fourthSelectWrapper.element.disabled).toBe(false)
        await setSelection(fourthSelectWrapper, 3)
        expect(fourthSelectWrapper.find('option:checked').element.value).toBe('C')

        expect(thirdSelectWrapper.element.disabled).toBe(true)
        expect(thirdSelectWrapper.find('option:checked').element.value).toBe('')

        expect(fifthSelectWrapper.element.disabled).toBe(false)
        expect(fifthSelectWrapper.find('option:checked').element.value).toBe('')


        //Reset the fourthSelect
        await setSelection(fourthSelectWrapper, 0)
        expect(fourthSelectWrapper.element.disabled).toBe(false)
        expect(fourthSelectWrapper.find('option:checked').element.value).toBe('')

        expect(thirdSelectWrapper.element.disabled).toBe(false)
        expect(thirdSelectWrapper.find('option:checked').element.value).toBe('')

        expect(fifthSelectWrapper.element.disabled).toBe(true)

    })

    it('should properly make the selection using the selectMultiAtFirst',async ()=>{
        await selectMultiAtFirst(firstSelectWrapper, secondSelectWrapper, thirdSelectWrapper, fifthSelectWrapper)
        expect(firstSelectWrapper.element.disabled).toBe(false)
        expect(secondSelectWrapper.element.disabled).toBe(false)
        expect(thirdSelectWrapper.element.disabled).toBe(false)
        expect(fourthSelectWrapper.element.disabled).toBe(true)
        expect(fifthSelectWrapper.element.disabled).toBe(false)
    })

    it('should disable all children when first select is reset',async ()=>{
        //intentionally select all at first
        await selectMultiAtFirst(firstSelectWrapper, secondSelectWrapper, thirdSelectWrapper, fifthSelectWrapper)

        //reset  firstSelect
        await setSelection(firstSelectWrapper, 0)
        expect(firstSelectWrapper.find('option:checked').element.value).toBe('')
        expect(secondSelectWrapper.element.disabled).toBe(true)
        expect(thirdSelectWrapper.element.disabled).toBe(true)
        expect(fourthSelectWrapper.element.disabled).toBe(true)
        expect(fifthSelectWrapper.element.disabled).toBe(true)

    })
    it('should disable all children when second select is reset',async ()=>{
        //intentionally select all at first
        await selectMultiAtFirst(firstSelectWrapper, secondSelectWrapper, thirdSelectWrapper, fifthSelectWrapper)

        //reset  secondSelect
        await setSelection(secondSelectWrapper, 0)
        expect(secondSelectWrapper.find('option:checked').element.value).toBe('')
        expect(firstSelectWrapper.element.disabled).toBe(false)
        expect(secondSelectWrapper.element.disabled).toBe(false)
        expect(thirdSelectWrapper.element.disabled).toBe(true)
        expect(fourthSelectWrapper.element.disabled).toBe(true)
        expect(fifthSelectWrapper.element.disabled).toBe(true)

    })
    it('should disable all children when third select is reset',async ()=>{
        //intentionally select all at first
        await selectMultiAtFirst(firstSelectWrapper, secondSelectWrapper, thirdSelectWrapper, fifthSelectWrapper)

        //reset  thirdSelect
        await setSelection(thirdSelectWrapper, 0)
        expect(thirdSelectWrapper.find('option:checked').element.value).toBe('')
        expect(firstSelectWrapper.element.disabled).toBe(false)
        expect(secondSelectWrapper.element.disabled).toBe(false)
        expect(thirdSelectWrapper.element.disabled).toBe(false)
        expect(fourthSelectWrapper.element.disabled).toBe(false)
        expect(fifthSelectWrapper.element.disabled).toBe(true)
    })



})
}