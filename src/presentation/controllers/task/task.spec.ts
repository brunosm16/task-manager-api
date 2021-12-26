import { MissingParamError } from '../../errors/missing-param-error'
import { Controller } from '../../protocols/controller'
import { TaskController } from './task'

const makeSut = (): Controller => {
  return new TaskController()
}

describe('Task Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        completed: true
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no completed is provided', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('completed'))
  })
})
