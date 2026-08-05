/** An object of signal, error-number, and process-priority constants. */
declare const constants: {
  signals: Record<string, number>
  errnos: Record<string, number>
  priority: Record<string, number>
}

export = constants
