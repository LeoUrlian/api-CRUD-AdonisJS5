import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  public async login({ auth, response, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return response.status(200).send({ message: 'Usuário autenticado com sucesso!', data: token })
    } catch {
      return response.status(401).unauthorized('Credenciais de login invalidas!')
    }
  }

  public async autenticate({ auth, response }: HttpContextContract) {
    const userAuthenticate = await auth.use('api').authenticate()

    return response.status(200).send({
      message: `Olá ${auth.user?.name}, seja bem vindo! Agora você está autenticado`,
      data: userAuthenticate,
    })
  }
}
