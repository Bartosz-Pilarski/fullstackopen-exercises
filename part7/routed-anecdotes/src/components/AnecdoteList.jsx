import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
            <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>
            </td>
            <td>
              {anecdote.author}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    <h2>Anecdotes</h2>
    <ul>
      
    </ul>
  </div>
)

export default AnecdoteList