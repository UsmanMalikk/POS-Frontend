import React, { useState, useEffect } from 'react'
import { FaBackward, FaBriefcase, FaCalculator, FaCheck, FaClock, FaCreditCard, FaEdit, FaInfoCircle, FaKeyboard, FaMinus, FaMinusCircle, FaMoneyBillAlt, FaMoneyCheckAlt, FaPause, FaPauseCircle, FaPlus, FaPlusCircle, FaSearch, FaTable, FaTimes, FaUndo, FaUser, FaUserSecret, FaWindowClose, FaWindowMaximize } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { BiChevronDown } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import AddProduct from '../Product/AddorEditProduct'
import AddorEditContact from "../contacts/AddorEditContact"
import ProductItem from './ProductItem'
// import Payment from './Payment'
import CardTransaction from './CardTransaction'
import SuspendSale from './SuspendSale'
import EditProduct from './EditProduct'
import Calculator from "../Calculator"
import SuspendedSale from './SuspendedSale'
import RegisterDetails from './RegisterDetails'
import CloseRegister from './CloseRegister'
import EditDiscount from './EditDiscount'
import EditOrderTax from './EditOrderTax'
import EditShipping from './EditShipping'
import RecentTransaction from './RecentTransaction'
import moment from 'moment'
import axios from 'axios';

import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const AddPos = () => {
  const Navigate = useNavigate();



  const [productsData, setProductsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);

  const [spgsData, setSPGsData] = useState([]);
  // const [unitsData, setUnitsData] = useState([]);
  const [businessLocationData, setBusinessLocationData] = useState([]);



  const [inputValue, setInputValue] = useState('')
  const [inputValue1, setInputValue1] = useState('')
  const [dynwidth, setDynwidth] = useState('')
  const [open, setOpen] = useState(false)

  const [shcal, setShcal] = useState(false)
  const [isAddSupplier, setIsAddSupplier] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [info2, setInfo2] = useState(false)
  const [info3, setInfo3] = useState(false)
  const [info4, setInfo4] = useState(false)
  const [info5, setInfo5] = useState(false)
  const [info1, setInfo1] = useState(false)
  const [isCard, setIsCard] = useState(false)
  // const [isMultiplePay, setIsMultiplePay] = useState(false)
  const [isSuspend, setIsSuspend] = useState(false)
  const [info, setInfo] = useState(false)
  // const [saleReturn, setSaleReturn] = useState(false)
  // const [sellReturn, setSellReturn] = useState('')

  const [formData, setFormData] = useState({
    customer: "",
    customerName: "",
    sellingPrice: null,
    status: "",
    invoiceNumber: "",
    // tables: "",
    // serviceStaff: "",
    businesLocation: null,
    inputData: [],
    payTerm: "",
    // payTerm1: "",
    discountType: "",
    discountAmount: 0,
    // redeemed: "",
    // available: "",
    // redeemedAmount: "",
    discount: 0,
    orderTax: 0,
    sellNotes: "",
    shippingDetails: "",
    shippingAddress: "",
    shippingCharges: 0,
    shippingStatus: "",
    deliveredTo: "",
    deliveryPerson: "",
    byPos: null,
    cardNumber: "",
    holderName: "",
    transactionNumber: "",
    cardType: "",
    month: "",
    year: "",
    securityCode: "",

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
    paymentMethod: "",
    paymentNote: "",
    suspendNote: "",
    totalSaleAmount: "",
  })
  const params = useParams()
  const id = params.id
  const type = params.type
  // console.log(formData)

  const handleCardFormData = (editProductFormData) => {
    // Process the formData here, e.g., make an API request
    // to save the data to the server.
    // You can also update the state in the parent component.
    setFormData({
      ...formData, cardNumber: editProductFormData.cardNumber,
      holderName: editProductFormData.holderName,
      transactionNumber: editProductFormData.transactionNumber,
      cardType: editProductFormData.cardType,
      month: editProductFormData.month,
      year: editProductFormData.year,
      securityCode: editProductFormData.securityCode
    });
    // setCardData(editProductFormData);
    addSale()

  }
  const handleSuspendFormData = (editProductFormData) => {
    // Process the formData here, e.g., make an API request
    // to save the data to the server.
    // You can also update the state in the parent component.
    setFormData({
      ...formData, suspendNote: editProductFormData.suspendNote

    });
    // setCardData(editProductFormData);
    // console.log("1st or 2nd?")
    addSale()
  }
  const handleShippingFormData = (editProductFormData) => {
    // Process the formData here, e.g., make an API request
    // to save the data to the server.
    // You can also update the state in the parent component.
    setFormData({
      ...formData, suspendNote: editProductFormData.suspendNote,
      shippingDetails: editProductFormData.shippingDetails,
      shippingAddress: editProductFormData.shippingAddress,
      shippingStatus: editProductFormData.shippingStatus,
      shippingCharges: editProductFormData.shippingCharges,
      deliveredTo: editProductFormData.deliveredTo,
      deliveryPerson: editProductFormData.deliveryPerson,

    });
    // setCardData(editProductFormData);
  }
  const handleDiscountData = (editProductFormData) => {
    // Process the formData here, e.g., make an API request
    // to save the data to the server.
    // You can also update the state in the parent component.
    setFormData({
      ...formData, discountAmount: editProductFormData.discountAmount,
      discountType: editProductFormData.discountType,

    });
    // setCardData(editProductFormData);
  }
  const handleProductFormData = (editProductFormData) => {
    // Process the formData here, e.g., make an API request
    // to save the data to the server.
    // You can also update the state in the parent component.
    // console.log(proId)

    setFormData({
      ...formData,
      inputData: formData.inputData.map((item) =>
        item.product === proId
          ? {
            ...item,
            description: editProductFormData.description,
            unitPrice: editProductFormData.unitPrice,
            discountType: editProductFormData.discountType,
            discountAmount: editProductFormData.discountAmount,
          }
          : item
      ),

    });
  }

  // setCardData(editProductFormData);

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

  const handleIncDec = (index, type) => {
    const val = formData.inputData
    if (type === "Inc") {
      val[index].quantity += 1
    } else {
      val[index].quantity -= 1
    }
    setFormData({ ...formData, inputData: val })
  }
  const deleteByIndex = (index) => {
    let newArray = [...formData.inputData]
    newArray.splice(index, 1)
    setFormData({ ...formData, inputData: newArray })
  }
  const subtotal = (q, p, d, dt) => {
    let total = 0
    if (dt === "Percentage") {
      total = (q * p) - (d / 100) * (q * p)
      return total
    } else if (dt === "Fixed") {
      total = (q * p) - d
      return total
    } else {
      total = q * p
      return total
    }
  }
  const finalDiscount = (p, d, dt) => {
    let total = 0
    if (dt === "Percentage") {
      total = (d / 100) * (p)
      return total
    } else if (dt === "Fixed") {
      total = d
      return total
    } else {
      return total

    }
  }
  const findTotal = () => {
    let total = 0
    formData.inputData.map(val => {
      return total += val.subtotal
    })
    return total
  }
  let total = findTotal()
  const totalPayable = (ttl) => {
    ttl = parseFloat(ttl) - parseFloat(finalDiscount(total, formData.discountAmount, formData.discountType));
    ttl = parseFloat(ttl) + parseFloat(formData.shippingCharges);
    ttl = parseFloat(ttl) + parseFloat(formData.additionalExpenseAmount)
    ttl = parseFloat(ttl) + parseFloat(formData.additionalExpenseAmount1)
    ttl = parseFloat(ttl) + parseFloat(formData.additionalExpenseAmount2)
    ttl = parseFloat(ttl) + parseFloat(formData.additionalExpenseAmount3)
    return ttl
  }
  const totalSaleAmount = totalPayable(total)
  formData.totalSaleAmount = totalSaleAmount

  const [isserror, setIsserror] = useState(false)


  // const handleSellReturn = () => {
  //   console.log("Handle Sell Return ", sellReturn)
  // }


  const dateTime = moment().date().toLocaleString();
  const [isCliked, setIsCliked] = useState(false)
  const [newProduct, setNewProduct] = useState(false)
  const [editProduct, setEditProduct] = useState(false)
  const [suspendedSale, setSuspendedSale] = useState(false)
  const [prdName, setPrdName] = useState('')
  const [registerDetail, setRegisterDetail] = useState(false)
  const [closeRegister, setCloseRegister] = useState(false)
  const [updateDiscount, setUpdateDiscount] = useState(false)
  const [updateShipping, setUpdateShipping] = useState(false)
  const [recentTrx, setRecentTrx] = useState(false)

  const [proId, setProId] = useState(0)
  const displayData = () => {
    if (newProduct === true) {
      return <AddProduct />
    } else if (isAddSupplier === true) {
      return <AddorEditContact id={0} />
    } else if (isCard === true) {
      // if(id){
      //   return <CardTransaction onSubmit={handleCardFormData} formData={formData}/>
      // }
      return <CardTransaction onSubmit={handleCardFormData} />
    } else if (isSuspend === true) {
      return <SuspendSale onSubmit={handleSuspendFormData} />
    } else if (editProduct === true) {
      return <EditProduct name={prdName} id={proId} onSubmit={handleProductFormData} /> //
    } else if (suspendedSale === true) {
      return <SuspendedSale />
    } else if (registerDetail === true) {
      return <RegisterDetails />
    } else if (closeRegister === true) {
      return <CloseRegister />
    } else if (updateDiscount === true) {
      return <EditDiscount onSubmit={handleDiscountData} />
    } else if (updateShipping === true) {
      return <EditShipping onSubmit={handleShippingFormData} />
    } else if (recentTrx === true) {
      return <RecentTransaction />
    }


  }
  const openFullscreen = () => {
    let elem = document.getElementById("POS")
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  const data = new Date()
  let fullyear = data.getFullYear()
  let fullmonth = data.getMonth() + 1
  let fuldate = data.getDate()
  const date = fuldate + "/" + fullmonth + "/" + fullyear;
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
  const fetchSaleById = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/pos/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response)
      const customerName = `${response.data.customer?.prefix} ${response.data.customer?.firstName}`
            const sellingPriceName = response.data.sellingPrice?.name
      setFormData({...response.data, customerName: customerName, sellingPriceName:sellingPriceName});
    } catch (error) {
      console.error('Error fetching sale:', error);
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
      // console.log(response)
      setProductsData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
 
  const fetchSPGs = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/selling-price-groups`, {
        headers: {
          'Authorization': token
        }
      });

      setSPGsData(response.data);
    } catch (error) {
      console.error('Error fetching SPGs:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`http://localhost:8000/admin/contacts/customer`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response);
      setCustomersData(response.data);

    } catch (e) {
      console.error(e)
    }

  }
  const addSale = async () => {

    try {
      const token = localStorage.getItem('token');
      // console.log(finalFormData)
      const response = await axios.post(`http://localhost:8000/admin/pos`, formData, {
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
          window.location.reload();
        }, 2000);

      }

    } catch (error) {
      console.error('Error Adding Sale:', error);
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

  const addSaleById = async () => {

    try {
      const token = localStorage.getItem('token');
      // console.log(finalFormData)
      const response = await axios.put(`http://localhost:8000/admin/pos/${id}`, formData, {
        headers: {
          'Authorization': token
        }
      });
      console.log(response)
      if (response.status === 201 && type === "draft") {
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
      else if (response.status === 201 && type === "quotations") {
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
      else {
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
      console.error('Error Adding Sale:', error);
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
  useEffect(() => {
    // Make an API call to fetch SPG's records
    if (id) {
      fetchSPGs()
      fetchLocations()
      fetchCustomers()
      fetchProducts()
      fetchSaleById();
    }
    else {
      fetchSPGs()
      fetchLocations()
      fetchCustomers()
      fetchProducts()
    }
  }, [])
  const handleClick = (e) => {
    console.log(e)
    if (formData.customer.length === 0 ||
      formData.inputData.length === 0) {
      setIsserror(true)
      console.log(isserror)
    } else if (id) {
      addSaleById()
      console.log("Handle Update", formData)
    } else {
      if (e === 'cash') {
        formData.paymentMethod = "Cash"
        // console.log(formData.shippingCharges)
        formData.amount = totalSaleAmount
        formData.byPos = true

        addSale()
        // console.log("Handle Save Cash", formData)
      } else if (e === 'draft') {
        formData.status = "Draft"
        formData.byPos = true

        addSale()
        // console.log("Handle Save Draft", formData)
      } else if (e === 'quotation') {
        formData.status = "Quotation"
        formData.byPos = true

        addSale()
        // console.log("Handle Save Quotation", formData)
      } else if (e === 'suspended') {
        formData.status = "Suspended"

        // addSale()
        // console.log("Handle Save Suspended", formData)
      } else if (e === 'card') {
        formData.paymentMethod = "Card"

        formData.amount = totalSaleAmount

        formData.byPos = true

        // addSale()
      }

      else {
        window.location.reload();

        console.log("Cancel")
      }
      // addSale()
      // console.log("Handle Save", formData)
    }
  }
  return (
    <div id='POS' className='w-full p-3 bg-gray-300'>
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
      <div className='header w-full flex justify-between'>
        <div className='flex justify-between '>
          <div className='flex items-center'>
            <h1 className='font-bold text-xl'>Location:</h1>
            <div className='flex font-semibold text-gray-600 mx-2 '>
              <select value={formData.businesLocation} onChange={(e) => { setFormData({ ...formData, businesLocation: e.target.value }) }} type="text" className='px-2 py-1 w-full border-[1px]  border-gray-800 focus:outline-none'>
                <option value={""}>Please Select</option>
                {businessLocationData.map((loc) => (
                  <option key={loc._id} value={loc._id}>
                    {loc.name}
                  </option>
                ))}

              </select>

              <h1 className='mx-2'>{date}</h1>
            </div>            <div className='flex relative'>
              <FaKeyboard size={20} onMouseOver={() => { setInfo(true) }} onMouseLeave={() => { setInfo(false) }} className=' mx-2' />
              {info &&
                <div className='flex flex-col w-[280px] rounded-md border-[1px] border-gray-400 absolute top-5 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold text-xl'>Operation:</h1>
                    <h2 className='font-semibold '>Keyboard Shortcut</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Express Checkout:</h1>
                    <h2 className='font-semibold '>Shift+e</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Pay & Checkout:</h1>
                    <h2 className='font-semibold '>Shift+p</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Draft:</h1>
                    <h2 className='font-semibold '>Shift+d</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Cancle:</h1>
                    <h2 className='font-semibold '>Shift+c</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Edit Discount:</h1>
                    <h2 className='font-semibold '>Shift+i</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Edit Order Tax:</h1>
                    <h2 className='font-semibold '>Shift+t</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Add Payment Row:</h1>
                    <h2 className='font-semibold '>Shift+r</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Finalize Payment:</h1>
                    <h2 className='font-semibold '>Shift+f</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Go to product quantity:</h1>
                    <h2 className='font-semibold '>F2</h2>
                  </div>
                  <div className='flex justify-between mt-2'>
                    <h1 className='font-bold '>Add new Product:</h1>
                    <h2 className='font-semibold '>F4</h2>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className='flex items-end justify-between w-1/3'>
          <div title='Add Expense' className='p-1 bg-purple-900 text-white flex'>
            <FaMinusCircle size={15} className='mx-1' />
            <h1 className='text-xs'>Add Expense</h1>
          </div>
          <div onClick={() => { setIsCliked(true); setSuspendedSale(true) }} title='View Suspended Sales' className='p-1 bg-orange-500 text-white flex'>
            <FaPauseCircle size={15} className='mx-1' />
          </div>
          <div onClick={openFullscreen} title='Press F11 to go full screen' className='p-1 bg-blue-500 text-white flex'>
            <FaWindowMaximize size={15} className='mx-1' />
          </div>
          {/* <div onClick={() => { setSaleReturn(!saleReturn) }} title='Sell Return' className='p-1 bg-red-500 text-white flex relative'>
            <FaUndo size={15} className='mx-1' />
            {saleReturn && <div className='absolute top-8 z-10 -right-10 flex shadow-md shadow-gray-400 items-center justify-center bg-white flex-col h-[110px] w-[200px] p-2'>
              <h2 className='text-gray-500 text-start'>Sell Return</h2>
              <input type='text' value={sellReturn} onChange={(e) => { setSellReturn(e.target.value) }} className='border-[1px] rounded-md mt-3 border-gray-400 focus:outline-none' />
              <button onClick={handleSellReturn} className='flex bg-red-500 w-1/3 items-center justify-center rounded-md text-white mt-2'>Send</button>
            </div>}
          </div> */}
          <div onClick={() => { setShcal(!shcal) }} title='Calculator' className='p-1 relative bg-green-500 text-white flex '>
            <FaCalculator size={15} className='mx-1' />
            {shcal && <div className='absolute top-7 -right-14'> <Calculator /></div>}
          </div>
          <div onClick={() => { setIsCliked(true); setRegisterDetail(true) }} title='Register Details' className='p-1 bg-green-500 text-white flex'>
            <FaBriefcase size={15} className='mx-1' />
          </div>
          <div onClick={() => { setIsCliked(true); setCloseRegister(true) }} title='Close Register' className='p-1 bg-red-500 text-white flex'>
            <FaWindowClose size={15} className='mx-1' />
          </div>
          <div onClick={() => { Navigate("/home/pos") }} title='Go Back' className='p-1 bg-blue-400 text-white flex'>
            <FaBackward size={15} className='mx-1' />
          </div>
        </div>

      </div>

      <div className='flex flex-col mt-2 md:flex-row max-h-screen'>
        <div className='flex flex-col w-[60%] p-2 bg-white'>
          <div className=' flex items-center'>
            <div className='flex flex-col w-1/3'>
              <div className='flex flex-col mt-2'>
                <div className='flex text-sm text-start font-bold'>
                  <h1>Customer:*</h1>
                  <h2 className='text-red-400'>{isserror && formData.customer.length === 0 ? "Required field" : ""}</h2>
                </div>
                <div className='flex flex-col relative'>
                  <div className='flex'>
                    < FaUser size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />
                    <input
                      onClick={() => setOpen(!open)}
                      className='bg-white w-full  flex items-center  focus:outline-none justify-between px-2  border-[1px] border-gray-600'
                      value={formData.customerName}
                      onChange={(e) => { setFormData({ ...formData, customer: e.target.value }) }}
                      placeholder='Customer'
                    />
                    <BiChevronDown size={20} className={`${open && "rotate-180"} absolute top-1 right-7`} />

                    <FaPlusCircle onClick={() => { setIsAddSupplier(true); setIsCliked(true) }} size={20} style={{ color: "blue" }} className='w-8 h-8 p-1 border-[1px] border-gray-600' />

                  </div>
                  {open &&
                    <ul

                      className={`bg-white  w-full border-[1px] z-10 absolute top-8 border-gray-600 overflow-y-auto ${open ? "max-h-32" : "max-h-0"} `}
                    >
                      <div className="flex items-center px-2 sticky top-0 bg-white">
                        <AiOutlineSearch size={18} className="text-gray-700" />
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                          className="placeholder:text-gray-700 p-1 outline-none border-[1px] border-gray-500"
                        />
                      </div>
                      {customersData?.map((data) => (
                        <li
                          key={data?.firstName}
                          className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                                        ${data?.firstName?.toLowerCase() === formData.customerName?.toLowerCase() &&
                            "bg-sky-600 text-white"
                            }
                                         ${data?.firstName?.toLowerCase().startsWith(inputValue)
                              ? "block"
                              : "hidden"
                            }`}
                          onClick={() => {
                            if (data?.firstName?.toLowerCase() !== formData.customerName.toLowerCase()) {
                              setFormData({ ...formData, customer: data?._id, customerName: `${data?.prefix} ${data?.firstName}` });
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

              <div className='flex relative mt-4'>
                < FaMoneyBillAlt size={15} className='w-8 h-9 p-1 border-[1px] border-gray-600' />
                <select value={formData.sellingPrice} onChange={(e) => { setFormData({ ...formData, sellingPrice: e.target.value }) }} type="text" className='px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none'>
                  <option value={""}>Select SPG</option>
                  {spgsData.map((spg) => (
                    
                    <option key={spg._id} value={spg._id}>
                      {(spg.isDefault) ?  "Default SPG" : spg?.name}
                    </option>
                  ))}

                </select>
                <FaInfoCircle onMouseOver={() => { setInfo2(true) }} onMouseLeave={() => { setInfo2(false) }} size={15} style={{ color: "skyblue" }} className='w-8 h-9 p-1 border-[1px] border-gray-600' />
                {info2 &&
                  <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                    <p className='text-start'>Selling Price Group in which you want ot sale</p>

                  </div>
                }
              </div>


            </div>
            <div className='flex flex-col mx-2 mt-6 w-2/3'>
              <div className='flex w-3/4 items-center  '>
                <div className='flex w-full    relative'>
                  <div className='flex w-full'>
                    < FaSearch size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />
                    <input onClick={() => { setIsClicked(!isClicked) }} value={inputValue1} onChange={(e) => { setInputValue1(e.target.value) }} type='Text' placeholder='Enter Product name / SKU / Scan bar code' className='px-2 w-full py-[2px] border-[1px] border-gray-600 focus:outline-none' />
                  </div>
                  {isClicked &&
                    <ul

                      className={`bg-white w-full    border-[1px]   z-10 absolute top-8 border-gray-600 overflow-y-auto  ${isClicked ? "max-h-32" : "max-h-0"} `}
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
                              array = [...array, { product: data?._id, quantity: 0, unitPrice: 0, discount: 0, subtotal: 0 }]
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
                <FaPlusCircle onClick={() => { setNewProduct(true); setIsCliked(true) }} size={20} style={{ color: "blue" }} className='w-8 h-8 p-1 border-[1px] border-gray-600' />

              </div>
              <div className='flex mt-6'>

              </div>

            </div>
          </div>

          <div className=' flex flex-col   w-full'>
            <div className='flex w-full   mt-5 ' >
              <table className="table-fixed min-h-[200px]  mb-2 w-full  px-5 ">
                <thead>
                  <tr className='h-[50px]'>
                    <th className=" py-2 title-font w-[25%] flex relative tracking-wider font-bold  text-sm ">
                      <h1>Product</h1>
                      <FaInfoCircle onMouseOver={() => { setInfo1(true) }} onMouseLeave={() => { setInfo1(false) }} size={15} className='mx-1' />
                      {info1 &&
                        <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                          <p className='text-start'>Click Product name to edit price, discount & tax.</p>
                          <p className='text-start'>Click Comment Icon to enter serial number / IMEI or additional note</p>
                          <p className='text-start'>Click Modifier icon(if enabled) for modifers</p>

                        </div>
                      }
                    </th>
                    <th className=" py-2 title-font w-[45%] tracking-wider font-bold  text-sm ">Quantity</th>
                    <th className=" py-2 title-font w-[20%] tracking-wider font-bold  text-sm ">Subtotal</th>
                    <th className=" py-2 title-font w-[10%] tracking-wider font-bold  text-sm "><FaTimes size={15} /> </th>

                  </tr>
                </thead>
                <tbody >
                  {formData.inputData.map((value, index) => {
                    return <tr key={index} className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""} items-center justify-center`}>
                      <td className=" py-1 px-1 text-center">
                        <div className='flex flex-col'>
                          <p onClick={() => { setIsCliked(true); setEditProduct(true); setPrdName(value.productName); setProId(value.product); setDynwidth("50%") }} className='text-start text-blue-500 cursor-pointer flex items-center justify-center'>{value.productName}   <FaInfoCircle className='mx-2' title='Edit Product Unit Price and Tax' size={15} /></p>
                        </div>
                      </td>
                      <td className="px-1 py-1 text-sm flex items-center justify-center">
                        <div className='flex flex-col w-2/3 '>
                          <div className='flex'>
                            <FaMinus onClick={() => { handleIncDec(index, "Dec") }} size={15} className='border-[1px] cursor-pointer  h-8 text-red-400 w-1/6 p-1 border-black' />
                            <input type='number' name="quantity" value={value.quantity} className='border-[1px]  w-4/6 px-1 py-1 border-black focus:outline-none' />
                            <FaPlus onClick={() => { handleIncDec(index, "Inc") }} size={15} className='border-[1px] cursor-pointer h-8 w-1/6 p-1 text-green-400 border-black' />

                          </div>
                          <select name="unit" value={value.unit} onChange={(e) => { handleChange(e, index) }} className='border-[1px] mt-2 w-full px-1 py-1 border-black focus:outline-none'>
                            <option value={"Litter"}>Litter</option>
                          </select>
                        </div>
                      </td>
                      <td className=" py-1 px-1 text-center">
                        <input name="subtotal" type='number' value={value.subtotal = subtotal(value.quantity, value.unitPrice, value.discount, value.discountType)} onChange={(e) => handleChange(e, index)} className='border-[1px] w-3/4 px-1 border-black focus:outline-none' />
                      </td>
                      <td className="px-1 py-1 ">
                        <FaTimes size={15} onClick={() => { deleteByIndex(index) }} className='cursor-pointer text-red-400' />
                      </td>
                    </tr>
                  })}


                </tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
            </div>


            <div className='grig grid-cols-3 gap-3 flex w-full'>
              <div className='flex items-center w-full'>
                <h1 className='font-bold text-sm'>Items:</h1>
                <h1 className=' text-sm'>Items: {formData.inputData.length}</h1>
              </div>
              <div className='flex items-center w-full'>
                <h1 className='font-bold text-sm'>Total:</h1>
                <h1 className=' text-sm'>{total}</h1>
              </div>
              <div className='flex items-center w-full'>

              </div>
            </div>
            <div className='grig grid-cols-3 flex gap-3 w-full'>

              <div className='flex items-center w-full relative'>
                <h1 className='font-bold text-sm mx-1'>Discount:</h1>
                <FaInfoCircle style={{ color: "skyblue" }} onMouseOver={() => { setInfo3(true) }} onMouseLeave={() => { setInfo3(false) }} size={15} className='mx-1 ' />
                {info3 &&
                  <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                    <p className='text-start'>Set 'Default Sale Discount' for all sales in business Settings. Click on the edit icon below to add/update discount</p>

                  </div>
                }
                <h1 className=' text-sm font-bold mx-1'>(-)</h1>
                <FaEdit className='cursor-pointer' size={15} onClick={() => { setUpdateDiscount(true); setIsCliked(true); setDynwidth("50%"); }} />
                <h1 className=' text-sm font-bold mx-1'>{0.00}</h1>

              </div>



              <div className='flex items-center w-full relative'>
                <h1 className='font-bold text-sm mx-1'>Shipping:</h1>
                <FaInfoCircle style={{ color: "skyblue" }} onMouseOver={() => { setInfo5(true) }} onMouseLeave={() => { setInfo5(false) }} size={15} className='mx-1 ' />
                {info5 &&
                  <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                    <p className='text-start'>Set Shipping Details and Shipping Charges. Click on the edit icon below to add/update Shipping Details and Shipping Charges</p>

                  </div>
                }
                <h1 className=' text-sm font-bold mx-1'>(+)</h1>
                <FaEdit className='cursor-pointer' size={15} onClick={() => { setUpdateShipping(true); setIsCliked(true); setDynwidth("50%"); }} />
                <h1 className=' text-sm font-bold mx-1'>{0.00}</h1>

              </div>

            </div>

          </div>
        </div>
        <div className='flex overflow-y-scroll w-[40%]'>
          <div className='grid grid-cols-3 gap-4 mx-2 '>
            {productsData.map((val, index) => {
              return <div key={index} className='w-[150px] h-[100px] p-1'
                onClick={() => {
                  let array = formData.inputData
                  array = [...array, { product: val._id, productName: val.productName, quantity: 0, unitPrice: val.price, subtotal: 0 }]
                  setFormData({ ...formData, inputData: array })
                }}>
                <ProductItem data={val} />

              </div>
            })}
          </div>



        </div>
      </div>

      <div className='footer w-full flex justify-between items-center  h-[100px] fixed bottom-0 bg-gray-200'>
        <div className='grid grid-cols-4 md:grid-cols-9 gap-1 w-3/4'>
          <div onClick={() => { handleClick("draft") }} className='p-1 cursor-pointer items-center justify-center bg-blue-400 text-white flex'>
            <FaEdit size={15} className='mx-1' />
            <h1 className='text-sm font-semibold'>Draft</h1>
          </div>
          <div onClick={() => { handleClick("quotation") }} className='p-1 cursor-pointer items-center justify-center bg-orange-400 text-white flex'>
            <FaEdit size={15} className='mx-1' />
            <h1 className='text-sm font-semibold'>Quotation</h1>
          </div>
          <div onClick={() => { handleClick("suspended"); setIsCliked(true); setDynwidth("50%"); setIsSuspend(true) }} className='p-1 cursor-pointer items-center justify-center bg-red-400 text-white flex'>
            <FaPause size={15} className='mx-1' />
            <h1 className='text-sm font-semibold'>Suspended</h1>
          </div>
          {/* <div onClick={() => { handleClick("creditSale") }} className='p-[2px] cursor-pointer items-center justify-start w-[100px] bg-purple-400 text-white flex'>
            <FaCheck size={15} className='mx-1' />
            <h1 className='text-sm font-semibold'>Credit Sale</h1>
          </div> */}
          <div onClick={() => { handleClick("card"); setIsCliked(true); setIsCard(true); setDynwidth("50%") }} className='p-2 cursor-pointer items-center justify-center bg-red-400 text-white flex'>
            <FaCreditCard size={15} className='mx-1' />
            <h1 className='text-sm font-semibold'>Card</h1>
          </div>
          {/* <div onClick={() => { handleClick("multiplePay"); setIsMultiplePay(true); setIsCliked(true) }} className='p-[2px] cursor-pointer items-center justify-start w-[100px] bg-purple-900 text-white flex'>
            <FaMoneyCheckAlt size={15} className='mx-1' />
            <h1 className='text-xs font-semibold '>Multiple Pay</h1>
          </div> */}
          <div onClick={() => { handleClick("cash") }} className='p-1 cursor-pointer items-center justify-center bg-green-400 text-white flex'>
            <FaMoneyBillAlt size={15} className='mx-1' />
            <h1 className='text-sm font-semibold'>Cash</h1>
          </div>
          <div onClick={() => { handleClick() }} className='p-1 cursor-pointer items-center justify-center bg-red-400 text-white flex'>
            <FaWindowClose size={15} className='mx-1' />
            <h1 className='text-sm font-semibold'>Cancle</h1>
          </div>
          <div className='p-1 cursor-pointer w-[200px] items-center justify-between h-[50px] bg-purple-900 text-white flex'>
            <h1 className='text-sm font-bold'>Total Payable</h1>
            <h1 className='text-xs'>{totalPayable(total)}</h1>

          </div>
        </div>
        <div className='flex items-end justify-end w-1/4'>
          <div onClick={() => { setIsCliked(true); setRecentTrx(true); setDynwidth("50%") }} className='py-1 px-2 mx-4 bg-blue-400 text-white flex'>
            <FaClock size={15} className='mx-1' />
            <h1 className='text-xs'>Recent Transaction</h1>
          </div>
        </div>

      </div>

      {
        isCliked &&
        <div className='absolute top-0 flex flex-col items-center  justify-start right-0 bg-black/70 w-full min-h-screen'>
          <div className={`w-full md:w-[${dynwidth > "0%" ? dynwidth : '70%'}]`}>
            <div onClick={() => {
              setIsCliked(false);
              setRecentTrx(false);
              setUpdateShipping(false);
              setCloseRegister(false);
              setUpdateDiscount(false);
              setSuspendedSale(false);
              setRegisterDetail(false);
              setIsCard(false);
              setIsSuspend(false);
              setIsAddSupplier(false);
              setNewProduct(false);
              // setIsMultiplePay(false);
              setDynwidth('');
              setEditProduct(false)
            }} className=' flex items-end justify-end  w-full mt-10 bg-white px-5 pt-2'>
              <MdCancel size={20} />

            </div>
            {displayData()}
          </div>
        </div>

      }

    </div>
  )
}

export default AddPos