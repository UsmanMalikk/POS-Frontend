import React, { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddOpeningStock = () => {
    const Navigate = useNavigate();

    const location = useLocation();
    const formDataFromPreviousPage = location.state?.formData;

    // console.log(formDataFromPreviousPage)
    const [unitData, setUnitData] = useState([]);

    const [formData, setFormData] = useState({
        ...formDataFromPreviousPage,
        totalQuantity: 0,

        openingStock: [{
            productName: "",//
            quantityRemaining: 0,
            unit: "",//
            unitCostBfrTx: 0,
            lotNumber: "",
            subTotalBfrTax: 0,
            date: "",
            note: ""

        }]


    })
    const findTotal = () => {
        let total = 0
        formData.openingStock.map(val => {
            return total = parseFloat(total) + parseFloat(val.quantityRemaining)
        })
        return total
    }
    const total = findTotal()
    formData.totalQuantity = total

    const handleChange = (e, index) => {
        const updatedData = formData.openingStock.map((item, ind) => {
            if (ind === index) {
                // Create a new copy of the item with the modified subItem
                return {
                    ...item, [e.target.name]: e.target.value,
                };
            }
            return item;
        });
        console.log(updatedData)
        setFormData({ ...formData, openingStock: updatedData });
    }
    const addRow = () => {
        let newArray = formData.openingStock
        newArray = [...newArray, {
            productName: "",
            quantityRemaining: 0,
            unit: "",
            unitCostBfrTx: 0,
            lotNumber: "",
            subTotalBfrTax: 0,
            date: "",
            note: ""
        }]
        setFormData({ ...formData, openingStock: newArray })
    }
    const fetchProductById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/products/${formDataFromPreviousPage._id}`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)

            setFormData(response.data);

        } catch (error) {
            console.error('Error fetching Product:', error);
        }
    };
    const fetchUnitsById = async () => {

        try {
            const token = localStorage.getItem('token');
            if (formDataFromPreviousPage._id) {
                const response = await axios.get(`http://localhost:8000/admin/units/${formDataFromPreviousPage.unit._id}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                setUnitData(response.data);

            } else {
                const response = await axios.get(`http://localhost:8000/admin/units/${formDataFromPreviousPage.unit}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                setUnitData(response.data);
            }
            // console.log(response)


        } catch (error) {
            console.error('Error fetching Selling price Group:', error);
        }
    };
    const addProduct = async () => {

        try {
            const token = localStorage.getItem('token');
            console.log(formDataFromPreviousPage.productImage)
            const formDataForSubmission = new FormData();
            formDataForSubmission.append('productName', formDataFromPreviousPage.productName);
            formDataForSubmission.append('sku', formDataFromPreviousPage.sku);
            formDataForSubmission.append('barcodeType', formDataFromPreviousPage.barcodeType);
            formDataForSubmission.append('unit', formDataFromPreviousPage.unit);
            formDataForSubmission.append('businessLocation', formDataFromPreviousPage.businessLocation);
            formDataForSubmission.append('manageStock', formDataFromPreviousPage.manageStock);
            formDataForSubmission.append('productImage', formDataFromPreviousPage.productImage);
            formDataForSubmission.append('productDescription', formDataFromPreviousPage.productDescription);
            formDataForSubmission.append('productType', formDataFromPreviousPage.productType);
            if (formDataFromPreviousPage.variationType[0]?.variationTempleateID !== null) {
                formDataForSubmission.append('variationType', formDataFromPreviousPage.variationType);
            }
            formDataForSubmission.append('combo', formDataFromPreviousPage.combo);
            formDataForSubmission.append('netTotal', formDataFromPreviousPage.netTotal);
            formDataForSubmission.append('dfltSellingPrice', formDataFromPreviousPage.dfltSellingPrice);
            formDataForSubmission.append('margin', formDataFromPreviousPage.margin);

            if (formDataFromPreviousPage.grpPrices) {
                formDataFromPreviousPage.grpPrices.forEach((grpPrice, index) => {
                    formDataForSubmission.append(`grpPrices[${index}][spg]`, grpPrice.spg);
                    formDataForSubmission.append(`grpPrices[${index}][amount]`, grpPrice.amount);
                    formDataForSubmission.append(`grpPrices[${index}][type]`, grpPrice.type);
                });
            }
            formDataForSubmission.append('totalQuantity', formData.totalQuantity);

            formData.openingStock.forEach((stock, index) => {
                // Append openingStock data for each item in the array
                formDataForSubmission.append(`openingStock[${index}][productName]`, stock.productName);
                formDataForSubmission.append(`openingStock[${index}][quantityRemaining]`, stock.quantityRemaining);
                formDataForSubmission.append(`openingStock[${index}][unit]`, stock.unit);
                formDataForSubmission.append(`openingStock[${index}][unitCostBfrTx]`, stock.unitCostBfrTx);
                formDataForSubmission.append(`openingStock[${index}][lotNumber]`, stock.lotNumber);
                formDataForSubmission.append(`openingStock[${index}][subTotalBfrTax]`, stock.subTotalBfrTax);
                formDataForSubmission.append(`openingStock[${index}][date]`, stock.date);
                formDataForSubmission.append(`openingStock[${index}][note]`, stock.note);
            }); const response = await axios.post(`http://localhost:8000/admin/products`, formDataForSubmission, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            if (response.status === 201) {
                toast.success('Data Saved', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    Navigate("/home/products");
                }, 2000);

            }
        } catch (error) {
            console.error('Error Adding Product:', error);
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const addProductById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)


            const response = await axios.put(`http://localhost:8000/admin/products/${formDataFromPreviousPage._id}`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            //   console.log(response)

            if (response.status === 200) {
                toast.success('Data Saved', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    Navigate("/home/products")
                }, 2000);

            }
        } catch (error) {
            console.error('Error Adding Product:', error);
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const handleSaveorEdit = () => {
        if (formDataFromPreviousPage._id) {
            addProductById()
            console.log("Handle Update", formData)

        } else {
            addProduct()
            console.log("Handle Save", formData)
        }


    }
    useEffect(() => {

        if (formDataFromPreviousPage._id) {
            fetchProductById()

        } else {
            fetchUnitsById()

        }
    }, []);

    return (
        <div className='flex flex-col w-full px-5 bg-white '>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className='flex'>
                <h1 className='text-2xl font-semibold text-start '>Add Opening Stock</h1>
            </div>
            <div className='flex flex-col p-5 bg-gray-100'>
                <div className='flex'>
                    <h1 className=' font-semibold text-start '>Location:</h1>
                    <h1 className=' font-semibold text-start mx-1 '>{formDataFromPreviousPage.businessLocation[0]?.name}</h1>
                    {/* <h1 className=' font-semibold text-start mx-1'>({formData.productId})</h1> */}

                </div>
                <table className="table-auto mt-5  w-full  items-start">
                    <thead>
                        <tr className='Fixed bg-green-500 '>
                            <th>
                                <h1 className='text-center font-bold text-white'>Product Name</h1>
                            </th>
                            <th>
                                <h1 className='text-center font-bold text-white'>Quantity Remaining</h1>
                            </th>
                            <th>
                                <h1 className='text-center font-bold text-white'>Unit Cost (Before Tax)</h1>
                            </th>
                            <th>
                                <h1 className='text-center font-bold text-white'>Lot Number</h1>
                            </th>
                            <th>
                                <h1 className='text-center font-bold text-white'>Subtotal (Before tax)</h1>
                            </th>
                            <th>
                                <h1 className='text-center font-bold text-white'>Date</h1>
                            </th>
                            <th>
                                <h1 className='text-center font-bold text-white'>Note</h1>
                            </th>
                            <th>
                                <div onClick={addRow} className='flex items-center justify-center  rounded-sm px-1  mx-1'>
                                    <FaPlus size={15} style={{ color: "white" }} />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.openingStock.map((val, index) => {
                            return <tr key={index}>
                                <td className='w-[10%] px-1'>
                                    <h1>{formDataFromPreviousPage.productName}</h1>
                                </td>
                                <td className='w-[20%] px-1'>
                                    <div className='flex w-full '>
                                        <input type='number' name='quantityRemaining' value={val.quantityRemaining} onChange={(e) => { handleChange(e, index) }} className='border-[1px] px-2 py-1 w-3/4 border-gray-400 focus:outline-none' />
                                        <input type='text' value={unitData.shortName} readOnly className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none w-1/4' />
                                    </div>
                                </td>
                                <td className='w-[10%] px-1'>
                                    <input type='number' name='unitCostBfrTx' value={val.unitCostBfrTx} onChange={(e) => { handleChange(e, index) }} className='border-[1px] px-2 py-1 w-full border-gray-400 focus:outline-none' />
                                </td>
                                <td className='w-[10%] px-1'>
                                    <input type='number' name='lotNumber' value={val.lotNumber} onChange={(e) => { handleChange(e, index) }} className='border-[1px] px-2 py-1 w-full border-gray-400 focus:outline-none' />
                                </td>
                                <td className='w-[10%] px-1'>
                                    <input type='number' name='subTotalBfrTax' value={val.subTotalBfrTax = val.unitCostBfrTx * val.quantityRemaining} onChange={(e) => { handleChange(e, index) }} className='border-[1px] px-2 py-1 w-full border-gray-400 focus:outline-none' />
                                </td>
                                <td className='w-[10%] px-1'>
                                    <input type='datetime-local' name='date' value={val.date} onChange={(e) => { handleChange(e, index) }} className='border-[1px] px-2 py-1 w-full border-gray-400 focus:outline-none' />
                                </td>
                                <td className='w-[30%] px-1'>
                                    <textarea rows={2} cols={5} type='text' name='note' value={val.note} onChange={(e) => { handleChange(e, index) }} className='border-[1px] px-2 py-1 w-3/4 border-gray-400 focus:outline-none' />
                                </td>
                            </tr>
                        })}



                    </tbody>

                </table>

            </div>


            <div className='justify-end items-end flex py-5'>
                <button onClick={handleSaveorEdit} className='bg-green-400 text-white'>
                    <h1 className=' font-bold text-start px-3 py-2'>Save</h1>

                </button>
            </div>
        </div>
    )
}

export default AddOpeningStock