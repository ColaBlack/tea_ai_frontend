// @ts-ignore
/* eslint-disable */
import request from '@/config/request'

/** aiGenerateQuestionSSE GET /api/ai/generate/question/sse */
export async function aiGenerateQuestionSseUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.aiGenerateQuestionSSEUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.SseEmitter>('/api/ai/generate/question/sse', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
