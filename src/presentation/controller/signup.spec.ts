import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-params-error'

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided ', () => {
    const systemUnderTest = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_email'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  it('should return 400 if no email is provided ', () => {
    const systemUnderTest = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_email'
      }
    }
    const httpResponse = systemUnderTest.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
