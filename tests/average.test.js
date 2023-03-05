const average = require("../utils/for_testing").average

describe('average', () => {

    test('average of 10,20 and 30', () => {
        const result = average([10,20,30])
    
        expect(result).toBe(20)
    })
    
    test('average of an empty array', () => {
        const result = average([])
    
        expect(result).toBe(0)
    })
    
    test('average of only one number', () => {
        const result = average([6])
    
        expect(result).toBe(6)
    })
    
    test('average of 4,7,1,9', () => {
        const result = average([4,7,1,9])
    
        expect(result).toBe(5.25)
    })
    
})