import { Form, Button } from "react-bootstrap"

import { useNavigate } from "react-router-dom"

import { useField } from "../hooks"

const CreateNew = ({addNew, setNotification}) => {  
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    setNotification({
      content: `Anecdote: ${content.value} added`,
      variant: 'success'
    })
    navigate('/anecdotes')
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Content: </Form.Label>
          <Form.Control 
            name="content"
            {...content.setup}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author: </Form.Label>
          <Form.Control 
            name="author"
            {...author.setup}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url for more info: </Form.Label>
          <Form.Control 
            name="info"
            {...info.setup}
          />
        </Form.Group>
        <Button variant="primary" type="submit">create</Button>
        <Button variant="secondary" onClick={handleReset}>reset</Button>
      </Form>
    </div>
  )
}

export default CreateNew