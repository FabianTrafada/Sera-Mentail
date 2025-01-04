
import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const TextArea = () => {
  return (
    <div className="flex flex-col w-full gap-2">
    <Textarea placeholder="Type your message here." />
    <Button>Send message</Button>
  </div>
  )
}

export default TextArea
