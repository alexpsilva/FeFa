type StyledTextFontModifier = 'bold' | 'italic' | 'underline' | 'strikethrough'
type StyledTextColorModifier = ''
interface StyledText {
  font?: StyledTextFontModifier[]
  color?: StyledTextColorModifier
  content: StyledText[] | string
}

interface Props {
  text: StyledText,
  setText: (newValue: string) => void
}

const StyledTextArea = ({ text, setText }: Props) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(`onChangeHandler(${JSON.stringify(e.target.value)})`)
    setText(e.target.value)
  }
  const toParse: StyledText[] = [text]
  const parsed: React.ReactNode[] = []
  while (toParse.length) {
    const parsing = toParse.shift() as StyledText

    if (Array.isArray(parsing.content)) {
      parsing.content.forEach(content => toParse.push(content))
      continue
    }

    let styledContent: React.ReactNode = parsing.content
    parsing.font?.forEach(font => {
      switch (font) {
        case 'bold':
          styledContent = <b>{styledContent}</b>
          break;

        case 'italic':
          styledContent = <i>{styledContent}</i>
          break;

        case 'underline':
          styledContent = <u>{styledContent}</u>
          break;

        case 'strikethrough':
          styledContent = <s>{styledContent}</s>
          break;
      }
    })

    parsed.push(styledContent)
  }

  return <div contentEditable={true} onChange={(e) => { console.log(JSON.stringify(e.target)) }}>
    {parsed}
  </div>
}

export default StyledTextArea