
import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const TextArea = () => {
  return (
    <div className="grid grid-cols-1 w-full gap-2">
    <Textarea placeholder="Type your message here." />
    <Button>Send message</Button>
  </div>
  )
}

export default TextArea
