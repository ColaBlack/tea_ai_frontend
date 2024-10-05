// @ts-ignore
/* eslint-disable */
import request from '@/config/request'

/** generateQuestion POST /api/ai/generate/question */
export async function generateQuestionUsingPost(
  body: API.AiGenerateQuestionRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListQuestionContentDTO_>('/api/ai/generate/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
