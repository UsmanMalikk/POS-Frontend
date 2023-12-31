import React, { useState, useEffect } from "react";
import {
  FaCalendar,
  FaInfoCircle,
  FaMapMarker,
  FaMinus,
  FaPlus,
  FaPlusCircle,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

import { MdCancel } from "react-icons/md";
import AddProduct from "../Product/AddorEditProduct";
import AddorEditContact from "../contacts/AddorEditContact";
import ImportProduct from "../Product/ImportProduct";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddStockTransfer = () => {
  const Navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);

  const [businessLocationData, setBusinessLocationData] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");

  const [isAddSupplier, setIsAddSupplier] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [info1, setInfo1] = useState(false);
  const [info2, setInfo2] = useState(false);
  const [info3, setInfo3] = useState(false);

  const [formData, setFormData] = useState({
    referenceNumber: "",
    date: "",
    status: "",

    fromLocation: null,
    toLocation: null,

    inputData: [],

    shippingDetails: "",
    // shippingAddress: "",
    shippingCharges: 0,
    totalAmount: 0
  });
  const params = useParams();
  const id = params.id;
  const handleChange = (e, index) => {
    const updatedData = formData.inputData.map((item, ind) => {
      if (ind === index) {
        // Create a new copy of the item with the modified subItem
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      }
      return item;
    });
    // console.log(updatedData);
    setFormData({ ...formData, inputData: updatedData });
  };

  const deleteByIndex = (index) => {
    let newArray = [...formData.inputData];
    newArray.splice(index, 1);
    setFormData({ ...formData, inputData: newArray });
  };

  const findTotal = () => {
    let total = 0;
    formData.inputData.map((val) => {
      return total += val.subtotal;
    });
    return total;
  };
  const total = findTotal();
  const totalAmount = parseFloat(total) + parseFloat(formData.shippingCharges)
  formData.totalAmount = totalAmount
  const [isserror, setIsserror] = useState(false);


  const [isCliked, setIsCliked] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [isProductUpload, setIsProductUpload] = useState(false);
  const displayData = () => {
    if (newProduct === true) {
      return <AddProduct />;
    } else if (isProductUpload === true) {
      return <ImportProduct />;
    } else if (isAddSupplier === true) {
      return <AddorEditContact id={0} />;
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
      console.error('Error fetching Locations:', error);
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
  const fetchSTKById = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/stock-transfers/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response)
      response.data.date = new Date(response.data.date).toLocaleDateString("fr-CA")
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching Stock Tranfers:', error);
    }
  };
  useEffect(() => {
    // Make an API call to fetch SPG's records
    if (id) {
      fetchProducts()
      fetchSTKById()
      fetchLocations()
    }
    else {
      fetchProducts()
      fetchLocations()
    }


  }, []);
  const addSTK = async () => {

    try {
      const token = localStorage.getItem('token');
      // console.log(formData)
      const response = await axios.post(`http://localhost:8000/admin/stock-transfers`, formData, {
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
          Navigate("/home/stock-transfer");
        }, 2000);

      }
    } catch (error) {
      console.error('Error Adding Stock Transfer:', error);
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

  const addSTKById = async () => {

    try {
      const token = localStorage.getItem('token');
      // console.log(formData)
      const response = await axios.put(`http://localhost:8000/admin/stock-transfers/${id}`, formData, {
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
          Navigate("/home/stock-transfer");
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

  const handleClick = (e) => {
    if (

      formData.date.length === 0 ||
      formData.status.length === 0
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
      });
    } else if (id) {
      addSTKById()
      console.log("Handle Update", formData);
    } else {
      addSTK()
      console.log("Handle Save", formData);
    }
  };
  return (
    <div className="w-full p-3 bg-gray-100">
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
      <h1 className="text-xl text-start font-bold ">Add Stock Transfer</h1>

      <div className="flex w-full  min-h-[225px] flex-col p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600">
        <div className="flex my-2 w-full md:w-1/3 relative"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="flex flex-col">
            <div className="flex text-sm text-start font-bold">
              <h1>Date:*</h1>
              <h2 className="text-red-400">
                {isserror && formData.date.length === 0
                  ? "Required field"
                  : ""}
              </h2>
            </div>
            <div className="flex">
              <FaCalendar
                size={15}
                className="w-8 h-8 p-2 border-[1px] border-gray-600"
              />

              <input
                value={formData.date}
                onChange={(e) => {
                  setFormData({ ...formData, date: e.target.value });
                }}
                type="Date"
                placeholder="Select Date Time"
                className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="flex text-sm text-start font-bold">Reference No:</h1>
            <input
              value={formData.referenceNumber}
              onChange={(e) => {
                setFormData({ ...formData, referenceNumber: e.target.value });
              }}
              type="Text"
              placeholder="Reference No"
              className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col ">
            <div className="flex mx-2">
              <div className="text-start font-bold">
                <div className="flex flex-row">
                  <h1>Status:* </h1>
                  <FaInfoCircle
                    onMouseOver={() => {
                      setInfo1(true);
                    }}
                    onMouseLeave={() => {
                      setInfo1(false);
                    }}
                    size={15}
                    style={{ color: "skyblue" }}
                    className="mx-1 mt-1 cursor-help"
                  />
                </div>

                <h2 className="text-red-400">
                  {isserror && formData.status.length === 0
                    ? "Required field"
                    : ""}
                </h2>
              </div>
              <div className="flex mx-2">
                {info1 && (
                  <div className="flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-15 p-2 z-10 bg-white shadow-md shadow-gray-300">
                    <p className="text-start mt-2 text-gray-800">
                      Stock Transfer will not be editable if status is completed
                    </p>
                  </div>
                )}
              </div>
            </div>

            <select
              value={formData.status}
              onChange={(e) => {
                setFormData({ ...formData, status: e.target.value });
              }}
              type="text"
              className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
            >
              <option value={""}>Please Selecet</option>
              <option value={"Pending"}>Pending</option>
              <option value={"In Transit"}>In Transit</option>
              <option value={"Completed"}>Completed</option>
            </select>
          </div>
          <div className="flex flex-col text-sm text-start">
            <h2 className="font-bold">Location(From):</h2>
            <div className="flex  w-full  relative">
              <FaMapMarker
                size={15}
                className="w-8 h-8 p-2 border-[1px] border-gray-600"
              />

              <select

                onChange={(e) => {
                  setFormData({ ...formData, fromLocation: e.target.value });
                }}
                value={formData.fromLocation}
                type="text"
                className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
              >
                <option value={""}>Please Select</option>
                {businessLocationData.map((loc) => (
                  <option key={loc._id} value={loc._id} disabled={loc._id === formData.toLocation}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center border-[1px] border-gray-400">
                <FaInfoCircle
                  onMouseOver={() => {
                    setInfo3(true);
                  }}
                  onMouseLeave={() => {
                    setInfo3(false);
                  }}
                  size={15}
                  style={{ color: "skyblue" }}
                  className="mx-2  cursor-help"
                />
                {info3 && (
                  <div className="flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300">
                    <p className="text-start mt-2 text-gray-600">
                      Business Location from where you want to sell
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col text-sm text-start">
            <h2 className="font-bold">Location(To):</h2>
            <div className="flex  w-full  relative">
              <FaMapMarker
                size={15}
                className="w-8 h-8 p-2 border-[1px] border-gray-600"
              />

              <select
                value={formData.toLocation}
                onChange={(e) => {
                  setFormData({ ...formData, toLocation: e.target.value });
                }}
                type="text"
                className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
              >
                <option value={""}>Please Select</option>
                {businessLocationData.map((loc) => (
                  <option key={loc._id} value={loc._id} disabled={loc._id === formData.fromLocation}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center border-[1px] border-gray-400">
                <FaInfoCircle
                  onMouseOver={() => {
                    setInfo2(true);
                  }}
                  onMouseLeave={() => {
                    setInfo2(false);
                  }}
                  size={15}
                  style={{ color: "skyblue" }}
                  className="mx-2  cursor-help"
                />
                {info2 && (
                  <div className="flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300">
                    <p className="text-start mt-2 text-gray-600">
                      Business Location to which you are selling
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600">
        <div className="flex flex-col items-center justify-center md:flex-row w-full">
          <div className="flex md:w-[60%] mt-4 md:mt-0">
            <div className="flex w-full   md:mt-0 relative">
              <div className="flex w-full">
                <FaSearch
                  size={15}
                  className="w-8 h-8 p-2 border-[1px] border-gray-600"
                />
                <input
                  onClick={() => {
                    setIsClicked(!isClicked);
                  }}
                  value={inputValue1}
                  onChange={(e) => {
                    setInputValue1(e.target.value);
                  }}
                  type="Text"
                  placeholder="Enter Product name / SKU / Scan bar code"
                  className="px-2 w-full py-[2px] border-[1px] border-gray-600 focus:outline-none"
                  disabled={!formData.fromLocation || !formData.toLocation}
                />
              </div>
              {isClicked && (
                <ul
                  className={`bg-white w-full    border-[1px]   z-10 absolute top-8 border-gray-600  ${isClicked ? "overflow-y-auto max-h-40" : "max-h-0"
                    } `}
                >
                  {productsData?.map((data) => (
                    <li
                      key={data?._id}
                      className={`p-1 px-9 text-start text-sm hover:bg-sky-600 hover:text-white
                                ${data?.productName?.toLowerCase() ===
                        inputValue1?.toLowerCase() &&
                        "bg-sky-600 text-white"
                        }
                                 ${data?.productName?.toLowerCase().startsWith(
                          inputValue1
                        )
                          ? "block"
                          : "hidden"
                        }`}
                      onClick={() => {
                        if (
                          data?.productName?.toLowerCase() !==
                          inputValue1.toLowerCase()
                        ) {
                          setInputValue1(data?.productName);
                          // let name = data?.productName;
                          let array = formData.inputData;
                          array = [...array, { product: data?._id, unit: data?.unit, quantity: 0, unitPrice: 0, subtotal: 0 }];
                          setFormData({ ...formData, inputData: array });
                          setInputValue1("");
                          setIsClicked(!isClicked);
                        }
                      }}
                    >
                      {data?.productName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <FaPlusCircle
              onClick={() => {
                setNewProduct(true);
                setIsCliked(true);
              }}
              size={20}
              style={{ color: "blue" }}
              className="w-8 h-8 p-1 border-[1px] border-gray-600"
              disabled={!formData.fromLocation || !formData.toLocation}
            />
          </div>
        </div>
        <div className="flex overflow-x-scroll  mt-5 ">
          <table className="table-auto  mb-2 w-full  px-5 ">
            <thead>
              <tr className="h-[50px]">
                <th className=" py-2 title-font  tracking-wider font-bold  text-sm ">
                  Product
                </th>
                <th className=" py-2 title-font  tracking-wider font-bold  text-sm ">
                  Quantity
                </th>
                <th className=" py-2 title-font  tracking-wider font-bold  text-sm ">
                  Unit Price
                </th>

                <th className=" py-2 title-font  tracking-wider font-bold  text-sm ">
                  Subtotal
                </th>
                <th className=" py-2 title-font  tracking-wider font-bold  text-sm ">
                  <FaTrash size={15} />{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.inputData.map((value, index) => {
                return (
                  <tr
                    key={index}
                    className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""} `}
                  >
                    <td className=" py-1 px-1">
                      <div className="flex flex-col">
                        <p className="text-start">{value.productName}</p>
                        <textarea
                          rows={2}
                          type="text"
                          name="info"
                          value={value.info}
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                          className="border-[1px] w-3/4 px-1 border-black focus:outline-none"
                        />
                        <h1 className="text-xs text-start text-gray-500">
                          Add product IMEI, Serial number or other informations
                          here.
                        </h1>
                      </div>
                    </td>
                    <td className="px-1 py-1 text-sm">
                      <div className="flex flex-col">
                        <div className="flex">
                          <FaMinus
                            size={15}
                            className="border-[1px] h-8 text-red-400 w-1/6 p-1 border-black"
                          />
                          <input
                            type="number"
                            name="quantity"
                            value={value.quantity}
                            onChange={(e) => {
                              handleChange(e, index);
                            }}
                            className="border-[1px] w-4/6 px-1 py-1 border-black focus:outline-none"
                          />
                          <FaPlus
                            size={15}
                            className="border-[1px] h-8 w-1/6 p-1 text-green-400 border-black"
                          />
                        </div>
                        <select
                          name="unit"
                          value={value.unit}
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                          className="border-[1px] mt-2 w-full px-1 py-1 border-black focus:outline-none"
                        >
                          <option value={value.unit}>{value.unit?.name}</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-1 py-1">
                      <div className="flex flex-col">
                        <input
                          name="unitPrice"
                          type="number"
                          value={value.unitPrice}
                          onChange={(e) => handleChange(e, index)}
                          className="border-[1px] w-full px-1 py-1 border-black focus:outline-none"
                        />
                        <h1 className="text-xs mt-3 text-gray-500">
                          Previous Unit Price: Rs. {20.5}
                        </h1>
                      </div>
                    </td>

                    <td className=" py-1 px-1 text-start">
                      <input
                        name="subtotal"
                        type="number"
                        value={
                          (value.subtotal = value.quantity * value.unitPrice)
                        }
                        onChange={(e) => handleChange(e, index)}
                        className="border-[1px] w-3/4 px-1 border-black focus:outline-none"
                      />
                    </td>
                    <td className="px-1 py-1 ">
                      <FaTimes
                        size={15}
                        onClick={() => {
                          deleteByIndex(index);
                        }}
                        className="cursor-pointer text-red-400"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>
        <div className="w-full h-[1px] bg-black mt-5"></div>
        <div className="flex flex-col items-end mt-5 justify-end">
          <div className="flex ">
            <h1 className="font-bold mx-2">Total Items</h1>
            <h1 className=" mx-2"> {formData.inputData.length}.00</h1>
          </div>
          <div className="flex ">
            <h1 className="font-bold mx-2">Net Total Amount</h1>
            <h1 className=" mx-2"> {total}</h1>
          </div>
        </div>
      </div>

      <div className="flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col ">
            <h1 className="flex text-sm text-start font-bold">
              Shipping Charges:
            </h1>
            <input
              value={formData.shippingCharges}
              onChange={(e) => {
                setFormData({ ...formData, shippingCharges: e.target.value });
              }}
              type="number"
              className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-col ">
            <h1 className="flex text-sm text-start font-bold">
              Additional Notes:
            </h1>
            <textarea
              rows={4}
              value={formData.shippingDetails}
              onChange={(e) => {
                setFormData({ ...formData, shippingDetails: e.target.value });
              }}
              placeholder="Shipping Details"
              type="Text"
              className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-end justify-end mt-5">
          <div className="flex ">
            <h1 className="font-bold mx-2">Purchase Total:</h1>
            <h1 className=" mx-2">Rs {totalAmount}</h1>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5 ">
          <button
            onClick={handleClick}
            className="bg-green-500 px-2 py-2 items-center justify-center flex w-25"
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {isCliked && (
        <div className="absolute top-0 flex flex-col items-center  justify-center right-0 bg-black/70 w-full min-h-screen">
          <div className="w-full md:w-[70%]">
            <div
              onClick={() => {
                setIsCliked(false);
                setIsAddSupplier(false);
                setNewProduct(false);
                setIsProductUpload(false);
              }}
              className=" flex items-end justify-end  w-full mt-10 bg-white px-5 pt-2"
            >
              <MdCancel size={20} />
            </div>
            {displayData()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStockTransfer;
