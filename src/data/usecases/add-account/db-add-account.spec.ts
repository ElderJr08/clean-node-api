import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  it('should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return Promise.resolve('hashed_value')
      }
    }
    const encrypterStub = new EncrypterStub()
    const systemUnderTest = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    await systemUnderTest.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
