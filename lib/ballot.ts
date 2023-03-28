export const RADIO_BTN_TYPE = 'radio'
export const MULTI_CHOICE_BTN_TYPE = 'multi'

// The option for a question
export type Option = {
  key: string
  optionImg: string
  optionName: string
  optionDesc: string
}

// A question that belongs to a ballot
export type Question = {
  key: string
  title: string
  type: string
  options: Array<Option>
  writeIn: string
}

// A ballot which contains questions
export type Ballot = {
  questions: Array<Question>
}

// Selections for a voted ballot
export type Vote = {
  selections: Array<Array<number>>[]
}