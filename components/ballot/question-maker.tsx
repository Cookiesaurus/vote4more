import { MULTI_CHOICE_BTN_TYPE, Option, Question, RADIO_BTN_TYPE } from "../../lib/ballot";
import { useState, useMemo } from 'react'
import { Button, Card, Checkbox, Container, Dropdown, Input, Text, Textarea } from "@nextui-org/react";
import OptionMaker from "./option-maker";
var keygen = require('keygen');


function getDefaultValue(type: string): string {
  if (!type || type.length === 0)
    return RADIO_BTN_TYPE
  return MULTI_CHOICE_BTN_TYPE
}

export default function QuestionMaker({
  rm,
  question
}: {
  rm: (question: Question) => void,
  question: Question
}) {
  const [options, setOptions] = useState<Array<Option>>(question.options)
  const [selected, setSelected] = useState(new Set([getDefaultValue(question.type)]));
  const [title, setTitle] = useState(question.title)

  const handleSetType = (type: Set<string>) => {
    // @ts-ignore
    question.type = type.currentKey
    setSelected(type)
  }

  const handleSetTitle = (title: string) => {
    question.title = title
    setTitle(title)
  }

  const handleRemoveOption = (option: Option) => {
    const r = options.filter(o => {
      return o !== option
    })
    setOptions(r)
  }

  const handleSetOptions = (options: Array<Option>) => {
    question.options = options
    setOptions(options)
  }

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const safeTitle = useMemo(
    () => {
      if (title?.length > 15)
        return title.slice(0, 15) + '...'
      return title
    },
    [title]
  )

  return (
    <Card>
      <Card.Header css={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Text h4 css={{
          margin: 'auto 0'
        }}>
          {safeTitle}
        </Text>
        <Checkbox
          css={{
            margin: 'auto 0 auto auto'
          }}
          size={"lg"}
          isIndeterminate
          defaultSelected
          color="error"
          onChange={() => {
            rm(question)
          }}>

        </Checkbox>
      </Card.Header>
      <Card.Body>
        <Textarea
          value={title}
          minRows={1}
          maxRows={5}
          onChange={e => handleSetTitle(e.target.value)}
          placeholder='Question Title' />
        <Container css={{
          margin: '0 auto 0 0',
          padding: '10px 0',
          display: 'flex'
        }}>
          <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Set type."
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}

              // @ts-ignore
              onSelectionChange={handleSetType}
            >
              <Dropdown.Item key={MULTI_CHOICE_BTN_TYPE}>Multi</Dropdown.Item>
              <Dropdown.Item key={RADIO_BTN_TYPE}>Radio</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button
            size={"md"}   
            auto         
            css={{
              marginLeft: '10px',              
            }}
            onPress={() => {
              handleSetOptions([
                {
                  key: keygen.url(keygen.small),
                  optionDesc: '',
                  optionImg: '',
                  optionName: ''
                },
                ...options
              ])
            }}>
            Add Option
          </Button>
        </Container>
        <Container>
          {options.map((value, index) => {
            return (
              <Container css={{
                marginTop: '10px',
                padding: 0
              }}>
                <OptionMaker
                  index={index}
                  key={value.key}
                  option={value}
                  rm={handleRemoveOption} />
              </Container>
            )
          })}
        </Container>
      </Card.Body>
    </Card>
  )
}