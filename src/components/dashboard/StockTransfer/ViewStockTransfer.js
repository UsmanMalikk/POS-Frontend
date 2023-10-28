import React, { useRef, useEffect, useState } from 'react'
import { FaPrint } from "react-icons/fa"
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

const ViewStockTransfer = (props) => {

    const [stkData, setstkData] = useState([]);

    const printRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "PurchaseReport",
        copyStyles: true,
    });
    const findTotal = () => {
        let total = 0

        stkData.inputData ? (
            stkData.inputData.map((val) => {
                return total += val.subtotal;
            })
        ) : (
            // Handle the case where stkData.inputData is undefined or empty
            <p>No data available</p>
        )

        return total
    }

    const fetchStockTransfer = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/stock-transfers/${props.id}`,{
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response.data)
            response.data.date = new Date(response.data.date).toLocaleDateString()

            setstkData(response.data);
        } catch (error) {
            console.error('Error fetching Stock Tranfers:', error);
        }
    };
    useEffect(() => {
        // Make an API call to fetch user's user records
        fetchStockTransfer();

    }, []);
    return (
        <div className='w-full flex mx-3 flex-col  bg-white'>
            <div className='w-full px-2 my-2' ref={printRef}>
                <div className='flex items-start '>
                    <h1 className='text-xl'>Stock Transfer Detials (</h1>
                    <h1 className='text-xl font-bold'>Reference No:</h1>
                    <h1 className='text-xl '>{stkData.referenceNumber} )</h1>
                </div>
                <div className='h-[1px] bg-gray-300 mt-1 w-full'></div>
                <div className='flex items-end justify-end'>
                    <p className='font-bold'>Date:</p>
                    <p className='mx-1'>{stkData.date}</p>
                </div>
                <div className='grid text-xs grid-cols-1 mt-4 gap-2 md:grid-cols-3'>
                    <div className='flex   items-start flex-col '>
                        <h1 className=''>Location (From):</h1>
                        <h1 className=''>Business:</h1>
                        <h1 className=''> <span className='font-bold'>{stkData.fromLocation?.name}</span></h1>
                        <h1 className=''>{stkData.fromLocation?.landmark}</h1>
                        <h1 className=''>{stkData.fromLocation?.city},{stkData.fromLocation?.state},{stkData.fromLocation?.country}</h1>
                        <h1 className=' flex'>Mobile: <p className='mx-1'>{stkData.fromLocation?.mobileNo}</p></h1>
                    </div>
                    <div className='flex  items-start flex-col '>
                        <h1 className=''>Location (To):</h1>
                        <h1 className=''>Business:</h1>
                        <h1 className=''> <span className='font-bold'>{stkData.toLocation?.name}</span></h1>
                        <h1 className=''>{stkData.toLocation?.landmark}</h1>
                        <h1 className=''>{stkData.toLocation?.city},{stkData.toLocation?.state},{stkData.toLocation?.country}</h1>
                        <h1 className=' flex'>Mobile: <p className='mx-1'>{stkData.toLocation?.mobileNo}</p></h1>
                    </div>
                    <div className='flex  items-start flex-col '>
                        <div className='flex'>
                            <p className='font-bold'>Reference No:</p>
                            <p className='mx-1'>#{stkData.referenceNumber}</p>
                        </div>
                        <div className='flex'>
                            <p className='font-bold'>Date:</p>
                            <p className='mx-1'>{stkData.date}</p>
                        </div>

                        <div className='flex'>
                            <p className='font-bold'>Status:</p>
                            <p className='mx-1'>{stkData.status}</p>
                        </div>



                    </div>
                </div>
                <div className='flex  mt-5 ' >
                    <table className="table-fixed w-full  mb-2   px-5 ">
                        <thead>
                            <tr className='h-[50px] bg-green-500'>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">#</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Product</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Quantity</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Subtotal</th>

                            </tr>
                        </thead>
                        <tbody >
                            {(stkData.inputData) && stkData.inputData.map((value, index) => {
                                return <tr key={index} className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""}`}>
                                    <td className=" py-1 px-1">{index + 1}</td>
                                    <td className=" py-1 px-1">{value.product?.productName}</td>
                                    <td className="px-1 py-1 text-sm">{value.quantity}</td>
                                    <td className="px-1 py-1"> {value.subtotal}</td>

                                </tr>
                            })}


                        </tbody>
                        <tfoot>
                            <tr></tr>
                        </tfoot>
                    </table>
                </div>
                <div className='flex flex-col mt-11'>
                    <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1'>
                        <h1 className='font-bold'>Net Total Amount:</h1>
                        <h1 className=''>Rs {findTotal()}</h1>
                    </div>
                    <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1'>
                        <h1 className='font-bold'>Additional Shipping charges:</h1>
                        <h1 className=''>Rs {stkData.shippingCharges}</h1>
                    </div>
                    <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1'>
                        <h1 className='font-bold'>Purchase Total:</h1>
                        <h1 className=''>Rs {stkData.totalAmount}</h1>
                    </div>

                </div>
            </div>
            <div className='flex items-end justify-end mx-4'>
                <div className='flex bg-green-400 text-white cursor-pointer px-2 py-1' onClick={handlePrint}>
                    <FaPrint size={15} />
                    <h1 className='text-sm mx-1'>Print</h1>
                </div>
            </div>
        </div>
    )
}

export default ViewStockTransfer