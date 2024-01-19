import { useEffect, useRef, useState } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

interface EditableBlockProps {
  id: string
  html: string
  tag: string
  updateBlock: (id: string, html: string, tag: string) => void
  addBlock: (id: string) => void
  deleteBlock: (id: string) => void
}

const EditableBlock = ({
  id,
  html,
  tag,
  updateBlock,
  addBlock,
  deleteBlock,
}: EditableBlockProps) => {
  const contentEditableRef = useRef(null)
  const [state, setState] = useState({ html: '', tag: 'p' })
  const prevHtml = useRef(html)
  const prevTag = useRef(tag)

  // initial
  useEffect(() => {
    setState({ html, tag })
  }, [html, tag])

  const handleChange = (e: ContentEditableEvent) => {
    setState({ html: e.target.value, tag })
  }

  // update
  useEffect(() => {
    if (prevHtml.current !== state.html || prevTag.current !== state.tag) {
      updateBlock(id, state.html, state.tag)
      prevHtml.current = state.html
      prevTag.current = state.tag
    }
  }, [state.html, state.tag])

  return (
    <ContentEditable
      className="Block"
      innerRef={contentEditableRef}
      html={state.html}
      tagName={state.tag}
      onChange={handleChange}
    />
  )
}

export default EditableBlock
