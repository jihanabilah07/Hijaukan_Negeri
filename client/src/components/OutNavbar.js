import React from 'react';
   import { Link } from 'react-router-dom';

   const outNavbar = () => {
     return (
       <nav className="bg-green-900 text-white p-4 shadow-md">
         <div className="container mx-auto flex justify-between items-center">
           <h1 className="text-xl font-bold">Hijaukan Negeri</h1>
           <div className="flex items-center space-x-4">
             <ul className="flex space-x-4">
               <li>
                 <Link
                   to="/login"
                   className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:text-green-900"
                 >
                   Login
                 </Link>
               </li>
               <li>
                 <Link
                   to="/TempatKonservasi"
                   className="px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:text-green-900"
                 >
                   Tempat Konservasi
                 </Link>
               </li>
             </ul>
           </div>
         </div>
       </nav>
     );
   };

   export default outNavbar;