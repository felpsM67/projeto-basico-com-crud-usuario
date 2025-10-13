export class InvalidParamError extends Error {
    constructor (paramName: string) {
      super()
      this.name = 'InvalidParamError'
      this.message = `Verifiqueo seguinte parâmetro inválido: ${paramName}`
    }
  }