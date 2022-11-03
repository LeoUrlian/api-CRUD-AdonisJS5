import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()

    return response.status(200).send({ data: users })
  }

  public async store({ response, request }: HttpContextContract) {
    const body = request.body()

    const users = await User.create(body)

    return response.status(200).send({ message: 'Usuário criado com sucesso!', data: users })
  }

  public async show({ response, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return response.status(200).send({ data: user })
  }

  public async update({ params, response, request }: HttpContextContract) {
    const body = request.body()
    const user = await User.findOrFail(params.id)

    user.name = body.name
    user.email = body.email
    user.password = body.password

    await user.save()

    return response.status(200).send({ message: 'Usuário atualizado com sucesso!', data: user })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    return response.status(200).send({ message: 'Usuário deletado com sucesso!' })
  }
}
