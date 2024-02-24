import React from 'react'
import { BiSearch } from 'react-icons/bi'

interface SearchBarProps{
    placeholder:string;
}

const SearchBar:React.FC<SearchBarProps> = ({
    placeholder
}) => {
    return (
        <main className='
        flex 
        flex-shrink-1
    rounded-lg
     gap-5
      px-5
       py-2
        items-center
         bg-slate-700  '>
            <BiSearch size={20} />
            <input className='bg-transparent outline-none' placeholder={placeholder} />
        </main>
    )
}

export default SearchBar