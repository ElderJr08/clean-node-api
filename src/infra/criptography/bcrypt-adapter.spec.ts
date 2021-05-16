import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash')
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('should call bcrypy with correct values', async () => {
    const systemUnderTest = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await systemUnderTest.encrypt('any_value')
    expect(hashSpy).toHaveBeenLastCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const systemUnderTest = makeSut()
    const hash = await systemUnderTest.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  it('should throw if bcrypt throws', async () => {
    const systemUnderTest = makeSut()

    jest.spyOn(bcrypt, 'hash')
    // eslint-disable-next-line
    .mockImplementationOnce(async () => Promise.reject(new Error()))

    const promise = systemUnderTest.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
