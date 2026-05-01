declare class OSError extends Error {
  constructor(msg: string, code: string, fn?: Function)

  readonly code: string
  readonly name: 'OSError'

  static UNKNOWN_SIGNAL(msg: string): OSError
  static TITLE_OVERFLOW(msg: string): OSError
}

export = OSError
