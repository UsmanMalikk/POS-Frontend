import React, { useState, useEffect } from 'react'
import { FaInfoCircle } from 'react-icons/fa'

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddorEditDiscount = (props) => {
    // console.log(props)
    const [formData, setFormData] = useState({
        name: "",
        products: [],
        brand: "",
        category: "",
        location: "",
        priority: "",
        discountType: "",
        discountAmount: 0,
        startsAt: "",
        endsAt: "",
        sellingPriceGrp: "",
        isActive: false,
        isApplyinCustomerGrps: false
    })
    const handleDelete = (index) => {
        let newArray = [...formData.products]
        newArray.splice(index, 1)
        setFormData({ ...formData, products: newArray })
    }
    const [open1, setOpen1] = useState(false)
    const [isserror, setIsserror] = useState(false)
    const [inputValue1, setInputValue1] = useState('')
    const [seletedValue, setSeletedValue] = useState('')
    const [info, setInfo] = useState(false)
    const [brandsData, setBrandsData] = useState([]);
    const [categoryData, setCategorysData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [spgData, setSpgData] = useState([]);

    const fetchSPG = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/selling-price-groups`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response.data)
            setSpgData(response.data);
            // console.log(variationData)

        } catch (error) {
            console.error('Error fetching spg:', error);
        }
    };
    const fetchProducts = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/products`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            setProductsData(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategory = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/categories`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            setCategorysData(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };



    const fetchBrands = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/brands`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response.data)
            setBrandsData(response.data);

        } catch (error) {
            console.error('Error fetching brand:', error);
        }
    };
    const fetchDiscountById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/discounts/${props.id}`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching Discounts:', error);
        }
    };
    useEffect(() => {
        // Make an API call to fetch user's user records
        if (props.id) {
            fetchProducts()
            fetchCategory()
            fetchBrands();
            fetchSPG()
            fetchDiscountById()
        } else {
            fetchProducts()
            fetchCategory()
            fetchBrands();
            fetchSPG()
        }

    }, []);

    const addDiscount = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.post(`http://localhost:8000/admin/discounts`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
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
            console.error('Error Adding Discount:', error);
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

    const addDiscountById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/discounts/${props.id}`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
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
            console.error('Error Adding Discount:', error);
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



    const handleClick = (e) => {

        if (formData.name.length === 0 ||
            formData.location.length === 0 ||
            formData.discountType.length === 0 ||
            formData.discountAmount.length === 0) {
            setIsserror(true)
            toast.error('Some fields are required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (props.id) {
            addDiscountById()
            console.log("Handle Update", formData)
        } else {
            addDiscount()
            console.log("Handle Save", formData)
        }
    }

    return (
        <div className='w-full flex flex-col bg-white p-2 '>
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
            <h1 className='text-start'>{props.id ? "Edit" : "Add"} Discount</h1>
            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <h1>Name:*</h1>
                        <h2 className='text-red-400'>{isserror && formData.name.length === 0 ? "Required field" : ""}</h2>

                    </div>
                    <input type='text'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className='w-full border-[1px] border-gray-400 py-1 px-1'
                    />
                </div>
                <div className='flex flex-col'>

                    <div className='flex text-sm text-start font-bold'>
                        <h1>products:</h1>
                    </div>
                    <div className='flex flex-col relative'>
                        <div className='flex'>
                            <input
                                onClick={() => setOpen1(!open1)}
                                className='bg-white w-full  flex items-center  focus:outline-none justify-between px-2  py-1 mt-1 border-[1px] border-gray-600'
                                value={seletedValue}
                                onChange={(e) => { setSeletedValue(e.target.value) }}

                                placeholder='Select Value'
                            />


                        </div>
                        {open1 &&
                            <ul

                                className={`bg-white z-10  w-full -right-7 mx-[30px] border-[1px] absolute top-9 border-gray-600  overflow-y-auto ${open1 ? "max-h-60" : "max-h-0"} `}
                            >
                                <div className="flex items-center px-1 sticky top-0 bg-white">
                                    <input
                                        type="text"
                                        value={inputValue1}
                                        onChange={(e) => setInputValue1(e.target.value.toLowerCase())}
                                        className="placeholder:text-gray-700 w-full p-1 outline-none border-[1px] border-gray-500"
                                    />
                                </div>
                                {productsData?.map((data) => (
                                    <li
                                        key={data?._id}
                                        className={`p-2 text-sm text-start hover:bg-sky-600 hover:text-white
                                                        ${data?.productName?.toLowerCase() === seletedValue?.toLowerCase() &&
                                            "bg-sky-600 text-white"
                                            }
                                                         ${data?.Name?.toLowerCase().startsWith(inputValue1)
                                                ? "block"
                                                : "hidden"
                                            }`}
                                        onClick={() => {
                                            if (data?.productName?.toLowerCase() !== seletedValue.toLowerCase()) {
                                                let darray = formData.products
                                                darray = [...darray, data?._id]
                                                setFormData({ ...formData, products: darray })
                                                setOpen1(false);
                                                setInputValue1("");
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
                {formData.products.length > 0 &&

                    <div className='w-full border-[1px] border-gray-400 py-1 px-1'>
                        <ul className='flex'>
                            {formData.products.map((val, index) => {
                                return <>
                                    <li key={index} className='flex items-center py-1 rounded-md px-2 bg-blue-500 text-white text-xs mx-2'>
                                        <p onClick={() => { handleDelete(index) }} className='mx-1 mb-1 cursor-pointer'>x</p>
                                        <h1>{val}</h1>
                                    </li>
                                </>
                            })}
                        </ul>
                    </div>
                }
                <div className='grid grid-cols-2 gap-5'>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <h1>Brand:</h1>
                        </div>
                        <select
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        >
                            <option value={""}>Please Selecet</option>
                            {brandsData.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.brandName}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <h1>Category:</h1>
                        </div>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        >
                            <option value={""}>Please Selecet</option>
                            {categoryData.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <h1>Location:*</h1>
                            <h2 className='text-red-400'>{isserror && formData.location.length === 0 ? "Required field" : ""}</h2>

                        </div>
                        <select
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        >
                            <option value={""}>Please Selecet</option>
                            <option value={"Ezline Software House Pvt (ltd) (BL0001)"}>Ezline Software House Pvt (ltd) (BL0001)</option>

                        </select>
                    </div>
                    <div className='flex flex-col relative'>
                        <div className='flex'>
                            <h1>Priority:</h1>
                            <FaInfoCircle onMouseOver={() => { setInfo(true) }} onMouseLeave={() => { setInfo(false) }} size={15} style={{ color: "skyblue" }} className='mx-2  cursor-help' />
                            {info &&
                                <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                    <p className='text-start mt-2 text-gray-600'>Selling price group in which you want to sell</p>

                                </div>
                            }
                        </div>
                        <input type='text'
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <h1>Discount Type:*</h1>
                            <h2 className='text-red-400'>{isserror && formData.discountType.length === 0 ? "Required field" : ""}</h2>

                        </div>
                        <select type='text'
                            value={formData.discountType}
                            onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        >
                            <option value={""}>Please Selecet</option>
                            <option value={"Fixed"}>Fixed</option>
                            <option value={"Percentage"}>Percentage</option>

                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <h1>Discount Amount:*</h1>
                            <h2 className='text-red-400'>{isserror && formData.discountAmount.length === 0 ? "Required field" : ""}</h2>

                        </div>
                        <input type='text'
                            value={formData.discountAmount}
                            onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <h1>Starts At:*</h1>
                        </div>
                        <input type='datetime-local'
                            value={formData.startsAt}
                            onChange={(e) => setFormData({ ...formData, startsAt: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <h1>Ends At:*</h1>
                        </div>
                        <input type='datetime-local'
                            value={formData.endsAt}
                            onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <h1>Selling Price Group:</h1>
                        </div>
                        <select type='text'
                            value={formData.sellingPriceGrp}
                            onChange={(e) => setFormData({ ...formData, sellingPriceGrp: e.target.value })}
                            className='w-full border-[1px] border-gray-400 py-1 px-1'
                        >
                            <option value={"All"}>All</option>
                            {/* <option value={"Default Selling Price Group"}>Default Selling Price Group</option> */}
                            {spgData.map((spg) => (
                                <option key={spg._id} value={spg._id}>
                                    {spg.name}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className='flex mt-2 items-center'>

                        <input type='checkbox'
                            checked={formData?.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className=' w-5 h-5 border-[1px] border-gray-400 py-1 px-1'
                        />
                        <div className='flex mx-1 '>
                            is Active
                        </div>
                    </div>
                    <div className='flex mt-2 items-center'>

                        <input type='checkbox'
                            checked={formData?.isApplyinCustomerGrps}
                            onChange={(e) => setFormData({ ...formData, isApplyinCustomerGrps: e.target.checked })}
                            className='w-5 h-5 border-[1px] border-gray-400 py-1 px-1'
                        />
                        <div className='flex mx-1'>
                            Apply in Customer Groups
                        </div>
                    </div>

                </div>

                <div className='flex items-end justify-end mx-3'>
                    <button onClick={handleClick} className='bg-green-400 px-2 py-1 rounded-md text-white text-center'> {props.id ? "Update" : "Save"}</button>
                </div>
            </div>


        </div>
    )

}

export default AddorEditDiscount