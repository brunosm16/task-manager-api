import { TaskController } from './task'

describe('Task Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new TaskController()

    const httpRequest = {
      body: {
        completed: true
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing Param: name'))
  })

  test('Should return 400 if no completed is provided', () => {
    const sut = new TaskController()

    const httpRequest = {
      body: {
        name: 'valid_name'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing Param: completed'))
  })
})
