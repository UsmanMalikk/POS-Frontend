import React ,{ useState, useEffect }from 'react'
import { FaArrowCircleRight, FaCubes, FaEdit, FaMoneyBillAlt, FaTrash, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios';

const SuspendedSale = () => {
    const dummyData = [
        {
            id: "1",
            name: "checking",
            reference: "2023-9992",
            date: "10/05/2023",
            customer: "Walkin Customer",
            totalItems: "2",
            total: "500.00"
        },
        {
            id: "2",
            name: "checking1",
            reference: "2023-9992",
            date: "10/05/2023",
            customer: "Walkin Customer",
            totalItems: "2",
            total: "500.00"
        }, {
            id: "3",
            name: "checking2",
            reference: "2023-9992",
            date: "10/05/2023",
            customer: "Walkin Customer",
            totalItems: "2",
            total: "500.00"
        }

    ]
//Fetch for customer

    const [suspendedData, setSuspendedData] = useState([]);

    const fetchSuspendedSales = async () => {

        try {
            // const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/pos/suspended`);
            console.log(response)
            setSuspendedData(response.data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };
    useEffect(() => {

        fetchSuspendedSales();


    }, []);

    return (
        <div className='flex flex-col bg-white px-4 pb-5 min-h-[500px]'>
            <h1 className='text-xl font-semibold text-start'>Suspended Sales</h1>
            <div className='grid grid-cols-4 gap-4 mt-5'>
                {
                    suspendedData.map((val, index) => {
                        let date = new Date(val.salesDate).toLocaleDateString()

                        return <div className='flex flex-col'>
                            <div className='flex flex-col items-center justify-center bg-orange-500 p-2 text-white'>
                                <div className='flex my-1 items-center justify-center'>
                                    <FaEdit size={15} className='mx-2' />
                                    <p>{val.suspendNote}</p>
                                </div>
                                <div className='flex my-1 items-center justify-center'>
                                    <p>{val.invoiceNumber}</p>
                                </div>
                                <div className='flex my-1 items-center justify-center'>
                                    <p>{date}</p>
                                </div>
                                <div className='flex my-1 items-center justify-center'>
                                    <FaUser size={15} className='mx-2' />
                                    <p>{val.customer}</p>
                                </div>
                                <div className='flex my-1 items-center justify-center'>
                                    <FaCubes size={15} className='mx-2' />
                                    <p>Total Items: {val.inputData.length}</p>
                                </div>
                                <div className='flex my-1 items-center justify-center'>
                                    <FaMoneyBillAlt size={15} className='mx-2' />
                                    <p>Total: Rs. {val.totalSaleAmount}</p>
                                </div>
                            </div>
                            <Link to={`/pos/edit/${val.id}`} className='flex py-1 items-center justify-center bg-blue-600 text-white w-full'>
                                Edit Sale
                                <FaArrowCircleRight size={15} className='mx-2' />
                            </Link>
                            <div className='flex items-center justify-center py-1 bg-red-600 text-white w-full'>
                                Delete
                                <FaTrash size={15} className='mx-2' />
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default SuspendedSale