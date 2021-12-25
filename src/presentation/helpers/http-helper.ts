import { MissingParamError } from '../errors/missing-param-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: MissingParamError): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const notFoundRequest = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})
