import { Button, Checkbox, Container, Input, Text } from "@nextui-org/react"
import { useState } from "react"
import QuestionMaker from "./question-maker"

import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
// Next.js doesn't allow node_module components to import styles, therefore: 
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

import styles from '../../styles/components/ballot.module.css'
import { Ballot } from "@prisma/client";
import { Question } from "../../lib/ballot";
import { EDITING_BALLOT_STATUS, VOTING_BALLOT_STATUS } from "../../prisma/types";
import { useUser } from "../../lib/userUser";
import { post } from "../../lib/fetch-wrapper";
import { UPSERT_CODE } from "../../pages/api/util";

var keygen = require('keygen')

async function save(ballot: Ballot) {
  return await post('/api/ballot', {
    code: UPSERT_CODE,
    ballot: ballot
  })
    .then()
}

export default function BallotMaker() {
  const user = useUser()
  const [questions, setQuestions] = useState<Array<Question>>([])
  const [openingDate, setOpeningDate] = useState(new Date())
  const [completionDate, setCompletionDate] = useState(new Date())
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [writeIn, setWriteIn] = useState(true)

  const [saved, setSaved] = useState(false)
  const [published, setPublished] = useState(false)

  const handleRemoveQuestion = (question: Question) => {
    const r = questions.filter(q => {
      return q !== question
    })
    setQuestions(r)
  }

  const handleSaveBallot = (publish: boolean) => {
    save({
      // @ts-ignore
      content: JSON.stringify(questions),
      openingDate: openingDate,
      completionDate: completionDate,
      enableWriteIn: writeIn,
      location: location,
      status: publish ? VOTING_BALLOT_STATUS : EDITING_BALLOT_STATUS,
      title: title,
      creationDate: new Date(Date.now()),
      id: -1,
      ownerId: -1,
      autoCompletionDate: new Date(Date.now())
    })
      .then(() => {
        setSaved(true)
        setPublished(publish)
      })
  }

  return (
    <Container>
      { saved &&
        <Text color="success">
          Successfully Saved {published ? ' & Published' : '' }
        </Text>
      }
      { !published &&
        <>
          <Text>
            The title of the ballot to be used when displayed to voters.
          </Text>
          <Input placeholder="Title" value={title} onChange={(e) => {
            setTitle(e.target.value)
          }} />

          <Text h4>Opening Date</Text>
          <Text>
            Set an automatic date for this ballot to be opened to voters.
          </Text>
          <DateTimePicker value={openingDate} onChange={setOpeningDate} />

          <Text h4>Completion Date</Text>
          <Text>
            Set a desired completion date for this ballot.
          </Text>
          <DateTimePicker value={completionDate} onChange={setCompletionDate} />

          <Text>Provide a in-person location for this ballot below.</Text>
          <Input placeholder="Location" value={location} onChange={(e) => {
            setLocation(e.target.value)
          }} />

          <Text>Indicate whether write in options are allow for this ballot.</Text>
          <Checkbox defaultSelected isSelected={writeIn} onChange={setWriteIn}>
            Write In &nbsp; {writeIn ? <Text><em>(enabled)</em></Text> : <Text><em>(disabled)</em></Text>}
          </Checkbox>

          <Container css={{
            display: 'flex',
            padding: 0,
            columnGap: '10px'
          }}>
            <Button auto onPress={() => {
              handleSaveBallot(false)
            }}>
              Save
            </Button>
            <Button auto onPress={() => {
              handleSaveBallot(true)
            }}>
              Save & Publish
            </Button>
          </Container>

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
                  type: ''
                },
              ])
            }}>
            Add Question
          </Button>
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
      }

    </Container>
  )
}