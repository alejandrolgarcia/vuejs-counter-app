import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Indecision Component', () => {
    
    let wrapper
    let clgSpy

    // Mock de fetch
    global.fetch = jest.fn( () => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach( () => {
        wrapper = shallowMount( Indecision )

        clgSpy = jest.spyOn( console, 'log' )

        // Limpiar todos los mocks
        jest.clearAllMocks()

    })

    test('component must match snapshot', () => expect( wrapper.html() ).toMatchSnapshot())


    // Al escribir en el input no se debe ejecutar ninguna acción
    test('should not execute anything when writing to input', async () => {

        // Observar la instancia de vue y hacer mock de la funcion getAnswer
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo')

        // Evaluar que clgSpy ha sido llamado
        expect( clgSpy ).toHaveBeenCalledTimes(1)
        expect( getAnswerSpy ).not.toHaveBeenCalled()

        // console.log( wrapper.vm )
    });

    test('should you execute getAnswer when typing the sign "?"', async() => {
        
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer' )

        const input = wrapper.find('input')
        await input.setValue('Hola Mundo?')

        expect( clgSpy ).toHaveBeenCalledTimes(1)
        expect( getAnswerSpy ).toHaveBeenCalledTimes(1)

    });

    test('tests in the getAnswer()', async () => {
        
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')

        expect( img.exists() ).toBeTruthy()
        expect( wrapper.vm.img ).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect( wrapper.vm.answer ).toBe('Si!')
    });

    test('tests in the getAnswer() - API failure', async () => {

        fetch.mockImplementationOnce( () => Promise.reject('API is down'))
        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect( img.exists() ).toBeFalsy()
        expect( wrapper.vm.answer ).toBe('No se pudo cargar del API')
        
    });
    

})
