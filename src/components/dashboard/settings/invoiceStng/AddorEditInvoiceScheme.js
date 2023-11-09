import React, { useState, useEffect } from 'react'
import { FaCheckCircle, FaInfo, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddorEditInvoiceScheme = (props) => {
    const [formData, setFormData] = useState({
        invoiceNumberFormat: "",
        name: '',
        numberingTypes: '',
        isDefault: false,
        numberofDigits: "",
        namePrefix: ""

    })
    const [isserror, setIsserror] = useState(false);
    const handleClick = (e) => {
        if (
            formData.name.length === 0
        ) {
            setIsserror(true);
            toast.error('Some fields are required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });        } else if (props.id) {
            addInvoiceById()
            console.log("Handle Update", formData);
        } else {
            addInvoice()
            console.log("Handle Save", formData);
        }
    };
    const [format1, setFormat1] = useState(false)
    const [formt2, setFormt2] = useState(false)
    const [col5, setCol5] = useState(false)
    const fetchInvoiceById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/invoices/${props.id}`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)

            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching Invoice:', error);
        }
    };
    useEffect(() => {
        if (props.id) {
            fetchInvoiceById()

        }

    }, []);
    const addInvoice = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.post("http://localhost:8000/admin/invoices", formData, {
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
                    window.location.reload();
                }, 2000);

            }

        } catch (error) {
            console.error('Error Adding Invoice:', error);
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
    const addInvoiceById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/invoices/${props.id}`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
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
                    window.location.reload();
                }, 2000);

            }
        } catch (error) {
            console.error('Error Adding Invoice:', error);
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


    return (
        <div className='flex flex-col w-full bg-white p-3'>
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
            <h1 className="text-xl text-start font-bold ">{props.id ? "Edit" : "Add"} Invoice Scheme</h1>

            <div className='grid mt-5 grid-cols-1 md:grid-cols-3 gap-5'>
                <div onClick={() => { setFormat1(true); setFormt2(false); setFormData({ ...formData, invoiceNumberFormat: "XXXX" }) }} className='flex h-[100px] bg-gray-300 items-center justify-between'>                    <h1 className='text-xl font-bold'>FORMAT: XXXX</h1>
                    {format1 &&
                        <FaCheckCircle style={{ color: "red" }} />
                    }
                </div>
                <div onClick={() => { setFormat1(false); setFormt2(true); setFormData({ ...formData, invoiceNumberFormat: "2023-XXXX" }) }} className='flex h-[100px] bg-gray-300 items-center justify-between'>                    <h1 className='text-xl font-bold'>FORMAT: 2023-XXXX</h1>
                    {formt2 &&
                        <FaCheckCircle style={{ color: "red" }} />
                    }
                </div>
                <div className='flex flex-col '>
                    <h1 className='text-sm font-bold'>Preview:</h1>
                    <h1 className='text-sm '>{format1 ? "#0000" : formt2 ? "#2023-0000" : "Not Selected"}</h1>

                </div>
            </div>


            <div className='flex flex-col'>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Name:*
                        <h2 className="text-red-400">
                            {isserror && formData.name.length === 0
                                ? "Required field"
                                : ""}
                        </h2>
                    </h2>
                    <input type="text" placeholder='Name' value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex relative ">
                        Numbering Types:*
                        <FaInfoCircle onMouseOver={() => { setCol5(true) }} onMouseLeave={() => { setCol5(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                        {col5 &&
                            <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                <p className='text-start mt-2 text-gray-800'>Sequential will generate number serially like 1,2,3,4.</p>
                                <p className='text-start mt-2 text-gray-800'>Aleatory will generate number randomly</p>

                            </div>
                        }
                        <h2 className="text-red-400">
                            {isserror && formData.numberingTypes.length === 0
                                ? "Required field"
                                : ""}
                        </h2>

                    </h2>
                    <select type="text" placeholder='Category Code' value={formData.numberingTypes} onChange={(e) => { setFormData({ ...formData, numberingTypes: e.target.value }) }} className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" >
                        <option value={"Sequential"}>Sequential</option>
                        <option value={"Aleatory/randomly"}>Aleatory/randomly</option>

                    </select>
                </div>
                {formData.invoiceNumberFormat.length > 0 &&
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div className='flex flex-col mt-5 mx-5'>
                            <h2 className="text-start flex ">
                                <b>Prefix</b>
                            </h2>
                            <div className='flex'>
                                <FaInfo size={15} className='p-1 border-[1px] border-gray-600 w-8 h-9' />
                                <input type="text" placeholder='Name' value={formData.namePrefix} onChange={(e) => { setFormData({ ...formData, namePrefix: e.target.value }) }} className=" w-full py-1 px-2 border-[1px] border-gray-600 focus:outline-none" />
                            </div>
                        </div>
                        {/* {formData.numberingTypes === '0' &&
                            <div className='flex flex-col mt-5 mx-5'>
                                <h2 className="text-start flex ">
                                    <b>Start From</b>
                                </h2>
                                <div className='flex'>
                                    <FaInfo size={15} className='p-1 border-[1px] border-gray-600 w-8 h-9' />
                                    <input type="text" placeholder='Name' value={formData.startFrom} onChange={(e) => { setFormData({ ...formData, startFrom: e.target.value }) }} className=" w-full py-1 px-2 border-[1px] border-gray-600 focus:outline-none" />
                                </div>
                            </div>
                        } */}
                        <div className='flex flex-col mt-5 mx-5'>
                            <h2 className="text-start flex ">
                                <b>Number of digits</b>
                            </h2>
                            <div className='flex'>
                                <FaInfo size={15} className='p-1 border-[1px] border-gray-600 w-8 h-9' />
                                <input type="text" placeholder='Name' value={formData.numberofDigits} onChange={(e) => { setFormData({ ...formData, numberofDigits: e.target.value }) }} className=" w-full py-1 px-2 border-[1px] border-gray-600 focus:outline-none" />
                            </div>
                        </div>


                        <div className='flex  mt-10 mx-5'>
                            <input type="checkbox" placeholder='Name' checked={formData.isDefault ? true : false} onChange={(e) => { setFormData({ ...formData, isDefault: e.target.checked }) }} className=" w-5 h-5" />
                            <h2 className="text-start flex ">
                                <b>Set as default</b>
                            </h2>
                        </div>
                    </div>
                }

            </div>
            <div className='flex items-end mt-5 justify-end'>
                <button
                    onClick={handleClick}
                    className="bg-green-500 w-[100px] px-2 py-2 items-center justify-center flex"
                >
                    {props.id ? "Update" : "Save"}
                </button>
            </div>

        </div>
    )
}

export default AddorEditInvoiceScheme