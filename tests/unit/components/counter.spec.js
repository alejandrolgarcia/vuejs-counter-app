
import { shallowMount } from "@vue/test-utils";
import Counter from '@/components/Counter'

describe('Counter Component', () => {

    let wrapper

    beforeEach( () => {
        wrapper = shallowMount( Counter )
    }) 

    // test('component must match snapshot', () => {
    //     const wrapper = shallowMount( Counter )
    //     expect( wrapper.html() ).toMatchSnapshot()
    // });
    
    // Evaluar el valor por defecto en la etiqueta h2 
    test('h2 should have the default value', () => {
        
        const h2Value = wrapper.find('h2').text()

        expect( h2Value ).toBe('Counter')

    })

    // La etiqueta p debe tener el valor por defecto de 100
    test('p should have the default value of 10', () => {

        // const pValue = wrapper.findAll('p')
        const value = wrapper.find('[data-testid="counter"]').text()

        // expect( pValue[1].text() ).toBe('10')
        expect( value ).toBe('10')

    })

    // Incrementar el valor del contador en 1
    test('should increase the counter value by 1', async() => {

        const [ increaseBtn, decreaseBtn ] = wrapper.findAll('button')

        // simular el click
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()
        expect( value ).toBe('9')

        
    })

    // Establece el valor por defecto
    test('should set the default value', () => {
        
        const { start } = wrapper.props()
        
        const value = wrapper.find('[data-testid="counter"]').text()

        expect( Number(value) ).toBe( start )
    })

    test('should show the props "title"', () => {

        const title = 'Hola Mundo!'

        const wrapper = shallowMount( Counter, {
            props: {
                title
            }
        })
        
        expect( wrapper.find('h2').text() ).toBe( title )

    })
    
    
    
    
    
})
