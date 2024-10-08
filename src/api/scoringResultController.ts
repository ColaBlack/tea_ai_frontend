// @ts-ignore
/* eslint-disable */
import request from '@/config/request'

/** addScoringResult POST /api/scoringResult/add */
export async function addScoringResultUsingPost(
  body: API.ScoringResultAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>('/api/scoringResult/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** deleteScoringResult POST /api/scoringResult/delete */
export async function deleteScoringResultUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/scoringResult/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** editScoringResult POST /api/scoringResult/edit */
export async function editScoringResultUsingPost(
  body: API.ScoringResultEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/scoringResult/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listScoringResultByPage POST /api/scoringResult/list/page */
export async function listScoringResultByPageUsingPost(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageScoringResult_>('/api/scoringResult/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listScoringResultVOByPage POST /api/scoringResult/list/page/vo */
export async function listScoringResultVoByPageUsingPost(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageScoringResultVO_>('/api/scoringResult/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** updateScoringResult POST /api/scoringResult/update */
export async function updateScoringResultUsingPost(
  body: API.ScoringResultUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/scoringResult/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
