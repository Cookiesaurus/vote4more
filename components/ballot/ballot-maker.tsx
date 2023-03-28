import { Button, Container } from "@nextui-org/react"
import { useState } from "react"
import { Question } from "../../lib/ballot"
import QuestionMaker from "./question-maker"
var keygen = require('keygen')

export default function BallotMaker() {
  const [questions, setQuestions] = useState<Array<Question>>([])

  const handleRemoveQuestion = (question: Question) => {
    const r = questions.filter(q => {
      return q !== question
    })
    setQuestions(r)
  }

  return (
    <>
      <Button 
        auto
        css={{
          position: 'fixed',
          zIndex: 5000,
          bottom: '1em',
          right: '1em'          
        }}
        onPress={() => {
        setQuestions([
          ...questions,
          {
            key: keygen.url(keygen.small),
            options: [],
            title: '',
            type: '',
            writeIn: ''
          },
        ])
      }}>Add Question</Button>
      {questions.map((value) => {
        return (
          <Container css={{
            marginTop: '10px'
          }}>
            <QuestionMaker
              key={value.key}
              rm={handleRemoveQuestion}
              question={value} />
          </Container>
        )
      })}
    </>
  )
}