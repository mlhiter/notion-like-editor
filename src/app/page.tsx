'use client'

import EditableBlock from '@/components/editable-block'
import { useState } from 'react'

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
const initialBlock = { id: uid(), html: '', tag: 'p' }

export default function Home() {
  const [blocks, setBlocks] = useState([initialBlock])

  const handleUpdateBlock = (id: string, html: string, tag: string) => {
    const index = blocks.map((b) => b.id).indexOf(id)
    const updateBlocks = [...blocks]
    updateBlocks[index] = {
      ...updateBlocks[index],
      tag,
      html,
    }
    setBlocks(updateBlocks)
  }

  const handleAddBlock = (id: string) => {
    const newBlock = { id: uid(), html: '', tag: 'p' }
    const index = blocks.map((b) => b.id).indexOf(id)
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(index + 1, 0, newBlock)
    setBlocks(updatedBlocks)
  }

  const handleDeleteBlock = (id: string) => {}
  return (
    <div className="Page">
      {blocks.map((block, key) => {
        return (
          <EditableBlock
            key={key}
            id={block.id}
            tag={block.tag}
            html={block.html}
            updateBlock={handleUpdateBlock}
            addBlock={handleAddBlock}
            deleteBlock={handleDeleteBlock}
          />
        )
      })}
    </div>
  )
}
