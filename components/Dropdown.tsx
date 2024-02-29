"use client"

import { useEffect } from "react";


export interface DropdownProps {
    options: {
        title: string,
        onClick: () => void
    }[],
    openDropdown: boolean,
    setOpenDropdown: (args0: boolean) => void
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    openDropdown,
    setOpenDropdown

}) => {
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.id !== 'dropdown' && e.target.id !== "dropdownButton") {
                setOpenDropdown(false);
            }
        }
        document.addEventListener('click', (e) => handleOutsideClick(e));

        return () => {
            document.removeEventListener('click', (e) => handleOutsideClick(e));
        }
    }, [])
    return (
        <main
            id="dropdown"
            className="bg-slate-800 z-40 rounded-md absolute py-5 min-w-32 text-neutral-300 bottom-0 right-[-50%] " >
            {
                options.map((option) => (
                    <ul key={option.title}>
                        <li
                            onClick={option.onClick}
                            className="cursor-pointer hover:bg-slate-900 h-10 w-full px-5"
                        >
                            {option.title}
                        </li>
                    </ul>
                ))
            }
        </main>
    )
}

export default Dropdown