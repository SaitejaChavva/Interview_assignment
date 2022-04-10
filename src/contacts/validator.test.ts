import { validatePostContact } from "./validator"

test('Adding two numbers', async () => {
    expect(validatePostContact('', '', '')).toStrictEqual('')
})