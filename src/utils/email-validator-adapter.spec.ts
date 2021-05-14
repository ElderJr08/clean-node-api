import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  it('should return false if validator returns false', () => {
    const systemUnderTest = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = systemUnderTest.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  it('should return true if validator returns true', () => {
    const systemUnderTest = makeSut()
    const isValid = systemUnderTest.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const systemUnderTest = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    systemUnderTest.isValid('any_email@email.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
