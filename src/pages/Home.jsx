import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div className="bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)] 
            h-screen  bg-cover bg-center  flex items-end w-full">
            <Link to="/login" className="w-full">
                <div className="bg-white pb-7 py-4 px-4 w-full">
                    <h3 className="text-2xl font-bold flex justify-center items-center">Get Started with Uber</h3>
                    <div className="bg-black flex items-center justify-center mt-5 rounded">
                        <button className="py-3 text-white">Continue</button>
                        <span className="text-white ml-2"><FaArrowRight/></span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Home;