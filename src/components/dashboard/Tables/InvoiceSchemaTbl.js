import React, { useRef, useState, useEffect } from 'react'
import { FaEdit, FaInfoCircle, FaSearch, FaBan } from 'react-icons/fa'

import { AiOutlinePlus } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import AddorEditInvoiceScheme from '../settings/invoiceStng/AddorEditInvoiceScheme';
import axios from 'axios';
import { FcCheckmark } from 'react-icons/fc';


const InvoiceSchemaTbl = () => {

    const printRef = useRef()

    const [col1, setCol1] = useState(false)
    const [col2, setCol2] = useState(false)
    const [col3, setCol3] = useState(false)
    const [col4, setCol4] = useState(false)
    const [col5, setCol5] = useState(false)
    const [col6, setCol6] = useState(false)


    const [permission, setPermission] = useState(false)
    const [isAlert, setIsAlert] = useState(false)
    const [isdelete, setIsdelete] = useState(false)
    const [deleteId, setDeleteId] = useState(0)

    const [invoicesData, setInvoicesData] = useState([]);

    const [crpage, setCrpage] = useState(1)
    const rcrdprpg = 5
    const lasIndex = crpage * rcrdprpg
    const frstIndex = lasIndex - rcrdprpg
    const record = invoicesData.slice(frstIndex, lasIndex)
    const npage = Math.ceil(invoicesData.length / rcrdprpg)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    //Function to print


    const prevPage = () => {
        if (crpage !== 1) {
            setCrpage(crpage - 1)
        }
    }
    const nextPage = () => {
        if (crpage !== numbers.length) {
            setCrpage(crpage + 1)
        }
    }
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [iseidtId, setIseidtId] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const displayData = () => {
        if (isAdd === true) {
            return <AddorEditInvoiceScheme id={0} />
        } else if (isEdit === true && iseidtId !== 0) {
            return <AddorEditInvoiceScheme id={iseidtId} />
        }
    }
    const fetchInvoices = async () => {
        // let final = "final"
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/invoices`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            setInvoicesData(response.data);
        } catch (error) {
            console.error('Error fetching Expenses:', error);
        }
    };
    useEffect(() => {

        fetchInvoices();
        const runDelete = () => {
            if (permission === true) {

                handleDeleteInvoice(deleteId)
            }
        }
        runDelete()

    }, [permission]);
    const handleDeleteInvoice = async (expId) => {
        try {
            // Make an API call to delete attendance for a specific record
            const response = await axios.delete(`http://localhost:8000/admin/invoices/${expId}`);
            console.log('Expense deleted:', response.data); // Handle success response
            fetchInvoices()
        } catch (error) {
            console.error('Error deleting Expense:', error);
        }
    };
    const Alert = () => {
        return (
            <div className="flex flex-col items-center px-4 justify-center w-[300px] py-5 h-[200px] bg-white rounded-md">
                <FcCheckmark size={100} className="items-center justify-center" />
                <h1 className="text-4xl text-gray-500 text-center ">Are you sure!</h1>
                <div className="flex items-center w-full justify-between mt-5">
                    <button onClick={() => { setPermission(false); setIsAlert(false); setIsdelete(false) }} className="text-md rounded-md mx-2 px-2 py-1 bg-red-500 text-white">Cancel</button>
                    <button onClick={() => { setPermission(true); setIsAlert(false); setIsdelete(false) }} className="text-md rounded-md mx-2 px-2 py-1 bg-green-500 text-white">OK</button>

                </div>
            </div>
        )
    }
    return (
        <div className='bg-white w-full '>
            <div className='flex justify-between mt-2 text-sm mx-5'>
                <div className='flex flex-col'>
                    <h1 className='text-xl font-semibold text-start'>All your Invoice Scheme</h1>
                </div>
                <button onClick={() => { setIsAdd(true); setIsClicked(true) }} className='flex items-center justify-center mx-5 font-semibold w-20 h-10 rounded-md mt-3 text-white bg-blue-500'>
                    <AiOutlinePlus size={15} /> Add

                </button>

            </div>
            <div className='flex mt-5 flex-col md:flex-row  items-center justify-center md:justify-between mx-5'>



                <div className='flex items-center justify-center  w-[300px] md:w-auto my-2 md:my-0 border-[1px] border-black'>
                    <FaSearch size={15} className=' mt-1 mx-1' />
                    <input className=' focus:outline-none px-2' type='search' id="search" name='serch' placeholder='Search' />
                </div>


            </div>


            <div className='flex flex-col justify-center items-center mt-5 mx-5' ref={printRef} >
                <table id='usertbl' className="table-auto w-full mb-10  whitespace-no-wrap ">
                    <thead>
                        <tr className=''>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200 relative">
                                <div className="flex">
                                    Name
                                    <FaInfoCircle onMouseOver={() => { setCol1(true) }} onMouseLeave={() => { setCol1(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                                    {col1 &&
                                        <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                            <p className='text-start mt-2 text-gray-800'>Give a short meangingful name to the Invoice Schema.</p>

                                        </div>
                                    }
                                </div>
                            </th>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200 relative">
                                <div className="flex">
                                    Prefix
                                    <FaInfoCircle onMouseOver={() => { setCol2(true) }} onMouseLeave={() => { setCol2(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                                    {col2 &&
                                        <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                            <p className='text-start mt-2 text-gray-800'>Prefix for an Invoice Scheme.</p>
                                            <p className='text-start mt-2 text-gray-800'>A prefix can be a custom text or current year . Ex: #XXXXX000, #2018-0002</p>

                                        </div>
                                    }
                                </div>
                            </th>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200 relative">
                                <div className="flex">
                                    Numbering Type
                                    <FaInfoCircle onMouseOver={() => { setCol3(true) }} onMouseLeave={() => { setCol3(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                                    {col3 &&
                                        <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                            <p className='text-start mt-2 text-gray-800'>Sequential will generate number serially like 1,2,3,4.</p>
                                            <p className='text-start mt-2 text-gray-800'>Aleatory will generate number randomly</p>

                                        </div>
                                    }
                                </div>
                            </th>

                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200 relative">
                                <div className="flex">
                                    Invoice Count
                                    <FaInfoCircle onMouseOver={() => { setCol5(true) }} onMouseLeave={() => { setCol5(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                                    {col5 &&
                                        <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                            <p className='text-start mt-2 text-gray-800'>Total number of invoice generated for the Invoice Scheme.</p>

                                        </div>
                                    }
                                </div>
                            </th>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200 relative">
                                <div className="flex">
                                    Number of digits
                                    <FaInfoCircle onMouseOver={() => { setCol6(true) }} onMouseLeave={() => { setCol6(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                                    {col6 &&
                                        <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                            <p className='text-start mt-2 text-gray-800'>Length of the invoice number excluing Invoice Number.</p>

                                        </div>
                                    }
                                </div>
                            </th>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200 relative">Action

                            </th>




                        </tr>
                    </thead>
                    <tbody >
                        {record.map((value, index) => {
                            return <tr key={index} className={`${(index + 1) % 2 === 0 ? "bg-gray-100" : ""}`}>
                                <td className="px-1 py-1 text-sm">{value.name}</td>
                                <td className="px-1 py-1"> {value.namePrefix}</td>
                                <td className="px-1 py-1 text-sm">{value.numberingTypes}</td>
                                <td className="px-1 py-1"> {value.currentInvoiceNumber}</td>
                                <td className="px-1 py-1 text-sm">{value.numberOfDigits}</td>
                                <td className='py-1 flex justify-center'>
                                    <button onClick={() => { setIsClicked(true); setIsEdit(true); setIseidtId(value._id) }} className='flex mx-1 p-1 items-center bg-blue-600 text-white justify-center'>
                                        <FaEdit size={15} />
                                        <h1 className='text-sm mx-1'>Edit</h1>
                                    </button>
                                    <button
                                        className={`flex mx-3 p-1 items-center text-white justify-center ${value.isDefault ? 'bg-green-600' : 'bg-red-600'
                                            }`}
                                        onClick={() => {
                                            if (!value.isDefault) {
                                                setIsAlert(!isClicked);
                                                setIsdelete(true)
                                                setDeleteId(value._id)
                                            }
                                        }}
                                        disabled={value.isDefault}
                                    >
                                        {value.isDefault ? 'Default' : 'Delete'}
                                    </button>

                                </td>
                            </tr>
                        })}


                    </tbody>
                </table>
                <nav className='  my-2 w-full'>
                    <ul className='flex justify-end'>
                        <li>
                            <button disabled={crpage === 1 ? true : false} className='p-3 mx-1 bg-green-400 text-white' onClick={prevPage}> Previous</button>
                        </li>
                        {
                            numbers.map((n, i) => {
                                return <li key={i} className={`${crpage === n ? 'bg-blue-500' : ''} py-3 px-4 mx-1 border-[1px] border-gray-400`}>
                                    <button onClick={() => { setCrpage(n) }}>{n}</button>
                                </li>
                            })
                        }
                        <li>
                            <button className='p-3 bg-green-400 text-white mx-1 ' onClick={nextPage}> Next</button>
                        </li>
                    </ul>
                </nav>

                {isClicked &&
                    <div className='absolute top-0  flex flex-col  items-center  right-0 bg-black/50 w-full min-h-screen'>
                        <div className='w-full md:w-[50%]   mt-10 bg-white px-5 pt-2'>
                            <div className='flex items-end justify-end '>
                                <MdCancel onClick={() => { setIsClicked(false); setIsAdd(false); setIsEdit(false); setIseidtId(0) }} size={20} />

                            </div>
                            {displayData()}
                        </div>

                    </div>

                }
                {isAlert &&
                    <div className="absolute top-0 flex flex-col items-center  justify-center right-0 bg-black/70 w-full min-h-screen">
                        {isdelete && <Alert />}
                    </div>
                }
            </div>
        </div>
    )
}

export default InvoiceSchemaTbl