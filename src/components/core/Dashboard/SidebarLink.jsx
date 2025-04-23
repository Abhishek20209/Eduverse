import React from 'react'
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';



const SidebarLink = ({link,iconName}) => {

    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();

    const matchRoute=(route)=>{
        return  matchPath({path:route},location.pathname);
    }

  return (
    <NavLink
     to={link.path}
     className={`relative px-8 py-2 text-sm font-medium ${
      matchRoute(link.path) ? "bg-yellow-400" : "bg-opacity-0"
    }`}
     >

        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opcaity-100" :"opacity-0"}`}></span>

        <div className='flex item-center gap-x-2'>
            <Icon className="text-lg" />
            <span>{link.name}</span>
        </div>

    </NavLink>
  )
}

export default SidebarLink

// const SidebarLink = ({ link, iconName }) => {
//   const Icon = Icons[iconName];
//   const dispatch = useDispatch();

//   return (
//       <NavLink
//           to={link.path}
//           className={({ isActive }) =>
//               `relative px-8 py-2 text-sm font-medium ${isActive ? "bg-yellow-50" : "bg-opacity-0"}`
//           }
//       >
//           {({ isActive }) => (
//               <>
//                   <span
//                       className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 transition-opacity duration-300 ${
//                           isActive ? "opacity-100" : "opacity-0"
//                       }`}
//                   ></span>
//                   <div className='flex items-center gap-x-2'>
//                       <Icon className="text-lg" />
//                       <span>{link.name}</span>
//                   </div>
//               </>
//           )}
//       </NavLink>
//   );
// };

// export default SidebarLink