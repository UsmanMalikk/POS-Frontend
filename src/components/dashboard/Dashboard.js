import React, { useState, useEffect } from 'react'
import { AiFillInfoCircle, AiOutlineCalendar, } from 'react-icons/ai'
import Chart1 from './Chart1'
import Chart2 from './Chart2'
import SlspmntDueTbl from './Tables/SlspmntDueTbl'
import PrchspmntDueTbl from './Tables/PrchspmntDueTbl'
import PrdctstkAlrtTbl from './Tables/PrdctstkAlrtTbl'
import SlsOrderTbl from './Tables/SlsOrderTbl'
import PrchsOrderTbl from './Tables/PrchsOrderTbl'
import PndngShpmntTbl from './Tables/PndngShpmntTbl'
import axios from 'axios';


const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [purchasesData, setPurchasesData] = useState([]);
    const [expansesData, setExpansesData] = useState([]);
    const [saleDuesData, setSaleDuesData] = useState([]);
    const [purchaseDuesData, setPurchaseDuesData] = useState([]);


    const dateArray = [

        "Yesterday",
        "Last 7 Days",
        "Last 30 Days",
        "This Month",
        "Last Month",
        "This month last year",
        "This Year",
        "Last Year",
        "Current financial year",
        "Last financial year",
        "Custom Range",
    ]
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
    const fetchSales = async () => {
        // let final = "final"
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/sales/final`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            // console.log(response.data)
            setSalesData(response.data);
        } catch (error) {
            console.error('Error fetching Drafts:', error);
        }
    };

    const fetchExpanses = async () => {
        // let final = "final"
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/add-expenses`, {
                headers: {
                    'Authorization': token
                }
            });
            //   console.log(response)
            setExpansesData(response.data);
        } catch (error) {
            console.error('Error fetching Expenses:', error);
        }
    };
    const findTotalExpense = () => {
        let total = 0
        expansesData.map(val => {
            return total += (parseFloat(val.totalAmount))
        })
        return total
    }

    const fetchTheme = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/system-color`, {
                headers: {
                    'Authorization': token
                }
            });
            setSelectedTheme(response.data.themeColor);

        } catch (error) {
            console.error('Error fetching Prefixes:', error);
        }
    };
    const findTotalPurchase = () => {
        let total = 0
        purchasesData.map(val => {
            return total += parseFloat(val.totalPurchaseAmount)
        })
        return total
    }
    const fetchPurchases = async () => {
        // let final = "final"
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/purchases`, {
                headers: {
                    'Authorization': token
                }
            });
            setPurchasesData(response.data);
        } catch (error) {
            console.error('Error fetching Drafts:', error);
        }
    };
    const fetchSaleDues = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/admin/contacts/customer/dues`);
            console.log(response);
            setSaleDuesData(response.data);

        } catch (e) {
            console.error(e)
        }

    }
    const fetchPurchaseDues = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/admin/contacts/supplier/dues`);
            console.log(response);
            setPurchaseDuesData(response.data);

        } catch (e) {
            console.error(e)
        }

    }

    useEffect(() => {
        fetchPurchases()
        fetchSales()
        fetchLoggedInUser()
        fetchExpanses()
        fetchTheme()
        fetchSaleDues()
        fetchPurchaseDues()

    }, []);
    const findTotalAmount = () => {
        let total = 0
        salesData.map(val => {
            return total += parseFloat(val.totalSaleAmount)
        })
        return total
    }
    const findTotalPurchaseDue = () => {
        let total = 0
        purchasesData.map(val => {
            return total += (parseFloat(val.totalPurchaseAmount) - parseFloat(val.amount))
        })
        return total
    }
    const findTotalSellDue = () => {
        let total = 0
        salesData.map(val => {
            return total += (parseFloat(val.totalSaleAmount) - parseFloat(val.amount))
        })
        return total
    }
    const [selectedTheme, setSelectedTheme] = useState("")
    const getColor = () => {
        if (selectedTheme === "black-light") {
            return 'bg-[#3c3c4e]'
        } else if (selectedTheme === "blue") {
            return 'bg-[#2b80ec]'
        } else if (selectedTheme === "black") {
            return 'bg-[#3c3c4e]'
        } else if (selectedTheme === 'purple') {
            return 'bg-[#605ca8]'
        } else if (selectedTheme === 'green') {
            return 'bg-[#2dce89]'
        } else if (selectedTheme === "red") {
            return 'bg-[#f5365c]'
        } else if (selectedTheme === "yellow") {
            return 'bg-[#ffad46]'
        } else if (selectedTheme === 'blue-light') {
            return 'bg-[#1572e8]'
        } else if (selectedTheme === 'green-light') {
            return 'bg-[#2dce89]'
        } else if (selectedTheme === 'red-light') {
            return 'bg-[#f5365c]'
        } else if (selectedTheme === 'purple-light') {
            return 'bg-[#605ca8]'
        }
    }
    const themeColor = () => {
        if (selectedTheme === "black-light") {
            return 'bg-gradient-to-r from-[#3c3c4e] to-[#245b80]'
        } else if (selectedTheme === "blue") {
            return 'bg-gradient-to-r from-[#2b80ec] to-[#1d1f33]'
        } else if (selectedTheme === "black") {
            return 'bg-gradient-to-r from-[#3c3c4e] to-[#245b80]'
        } else if (selectedTheme === "purple") {
            return 'bg-gradient-to-r from-[#706db1] to-[#245b80]'
        } else if (selectedTheme === "green") {
            return 'bg-gradient-to-r from-[#3fd595] to-[#1b9aaa]'
        } else if (selectedTheme === "red") {
            return 'bg-gradient-to-r from-[#f64e70] to-[#245b80]'
        } else if (selectedTheme === "yellow") {
            return 'bg-gradient-to-r from-[#ffb860] to-[#245b80]'
        } else if (selectedTheme === "blue-light") {
            return 'bg-gradient-to-r from-[#2b80ec] to-[#1d1f33]'
        } else if (selectedTheme === "purple-light") {
            return 'bg-gradient-to-r from-[#706db1] to-[#245b80]'
        } else if (selectedTheme === "green-light") {
            return 'bg-gradient-to-r from-[#3fd595] to-[#1b9aaa]'
        } else if (selectedTheme === "red-light") {
            return 'bg-gradient-to-r from-[#f64e70] to-[#245b80]'
        }


    }

    return (
        <>
            <div className='flex flex-col relative w-full min-h-[400px]'>
                <div className={`flex flex-col h-[250px]  z-0 w-full border-t-[1px] border-white ${themeColor()}`}>

                    <h1 className='flex text-2xl text-white p-5'>Welcome {userData.firstName + " " + userData.lastName},</h1>

                    <div className='flex justify-end  items-center w-full h-10 '>
                        <div className='w-[200px] text-white flex items-center justify-center h-10 bg-blue-500 rounded-md mx-5'>
                            <AiOutlineCalendar size={20} className='mx-2' />
                            <select id='filter' name='filter' className=' flex w-[160px]  text-white  justify-center items-center py-2  px-5 bg-transparent'>
                                <option value={""} className='text-black'>Fiter by Date</option>
                                {dateArray.map((val, index) => {
                                    return <option key={index} value={val} className='text-black'>{val}</option>

                                })}

                            </select>
                        </div>
                    </div>


                </div>
                <div className=' md:absolute w-full px-5 z-10 md:top-[140px] grid grid-cols-1 md:grid-cols-4 gap-3 sm:flex-col'>
                    <div className='flex items-center  shadow-sm shadow-gray-400 justify-center h-[90px] bg-white rounded-xl '>
                        <div className='flex w-[60px] h-[60px] items-center justify-center mx-2 rounded-full bg-blue-400 text-white'>
                            <AiOutlineCalendar size={30} />
                        </div>
                        <div className='flex flex-col items-center  justify-center mx-2'>
                            <h1 className='text-md text-gray-500 font-semibold text-start'> TOTAL SALES</h1>
                            <h1 className='text-2xl text-start font-semibold'> Rs {findTotalAmount()}</h1>

                        </div>
                    </div>
                    <div className='flex items-center shadow-sm shadow-gray-400 justify-center h-[90px] bg-white rounded-xl '>
                        <div className='flex w-[60px] h-[60px] items-center justify-center mx-2 rounded-full bg-green-400 text-white'>
                            <AiOutlineCalendar size={30} />
                        </div>
                        <div className='flex flex-col items-center justify-center mx-2'>
                            <h1 className='text-md text-gray-500 font-semibold text-start flex items-center justify-center '> Sell Due  <AiFillInfoCircle size={15} style={{ color: "blue" }} className='mx-2' /> </h1>
                            <h1 className='text-2xl text-start font-semibold'> Rs {findTotalSellDue()}</h1>

                        </div>
                    </div>


                    <div className='flex items-center shadow-sm shadow-gray-400 justify-center h-[90px] bg-white rounded-xl '>
                        <div className='flex w-[60px] h-[60px] items-center justify-center mx-2 rounded-full bg-blue-500 text-white'>
                            <AiOutlineCalendar size={30} />
                        </div>
                        <div className='flex flex-col items-center justify-center mx-2'>
                            <h1 className='text-md text-gray-500 font-semibold text-start'> TOTAL PURCHASE</h1>
                            <h1 className='text-2xl text-start font-semibold'> Rs {findTotalPurchase()}</h1>

                        </div>
                    </div>
                    <div className='flex items-center shadow-sm shadow-gray-400 justify-center h-[90px] bg-white rounded-xl '>
                        <div className='flex w-[60px] h-[60px] items-center justify-center mx-2 rounded-full bg-orange-400 text-white'>
                            <AiOutlineCalendar size={30} />
                        </div>
                        <div className='flex flex-col items-center justify-center mx-2'>
                            <h1 className='text-md text-gray-500 font-semibold text-start'> PURCHASE DUE</h1>
                            <h1 className='text-2xl text-start font-semibold'> Rs {findTotalPurchaseDue()}</h1>

                        </div>
                    </div>

                    <div className='flex items-center shadow-sm shadow-gray-400 justify-center h-[90px] bg-white rounded-xl '>
                        <div className='flex w-[60px] h-[60px] items-center justify-center mx-2 rounded-full bg-red-500 text-white'>
                            <AiOutlineCalendar size={30} />
                        </div>
                        <div className='flex flex-col items-center justify-center mx-2'>
                            <h1 className='text-md text-gray-500 font-semibold text-start'> EXPENSE</h1>
                            <h1 className='text-2xl text-start font-semibold'> Rs {findTotalExpense()}</h1>
                        </div>
                    </div>


                </div>
            </div>
            <Chart1 />
            <Chart2 />
            <div className=' mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 '>
                <SlspmntDueTbl saleDuesData={saleDuesData}/>
                <PrchspmntDueTbl purchaseDuesData = {purchaseDuesData}/>

            </div>


            <div className='mt-3 flex'>
                <PndngShpmntTbl />
            </div>


        </>

    )
}

export default Dashboard