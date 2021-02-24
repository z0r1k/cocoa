export class ConfigurationError extends Error {
  constructor(message = '') {
    super(message)
    Object.setPrototypeOf(this, ConfigurationError.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}
