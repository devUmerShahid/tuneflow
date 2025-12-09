// client/src/components/Footer.jsx
import { Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/95 border-t border-gray-800 py-8 mt-20">
      {/* ADD lg:ml-72 TO PUSH FOOTER RIGHT OF SIDEBAR */}
      <div className="max-w-7xl mx-auto px-6 lg:ml-72 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        
        {/* Copyright */}
        <div className="flex items-center gap-2">
          <span>© {currentYear} TuneFlow</span>
          <span className="hidden sm:inline">•</span>
          <span>All rights reserved</span>
        </div>

        {/* Made with love + GitHub */}
        <div className="flex items-center gap-6">
          <p className="flex items-center gap-2">
            Made with 
            <span className="text-red-500 text-xl animate-pulse">❤️</span> 
            by <span className="font-semibold text-white">Umer Shahid</span>
          </p>

          <a
            href="https://github.com/devUmerShahid"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition group"
          >
            <Github size={20} className="group-hover:scale-110 transition" />
            <span className="font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}








// // client/src/components/Footer.jsx
// import { Github } from 'lucide-react'

// export default function Footer() {
//   const currentYear = new Date().getFullYear()

//   return (
//     <footer className="bg-black/95 border-t border-gray-800 py-8 mt-20 lg:m-50">
//       <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        
//         {/* Copyright */}
//         <div className="flex items-center gap-2">
//           <span>© {currentYear} TuneFlow</span>
//           <span className="hidden sm:inline">•</span>
//           <span>All rights reserved</span>
//         </div>

//         {/* Made with love + GitHub */}
//         <div className="flex items-center gap-6">
//           <p className="flex items-center gap-2">
//             Made with 
//             <span className="text-red-500 text-xl animate-pulse">❤️</span> 
//             by <span className="font-semibold text-white">Umer Shahid</span>
//           </p>

//           {/* GitHub Link */}
//           <a
//             href="https://github.com/devUmerShahid"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-2 hover:text-white transition group"
//           >
//             <Github size={20} className="group-hover:scale-110 transition" />
//             <span className="font-medium">GitHub</span>
//           </a>
//         </div>
//       </div>
//     </footer>
//   )
// }