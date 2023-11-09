import React, { useRef, useState, useEffect } from 'react'
import { FaCalendar, FaChevronCircleDown, FaInfoCircle, FaMoneyBillAlt, FaPlus, FaPlusCircle, FaSearch, FaTimes, FaTrash, FaUser } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { BiChevronDown } from 'react-icons/bi'
import { AiOutlineSearch, AiTwotoneFolderOpen } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import AddProduct from '../Product/AddProduct'
import AddorEditContact from "../contacts/AddorEditContact"
import ImportProduct from '../Product/ImportProduct'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddorEditPurchase = () => {
    const Navigate = useNavigate();


    const [supplierData, setSupplierData] = useState('')
    const [businessLocationData, setBusinessLocationData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [AccountsData, setAccountsData] = useState([]);
    const [purchaseCustomData, setPurchaseCustomData] = useState([])

    const [inputValue, setInputValue] = useState('')
    const [open, setOpen] = useState(false)
    const [addExpenses, setAddExpenses] = useState(false)
    const [isAddSupplier, setIsAddSupplier] = useState(false)
    const [info, setInfo] = useState(false)
    const [info1, setInfo1] = useState(false)
    const [info2, setInfo2] = useState(false)
    const [formData, setFormData] = useState({
        supplier: "",
        supplierName: "",
        referenceNo: "",
        purchaseDate: "",
        businessLocation: "",
        payTerm: "",
        purchaseOrder: "",
        discountType: "",
        discountAmount: 0,
        discount: 0,
        inputData: [],
        purchaseTaxType: "",
        additionalNotes: "",
        shippingDetails: "",
        additionalShippingCharges: 0,
        additionalExpenseName: "",
        additionalExpenseAmount: 0,
        additionalExpenseName1: "",
        additionalExpenseAmount1: 0,
        additionalExpenseName2: "",
        additionalExpenseAmount2: 0,
        additionalExpenseName3: "",
        additionalExpenseAmount3: 0,
        amount: "",
        paymentDate: "",
        paymentAccount: null,
        paymentMethod: "",
        documents: "",
        totalPurchaseAmount: 0,
        cardNumber: "",
        holderName: "",
        transactionNumber: "",
        cardType: "",
        month: "",
        year: "",
        securityCode: "",

        checqueNumber: "",
        bankAccountNumber: "",
        easyTransactionNumber: "",
        easyTransactionNumber: "",
    })
    const [isserror, setIsserror] = useState(false)
    const inpuRef = useRef()
    const params = useParams()
    const id = params.id
    // console.log(params)
    const [isCliked, setIsCliked] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [inputValue1, setInputValue1] = useState('')

    const [newProduct, setNewProduct] = useState(false)

    const subtotal = (q, p, d) => {
        let total = 0
        // total = (q * p) - (d / 100) * (q * p)

        total = p - (d / 100) * p;
        return total
    }
    const lineTotal = (q, p) => {
        // console.log(q, "   ", p)
        let total = 0
        total = q * p
        return total
    }
    const finalProfitMargin = (cp, sp) => {
        let total = 0
        total = (sp - cp) / cp * 100
        total = Math.round(total * 100) / 100
        return total
    }
    const finalDiscount = (p, d, dt) => {
        let total = 0
        if (dt === "Percentage") {
            total = (d / 100) * (p)
            total = total.toFixed(2)
            return total
        } else if (dt === "Fixed") {
            total = d
            return total
        } else {
            return total

        }
    }

    const [isProductUpload, setIsProductUpload] = useState(false)

    const handleChange = (e, index) => {
        const updatedData = formData.inputData.map((item, ind) => {
            if (ind === index) {
                // Create a new copy of the item with the modified subItem
                return {
                    ...item, [e.target.name]: e.target.value
                };
            }
            return item;
        });
        console.log(updatedData)
        setFormData({ ...formData, inputData: updatedData });
    }



    const deleteByIndex = (index) => {
        let newArray = [...formData.inputData]
        newArray.splice(index, 1)
        setFormData({ ...formData, inputData: newArray })
    }

    const findTotal = () => {
        let total = 0
        formData.inputData.map(val => {
            return total += val.lineTotal
        })
        return total
    }
    const total = findTotal()
    const totalPayable = (ttl) => {
        // console.log(ttl)
        ttl = parseFloat(ttl) - parseFloat(formData.discount);
        ttl = parseFloat(ttl) + parseFloat(formData.additionalShippingCharges);
        ttl = parseFloat(ttl) + parseFloat(formData.additionalExpenseAmount)
        ttl = parseFloat(ttl) + parseFloat(formData.additionalExpenseAmount1)
        ttl = parseFloat(ttl) + parseFloat(formData.additionalExpenseAmount2)
        ttl = parseFloat(ttl) + parseFloat(formData.additionalExpenseAmount3)
        return ttl
    }
    const totalPurchaseAmount = totalPayable(total)
    formData.totalPurchaseAmount = totalPurchaseAmount
    const handleClick = (e) => {

        if (id) {
            if (!formData.supplier ||
                formData.prefix.length === 0 ||
                formData.purchaseDate.length === 0) {
                setIsserror(true)
            } else {
                addPurchaseById()
                console.log("Handle Update", formData)
            }
        } else {
            if (!formData.supplier ||

                formData.purchaseDate.length === 0 ||
                formData.amount.length === 0) {
                setIsserror(true)
            } else {
                addPurchase()
                console.log("Handle Save", formData)
            }
        }
    }


    const displayData = () => {
        if (isAddSupplier === true) {
            return <AddorEditContact id={0} />
        }
    }
    const fetchLocations = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/business-locations`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response.data)
            setBusinessLocationData(response.data);
            // console.log(variationData)

        } catch (error) {
            console.error('Error fetching spg:', error);
        }
    };
    const getSuppliers = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:8000/admin/contacts/supplier`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response);
            setSupplierData(response.data);

        } catch (e) {
            console.error(e)
        }

    }
    const fetchProducts = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/products`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            setProductsData(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const fetchAccounts = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/add-accounts`, {
                headers: {
                    'Authorization': token
                }
            });

            // console.log(response)
            setAccountsData(response.data);
        } catch (error) {
            console.error('Error fetching Accounnt:', error);
        }
    };
    const fetchCustomFields = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:8000/admin/purchase-custom-label`, {
                headers: {
                    'Authorization': token
                }
            });
            setPurchaseCustomData(response.data);

        } catch (e) {
            console.error(e)
        }

    }
    const fetchPurchaseById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/purchases/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            response.data.purchaseDate = new Date(response.data.purchaseDate).toLocaleDateString("fr-CA")
            response.data.paymentDate = new Date(response.data.paymentDate).toLocaleDateString("fr-CA")
            const supplierName = `${response.data.supplier?.prefix} ${response.data.supplier?.firstName}`

            setFormData({...response.data, supplierName: supplierName});
        } catch (error) {
            console.error('Error fetching Stock Tranfers:', error);
        }
    };

    useEffect(() => {

        if (id) {
            fetchPurchaseById()
            fetchCustomFields()
            fetchLocations()
            getSuppliers()
            fetchProducts()
            fetchAccounts()
        } else {
            fetchLocations()
            getSuppliers()
            fetchProducts()
            fetchAccounts()
            fetchCustomFields()
        }
    }, []);
    const addPurchase = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:8000/admin/purchases/create', formData, {
                headers: {
                    'Authorization': token
                }
            });
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
                    Navigate("/home/purchase");
                }, 2000);

            }
        } catch (error) {
            console.error('Error creating Purchase:', error);
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
    const addPurchaseById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/purchases/${id}`, formData, {
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
                    Navigate("/home/purchase");
                }, 2000);

            }
        } catch (error) {
            console.error('Error Adding Purchase:', error);
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
        <div className='w-full p-5 bg-gray-100'>
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
            <h1 className='text-xl text-start font-bold '>{id ? "Edit Purchase" : "Add Purchase"}</h1>
            <div className='flex w-full  min-h-[300px] flex-col p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='flex flex-col'>
                        <div className='flex text-sm text-start font-bold'>
                            <h1>Supplier:*</h1>
                            <h2 className='text-red-400'>{isserror && formData.supplier.length === 0 ? "Required field" : ""}</h2>
                        </div>
                        <div className='flex flex-col relative'>
                            <div className='flex'>
                                < FaUser size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />
                                <input
                                    onClick={() => setOpen(!open)}
                                    className='bg-white w-full  flex items-center  focus:outline-none justify-between px-2  border-[1px] border-gray-600'
                                    value={formData.supplierName}
                                    onChange={(e) => { setFormData({ ...formData, supplier: e.target.value }) }}

                                    placeholder='Select Value'
                                />
                                <BiChevronDown size={20} className={`${open && "rotate-180"} absolute top-1 right-7`} />

                                <FaPlusCircle onClick={() => { setIsAddSupplier(true); setIsCliked(true) }} size={20} style={{ color: "blue" }} className='w-8 h-8 p-1 border-[1px] border-gray-600' />

                            </div>
                            {open &&
                                <ul

                                    className={`bg-white  w-full  border-[1px] absolute z-10 top-8 border-gray-600 overflow-y-auto ${open ? "max-h-28" : "max-h-0"} `}
                                >
                                    <div className="flex items-center px-2 sticky top-0 bg-white">
                                        <AiOutlineSearch size={18} className="text-gray-700" />
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                                            className="placeholder:text-gray-700 w-full p-1 outline-none border-[1px] border-gray-500"
                                        />
                                    </div>
                                    {supplierData?.map((data) => (
                                        <li
                                            key={data?.firstName}
                                            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                                        ${data?.firstName?.toLowerCase() === formData.supplierName?.toLowerCase() &&
                                                "bg-sky-600 text-white"
                                                }
                                         ${data?.firstName?.toLowerCase().startsWith(inputValue)
                                                    ? "block"
                                                    : "hidden"
                                                }`}
                                            onClick={() => {
                                                if (data?.firstName?.toLowerCase() !== formData.supplierName?.toLowerCase()) {
                                                    setFormData({ ...formData, supplier: data?._id, supplierName: `${data?.prefix} ${data?.firstName}` })
                                                    setOpen(false);
                                                    setInputValue("");
                                                }
                                            }}
                                        >
                                            {data?.prefix + " " + data?.firstName}
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col relative'>
                        <div className='flex mx-2'>
                            <h1 className='text-start font-bold'>Reference No:</h1>
                            <FaInfoCircle onMouseOver={() => { setInfo(true) }} onMouseLeave={() => { setInfo(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                            {info &&
                                <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                    <p className='text-start mt-2 text-gray-600'>Leave Empty to autogenerate</p>

                                </div>
                            }
                        </div>
                        <input value={formData.referenceNo} onChange={(e) => { setFormData({ ...formData, referenceNo: e.target.value }) }} type='text' placeholder='Reference No' className='px-2 py-1 border-[1px] border-gray-500' />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex text-sm text-start font-bold'>
                            <h1>Purchase Date:*</h1>
                            <h2 className='text-red-400'>{isserror && formData.purchaseDate.length === 0 ? "Required field" : ""}</h2>
                        </div>
                        <div className='flex'>
                            < FaCalendar size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />

                            <input value={formData.purchaseDate} onChange={(e) => { setFormData({ ...formData, purchaseDate: e.target.value }) }} type='Date' placeholder='Select Date Time' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                        </div>

                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 mt-3 gap-4'>
                    <div className='flex flex-col'>
                        <h1 className='flex text-sm text-start font-bold'>Address:</h1>
                        <h1 className=' text-sm text-start font-bold'>Address</h1>
                    </div>
                    <div className='flex flex-col relative'>
                        <div className='flex mx-2'>
                            <div className='flex text-sm text-start font-bold'>
                                <h1>Business Location:*</h1>
                                <FaInfoCircle onMouseOver={() => { setInfo1(true) }} onMouseLeave={() => { setInfo1(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                                <h2 className='text-red-400'>{isserror && formData.businessLocation.length === 0 ? "Required field" : ""}</h2>
                            </div>
                            {info1 &&
                                <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                    <p className='text-start mt-2 text-gray-600'>Business Location where the purchased product will be available for sale.</p>

                                </div>
                            }
                        </div>
                        <select value={formData.businessLocation} onChange={(e) => { setFormData({ ...formData, businessLocation: e.target.value }) }} type="text" className='px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none'>
                            <option value={""}>Please Selecet</option>
                            {businessLocationData.map((loc) => (
                                <option key={loc._id} value={loc._id}>
                                    {loc.name}
                                </option>
                            ))}                               </select>

                    </div>
                    <div className='flex flex-col '>
                        <div className='flex mx-2'>
                            <div className='text-start font-bold'>
                                <h1>Status:*</h1>
                                <h2 className='text-red-400'>{isserror && formData.status.length === 0 ? "Required field" : ""}
                                </h2>
                            </div>


                        </div>
                        <select value={formData.status} onChange={(e) => { setFormData({ ...formData, status: e.target.value }) }} type="text" className='px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none'>
                            <option value={""}>Please Selecet</option>
                            <option value={"Receiced"}>Receiced</option>
                            <option value={"Pending"}>Pending</option>
                            <option value={"Ordered"}>Ordered</option>
                        </select>

                    </div>
                    <div className='flex flex-col relative'>
                        <div className='flex mx-2'>
                            <h1 className='text-start font-bold'>Pay Term:</h1>
                            <FaInfoCircle onMouseOver={() => { setInfo2(true) }} onMouseLeave={() => { setInfo2(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                            {info2 &&
                                <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                    <p className='text-start mt-2 text-gray-800'>Payments to be paid for purchase/sales within the given time period.</p>
                                    <p className='text-start mt-2 text-xs text-gray-600'>All Upcoming or due payments will be displayed in Dashboard - payments-due section.</p>

                                </div>
                            }
                        </div>
                        <div className='flex'>
                            <input value={formData.payTerm} onChange={(e) => { setFormData({ ...formData, payTerm: e.target.value }) }} type='text' placeholder='Salary' className='px-2 py-[3px] w-1/2 border-[1px] border-gray-600 focus:outline-none' />
                            <select value={formData.payTerm1} onChange={(e) => { setFormData({ ...formData, payTerm1: e.target.value }) }} type='text' className='px-2 py-[3px] w-1/2 border-[1px] border-gray-600 focus:outline-none'>
                                <option value={""}>Please Select</option>
                                <option value={"Months"}>Months</option>
                                <option value={"Days"}>Days</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 mt-3 gap-4'>
                    <div className='flex flex-col'>

                    </div>
                    <div className='flex flex-col'>


                    </div>



                </div>
                {/* <div className='grid grid-cols-1 md:grid-cols-3 mt-3 gap-4'>
                    <div className='flex flex-col'>
                        <h1 className='flex text-sm text-start font-bold'>Purchase Order:</h1>
                        <input value={formData.contact_id} onChange={(e) => { setFormData({ ...formData, contact_id: e.target.value }) }} type='Text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />

                    </div>

                </div> */}
            </div>
            <div className='flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600'>
                <div className='flex flex-col md:flex-row mt-5 w-full items-center justify-center'>
                    {/* <button onClick={() => { setIsCliked(true); setIsProductUpload(true) }} className='bg-blue-600 mt-4 md:mt-0 md:w-[15%] mx-[2.5%] text-white px-2 py-1' >Import Products</button> */}
                    <div className='flex flex-col   w-[50%] items-center justify-center'>
                        <div className='flex w-full   md:mt-0 relative'>
                            <div className='flex w-full'>
                                < FaSearch size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />
                                <input onClick={() => { setIsClicked(!isClicked) }} value={inputValue1} onChange={(e) => { setInputValue1(e.target.value) }} type='Text' placeholder='Enter Product name / SKU / Scan bar code' className='px-2 w-full py-[2px] border-[1px] border-gray-600 focus:outline-none' />
                            </div>
                            {isClicked &&
                                <ul

                                    className={`bg-white w-full    border-[1px]   z-10 absolute top-8 border-gray-600  ${isClicked ? "overflow-y-auto max-h-32" : "max-h-0"} `}
                                >

                                    {productsData?.map((data) => (
                                        <li
                                            key={data?._id}
                                            className={`p-1 px-9 text-start text-sm hover:bg-sky-600 hover:text-white
                                ${data?.productName?.toLowerCase() === inputValue1?.toLowerCase() &&
                                                "bg-sky-600 text-white"
                                                }
                                 ${data?.productName?.toLowerCase().startsWith(inputValue1)
                                                    ? "block"
                                                    : "hidden"
                                                }`}
                                            onClick={() => {
                                                if (data?.productName?.toLowerCase() !== inputValue1.toLowerCase()) {
                                                    setInputValue1(data?.productName)
                                                    let array = formData.inputData
                                                    array = [...array, { product: data?._id, productName: data?.productName, quantity: 0, unit: data?.unit, unitCostBeforeDiscount: 0, discountPercent: 0, unitCostBeforeTax: 0, profitMarginPercentage: 0, unitSellingPrice: 0 }]
                                                    setFormData({ ...formData, inputData: array })
                                                    setInputValue1('')
                                                    setIsClicked(!isClicked);
                                                }
                                            }}
                                        >
                                            {data?.productName}
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>



                    </div>
                    {/* <button onClick={() => { setIsCliked(true); setNewProduct(true) }} className='flex mt-4 md:mt-0 md:w-[17%] mx-[1.5%] text-blue-600 underline'>
                        < FaPlus size={15} className='w-8 h-8 p-2 ' />
                        <p className='mx-1'> Add new Product</p>
                    </button> */}
                </div>


                <div className='flex overflow-x-scroll  mt-5 ' >
                    <table className="table-auto    mb-2   px-5 ">
                        <thead>
                            <tr className='h-[50px] bg-green-500'>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">#</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Product Name</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Purchase Quantity</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Unit Cost (Before Discount)</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Discount Percent</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Unit Cost (Before Tax)</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Line Total</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Profit Margin %</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Unit Selling Price (Inc. tax)</th>
                                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm "><FaTrash size={15} /> </th>

                            </tr>
                        </thead>
                        <tbody >
                            {formData.inputData.map((value, index) => {
                                return <tr key={index} className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""} `}>
                                    <td className=" py-1 px-1">{index + 1}</td>
                                    <td className=" py-1 px-1">
                                        <div className='flex flex-col'>
                                            <input type='text' name="productName" value={value.productName} readOnly onChange={(e) => { handleChange(e, index) }} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />
                                            <h1 className='text-xs text-gray-500'>Crurrent stock: {20.50} Lit</h1>
                                        </div>
                                    </td>
                                    <td className="px-1 py-1 text-sm">
                                        <div className='flex flex-col'>
                                            <input type='number' name="quantity" value={value.quantity} onChange={(e) => { handleChange(e, index) }} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />
                                            <select name="unit" value={value.unit} onChange={(e) => { handleChange(e, index) }} className='border-[1px] mt-2 w-3/4 px-1 border-black focus:outline-none'>
                                                <option value={"Litter"}>Litter</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-1 py-1">
                                        <div className='flex flex-col'>
                                            <input name="unitCostBeforeDiscount" type='number' value={value.unitCostBeforeDiscount} onChange={(e) => handleChange(e, index)} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />

                                        </div>
                                    </td>
                                    <td className="px-1 py-1">
                                        <div className='flex flex-col'>
                                            <input name="discountPercent" type='number' value={value.discountPercent} onChange={(e) => handleChange(e, index)} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />

                                        </div>
                                    </td>
                                    <td className=" py-1 px-1">
                                        <input name="unitCostBeforeTax" type='number' value={value.unitCostBeforeTax = subtotal(value.quantity, value.unitCostBeforeDiscount, value.discountPercent)} onChange={(e) => handleChange(e, index)} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />                                    </td>
                                    <td className=" py-1 px-1">
                                        <input name="lineTotal" type='number' value={value.lineTotal = lineTotal(value.quantity, value.unitCostBeforeTax)} onChange={(e) => handleChange(e, index)} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />                                    </td>
                                    <td className="px-1 py-1 text-sm">
                                        <input name="profitMarginPercentage" type='number' value={value.profitMarginPercentage = finalProfitMargin(value.unitCostBeforeTax, value.unitSellingPrice)} onChange={(e) => handleChange(e, index)} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />                                    </td>
                                    <td className="px-1 py-1">
                                        <input name="unitSellingPrice" type='number' value={value.unitSellingPrice} onChange={(e) => handleChange(e, index)} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />
                                    </td>

                                    <td className="px-1 py-1 text-red-400"> <FaTimes size={15} onClick={() => { deleteByIndex(index) }} className='cursor-pointer' /> </td>
                                </tr>
                            })}


                        </tbody>
                        <tfoot>
                            <tr></tr>
                        </tfoot>
                    </table>
                </div>
                <div className='w-full h-[1px] bg-black mt-5'></div>
                <div className='flex flex-col items-end mt-5 justify-end'>
                    <div className='flex '>
                        <h1 className='font-bold mx-2'>Total Items</h1>
                        <h1 className=' mx-2'> {formData.inputData.length}.00</h1>

                    </div>
                    <div className='flex '>
                        <h1 className='font-bold mx-2'>Net Total Amount</h1>
                        <h1 className=' mx-2'> {total}</h1>

                    </div>
                </div>
            </div>
            <div className='flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='flex flex-col '>
                        <h1 className='flex text-sm text-start font-bold'>Discount Type:</h1>
                        <select value={formData.discountType} onChange={(e) => { setFormData({ ...formData, discountType: e.target.value }) }} type='Text' placeholder='Enter Product name / SKU / Scan bar code' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
                            <option value={""}>None</option>
                            <option value={"Fixed"}>Fixed</option>
                            <option value={"Percentage"}>Percentage</option>

                        </select>

                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-sm text-start font-bold'>Discount Amount:</h1>
                        <input value={formData.discountAmount} onChange={(e) => { setFormData({ ...formData, discountAmount: e.target.value }) }} type='number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />

                    </div>
                    <div className='flex flex-col items-end'>
                        <h1 className='flex text-sm  font-bold'>Discount <p className='mx-2'>(-) {formData.discount = finalDiscount(total, formData.discountAmount, formData.discountType)}</p> </h1>
                    </div>
                </div>

                <div className='w-full h-[1px] bg-gray-300 my-5'></div>
                <div className='w-full flex flex-col'>
                    <h1 className='flex text-sm  font-bold'>Additional Note</h1>

                    <textarea rows={4} value={formData.additionalNotes} onChange={(e) => { setFormData({ ...formData, additionalNotes: e.target.value }) }} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                </div>
            </div>
            <div className='flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='flex flex-col '>
                        <h1 className='flex text-sm text-start font-bold'>Shipping Detials:</h1>
                        <input value={formData.shippingDetails} onChange={(e) => { setFormData({ ...formData, shippingDetails: e.target.value }) }} type='Text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />

                    </div>
                    <div className='flex flex-col'>

                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-sm text-start font-bold'>(+)Additional Shipping Charges:</h1>
                        <input value={formData.additionalShippingCharges} onChange={(e) => { setFormData({ ...formData, additionalShippingCharges: e.target.value }) }} type='number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div onClick={() => { setAddExpenses(!addExpenses) }} className='flex w-[250px] px-2 py-2 items-center justify-center bg-blue-700 text-white'>
                        <FaPlus size={15} />
                        <h1 className='text-sm mx-1'> Add Additional Expenses</h1>
                        <FaChevronCircleDown size={15} className={`${addExpenses ? "rotate-180" : ""}`} />
                    </div>
                    {addExpenses &&
                        <div className='flex w-full md:w-1/2 justify-center '>
                            <div className='grid grid-cols-2 gap-2'>
                                <h1 className='text-sm mx-1 font-bold'> Additional Expense Name</h1>
                                <h1 className='text-sm mx-1 font-bold'> Amount</h1>
                                <input value={formData.additionalExpenseName} onChange={(e) => { setFormData({ ...formData, additionalExpenseName: e.target.value }) }} type='text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                <input value={formData.additionalExpenseAmount} onChange={(e) => { setFormData({ ...formData, additionalExpenseAmount: e.target.value }) }} type='number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                <input value={formData.additionalExpenseName1} onChange={(e) => { setFormData({ ...formData, additionalExpenseName1: e.target.value }) }} type='text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                <input value={formData.additionalExpenseAmount1} onChange={(e) => { setFormData({ ...formData, additionalExpenseAmount1: e.target.value }) }} type='number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                <input value={formData.additionalExpenseName2} onChange={(e) => { setFormData({ ...formData, additionalExpenseName2: e.target.value }) }} type='text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                <input value={formData.additionalExpenseAmount2} onChange={(e) => { setFormData({ ...formData, additionalExpenseAmount2: e.target.value }) }} type='number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                <input value={formData.additionalExpenseName3} onChange={(e) => { setFormData({ ...formData, additionalExpenseName3: e.target.value }) }} type='text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                <input value={formData.additionalExpenseAmount3} onChange={(e) => { setFormData({ ...formData, additionalExpenseAmount3: e.target.value }) }} type='number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />

                            </div>
                        </div>

                    }
                </div>
                <div className='flex items-end justify-end mt-5'>
                    <div className='flex '>
                        <h1 className='font-bold mx-2'>Purchase Total:</h1>
                        <h1 className=' mx-2'>Rs {totalPayable(total)}</h1>

                    </div>
                </div>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 bg-white '>


                {purchaseCustomData.customLable1 !== "" ?
                    <div className='flex flex-col'>
                        <h1 className='text-start font-bold my-1'>{purchaseCustomData.customLable1}</h1>
                        <input type={"text"} required={purchaseCustomData.isRequired1 ? true : false} value={formData.customLable1} onChange={(e) => { setFormData({ ...formData, customLable1: e.target.value }) }} placeholder={`Custom Lable 1`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                    </div>
                    : ""}
                {purchaseCustomData.customLable2 !== "" ?
                    <div className='flex flex-col'>
                        <h1 className='text-start font-bold my-1'>{purchaseCustomData.customLable2}</h1>
                        <input type={"text"} required={purchaseCustomData.isRequired2 ? true : false} value={formData.customLable2} onChange={(e) => { setFormData({ ...formData, customLable2: e.target.value }) }} placeholder={`Custom Lable 2`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                    </div>
                    : ""}

                {purchaseCustomData.customLable3 !== "" ? <div className='flex flex-col'>
                    <h1 className='text-start font-bold my-1'>{purchaseCustomData.customLable3}</h1>
                    <input type={"text"} required={purchaseCustomData.isRequired3 ? true : false} value={formData.customLable3} onChange={(e) => { setFormData({ ...formData, customLable3: e.target.value }) }} placeholder={`Custom Lable 3`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                </div>
                    : ""}
                {purchaseCustomData.customLable4 !== "" ? <div className='flex flex-col'>
                    <h1 className='text-start font-bold my-1'>{purchaseCustomData.customLable4}</h1>
                    <input type={"text"} required={purchaseCustomData.isRequired4 ? true : false} value={formData.customLable4} onChange={(e) => { setFormData({ ...formData, customLable4: e.target.value }) }} placeholder={`Custom Lable 4`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                </div>
                    : ""}
            </div>
            {!id &&
                <div className='flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600'>
                    <h1 className='flex text-sm text-start font-bold mb-5'>Add Payment</h1>

                    <h1 className='flex text-sm text-start font-bold'>Advance Balance: <p className='mx-2'> 0</p></h1>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <div className='flex flex-col '>
                            <div className='flex text-sm text-start font-bold'>
                                <h1>Amount:*</h1>
                                <h2 className='text-red-400'>{isserror && formData.amount.length === 0 ? "Required field" : ""}</h2>

                            </div>
                            <div className='flex'>
                                < FaMoneyBillAlt size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />

                                <input value={formData.amount} onChange={(e) => { setFormData({ ...formData, amount: e.target.value }) }} type='number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                            </div>

                        </div>
                        <div className='flex flex-col '>
                            <div className='flex text-sm text-start font-bold'>
                                <h1>Paid On :*</h1>
                                <h2 className='text-red-400'>{isserror && formData.paymentDate.length === 0 ? "Required field" : ""}</h2>

                            </div>
                            <div className='flex'>
                                < FaCalendar size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />

                                <input value={formData.paymentDate} onChange={(e) => { setFormData({ ...formData, paymentDate: e.target.value }) }} type='Date' placeholder='Select Date Time' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                            </div>


                        </div>
                        <div className='flex flex-col '>
                            <div className='flex text-sm text-start font-bold'>
                                <h1>Payment method:*</h1>
                                <h2 className='text-red-400'>{isserror && formData.paymentMethod.length === 0 ? "Required field" : ""}</h2>

                            </div>
                            <div className='flex'>
                                < FaMoneyBillAlt size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />
                                <select value={formData.paymentMethod} onChange={(e) => { setFormData({ ...formData, paymentMethod: e.target.value }) }} type="text" className='px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none'>
                                    <option value={""}>Please Selecet</option>
                                    <option value={"Advance"}>Advance</option>
                                    <option value={"Cash"}>Cash</option>
                                    <option value={"Card"}>Card</option>
                                    <option value={"Checque"}>Checque</option>
                                    <option value={"Bank Transfer"}>Bank Transfer</option>
                                    <option value={"Other"}>Other</option>
                                    <option value={"Easypais"}>Easypais</option>
                                    <option value={"Custom Payment 6"}>Custom Payment 6</option>

                                </select>
                            </div>

                        </div>
                        <div className='flex flex-col '>
                            <div className='flex text-sm text-start font-bold'>
                                <h1>Payment Account:*</h1>
                                <h2 className='text-red-400'>{isserror && formData.paymentAccount.length === 0 ? "Required field" : ""}</h2>

                            </div>
                            <div className='flex'>
                                < FaMoneyBillAlt size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />
                                <select value={formData.paymentAccount} onChange={(e) => { setFormData({ ...formData, paymentAccount: e.target.value }) }} type="text" className='px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none'>
                                    <option value={""}>None</option>
                                    {AccountsData.map((acc) => (
                                        <option key={acc._id} value={acc._id}>
                                            {acc.name}
                                        </option>
                                    ))}

                                </select>
                            </div>

                        </div>

                    </div>
                    {
                        formData.paymentMethod === 'Card' ?
                            <>
                                <div className='grid grid-cols-1 md:grid-cols-3 mt-2 gap-5'>
                                    <div className='flex flex-col '>
                                        <h1 className='flex text-sm text-start font-bold' >Card Number:</h1>
                                        <input value={formData.cardNumber} onChange={(e) => { setFormData({ ...formData, cardNumber: e.target.value }) }} type='number' placeholder='Card Number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                    </div>
                                    <div className='flex flex-col '>
                                        <h1 className='flex text-sm text-start font-bold' >Card holder name:</h1>
                                        <input value={formData.holderName} onChange={(e) => { setFormData({ ...formData, holderName: e.target.value }) }} type='text' placeholder='Card holder name' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                    </div>
                                    <div className='flex flex-col '>
                                        <h1 className='flex text-sm text-start font-bold' >Card Transaction Number:</h1>
                                        <input value={formData.transactionNumber} onChange={(e) => { setFormData({ ...formData, transactionNumber: e.target.value }) }} type='text' placeholder='Select Date Time' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                    </div>


                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-4 mt-2 gap-5'>
                                    <div className='flex flex-col '>
                                        <h1 className='flex text-sm text-start font-bold' >Card Type:</h1>
                                        <select value={formData.cardType} onChange={(e) => { setFormData({ ...formData, cardType: e.target.value }) }} type='text' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' >
                                            <option value={"Credit Card"}>Credit Card</option>
                                            <option value={"Debit Card"}>Debit Card</option>
                                            <option value={"Visa"}>Visa</option>
                                            <option value={"Master Card"}>Master Card</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col '>
                                        <h1 className='flex text-sm text-start font-bold' >Month:</h1>
                                        <input value={formData.month} onChange={(e) => { setFormData({ ...formData, month: e.target.value }) }} type='text' placeholder='Month' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                    </div>
                                    <div className='flex flex-col '>
                                        <h1 className='flex text-sm text-start font-bold' >Year:</h1>
                                        <input value={formData.year} onChange={(e) => { setFormData({ ...formData, year: e.target.value }) }} type='text' placeholder='Year' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                    </div>
                                    <div className='flex flex-col '>
                                        <h1 className='flex text-sm text-start font-bold' >Security Code:</h1>
                                        <input value={formData.securityCode} onChange={(e) => { setFormData({ ...formData, securityCode: e.target.value }) }} type='number' placeholder='Security Code' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                    </div>

                                </div>
                            </>
                            : formData.paymentMethod === 'Checque' ?
                                <div className='flex flex-col '>
                                    <h1 className='flex text-sm text-start font-bold' >Checque Number:</h1>
                                    <input value={formData.checqueNumber} onChange={(e) => { setFormData({ ...formData, checqueNumber: e.target.value }) }} type='text' placeholder='Checque' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                </div>
                                : formData.paymentMethod === 'Bank Transfer' ?
                                    <div className='flex flex-col '>
                                        <h1 className='flex text-sm text-start font-bold' >Bank Account Number:</h1>
                                        <input value={formData.bankAccountNumber} onChange={(e) => { setFormData({ ...formData, bankAccountNumber: e.target.value }) }} type='text' placeholder='Bank Account Number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                    </div>
                                    : formData.paymentMethod === 'Easypais' ?
                                        <div className='flex flex-col '>
                                            <h1 className='flex text-sm text-start font-bold' >Transaction Number:</h1>
                                            <input value={formData.easyTransactionNumber} onChange={(e) => { setFormData({ ...formData, easyTransactionNumber: e.target.value }) }} type='text' placeholder='Bank Account Number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                        </div> :
                                        formData.paymentMethod === 'Custom Payment 2' || 'Custom Payment 3' || 'Custom Payment 4' || 'Custom Payment 5' || 'Custom Payment 6' || 'Custom Payment 7' ?
                                            <div className='flex flex-col '>
                                                <h1 className='flex text-sm text-start font-bold' >Transaction Number:</h1>
                                                <input value={formData.easyTransactionNumber} onChange={(e) => { setFormData({ ...formData, easyTransactionNumber: e.target.value }) }} type='text' placeholder='Bank Account Number' className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                                            </div> : ""
                    }
                    <div className='w-full flex flex-col mt-3'>
                        <h1 className='flex text-sm  font-bold'>Payment Note:</h1>

                        <textarea rows={4} value={formData.paymentNote} onChange={(e) => { setFormData({ ...formData, paymentNote: e.target.value }) }} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
                    </div>

                    <div className='w-full h-[1px] bg-black my-5'></div>

                    <div className='flex items-end justify-end mt-5'>
                        <div className='flex '>
                            <h1 className='font-bold mx-2'>Payment Due:</h1>
                            <h1 className=' mx-2'>Rs {(totalPayable(total) - formData.amount) >= 0 ? (totalPayable(total)) - formData.amount : 0}</h1>

                        </div>
                    </div>

                </div>

            }

            <div className='flex items-end justify-end mt-5'>
                <button onClick={handleClick} className='bg-green-500 px-2 py-2 items-center justify-center flex'>{id ? "Update" : "Save"}</button>
            </div>
            {isCliked &&
                <div className='absolute top-0 flex flex-col items-center  justify-center right-0 bg-black/70 w-full min-h-screen'>
                    <div className="w-full md:w-[70%]">
                        <div onClick={() => { setIsCliked(false); setIsAddSupplier(false); setNewProduct(false); setIsProductUpload(false); }} className=' flex items-end justify-end  w-full mt-10 bg-white px-5 pt-2'>
                            <MdCancel size={20} />

                        </div>
                        {displayData()}
                    </div>
                </div>

            }
        </div>
    )
}

export default AddorEditPurchase