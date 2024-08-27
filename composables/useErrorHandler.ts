export function useErrorHandler() {
  const handleError = (error: unknown) => {
    console.error('Error captured: ', error)

    // Currently it's just a simple implementation for error handling,
    // but in a future iteration should be interesting implement:
    // - Log errors to an external service
    // - Show user-friendly error messages
    // - Handle different error types differently
  }

  return { handleError }
}
