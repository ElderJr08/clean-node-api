import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controller/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const encrypter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(encrypter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)

  return new LogControllerDecorator(signUpController)
}
