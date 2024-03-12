import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/Users">Users</Link>
    </div>
  )
}

export default Menu