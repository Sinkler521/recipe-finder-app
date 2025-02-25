import Link from 'next/link';
import { IoIosSearch } from "react-icons/io";
import './Header.css';

export const Header = () => {
    return (
        <>
            <div className="w-full py-3 flex justify-end bg-gray-900">
                <Link href={"/"} className={"bg-gray-700 p-1 mr-2 rounded-md transition-all cursor-pointer hover:scale-95"}>
                    <IoIosSearch size={28} className={"text-gray-300"}/>
                </Link>
            </div>
        </>
    )
}