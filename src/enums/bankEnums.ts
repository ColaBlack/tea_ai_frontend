export enum REVIEW_ENUMS {
  //待审核
  PENDING = 0,
  //审核通过
  APPROVED = 1,
  //审核失败
  REJECTED = 2
}

export const REVIEW_STATUS = {
  [REVIEW_ENUMS.PENDING]: '待审核',
  [REVIEW_ENUMS.APPROVED]: '审核通过',
  [REVIEW_ENUMS.REJECTED]: '审核失败'
}

export enum BANK_TYPE_ENUMS {
  //得分类题库
  SCORE_BANK = 0,
  //测评类题库
  TEST_BANK = 1
}

export const BANK_TYPE = {
  [BANK_TYPE_ENUMS.SCORE_BANK]: '得分类题库',
  [BANK_TYPE_ENUMS.TEST_BANK]: '测评类题库'
}

export enum SCORING_STRATEGY_ENUMS {
  //自定义得分策略
  CUSTOM = 0,
  //ai评分策略
  AI = 1
}

export const SCORING_STRATEGY = {
  [SCORING_STRATEGY_ENUMS.CUSTOM]: '自定义得分策略',
  [SCORING_STRATEGY_ENUMS.AI]: 'AI评分策略'
}
