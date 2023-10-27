import React, { useRef ,useState , useEffect} from 'react'
import { FaPrint } from "react-icons/fa"
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

const ViewSell = (props) => {
    const dummyData = [
        {
            id: 1,
            Username: "username",
            Name: "User",
            Role: "Admin",
            Email: "username@gmail.com"
        },
        {
            id: 2,
            Username: "username1",
            Name: "User1",
            Role: "Admin",
            Email: "username@gmail.com"
        },
        {
            id: 3,
            Username: "username2",
            Name: "User2",
            Role: "Admin",
            Email: "username2@gmail.com"
        },
        {
            id: 4,
            Username: "username3",
            Name: "User3",
            Role: "Admin",
            Email: "username3@gmail.com"
        },
        {
            id: 5,
            Username: "username4",
            Name: "User4",
            Role: "Admin",
            Email: "username4@gmail.com"
        },
        {
            id: 6,
            Username: "username5",
            Name: "User5",
            Role: "Admin",
            Email: "username5@gmail.com"
        },
        {
            id: 7,
            Username: "username6",
            Name: "User6",
            Role: "Admin",
            Email: "username6@gmail.com"
        }
    ]
  const [saleData, setSaleData] = useState([]);

    const printRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "SellReport",
        copyStyles: true,
    });
const fetchSaleById = async () => {

    try {
      // const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/sales/final/${props.id}`);
    //   console.log(response.data)
      let date = new Date(response.data.salesDate).toLocaleDateString()
      let paymentDate = new Date(response.data.paymentDate).toLocaleDateString()

      setSaleData({...response.data, salesDate : date, paymentDate:paymentDate});
    } catch (error) {
      console.error('Error fetching Sale:', error);
    }
  };
  useEffect(() => {
    // Make an API call to fetch user's user records
    fetchSaleById();

  }, []);

    return (
        <div className='w-full  flex  flex-col  bg-white'>
            <div className='w-full px-2 my-2' ref={printRef}>
                <div className='flex items-start '>
                    <h1 className='text-xl'>Sell Detials (</h1>
                    <h1 className='text-xl font-bold'>Invoice No:</h1>
                    <h1 className='text-xl '>{saleData.invoiceNumber} )</h1>
                </div>
                <div className='h-[1px] bg-gray-300 mt-1 w-full'></div>
                <div className='flex items-end justify-end'>
                    <p className='font-bold'>Date:</p>
                    <p className='mx-1'>{saleData.salesDate}</p>
                </div>
                <div className='grid grid-cols-1 mt-4 gap-2 md:grid-cols-3'>
                    <div className='flex  items-start flex-col '>
                        <div className='flex'>
                            <h1 className='font-bold'>Invoice NO: </h1>
                            <h1 className='mx-1'>#{saleData.invoiceNumber}</h1>

                        </div>
                        <div className='flex'>
                            <h1 className='font-bold'>Status: </h1>
                            <h1 className='mx-1'>{saleData.status}</h1>

                        </div>
                        <div className='flex'>
                            <h1 className='font-bold'>Payment Status: </h1>
                            <h1 className='mx-1'>{(saleData.amount < saleData.totalSaleAmount || saleData.paymentMethod === "") ? "Due" : "Paid"}</h1>

                        </div>
                    </div>
                    <div className='flex  items-start flex-col '>
                    <div className='flex'>
                            <h1 className='font-bold'>Customer Name: </h1>
                            <h1 className='mx-1'>{saleData.customer}</h1>

                        </div>
                        <div className='flex'>
                            <h1 className='font-bold'>Address: </h1>
                            {/* <h1 className='mx-1'>{(saleData.customer) ? saleData.customer.address : ""}</h1> */}

                        </div>
                        <div className='flex'>
                            <h1 className='font-bold'>Mobile: </h1>
                            {/* <h1 className='mx-1'>{(saleData.customer) ? saleData.customer.mobile : ""}</h1> */}

                        </div>
                    </div>
                    <div className='flex  items-start flex-col '>
                        
                        <div className='flex'>
                            <p className='font-bold'>Shipping:</p>
                            <p className='mx-1'>{saleData.shippingAddress} </p>
                        </div>
                        <div className='flex'>
                            <p className='font-bold'>Delivered To:</p>
                            <p className='mx-1'>{(saleData.deliveredTo) ? saleData.deliveredTo : "--"}</p>
                        </div>



                    </div>
                </div>
                <div className='flex  mt-5 ' >
                    <table className="table-auto w-full  mb-2   px-5 ">
                        <thead>
                            <tr className='h-[50px] bg-green-500'>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">#</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Product Name</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Quantity</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Unit Price</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Discount</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Subtotal</th>

                            </tr>
                        </thead>
                        <tbody >
                        {(saleData.inputData) && saleData.inputData.map((value, index) => {
                                return <tr key={index} className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""}`}>
                                    <td className=" py-1 px-1">{index + 1}</td>
                                    <td className=" py-1 px-1">{(value.product) ? value.product.productName : ""}</td>
                                    <td className="px-1 py-1"> {value.quantity}</td>
                                    <td className="px-1 py-1">{value.unitPrice}</td>
                                    <td className=" py-1 px-1">{value.discount}</td>
                                    <td className="px-1 py-1"> {value.subtotal}</td>
                                    
                                </tr>
                            })}


                        </tbody>
                        <tfoot>
                            <tr></tr>
                        </tfoot>
                    </table>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='flex flex-col'>
                        <h1 className='text-xl text-start my-2 font-bold'>Payment Info:</h1>

                        <table className="table-fixed  mb-2   px-5 ">
                            <thead>
                                <tr className='h-[50px] bg-green-500'>
                                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm px-2 ">#</th>
                                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm px-2 ">Date</th>
                                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm px-2 ">Reference No</th>
                                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm px-2 ">Amount</th>
                                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm px-2 ">Payment mode</th>
                                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm px-2 ">Payment note</th>

                                </tr>
                            </thead>
                            <tbody >
                                {/* {dummyData.map((value, index) => { */}
                                    <tr>
                                        <td className=" py-1 px-1">{1}</td>
                                        <td className=" py-1 px-1">{saleData.paymentDate}</td>
                                        <td className="px-1 py-1 text-sm">{saleData.inoiceNumber}</td>
                                        <td className="px-1 py-1"> {saleData.amount}</td>
                                        <td className="px-1 py-1">{saleData.paymentMethod}</td>
                                        <td className="px-1 py-1">{saleData.paymentNote}</td>
                                    </tr>

                                {/* })} */}


                            </tbody>
                            <tfoot>
                                <tr></tr>
                            </tfoot>
                        </table>
                    </div>
                    <br/>
                    <div className='flex flex-col mt-11'>
                        <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1 bg-gray-400'>
                            <h1 className='font-bold'>Total:</h1>
                            <h1 className=''>Rs {saleData.totalSaleAmount - saleData.shippingCharges}</h1>
                        </div>
                        <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1 bg-gray-400'>
                            <h1 className='font-bold'>Discount:</h1>
                            <h1 className='font-bold '>(-)</h1>
                            <h1 className=''>Rs {saleData.discountAmount}</h1>
                        </div>
                        
                        <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1 bg-gray-400'>
                            <h1 className='font-bold'>Shipping:</h1>
                            <h1 className='font-bold '>(+)</h1>
                            <h1 className=''>Rs {saleData.shippingCharges}</h1>
                        </div>
                        
                        <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1 bg-gray-400'>
                            <h1 className='font-bold'>Total Payable:</h1>
                            <h1 className=''>Rs {saleData.totalSaleAmount}</h1>
                        </div>
                        <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1 bg-gray-400'>
                            <h1 className='font-bold'>Total Paid:</h1>
                            <h1 className=''>Rs {saleData.amount}</h1>
                        </div>
                        <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1 bg-gray-400'>
                            <h1 className='font-bold'>Total Remaining:</h1>
                            <h1 className=''>Rs {saleData.totalSaleAmount - saleData.amount}</h1>
                        </div>

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

export default ViewSell