interface FeedbackMessage<T> {
  result: boolean
  message: string
  statusCode: number
  payload: T
}

interface PayloadGoodResult {
  token: string
}
