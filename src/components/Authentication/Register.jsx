import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsFillTelephoneInboundFill } from "react-icons/bs";
import { AiFillMail, AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import axios from "../../axios";
import { setUser } from "../../redux/slices/usersSlice";

function Register({ setView, view }) {
    const [data, setData] = useState({
        name: "",
        email: "",
        country: "",
        phoneNumber: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { initialData } = useSelector((state) => state.home);
    const { home } = useSelector((state) => state.general);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const response = await axios.post("/users/signup", data);
            dispatch(setUser(response.data));
            setIsLoading(false);
            setView(!view)
        } catch (err) {
            setError(
                err?.response?.data?.error || "Something went wrong, Try again"
            );
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-30 modal_overlay" onClick={() => setView(!view)}>
            <div className={`absolute right-20  top-16 flex justify-center items-center bg-trans text-darktext h-16 w-16 rounded-full text-4xl`}
                onClick={() => setView(!view)}
            >
                <AiOutlineClose />
            </div>

            <div className="flex justify-center items-center w-full h-[100vh] z-50">
                <div className="h-[75vh] w-8/12 bg-[#fcfeff]  rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    <div className="m-4 h-[96%] relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            className="absolute -bottom-14"
                        >
                            <path
                                fill="#ffffff"
                                fill-opacity="1"
                                d="M0,64L120,85.3C240,107,480,149,720,160C960,171,1200,149,1320,138.7L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                            ></path>
                        </svg>
                        <div className=" bgdubai h-[100%]  bg-right rounded-2xl flex justify-between items-center pr-6">
                            <div className="h-full flex items-end z-20">
                                <div className="mb-7">
                                    <div className="text-2xl text-darktext">
                                        Help line
                                    </div>
                                    <div className=" flex items-end space-x-2">
                                        <div className="text-sm text-text">
                                            <div className="flex space-x-2">
                                                <span className=""> <BsFillTelephoneInboundFill /> </span>
                                                <span className="">{home?.phoneNumber1}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <span className=""><BsFillTelephoneInboundFill /></span>
                                                <span className="">{home?.phoneNumber2}</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 text-text">
                                            <span className=""><AiFillMail /> </span>
                                            <span className="text-sm">{home?.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[24em] h-[40em] loginCard shadow-md  rounded-2xl">
                                <form
                                    onSubmit={handleSubmit}
                                    className="p-5 space-y-1"
                                >
                                    <div className="text-4xl text-blue font-semibold">
                                        Greetings...
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-text ">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Tell us Your Name"
                                            className="w-full placeholder:text-bluetrans bg-trans py-3 text-sm rounded-xl px-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-bluetrans"
                                            name="name"
                                            value={data.name || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-text ">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            className="w-full placeholder:text-bluetrans bg-trans py-3 text-sm rounded-xl px-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-bluetrans "
                                            name="email"
                                            value={data.email || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex ">
                                    <div className="space-y-1">
                                        <label className="text-text ">
                                            code
                                        </label>
                                        <select
                                            name="country"
                                            id=""
                                            className="text-darktext placeholder:text-bluetrans bg-trans py-3 text-sm rounded-xl px-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-bluetrans"
                                            onChange={handleChange}
                                            value={data.country || ""}
                                        >
                                            <option value="" hidden>
                                                code
                                            </option>
                                            {initialData?.countries?.map((country, index) => {
                                                return (
                                                    <option
                                                    className="text-darktext"
                                                        value={country?._id}
                                                        key={index}
                                                    >
                                                        {country?.phonecode}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                        <div className="space-y-1">
                                            <label className="text-text ">
                                                PhoneNumber
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Your Phone Number"
                                                className="w-full placeholder:text-bluetrans bg-trans py-3 text-sm rounded-xl px-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-bluetrans"
                                                name="phoneNumber"
                                                value={data.phoneNumber || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-text ">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Give a password"
                                            className="w-full placeholder:text-bluetrans bg-trans py-3 text-sm rounded-xl px-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-bluetrans"
                                            name="password"
                                            value={data.password || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {/* <div className="text-text">
                                        <span className="text-xs">
                                            By register you agree to our
                                        </span>
                                        <span className="text-xs text-blue hover:text-sky-500 cursor-pointer underline">
                                            Terms and Conditions
                                        </span>
                                    </div> */}
                                    <div className="flex justify-center pt-2">
                                        <button
                                            type="submit"
                                            className="py-2 rounded-xl px-10 bg-blue hover:bg-light hover:text-blue text-light duration-300 flex items-center space-x-2 cursor-pointer"
                                        >
                                            <span className="">Register</span>
                                            <span className="">
                                                <AiOutlineRight />{" "}
                                            </span>
                                        </button>
                                    </div>
                                    {/* <div className="flex items-center justify-between pt-2">
                                        <button className="flex items-center space-x-2 bg-trans w-full mx-3 justify-center py-2 rounded-xl hover:bg-light hover:text-blue text-bluetrans duration-200">
                                            <span className="">
                                                <FcGoogle />
                                            </span>
                                            <span className="">Google</span>
                                        </button>
                                        <button className="flex items-center space-x-2 bg-trans w-full mx-3 justify-center py-2 rounded-xl hover:bg-light hover:text-blue text-bluetrans duration-200">
                                            <span className="text-blue">
                                                <BsFacebook />{" "}
                                            </span>
                                            <span className="">Facebook</span>
                                        </button>
                                    </div> */}
                                    <div className="text-sm pt-1">
                                        <span className="text-bluetrans">
                                            Already have an account?{" "}
                                        </span>
                                        <span
                                            className="text-blue underline cursor-pointer"
                                            onClick={() => {
                                                setView((prev) => {
                                                    return { ...prev, viewRegister: false, viewLogin: true }
                                                })
                                            }}
                                        >
                                            Login
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default Register;
