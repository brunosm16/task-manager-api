import { BooleanValidator } from '../../protocols'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { TaskController } from './task'
import { NameValidator } from '../../protocols/name-validator'

interface SutTypes {
  sut: TaskController
  booleanValidatorStub: BooleanValidator
  nameValidatorStub: NameValidator
}

const makeBooleanValidatorStub = (): BooleanValidator => {
  class BooleanValidatorStub implements BooleanValidator {
    isValid (completed: string): boolean {
      return true
    }
  }

  return new BooleanValidatorStub()
}

const makeNameValidatorStub = (): NameValidator => {
  class NameValidatorStub implements NameValidator {
    isValid (name: string): boolean {
      return true
    }
  }
  return new NameValidatorStub()
}

const makeSut = (): SutTypes => {
  const booleanValidator = makeBooleanValidatorStub()
  const nameValidator = makeNameValidatorStub()
  const taskController = new TaskController(booleanValidator, nameValidator)
  return {
    sut: taskController,
    booleanValidatorStub: booleanValidator,
    nameValidatorStub: nameValidator
  }
}

describe('Task Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        completed: true
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no completed is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('completed'))
  })

  test('Should return 400 if completed is not boolean', async () => {
    const { sut, booleanValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        completed: true
      }
    }

    jest.spyOn(booleanValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('completed'))
  })

  test('Should call BooleanValidator with correct value', async () => {
    const { sut, booleanValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        completed: true
      }
    }

    const isValidSpy = jest.spyOn(booleanValidatorStub, 'isValid')

    await sut.handle(httpRequest)

    const { completed: requestParamCompleted } = httpRequest.body

    expect(isValidSpy).toHaveBeenCalledWith(requestParamCompleted.toString())
  })

  test('Should return 500 if BooleanValidator throws', async () => {
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

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 400 if name is not valid', async () => {
    const { sut, nameValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'invalid_name',
        completed: true
      }
    }

    jest.spyOn(nameValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('name'))
  })

  test('Should return 400 if NameValidator with correct values', async () => {
    const { sut, nameValidatorStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        completed: true
      }
    }

    const isValidSpy = jest.spyOn(nameValidatorStub, 'isValid')

    await sut.handle(httpRequest)

    const { name: requestParamName } = httpRequest.body

    expect(isValidSpy).toHaveBeenCalledWith(requestParamName)
  })
})
