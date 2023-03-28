import { Button, Checkbox, Container, Input, Text, Image } from "@nextui-org/react"
import { useState } from "react"
import { MULTI_CHOICE_BTN_TYPE, Option, RADIO_BTN_TYPE } from "../../lib/ballot"

export default function OptionMaker({
  index,
  option,
  rm
}: {
  index: number,
  option: Option
  rm: (option: Option) => void
}) {
  const [name, setName] = useState(option.optionName)

  const handleSetName = (name: string) => {
    option.optionName = name
    setName(name)
  }

  return (
    <Container
      css={{
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px'
      }}>
      <Text css={{
        marginRight: '10px'
      }}>
        {index + 1}.
      </Text>
      <Input
        css={{
          flexGrow: 1 // Allots all remaining space to this element
        }}
        value={name}
        onChange={(e) => handleSetName(e.target.value)}
        placeholder='Option' />
      <Checkbox
        css={{
          margin: 'auto 0 auto auto'
        }}
        isIndeterminate
        defaultSelected
        color="error"
        onChange={() => {
          rm(option)
        }}>

      </Checkbox>
    </Container>
  )
}