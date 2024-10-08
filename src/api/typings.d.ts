declare namespace API {
  type aiGenerateQuestionSSEUsingGETParams = {
    bankId?: number
    optionNumber?: number
    questionNumber?: number
  }

  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BaseResponseLoginUserVO_ = {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponsePageQuestion_ = {
    code?: number
    data?: PageQuestion_
    message?: string
  }

  type BaseResponsePageQuestionBank_ = {
    code?: number
    data?: PageQuestionBank_
    message?: string
  }

  type BaseResponsePageQuestionBankVO_ = {
    code?: number
    data?: PageQuestionBankVO_
    message?: string
  }

  type BaseResponsePageQuestionVO_ = {
    code?: number
    data?: PageQuestionVO_
    message?: string
  }

  type BaseResponsePageScoringResult_ = {
    code?: number
    data?: PageScoringResult_
    message?: string
  }

  type BaseResponsePageScoringResultVO_ = {
    code?: number
    data?: PageScoringResultVO_
    message?: string
  }

  type BaseResponsePageUser_ = {
    code?: number
    data?: PageUser_
    message?: string
  }

  type BaseResponsePageUserAnswer_ = {
    code?: number
    data?: PageUserAnswer_
    message?: string
  }

  type BaseResponsePageUserAnswerVO_ = {
    code?: number
    data?: PageUserAnswerVO_
    message?: string
  }

  type BaseResponseQuestionBankVO_ = {
    code?: number
    data?: QuestionBankVO
    message?: string
  }

  type BaseResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type BaseResponseUserAnswerVO_ = {
    code?: number
    data?: UserAnswerVO
    message?: string
  }

  type DeleteRequest = {
    id?: number
  }

  type getQuestionBankVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserAnswerVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type listMyUserAnswerVOByPageUsingPOSTParams = {
    bankid?: number
    banktype?: number
    choices?: string
    current?: number
    id?: number
    pageSize?: number
    resultDesc?: string
    resultId?: number
    resultName?: string
    resultPicture?: string
    resultScore?: number
    scoringStrategy?: number
    searchText?: string
    sortField?: string
    sortOrder?: string
    userId?: number
  }

  type LoginUserVO = {
    createTime?: string
    id?: number
    updateTime?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type Option = {
    key?: string
    result?: string
    score?: number
    value?: string
  }

  type OrderItem = {
    asc?: boolean
    column?: string
  }

  type PageQuestion_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: Question[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageQuestionBank_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: QuestionBank[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageQuestionBankVO_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: QuestionBankVO[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageQuestionVO_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: QuestionVO[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageScoringResult_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: ScoringResult[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageScoringResultVO_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: ScoringResultVO[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageUser_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: User[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageUserAnswer_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: UserAnswer[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageUserAnswerVO_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: UserAnswerVO[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type Question = {
    bankid?: number
    createTime?: string
    id?: number
    isDelete?: number
    questionContent?: string
    updateTime?: string
    userid?: number
  }

  type QuestionAddRequest = {
    questionBankId?: number
    questionContent?: QuestionContentDTO[]
  }

  type QuestionBank = {
    bankDesc?: string
    bankIcon?: string
    bankName?: string
    bankType?: number
    createTime?: string
    id?: number
    isDelete?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerid?: number
    scoringStrategy?: number
    updateTime?: string
    userId?: number
  }

  type QuestionBankAddRequest = {
    bankDesc?: string
    bankIcon?: string
    bankName?: string
    bankType?: number
    id?: number
    scoringStrategy?: number
  }

  type QuestionBankEditRequest = {
    bankDesc?: string
    bankIcon?: string
    bankName?: string
    bankType?: number
    id?: number
    scoringStrategy?: number
  }

  type QuestionBankQueryRequest = {
    bankDesc?: string
    bankName?: string
    bankType?: number
    current?: number
    id?: number
    pageSize?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewerid?: number
    scoringStrategy?: number
    searchText?: string
    sortField?: string
    sortOrder?: string
    userId?: number
  }

  type QuestionBankVO = {
    bankDesc?: string
    bankIcon?: string
    bankName?: string
    bankType?: number
    createTime?: string
    id?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    scoringStrategy?: number
    updateTime?: string
    user?: UserVO
    userId?: number
  }

  type QuestionContentDTO = {
    options?: Option[]
    title?: string
  }

  type QuestionQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    questionBankId?: number
    questionContent?: string
    sortField?: string
    sortOrder?: string
    userId?: number
  }

  type QuestionUpdateRequest = {
    id?: number
    questionContent?: QuestionContentDTO[]
  }

  type QuestionVO = {
    bankId?: number
    createTime?: string
    id?: number
    questionContent?: QuestionContentDTO[]
    updateTime?: string
    user?: UserVO
    userId?: number
  }

  type ReviewRequest = {
    id?: number
    reviewMessage?: string
    reviewStatus?: number
  }

  type ScoringResult = {
    bankid?: number
    createTime?: string
    id?: number
    isDelete?: number
    resultDesc?: string
    resultName?: string
    resultPicture?: string
    resultProp?: string
    resultScoreRange?: number
    updateTime?: string
    userid?: number
  }

  type ScoringResultAddRequest = {
    bankid?: number
    id?: number
    resultDesc?: string
    resultName?: string
    resultPicture?: string
    resultProp?: string[]
    resultScoreRange?: number
  }

  type ScoringResultEditRequest = {
    id?: number
    resultDesc?: string
    resultName?: string
    resultPicture?: string
    resultProp?: string[]
    resultScoreRange?: number
  }

  type ScoringResultQueryRequest = {
    bankid?: number
    current?: number
    id?: number
    pageSize?: number
    resultDesc?: string
    resultName?: string
    resultProp?: string
    resultScoreRange?: number
    searchText?: string
    sortField?: string
    sortOrder?: string
    userid?: number
  }

  type ScoringResultUpdateRequest = {
    id?: number
    resultDesc?: string
    resultName?: string
    resultPicture?: string
    resultProp?: string[]
    resultScoreRange?: number
    userid?: number
  }

  type ScoringResultVO = {
    bankId?: number
    createTime?: string
    id?: number
    resultDesc?: string
    resultName?: string
    resultPicture?: string
    resultProp?: string[]
    resultScoreRange?: number
    updateTime?: string
    user?: UserVO
    userId?: number
  }

  type SseEmitter = {
    timeout?: number
  }

  type uploadAvatarUsingPOSTParams = {
    biz?: string
  }

  type uploadBankImageUsingPOSTParams = {
    biz?: string
  }

  type uploadResultImageUsingPOSTParams = {
    biz?: string
  }

  type User = {
    createTime?: string
    id?: number
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userPassword?: string
    userProfile?: string
    userRole?: string
  }

  type UserAddRequest = {
    userAccount?: string
    userAvatar?: string
    userName?: string
    userRole?: string
  }

  type UserAnswer = {
    bankid?: number
    banktype?: number
    choices?: string
    createTime?: string
    id?: number
    isDelete?: number
    resultDesc?: string
    resultName?: string
    resultPicture?: string
    resultScore?: number
    resultid?: number
    scoringStrategy?: number
    updateTime?: string
    userid?: number
  }

  type UserAnswerAddRequest = {
    bankid?: number
    choices?: string[]
    id?: number
  }

  type UserAnswerQueryRequest = {
    bankid?: number
    banktype?: number
    choices?: string
    current?: number
    id?: number
    pageSize?: number
    resultDesc?: string
    resultId?: number
    resultName?: string
    resultPicture?: string
    resultScore?: number
    scoringStrategy?: number
    searchText?: string
    sortField?: string
    sortOrder?: string
    userId?: number
  }

  type UserAnswerUpdateRequest = {
    bankid?: number
    choices?: string[]
    id?: number
  }

  type UserAnswerVO = {
    bankId?: number
    bankType?: number
    choices?: string[]
    createTime?: string
    id?: number
    resultDesc?: string
    resultId?: number
    resultName?: string
    resultPicture?: string
    resultScore?: number
    scoringStrategy?: number
    updateTime?: string
    user?: UserVO
    userId?: number
  }

  type UserLoginRequest = {
    userAccount?: string
    userPassword?: string
  }

  type UserQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    userAccount?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserRegisterRequest = {
    checkPassword?: string
    userAccount?: string
    userPassword?: string
  }

  type UserUpdateRequest = {
    id?: number
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserVO = {
    createTime?: string
    id?: number
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }
}
