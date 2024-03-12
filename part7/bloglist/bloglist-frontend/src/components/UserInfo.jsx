const UserInfo = ({ user }) => {
  return(
    <div>
      <h2> {user.name} </h2>
      <h2> Blogs created by user: </h2>
      <ul>
        {user.blogs.map((blog) => { return(
          <li key={blog.id}> {blog.title} </li>
        )})}
      </ul>
    </div>
  )
}

export default UserInfo