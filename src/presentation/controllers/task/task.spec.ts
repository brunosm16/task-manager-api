import { MissingParamError } from '../../errors/missing-param-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { BooleanValidator } from '../../protocols/boolean-validator'
import { TaskController } from './task'
import { ServerError } from '../../errors/server-error'

interface SutTypes {
  sut: TaskController
  booleanValidatorStub: BooleanValidator
}

const makeBooleanValidatorStub = (): BooleanValidator => {
  class BooleanValidatorStub implements BooleanValidator {
    isValid (completed: boolean): boolean {
      return true
    }
  }

  return new BooleanValidatorStub()
}

const makeSut = (): SutTypes => {
  const booleanValidator = makeBooleanValidatorStub()
  const taskController = new TaskController(booleanValidator)
  return {
    sut: taskController,
    booleanValidatorStub: booleanValidator
  }
}

describe('Task Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()

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
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('completed'))
  })

  test('Should return 400 if completed is not boolean', () => {
    const { sut, booleanValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        completed: true
      }
    }

    jest.spyOn(booleanValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('completed'))
  })

  test('Should call BooleanValidator with correct value', () => {
    const { sut, booleanValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        completed: true
      }
    }

    const isValidSpy = jest.spyOn(booleanValidatorStub, 'isValid')

    sut.handle(httpRequest)

    const { completed: requestParamCompleted } = httpRequest.body

    expect(isValidSpy).toHaveBeenCalledWith(requestParamCompleted)
  })

  test('Should return 500 if BooleanValidator throws', () => {
    const { sut, booleanValidatorStub } = makeSut()

    jest.spyOn(booleanValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new ServerError()
    })

    const httpRequest = {
      body: {
        name: 'valid_name',
        completed: true
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
