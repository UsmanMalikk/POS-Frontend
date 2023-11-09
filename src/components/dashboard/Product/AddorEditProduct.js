import React, { useRef, useState, useEffect } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import { FaInfoCircle, FaMinus, FaPlus, FaPlusCircle, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';
import JoditEditor from 'jodit-react';
import { AiTwotoneFolderOpen } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdCancel } from 'react-icons/md';
import AddorEditUnits from './units/AddorEditUnits';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddorEditProduct = () => {
  const editor = useRef(null)
  const params = useParams()
  const _id = params.id



  const [unitsData, setUnitsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [variationData, setVariationData] = useState([]);
  const [businessLocationData, setBusinessLocationData] = useState([]);
  const [spgData, setSpgData] = useState([]);
  const [contactCustomData, setContactCustomData] = useState([])

  const [skuInfor, setSkuInfor] = useState(false)
  const [skuInfor1, setSkuInfor1] = useState(false)
  // const [info, setInfo] = useState(false)
  const [infor, setInfor] = useState(false)
  const [open, setOpen] = useState(false)
  const [isOpen1, setIsOpen1] = useState(false)
  // const [productImei, setProductImei] = useState(false)
  // const [isSelling, setIsSelling] = useState(false)
  const inpuRef = useRef()
  const inpuRef1 = useRef()
  // const [isWoocommerce, setIsWoocommerce] = useState(false)
  const [variationValue1, setVariationValue1] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  // const [isAdSlngPrcGrp, setIsAdSlngPrcGrp] = useState(false)
  // const [isOpeningStock, setIsOpeningStock] = useState(false)
  // const [isAddOther, setIsAddOther] = useState(false)
  // const [isSave, setIsSave] = useState(false)
  const [isAddUnit, setIsAddUnit] = useState(false)

  const [seletedValue, setSeletedValue] = useState('')
  const [open1, setOpen1] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    productName: "",
    sku: 0,
    barcodeType: "",
    unit: null,
    unitName: "",
    businessLocation: [],
    manageStock: false,
    productDescription: "",
    productImage: "",
  
    productType: "",
    variationType: [{ variationTempleateID: null, variation: [{ subSKU: "", value: "" }] }],
    combo: [],
    netTotal: 0,
    dfltSellingPrice: 0,
    margin: 0,
    // customField1: "",
    // customField2: "",
    // customField3: "",
    // customField4: "",
    // customField5: "",
    // customField6: "",
    // customField7: "",
    // customField8: "",
    // customField9: "",
    // customField10: "",
  })
  const handleDelete = (index) => {
    let newArray = [...formData.businessLocation]
    newArray.splice(index, 1)
    setFormData({ ...formData, businessLocation: newArray })
  }
  // if (index === -1)
  const handleSubChange = (e, index, i) => {

    const updatedData = formData.variationType.map((item, ind) => {
      if (ind === index) {
        // Create a new copy of the item with the modified subItem
        return {
          ...item,
          variation: item.variation.map((subItem, x) =>
            x === i ? { ...subItem, [e.target.name]: e.target.value } : subItem
          ),
        };
      }
      return item;
    });
    setFormData({ ...formData, variationType: updatedData });
  }
  const [isCliked, setisCliked] = useState(false)
  const displayData = () => {
    if (isAddUnit) {
      return <AddorEditUnits />
    }
  }
  const handleChange = (e, index) => {
    const updatedData = formData.variationType.map((item, ind) => {
      if (ind === index) {
        // Create a new copy of the item with the modified subItem
        return {
          ...item, variationTempleateID: e.target.value, variation: []
        };
      }
      return item;
    });
    // console.log(updatedData)
    setFormData({ ...formData, variationType: updatedData });
  }
  const handleComboCahange = (index, e) => {
    const updatedData = formData.combo.map((item, ind) => {
      if (ind === index) {
        // Create a new copy of the item with the modified subItem
        return {
          ...item, [e.target.name]: e.target.value
        };
      }
      return item;
    });
    console.log(updatedData)
    setFormData({ ...formData, combo: updatedData });
  }

  const addToArray = (name) => {
    let updatedData = formData.combo
    updatedData = [...updatedData, { productName: name, quantity: "", unit: "", unitType: [{ value: "" }], ppexcludeTax: "", totalAmountExcluedeTax: "" }]
    setFormData({ ...formData, combo: updatedData });

  }

  const handleValues = (e, index) => {
    setVariationValue1([...variationValue1, { value: e.target.value }])
    const updatedData1 = formData.variationType.map((item, ind) => {
      if (ind === index) {
        // Create a new copy of the item with the modified subItem
        return {
          ...item, variation: [...item.variation, { subSKU: "", value: e.target.value }]
        };
      }
      return item;
    });
    setFormData({ ...formData, variationType: updatedData1 });

  }

  const handleRemove = (index, i) => {
    let number = i
    const updatedData1 = formData.variationType
    updatedData1[index].variation.splice(number, 1)
    setFormData({ ...formData, variationType: updatedData1 });

  }
  const deleteByIndex = (index) => {
    let updatedData1 = formData.combo
    updatedData1.splice(index, 1)
    setFormData({ ...formData, combo: updatedData1 });
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({
      ...formData,
      productImage: file, // Set the file object in the state
    });
  };

  const addRow = () => {
    let newArray = formData.variationType
    newArray = [...newArray, { variationTempleateID: null, variation: [{ subSKU: "", value: "" }] }]
    setFormData({ ...formData, variationType: newArray })
  }
  // const handleUpdate = () => {
  //   // Handle update logic for _id (update case)
  //   console.log("Handle Update", formData);
  // };

  const handleOpeningStock = () => {
    if (formData.productName.length === 0 ||
      formData.unit.length === 0
    ) {
      setIsserror(true)
      console.log(isserror)
    }
    navigate("/home/opening-stock/add", { state: { formData } });
  };

  const handleSellingPriceGroup = () => {
    if (formData.productName.length === 0 ||
      formData.unit.length === 0
    ) {
      setIsserror(true)
      console.log(isserror)
    } navigate("/home/products/add-selling-prices", { state: { formData, spgData } });
  };

  const handleAddOther = () => {
    if (formData.productName.length === 0 ||
      formData.unit.length === 0
    ) {
      setIsserror(true)
      console.log(isserror)
    }
    setTimeout(() => {
      navigate("/home/products/create");
    }, 1000);
  };

  const handleSave = () => {
    if (formData.productName?.length === 0 ||
      formData.unit?.length === 0
    ) {
      setIsserror(true)
      console.log(isserror)
    } else if (_id) {
      addProductById()
      console.log("Handle update ", formData);

    } else {
      addProduct()
      console.log("Handle save ", formData);
    }

  };
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
  const fetchCustomFields = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`http://localhost:8000/admin/product-custom-label/withdropdown`, {
        headers: {
          'Authorization': token
        }
      });
      console.log(response.data);
      setContactCustomData(response.data);

    } catch (e) {
      console.error(e)
    }

  }
  const fetchUnits = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/units`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response)
      setUnitsData(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const fetchVariations = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/variations/all-records`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response.data)
      setVariationData(response.data);
      // console.log(variationData)

    } catch (error) {
      console.error('Error fetching variations:', error);
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
  const fetchProductById = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/products/${_id}`, {
        headers: {
          'Authorization': token
        }
      });
      const customLable1 = response.data.customLable1
      const customLable2 = response.data.customLable2
      const customLable3 = response.data.customLable3
      const customLable4 = response.data.customLable4
      const customLable5 = response.data.customLable5
      const customLable6 = response.data.customLable6
      const customLable7 = response.data.customLable7
      const customLable8 = response.data.customLable8
      const customLable9 = response.data.customLable9
      const customLable10 = response.data.customLable10
      const unitName = `${response.data.unit?.name} ${response.data.unit?.shortName}`

      setFormData({ ...response.data, unitName: unitName, customField1: customLable1, customField2: customLable2, customField3: customLable3, customField4: customLable4, customField5: customLable5, customField6: customLable6, customField7: customLable7, customField8: customLable8, customField9: customLable9, customField10: customLable10 });

    } catch (error) {
      console.error('Error fetching Product:', error);
    }
  };
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
  useEffect(() => {
    // Make an API call to fetch SPG's records
    if (_id) {
      fetchUnits()
      fetchLocations()
      fetchProducts()
      fetchProductById();
      fetchVariations()
      fetchSPG()
      fetchCustomFields()
    }
    else {
      fetchUnits()
      fetchLocations()
      fetchProducts()
      fetchVariations()
      fetchSPG()
      fetchCustomFields()
    }


  }, []);

  const addProduct = async () => {

    try {
      const token = localStorage.getItem('token');
      const formDataForSubmission = new FormData();
      formDataForSubmission.append('productName', formData.productName);
      formDataForSubmission.append('sku', formData.sku);
      formDataForSubmission.append('barcodeType', formData.barcodeType);
      formDataForSubmission.append('unit', formData.unit);
      formDataForSubmission.append('businessLocation', formData.businessLocation);
      formDataForSubmission.append('manageStock', formData.manageStock);
      formDataForSubmission.append('productImage', formData.productImage);
      formDataForSubmission.append('productDescription', formData.productDescription);
      formDataForSubmission.append('productType', formData.productType);
      if (formData.variationType[0]?.variationTempleateID !== null) {
        formDataForSubmission.append('variationType', formData.variationType);
      }
      formDataForSubmission.append('combo', formData.combo);
      formDataForSubmission.append('netTotal', formData.netTotal);
      formDataForSubmission.append('dfltSellingPrice', formData.dfltSellingPrice);
      formDataForSubmission.append('margin', formData.margin);
      formDataForSubmission.append('customLable1', formData.customField1);
      formDataForSubmission.append('customLable2', formData.customField2);
      formDataForSubmission.append('customLable3', formData.customField3);
      formDataForSubmission.append('customLable4', formData.customField4);
      formDataForSubmission.append('customLable5', formData.customField5);
      formDataForSubmission.append('customLable6', formData.customField6);
      formDataForSubmission.append('customLable7', formData.customField7);
      formDataForSubmission.append('customLable8', formData.customField8);
      formDataForSubmission.append('customLable9', formData.customField9);
      formDataForSubmission.append('customLable10', formData.customField10);

      // console.log(formDataForSubmission)
      const response = await axios.post(`http://localhost:8000/admin/products`, formDataForSubmission, {
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
          navigate("/home/products")
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
      const response = await axios.put(`http://localhost:8000/admin/products/${_id}`, formData, {
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
          navigate("/home/products")
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
  const [isserror, setIsserror] = useState(false)


  return (
    <div className='w-full flex flex-col bg-gray-100 p-5 min-h-screen'>
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
      <h1 className='text-xl  text-start mb-4'>{_id ? "Edit" : "Add new"}  Product</h1>
      <div className='w-full p-5 border-t-[3px] bg-white  border-blue-600 pb-[100px] rounded-xl'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex flex-col'>
            <h1 className='flex text-start font-bold'>
              Product Name:*
              <span className='text-red-400'>{isserror && formData.productName.length === 0 ? "Required field" : ""}</span>

            </h1>
            <input type='text' value={formData.productName} onChange={(e) => { setFormData({ ...formData, productName: e.target.value }) }} placeholder='Product Name' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
          </div>
          <div className='flex flex-col relative'>
            <div className='flex '>
              <h1 className='text-start font-bold'>SKU:</h1>
              <FaInfoCircle onMouseOver={() => { setSkuInfor(true) }} onMouseLeave={() => { setSkuInfor(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
              {skuInfor &&
                <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                  <p className='text-start'>Unique Product ID or Stock Keepin Unit</p>
                  <p className='text-start mt-2'>Keep it blank to automatically generate sku</p>
                  <p className='text-start mt-2 text-gray-600'>you can modify sku prefix in Business Setting</p>

                </div>
              }
            </div>
            <input type='text' value={formData.sku} onChange={(e) => { setFormData({ ...formData, sku: e.target.value }) }} placeholder='SKU' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
          </div>
          
          <div className='flex flex-col '>
            <h1 className='flex text-start font-bold'>
              Unit:*
              <span className='text-red-400'>{isserror && formData.unit?.length === 0 ? "Required field" : ""}</span>

            </h1>
            <div className='flex flex-col relative'>
              <div className='flex '>
                <input
                  onClick={() => setOpen(!open)}
                  className='bg-white w-full  flex items-center  focus:outline-none justify-between px-2  border-[1px] border-gray-600'
                  value={formData.unitName}
                  onChange={(e) => { setFormData({ ...formData, unit: e.target.value }) }}
                  placeholder='Select Value'
                />
                <BiChevronDown size={20} className={`${open && "rotate-180"} absolute top-1 right-7`} />

                <FaPlusCircle onClick={() => { setisCliked(true); setIsAddUnit(true); }} size={20} style={{ color: "blue" }} className='w-8 h-8 p-1 cursor-pointer  border-[1px] border-gray-600' />
              </div>
              {open &&
                <ul

                  className={`bg-white  w-[250px] mx-[30px] border-[1px] absolute z-10 top-8 right-0 border-gray-600 overflow-y-auto ${open ? "max-h-60" : "max-h-0"} `}
                >
                  <div className="flex items-center px-2 sticky top-0 bg-white">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                      className="placeholder:text-gray-700 p-1 outline-none border-[1px] border-gray-500"
                    />
                  </div>
                  {unitsData?.map((data) => (
                    <li
                      key={data?._id}
                      className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                                        ${data?.name?.toLowerCase() === (formData.unitName?.toLowerCase() &&
                          "bg-sky-600 text-white")
                        }
                                         ${data?.name?.toLowerCase().startsWith(inputValue)
                          ? "block"
                          : "hidden"
                        }`}
                      onClick={() => {
                        if (data?.name?.toLowerCase() !== formData.unitName?.toLowerCase()) {
                          setFormData({ ...formData, unit: data?._id, unitName: `${data?.name} ${data?.shortName}` })
                          setOpen(false);
                          setInputValue("");
                        }
                      }}
                    >
                      {data?.name + ' ' + data?.shortName}
                    </li>
                  ))}
                </ul>
              }
            </div>

          </div>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>


          <div className='flex flex-col relative'>
            <div className='flex '>
              <h1 className='text-start font-bold'>Business Location:</h1>
              <FaInfoCircle onMouseOver={() => { setInfor(true) }} onMouseLeave={() => { setInfor(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
              {infor &&
                <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                  <p className='text-start'>Location Where Product will be available</p>

                </div>
              }
            </div>
            {/* <input value={location} onChange={(e) => {  hadleLocation(e.target.value) }} type='text' placeholder='Business Location' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' /> */}

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
                  {businessLocationData?.map((data) => (
                    <li
                      key={data?._id}
                      className={`p-2 text-sm text-start hover:bg-sky-600 hover:text-white
                                                        ${data?.name?.toLowerCase() === seletedValue?.toLowerCase() &&
                        "bg-sky-600 text-white"
                        }
                                                         ${data?.name?.toLowerCase().startsWith(inputValue1)
                          ? "block"
                          : "hidden"
                        }`}
                      onClick={() => {
                        if (data?.name?.toLowerCase() !== seletedValue.toLowerCase()) {
                          let darray = formData.businessLocation
                          darray = [...darray, data?._id]
                          // console.log(darray)
                          setFormData({ ...formData, businessLocation: darray })
                          setOpen1(false);
                          setInputValue1("");
                        }
                      }}
                    >
                      {data?.name}
                    </li>
                  ))}
                </ul>
              }
            </div>
            {formData.businessLocation &&

              <div className='w-full border-[1px] border-gray-400 py-1 px-1'>
                <ul className='grid grid-cols-2 gap-1'>
                  {formData.businessLocation.map((val, index) => {
                    return <li key={index} className='flex items-center py-1 rounded-md px-2 bg-blue-500 text-white text-xs mx-2'>
                      <p onClick={() => { handleDelete(index) }} className='mx-1 mb-1 cursor-pointer'>X</p>
                      <h1>{val.name}</h1>
                    </li>

                  })}
                </ul>
              </div>
            }
          </div>

        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex flex-col mt-1'>
            <h1 className='flex text-start font-bold'>Weight:</h1>
            <input value={formData.weight} onChange={(e) => { setFormData({ ...formData, weight: e.target.value }) }} type='number' placeholder='Weight' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
          </div>
        </div>
        <div className='flex w-full mt-2'>

          <div className='flex flex-col w-[67%]'>
            <h1 className='flex text-start font-bold'>Description:</h1>
            <JoditEditor
              className='w-full h-[300px] border-[1px] border-gray-500'
              ref={editor}
              value={formData.productDescription} onChange={(newContent) => { setFormData({ ...formData, productDescription: newContent }) }}
            />
          </div>
          <div className=' flex flex-col w-[30%] mx-[1.5%]'>
            <h2 className='text-start font-bold '> Product Image:</h2>
            <div className='flex'>
              {/* value={formData.img_data} onChange={ (e)=>setFormData({...formData,  img_data: e.target.value})} */}
              {/* <input value={formData.productImage} readOnly type='file' className='px-3  border-[1px] border-gray-700  focus:outline-none w-[60%]' /> */}
              <input onChange={handleFileUpload} className='px-3   focus:outline-none w-[60%] hidden' type='file' ref={inpuRef} accept='application/pdf,text/csv,application/zip,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png' />
              <div onClick={() => { inpuRef.current?.click(); }} className='flex cursor-pointersu bg-blue-600 text-white w-[40%] items-center justify-center'>
                <AiTwotoneFolderOpen size={32} />
                Browse
              </div>
            </div>
            <p className='text-start  flex '>Max File size: 5MB:
              <br />
              Aspec Ration should be 1:1
            </p>

          </div>


        </div>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 bg-white '>

        {contactCustomData.customLable1 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable1}</h1>
          {contactCustomData.customLableType1 === "Dropdown" ?
            <select value={formData.customField1} onChange={(e) => { setFormData({ ...formData, customField1: e.target.value }) }} placeholder={"Custom Lable 1"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions1.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType1} value={formData.customField1} onChange={(e) => { setFormData({ ...formData, customField1: e.target.value }) }} placeholder={`Custom Lable 1`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}
        {contactCustomData.customLable2 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable2}</h1>
          {contactCustomData.customLableType2 === "Dropdown" ?
            <select value={formData.customField2} onChange={(e) => { setFormData({ ...formData, customField2: e.target.value }) }} placeholder={"Custom Lable 2"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions2.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType2} value={formData.customField2} onChange={(e) => { setFormData({ ...formData, customField2: e.target.value }) }} placeholder={`Custom Lable 2`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}

        {contactCustomData.customLable3 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable3}</h1>
          {contactCustomData.customLableType3 === "Dropdown" ?
            <select value={formData.customField3} onChange={(e) => { setFormData({ ...formData, customField3: e.target.value }) }} placeholder={"Custom Lable 3"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions3.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType3} value={formData.customField3} onChange={(e) => { setFormData({ ...formData, customField3: e.target.value }) }} placeholder={`Custom Lable 3`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}
        {contactCustomData.customLable4 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable4}</h1>
          {contactCustomData.customLableType4 === "Dropdown" ?
            <select value={formData.customField4} onChange={(e) => { setFormData({ ...formData, customField4: e.target.value }) }} placeholder={"Custom Lable 4"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions4.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType4} value={formData.customField4} onChange={(e) => { setFormData({ ...formData, customField4: e.target.value }) }} placeholder={`Custom Lable 4`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}

        {contactCustomData.customLable5 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable5}</h1>
          {contactCustomData.customLableType5 === "Dropdown" ?
            <select value={formData.customField5} onChange={(e) => { setFormData({ ...formData, customField5: e.target.value }) }} placeholder={"Custom Lable 5"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions5.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType5} value={formData.customField5} onChange={(e) => { setFormData({ ...formData, customField5: e.target.value }) }} placeholder={`Custom Lable 5`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}

        {contactCustomData.customLable6 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable6}</h1>
          {contactCustomData.customLableType6 === "Dropdown" ?
            <select value={formData.customField6} onChange={(e) => { setFormData({ ...formData, customField6: e.target.value }) }} placeholder={"Custom Lable 6"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions6.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType6} value={formData.customField6} onChange={(e) => { setFormData({ ...formData, customField6: e.target.value }) }} placeholder={`Custom Lable 6`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}

        {contactCustomData.customLable7 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable7}</h1>
          {contactCustomData.customLableType7 === "Dropdown" ?
            <select value={formData.customField7} onChange={(e) => { setFormData({ ...formData, customField7: e.target.value }) }} placeholder={"Custom Lable 7"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions7.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType7} value={formData.customField7} onChange={(e) => { setFormData({ ...formData, customField7: e.target.value }) }} placeholder={`Custom Lable 7`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}

        {contactCustomData.customLable8 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable8}</h1>
          {contactCustomData.customLableType8 === "Dropdown" ?
            <select value={formData.customField8} onChange={(e) => { setFormData({ ...formData, customField8: e.target.value }) }} placeholder={"Custom Lable 8"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions8.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType8} value={formData.customField8} onChange={(e) => { setFormData({ ...formData, customField8: e.target.value }) }} placeholder={`Custom Lable 8`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}

        {contactCustomData.customLable9 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable9}</h1>
          {contactCustomData.customLableType9 === "Dropdown" ?
            <select value={formData.customField9} onChange={(e) => { setFormData({ ...formData, customField9: e.target.value }) }} placeholder={"Custom Lable 1"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions9.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType9} value={formData.customField9} onChange={(e) => { setFormData({ ...formData, customField1: e.target.value }) }} placeholder={`Custom Lable 1`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}

        {contactCustomData.customLable10 !== "" ? <div className='flex flex-col'>
          <h1 className='text-start font-bold my-1'>{contactCustomData.customLable10}</h1>
          {contactCustomData.customLableType10 === "Dropdown" ?
            <select value={formData.customField10} onChange={(e) => { setFormData({ ...formData, customField10: e.target.value }) }} placeholder={"Custom Lable 10"} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none'>
              <option value={""}>Please Select</option>
              {contactCustomData.dropdownOptions10.map((val, index) => {
                return <option key={index} value={val}>{val}</option>

              })}
            </select> :
            <input type={contactCustomData.customLableType10} value={formData.customField10} onChange={(e) => { setFormData({ ...formData, customField10: e.target.value }) }} placeholder={`Custom Lable 10`} className='px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none' />
          }
        </div>
          : ""}
      </div>



      <div className='w-full p-5 border-t-[3px] bg-white  mt-5 border-blue-600 pb-[100px] rounded-xl'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='flex flex-col'>
            <h1 className='flex text-start font-bold'>
              Product Type:*
              <span className='text-red-400'>{isserror && formData.productType.length === 0 ? "Required field" : ""}</span>

            </h1>
            <select value={formData.productType} onChange={(e) => { setFormData({ ...formData, productType: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none'>
              <option value={"Single"}>Single</option>
              <option value={"Variable"}>Variable</option>
              <option value={"Combo"}>Combo</option>

            </select>
          </div>


        </div>

        {formData.productType === "Variable" &&
          <div className='flex flex-col mt-5'>
            <div className='flex items-start'>
              <h1 className='text-lg text-start'>Add Variation:*</h1>
              <div className='flex items-center justify-center bg-blue-600 rounded-sm p-2 mx-1'>
                <FaPlus onClick={addRow} size={15} style={{ color: "white" }} className='cursor-pointer' />
              </div>


            </div>
            <div className='flex overflow-x-scroll  mt-5 ' >
              <table className="table-auto  w-full  mb-2   px-5 ">
                <thead>
                  <tr className='py-1 bg-green-500'>
                    <th className=" py-2 title-font w-[20%] text-start border-[1px] border-white  tracking-wider font-bold text-white text-sm ">Variation</th>
                    <th className=" py-2 title-font w-[80%] text-start border-[1px] border-white tracking-wider font-bold text-white text-sm ">Variation Value</th>

                  </tr>

                </thead>
                <tbody >
                  {formData.variationType.map((val, index) => {
                    return <tr key={index} className='min-h-[300px] text-start'>
                      <td className='flex flex-col'>

                        <select value={val.variationTempleateID} onChange={(e) => { handleChange(e, index) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none'>
                          {variationData.map((variations) => (
                            <option key={variations._id} value={variations._id}>
                              {variations.variationName}
                            </option>
                          ))}

                        </select>

                        {val.variationTempleateID !== null &&
                          <div className='mt-5'>
                            <h1 className='font-semibold text-xs text-start'>Selecet Variation Values</h1>
                            <select value={null} onChange={(e) => { handleValues(e, index) }} className='w-full border-[1px] border-black py-1 px-1 focus:outline-none' >
                              {variationData.map((variations) => (

                                val.variationTempleateID === variations._id ?
                                  <>
                                    {variations.variationValues.map((values) => (

                                      <option>
                                        {values}
                                      </option>
                                    ))}

                                  </>
                                  :
                                  <>

                                  </>

                              ))}

                            </select>
                          </div>
                        }

                      </td>
                      <td className=''>
                        <table className="table-auto  w-full  items-start">
                          <thead>
                            <tr className='mt-[2px]'>
                              <th className='w-[25%]'>
                                <div className='flex px-2 py-1 border-[1px] border-white  relative bg-blue-700 mt-[2px]'>

                                  <h1 className='text-start font-bold text-white'>SKU:</h1>
                                  {/* <FaInfoCircle onMouseOver={() => { setInfo(true) }} onMouseLeave={() => { setInfo(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                                  {info &&
                                    <div className='flex flex-col w-[180px] rounded-md  border-[2px] border-gray-400 absolute top-8 p-2 20 bg-white shadow-md shadow-gray-300'>
                                      <p className='text-start'>SKU is Optional</p>
                                      <p className='text-start mt-3'>Keep it blank to automatically generate sku</p>

                                    </div>
                                  } */}
                                </div>
                              </th>
                              <th className='w-[25%]'>
                                <div className='flex px-2 py-1 border-[1px] border-white  bg-blue-700 mt-[2px]'>
                                  <h1 className='text-start font-bold text-white'>Value</h1>
                                </div>
                              </th>
                              <th className='w-[45%]'>
                                <div className='flex px-2 py-1 border-[1px] border-white  bg-blue-700 mt-[2px]'>
                                  <h1 className='text-start font-bold text-white'>Variation Images</h1>
                                </div>
                              </th>
                              <th className='w-[5%]'>
                                <div className='flex px-1 py-2 border-[1px] border-white   bg-blue-700 mt-[2px]'>
                                  <div className='flex items-center justify-center bg-green-600 rounded-sm px-1  mx-1'>
                                    <FaPlus size={15} style={{ color: "white" }} />
                                  </div>
                                </div>

                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.variationType[index].variation.map((data, i) => {
                              return <tr key={i}>
                                <td>
                                  <input type='text' name='subSKU' value={data.subSKU || ""} onChange={(e) => handleSubChange(e, index, i)} className='border-[1px] w-full border-black focus:outline-none' />

                                </td>
                                <td>
                                  <input type='text' name='value' value={data.value || ""} onChange={(e) => handleSubChange(e, index, i)} className='border-[1px] w-full border-black focus:outline-none' />

                                </td>

                                <td>
                                  <div onClick={() => { handleRemove(index, i) }} className='flex items-center justify-center bg-red-500 cursor-pointer rounded-sm px-1 py-1  '>
                                    <FaMinus size={15} style={{ color: "white" }} />
                                  </div>
                                </td>
                              </tr>
                            })}

                          </tbody>

                        </table>
                      </td>

                    </tr>
                  })}


                </tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
            </div>
          </div>
        }

        {formData.productType === "Combo" &&
          <div className='flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600'>
            <div className='flex flex-col md:flex-row mt-5 w-full items-center justify-center'>
              <div className='flex flex-col   w-[50%] items-center justify-center'>
                <div className='flex w-full   md:mt-0 relative'>
                  <div className='flex w-full'>
                    < FaSearch size={15} className='w-8 h-8 p-2 border-[1px] border-gray-600' />
                    <input onClick={() => { setIsClicked(!isClicked) }} value={inputValue2} onChange={(e) => { setInputValue2(e.target.value) }} type='Text' placeholder='Enter Product name / SKU / Scan bar code' className='px-2 w-full py-[2px] border-[1px] border-gray-600 focus:outline-none' />
                  </div>
                  {isClicked &&
                    <ul

                      className={`bg-white w-full    border-[1px]   z-10 absolute top-8 border-gray-600  ${isClicked ? "max-h-60" : "max-h-0"} `}
                    >

                      {productsData?.map((data) => (
                        <li
                          key={data?._id}
                          className={`p-1 px-9 text-start text-sm hover:bg-sky-600 hover:text-white
                          ${data?.productName?.toLowerCase() === inputValue2?.toLowerCase() &&
                            "bg-sky-600 text-white"
                            }
                           ${data?.productName?.toLowerCase().startsWith(inputValue2)
                              ? "block"
                              : "hidden"
                            }`}
                          onClick={() => {
                            if (data?.productName?.toLowerCase() !== inputValue2.toLowerCase()) {
                              setInputValue1(data?.productName)
                              let name = data?.productName
                              addToArray(name)
                              setInputValue2('')
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

            </div>


            <div className='flex overflow-x-scroll  mt-5 ' >
              <table className="table-auto w-full   mb-2   px-5 ">
                <thead>
                  <tr className='h-[50px] bg-green-500'>
                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Product Name</th>
                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Quantity</th>
                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Purchase Price (Excluding Tax) </th>
                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">Total Amount (Exc. Tax)</th>
                    <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm "><FaTrash size={15} /> </th>

                  </tr>
                </thead>
                <tbody >
                  {formData.combo.map((value, index) => {
                    return <tr title='Double Click to Edit me' key={index} className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""}`}>
                      <td className=" py-1 px-1">{value.productName}</td>
                      <td className="px-1 py-1 text-sm flex flex-col">
                        <input type='number' name='quantity' required value={value.quantity} onChange={(e) => { handleComboCahange(index, e) }} className='border-[1px] px-2  w-1/3 border-gray-400 focus:outline-none' />
                        <select value={value.unit} name='unit' onChange={(e) => { handleComboCahange(index, e) }} type='text' className='border-[1px] px-2  border-gray-400 focus:outline-none'>
                          {/* {value.unitType.map((val, ind) => { */}
                          <option value={productsData.value}>{productsData.value}</option>

                          {/* })} */}
                        </select>
                      </td>
                      <td className="px-1 py-1"> {value.ppexcludeTax}</td>
                      <td className="px-1 py-1">{value.totalAmountExcluedeTax}</td>
                      <td className="px-1 py-1 text-red-400"> <FaTimes size={15} onClick={() => { deleteByIndex(index); }} className='cursor-pointer' /> </td>

                    </tr>
                  })}


                </tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
            </div>

            <div className='flex flex-col items-end justify-end'>
              <div className='flex flex-col justify-end w-1/2   mt-5 '>

                <div className='flex justify-between'>
                  <h1 className='font-bold mx-2'>Net Total Amount</h1>
                  <h1 className=' mx-2'>{formData.netTotal}</h1>

                </div>
              </div>


              <div className='flex justify-end  items-end w-1/2  mt-5 '>
                <div className='flex justify-between w-full'>

                  <div className='flex flex-col'>
                    <h1 className='font-bold mx-2'>x Margin(%)</h1>
                    <input value={formData.margin} onChange={(e) => { setFormData({ ...formData, margin: e.target.value }) }} type='text' placeholder='Alert Quantity' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                  </div>
                  <div className='flex flex-col'>
                    <h1 className='font-bold mx-2'>Default Selling Price</h1>
                    <input value={formData.dfltSellingPrice} onChange={(e) => { setFormData({ ...formData, dfltSellingPrice: e.target.value }) }} type='text' placeholder='Alert Quantity' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                  </div>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
      <div className='flex items-end justify-end mt-5'>
        {/* <button onClick={() => { handleClick(); setIsAdSlngPrcGrp(true) }} className='bg-orange-500 text-lg px-2 py-2 items-center justify-center flex'>Save & Add Selling-Price-Group Prices</button>
        <button onClick={() => { handleClick(); setIsOpeningStock(true) }} className='bg-blue-500 text-lg px-2 py-2 text-white items-center justify-center flex'>Save & Add Opening Stock</button>
        <button onClick={() => { handleClick(); setIsAddOther(true) }} className='bg-red-500 text-lg px-2 py-2 text-white items-center justify-center flex'>Save & Add Another</button>

        
        <button onClick={() => {handleClick(); setIsSave(true)}}className='bg-green-500 text-lg px-2 py-2 items-center justify-center flex'>Save</button> */}
        <button onClick={() => { handleSellingPriceGroup() }} className='bg-orange-500 text-lg px-2 py-2 items-center justify-center flex'>{_id ? "Update" : "Save"} & Add Selling-Price-Group Prices</button>
        <button onClick={() => { handleOpeningStock() }} className='bg-blue-500 text-lg px-2 py-2 text-white items-center justify-center flex'>{_id ? "Update" : "Save"} & Add Opening Stock</button>
        <button onClick={() => { handleAddOther() }} className='bg-red-500 text-lg px-2 py-2 text-white items-center justify-center flex'>{_id ? "Update" : "Save"} & Add Another</button>
        <button onClick={() => { handleSave() }} className='bg-green-500 text-lg px-2 py-2 items-center justify-center flex'>{_id ? "Update" : "Save"}</button>
      </div>
      {isCliked &&
        <div className='absolute top-0 flex flex-col items-center z-10 justify-center right-0 bg-black/70 w-full min-h-screen'>
          <div className='flex flex-col   w-full md:w-[50%]  mt-10 bg-white px-5 pt-2'>
            <div className='flex items-end justify-end '>
              <MdCancel onClick={() => { setisCliked(!isCliked); setIsAddUnit(false) }} size={20} />

            </div>
            <div className='flex items-start justify-center'>
              {displayData()}
            </div>
          </div>
        </div>

      }
    </div>
  )
}

export default AddorEditProduct