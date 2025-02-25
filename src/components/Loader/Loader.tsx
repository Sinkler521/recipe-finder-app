import { AiOutlineLoading3Quarters } from "react-icons/ai";
import './Loader.css';

export const Loader = () => {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <AiOutlineLoading3Quarters size={38} className={"loader-animated text-gray-100"}/>
                <p className={"mt-4 text-2xl font-thin text-gray-300"}>Loading</p>
            </div>
        </>
    )
}