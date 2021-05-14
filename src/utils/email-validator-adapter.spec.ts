import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const systemUnderTest = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = systemUnderTest.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    const systemUnderTest = new EmailValidatorAdapter()
    const isValid = systemUnderTest.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })
})
