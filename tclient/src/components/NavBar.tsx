import { NavLink } from "react-router-dom"
const NavBar = () => {
  return (
    <header className="w-full p-4 bg-yellow-300">
      <nav className="flex justify-between">
        {/* logo section */}
        <div className="flex justify-center items-center gap-x-2">
          <img src="" alt="loading" className="cursor-pointer"/>
          <NavLink to="/" className="text-blue-400 text-bold ">ChatMe</NavLink>
          
        </div>
        {/* list section */}
        <div className="flex justify-center items-center">
          <ul className="flex gap-2 justify-center items-center">
            <li>
              <input type="text" placeholder="search" className="p-1 bg-white rounded-xl outline-none border-none focus:outline-none"/>
            </li>
            <li>
              <NavLink to="/" 
              className={({ isActive }) => `(${isActive} ? "text-blue-700" : "text-blue-400") hover:text-blue-600`}>Chat</NavLink>
            </li>
            <li>
              <NavLink to="/"
              className={({ isActive }) => `(${isActive} ? "text-blue-700" : "text-blue-400") hover:text-blue-600`}
              >Message</NavLink>
            </li>
          </ul>
        </div>
        {/* profile section */}
        <div className="flex items-center justify-center">
          <div className="w-[50px] h-[50px] rounded-full z-10 bg-white flex items-center justify-center shadow-xl shadow-yellow-600">
            <NavLink to="/profile"><img src="" alt="profile" className="bg-contain"/></NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
