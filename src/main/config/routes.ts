import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  /* something similar thing as that:
    import SignUpRoute from '../routes/signup-routes'

    SignUpRoute(router)
  */

  fg.sync('**/src/main/routes/**routes.ts')
    .map(async file =>
      (await import(`../../../${file}`)).default(router))
}
