import { useSelector } from "react-redux"

const Userlist = () => {
  const users = useSelector((state) => state.users)

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => { return (
          <tr key={user.id}>
            <td> {user.name} </td>
            <td> {user.blogs.length} </td>
          </tr>
        )})}
      </tbody>
    </table>
  )
}

export default Userlist