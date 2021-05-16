import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash')
  }
}))

describe('Bcrypt Adapter', () => {
  it('should call bcrypy with correct values', async () => {
    const salt = 12
    const systemUnderTest = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await systemUnderTest.encrypt('any_value')
    expect(hashSpy).toHaveBeenLastCalledWith('any_value', salt)
  })

  it('should return a hash on success', async () => {
    const salt = 12
    const systemUnderTest = new BcryptAdapter(salt)
    const hash = await systemUnderTest.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
