import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SubTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SubTypes => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return Promise.resolve('hashed_value')
    }
  }
  const encrypterStub = new EncrypterStub()
  const systemUnderTest = new DbAddAccount(encrypterStub)
  return {
    sut: systemUnderTest,
    encrypterStub
  }
}

describe('DbAddAccount Usecase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
