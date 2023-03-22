// The option for a question
export type Option = {
  optionImg: string
  optionName: string
  optionDesc: string
}

// A question that belongs to a ballot
export type Question = {
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