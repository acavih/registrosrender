export interface FeedbackMessage<T> {
  result: boolean
  message: string
  statusCode: number
  payload: T
}

export interface PayloadGoodResult {
  token: string
}
