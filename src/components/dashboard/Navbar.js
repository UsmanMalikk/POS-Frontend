import React, { useState,useEffect } from 'react'
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai"
import { MdCancel, MdNotifications } from "react-icons/md"
// import { motion } from "framer-motion"
import { BiLogOut } from "react-icons/bi"
import { BsInfoLg } from 'react-icons/bs'
import { FaArrowAltCircleDown, FaCalculator, FaMoneyBillAlt, FaPlusCircle, FaThLarge } from 'react-icons/fa'
import Calculator from './Calculator'
import { useSelector, useDispatch } from 'react-redux'
import { setTrue, setFalse } from '../../app/clickedSlice'
import { useNavigate } from "react-router-dom"
import TodaysProfit from './TodaysProfit'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Navbra = () => {
    const Navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    const clicked = useSelector((state) => state.sidebar.value)

    const dispatch = useDispatch()
    const [arrow, setArrow] = useState(false)
    const [money, setMoney] = useState(false)
    const [pos, setPos] = useState(false)
    const [cal, setCal] = useState(false)
    const [shcal, setShcal] = useState(false)
    const [usrcliked, setUsrcliked] = useState(false)
    const handleMenu = () => {
        if (clicked === true) {
            dispatch(setFalse())
        } else {
            dispatch(setTrue())
        }
    }
    const openNewTab=  (URl)=>{
        const url = URl;
        window.open(url,'_blank')
    }
    const [isCliked, setIsCliked] = useState(false)
    const [isshow, setIsshow] = useState(false);
    
const fetchLoggedInUser = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/users/profile`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching Profile:', error);
        }
    };
    const fetchTheme = async () => {

        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8000/admin/system-color`, {
            headers: {
              'Authorization': token
            }
          });
          // console.log(response.data)
          setSelectedTheme(response.data.themeColor);
      
        } catch (error) {
          console.error('Error fetching Prefixes:', error);
        }
      };
    useEffect(() => {
        // Make an API call to fetch user's roles records
        
        fetchLoggedInUser()
        fetchTheme()
        
    }, []);
    const [selectedTheme, setSelectedTheme] = useState("")
    const getColor = () => {
        if (selectedTheme === "black-light") {
            return 'bg-[#3c3c4e]'
        }else if(selectedTheme === "blue"){
            return 'bg-[#2b80ec]'
        }else if(selectedTheme === "black"){
            return 'bg-[#3c3c4e]'
        }else if(selectedTheme === 'purple'){
            return 'bg-[#605ca8]' 
        }else if(selectedTheme === 'green'){
            return 'bg-[#2dce89]' 
        }else if(selectedTheme === "red"){
            return 'bg-[#f5365c]'
        }else if(selectedTheme === "yellow"){
            return 'bg-[#ffad46]'
        }else if(selectedTheme === 'blue-light'){
            return 'bg-[#1572e8]' 
        }else if(selectedTheme === 'green-light'){
            return 'bg-[#2dce89]' 
        }else if(selectedTheme === 'red-light'){
            return 'bg-[#f5365c]' 
        }else if(selectedTheme === 'purple-light'){
            return 'bg-[#605ca8]' 
        }
    }
    const themeColor = () => {
        if (selectedTheme === "black-light") {
            return 'bg-gradient-to-r from-[#3c3c4e] to-[#245b80]'
        }else if(selectedTheme === "blue"){
            return 'bg-gradient-to-r from-[#2b80ec] to-[#1d1f33]'
        }else if(selectedTheme === "black"){
            return 'bg-gradient-to-r from-[#3c3c4e] to-[#245b80]'
        }else if(selectedTheme === "purple"){
            return 'bg-gradient-to-r from-[#706db1] to-[#245b80]'
        }else if(selectedTheme === "green"){
            return 'bg-gradient-to-r from-[#3fd595] to-[#1b9aaa]'
        }else if(selectedTheme === "red"){
            return 'bg-gradient-to-r from-[#f64e70] to-[#245b80]'
        }else if(selectedTheme === "yellow"){
            return 'bg-gradient-to-r from-[#ffb860] to-[#245b80]'
        }else if(selectedTheme === "blue-light"){
            return 'bg-gradient-to-r from-[#2b80ec] to-[#1d1f33]'
        }else if(selectedTheme === "purple-light"){
            return 'bg-gradient-to-r from-[#706db1] to-[#245b80]'
        }else if(selectedTheme === "green-light"){
            return 'bg-gradient-to-r from-[#3fd595] to-[#1b9aaa]'
        }else if(selectedTheme === "red-light"){
            return 'bg-gradient-to-r from-[#f64e70] to-[#245b80]'
        }


    }


const handleLogout = async () => {
        try {

            localStorage.removeItem('token'); // Clear token from local storage
            Navigate("/");
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const data = new Date()
    let fullyear = data.getFullYear()
    let fullmonth = data.getMonth() + 1
    let fuldate = data.getDate()
    const date = fuldate + "/" + fullmonth + "/" + fullyear;
    return (
        <div>
            <div className='flex w-full h-[10vh]   bg-gray-700  border-b-2 border-gray-400    justify-between '>
            <div className={`${clicked ? "md:w-[4%]" : "w-0 md:w-[17%]"}   ${getColor()} justify-center hidden md:flex items-center`}>

                    {!clicked && <h1 className='text-xl text-center  text-white  '> EZI POINT OF SALE</h1>}
                </div>
                <div className={`w-full ${clicked ? " md:w-[96%]" : "w-[96%] md:w-[83%]"} flex justify-between ${themeColor()}`}>

                    <div className='w-[30%]  flex items-center '>
                        <div className='px-5  flex'>
                            <AiOutlineMenu onClick={handleMenu} className='text-white cursor-pointer text-xl ' />
                        </div>
                    </div>
                    <div className='w-[70%]   relative items-center rounded-r-2xl  flex lg:flex'>
                        <div className='w-[85%] h-full flex items-center justify-end'>
                            
                            <button className='hidden md:flex py-1.5 px-2 relative mx-1 bg-green-300 text-white' onMouseOver={() => { setCal(true) }} onMouseLeave={() => { setCal(false) }} onClick={() => { setShcal(!shcal) }}><FaCalculator size={15} />
                                {cal && <div className="absolute top-8 text-sm rounded-sm flex z-10 text-white bg-black p-1">Calculator</div>}
                            </button>
                            {shcal && <div className='absolute top-14 right-80 z-20'> <Calculator /></div>}
                            <Link  onClick={()=>{openNewTab("/pos/create")}} className='py-1 md:px-1 relative mx-1 bg-green-300 text-white flex items-center justify-center' onMouseOver={() => { setPos(true) }} onMouseLeave={() => { setPos(false) }}><FaThLarge size={15} /> <span className='mx-2 font-semibold text-sm'>POS</span>
                                {pos && <div to="/login" className="absolute text-sm rounded-sm flex top-8 z-10 text-white bg-black md:p-1">POS</div>}
                            </Link>
                           


                            <h1 className='mx-2 text-white font-bold textsm'>{date}</h1>
                            
                        </div>
                        <div className='flex w-[15%]  h-[80%] justify-center items-center mx-2 relative hover:bg-black' onClick={() => { setUsrcliked(!usrcliked) }}>
                            <h1 className='text-sm  text-white'>{userData.firstName+" "+userData.lastName}</h1>
                        </div>
                        {usrcliked &&
                            <div className='w-[250px] h-[175px] bg-gray-100  absolute top-12 z-20 right-5 border-[1px] border-black  flex  flex-col'>
                                <div className='flex bg-[#3c3c4e] h-[120px] p-1'>
                                    <img className='w-full' src="data:image/png;base64,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" alt="Profile" />
                                </div>
                                <button className='flex px-2 py-3 h-[30px] w-full justify-between '>
                                    <Link to={"/home/users/profile"} className='flex items-center p-1 border-[1px] border-gray-400'>
                                        <AiOutlineUser size={20} />
                                        <h1 className='text-xl font-semibold'>Profile</h1>
                                    </Link>
                                    <div onClick={handleLogout} className='flex items-center py-1 border-[1px] border-gray-400'>
                                        <BiLogOut size={20} />
                                        <h1 className='text-xl font-semibold'>Logout</h1>
                                    </div>

                                </button>
                            </div>
                        }

                    </div>
                </div>
            </div>
            {isCliked && (
                <div className="absolute top-0 z-30 flex flex-col items-center  justify-center right-0 bg-black/70 w-full min-h-screen">
                    <div className="flex flex-col   w-full md:w-[75%]  mt-10 bg-white px-5 pt-2">
                        <div className="flex items-end justify-end ">
                            <MdCancel
                                onClick={() => {
                                    setIsCliked(!isCliked);
                                    setIsshow(false);

                                }}
                                size={20}
                            />
                        </div>
                        
                    </div>
                </div>
            )}
        </div>

    )

}



export default Navbra