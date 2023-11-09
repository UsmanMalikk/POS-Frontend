import React, { useRef, useState, useEffect } from "react";
import { FaCalendar, FaInfoCircle, FaMoneyBillAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { AiTwotoneFolderOpen } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import AddProduct from "../Product/AddorEditProduct";
import AddorEditContact from "../contacts/AddorEditContact";
import ImportProduct from "../Product/ImportProduct";
import axios from 'axios';

import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const ExpenseAdd = () => {
  const Navigate = useNavigate();


  const [businessLocationsData, setBusinessLocationsData] = useState([]);
  const [expanseCategoryData, setExpanseCategoryData] = useState([]);
  const [expanseSubCategoryData, setExpanseSubCategoryData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [allContactsData, setAllContactsData] = useState([]); //update dropdown py use hogi


  // useStates for suppliers and Customers


  const [info1, setInfo1] = useState(false);
  const [info2, setInfo2] = useState(false);

  const [isAddSupplier, setIsAddSupplier] = useState(false);

  const [isRefund, setIsRefund] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [formData, setFormData] = useState({

    businessLocation: "",
    expenseCategory: "",
    subCategory: "",
    invoiceNo: "",
    date: "",
    expenseFor: "",
    expenseForContact: "",
    totalAmount: "",
    expenseNote: "",
    isRefund: null,
    amount: 0,
    paymentDate: "",
    paymentMethod: "",
    paymentAccount: "",
    paymentNote: ""

  });
  const params = useParams();
  const id = params.id;

  // const findTotal = () => {
  //   let total = 0;
  //   formData.inputData.map((val) => {
  //     return (total += val.lineTotal);
  //   });
  //   return total;
  // };

  const [isserror, setIsserror] = useState(false);
  const handleClick = (e) => {
    if (
      formData.date.length === 0 ||
      formData.paymentMethod.length === 0
    ) {
      setIsserror(true);
      console.log(isserror);
    } else if (id) {
      addExpanseById()
      console.log("Handle Update", formData);
    } else {
      addExpanse()
      console.log("Handle Save", formData);
    }
  };
  const inpuRef = useRef();

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



  const fetchAllContact = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/contacts`, {
        headers: {
          'Authorization': token
        }
      });

      // console.log(response)
      setAllContactsData(response.data);
    } catch (error) {
      console.error('Error fetching Contacts:', error);
    }
  };

  const fetchUsers = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/users`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response)
      setUsersData(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchBusinessLocations = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/business-locations`, {
        headers: {
          'Authorization': token
        }
      });

      // console.log(response)
      setBusinessLocationsData(response.data);
    } catch (error) {
      console.error('Error fetching Locations:', error);
    }
  };
  const fetchExpanseCategories = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/expense-categories`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response)
      setExpanseCategoryData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchExpanseSubCategories = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/expense-categories/subs`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response)
      setExpanseSubCategoryData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchExpanseById = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/add-expenses/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      // console.log(response)
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addExpanse = async () => {

    try {
      const token = localStorage.getItem('token');
      // console.log(formData)
      const response = await axios.post(`http://localhost:8000/admin/add-expenses`, formData, {
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

  const addExpanseById = async () => {

    try {
      const token = localStorage.getItem('token');
      // console.log(formData)
      const response = await axios.put(`http://localhost:8000/admin/add-expenses/${id}`, formData, {
        headers: {
          'Authorization': token
        }
      });
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
    }
    catch (error) {
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
  useEffect(() => {
    // Make an API call to fetch SPG's records
    if (id) {
      fetchBusinessLocations()
      fetchExpanseCategories()
      fetchExpanseSubCategories()
      fetchUsers()
      fetchExpanseById();
      fetchAllContact()
    }
    else {
      fetchBusinessLocations()
      fetchExpanseCategories()
      fetchExpanseSubCategories()
      fetchUsers()
      fetchAllContact()
    }
  }, [])
  return (
    <div className="w-full p-5 bg-gray-100">
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
      <h1 className="text-xl text-start font-bold ">{id ? "Edit" : "Add"} Expense</h1>

      <div className="flex w-full  min-h-[300px] flex-col p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div>
            <h2 className="text-start">
              <b>Business Location:</b>
            </h2>
            <select
              value={formData.businesLocation}
              onChange={(e) => {
                setFormData({ ...formData, businesLocation: e.target.value });
              }}
              type="text"
              className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
            >
              <option value={""}>Please Select</option>

              {businessLocationsData.map((loc) => (
                <option key={loc._id} value={loc._id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2 className="text-start">
              <b>Expense category:</b>
            </h2>
            <select
              value={formData.expenseCategory}
              onChange={(e) => {
                setFormData({ ...formData, expenseCategory: e.target.value });
              }}
              type="text"
              className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
            >
              <option value={""}>Please Select</option>
              {expanseCategoryData.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2 className="text-start">
              <b>Sub category:</b>
            </h2>
            <select
              value={formData.subCategory}
              onChange={(e) => {
                setFormData({ ...formData, subCategory: e.target.value });
              }}
              type="text"
              className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
            >
              <option value={""}>Please Select</option>

              {expanseSubCategoryData.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <h1 className="flex text-sm text-start font-bold">Reference No:</h1>
            <input
              value={formData.invoiceNo}
              onChange={(e) => {
                setFormData({ ...formData, invoiceNo: e.target.value });
              }}
              type="Text"
              placeholder="Reference No"
              className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
            />
            <h1 className="flex text-sm text-start ">
              Keep Blank to autogenerate
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
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

          <div className="flex flex-col ">
            <div className="flex mx-2">
              <div className="text-start ">
                <h1>
                  <b>Expenses for:*</b>
                </h1>
                <h2 className="text-red-400">
                  {isserror && formData.expenseFor.length === 0
                    ? "Required field"
                    : ""}
                </h2>
              </div>
            </div>
            <select
              value={formData.expenseFor}
              onChange={(e) => {
                setFormData({ ...formData, expenseFor: e.target.value });
              }}
              type="text"
              className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
            >
              <option value={""}>None</option>

              {usersData.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName + " " + user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col ">
            <div className="flex mx-2">
              <div className="text-start ">
                <h1>
                  <b>Expenses for Contact:*</b>
                </h1>
                <h2 className="text-red-400">
                  {isserror && formData.expenseForContact.length === 0
                    ? "Required field"
                    : ""}
                </h2>
              </div>
            </div>
            <select
              value={formData.expenseForContact}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  expenseForContact: e.target.value,
                });
              }}
              type="text"
              className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
            >
              <option value={""}>None</option>
              {allContactsData.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.firstName}
                </option>
              ))}
            </select>
          </div>
        </div>



        <div className="flex flex-col">
          <h1 className="flex text-sm text-start font-bold">Total Amount:</h1>
          <input
            value={formData.totalAmount}
            onChange={(e) => {
              setFormData({ ...formData, totalAmount: e.target.value });
            }}
            type="Text"
            placeholder="Total Amount"
            className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
          <div className="flex flex-col">
            <h1 className="flex text-sm text-start font-bold">Expense Note:</h1>
            <textarea
              value={formData.expenseNote}
              onChange={(e) => {
                setFormData({ ...formData, expenseNote: e.target.value });
              }}
              type="Text"
              placeholder="Expense Note"
              className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex">
            <label>
              <input
                className={`input-icheck icheckbox_square-blue ${isRefund ? "checked" : ""
                  }`}
                type="checkbox"
                id="is_refund"
                name="is_refund"
                value="1"
                checked={isRefund}
                onChange={() => setIsRefund(!isRefund)}
              />
              Is refund?
            </label>

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
            {info1 && (
              <div className="flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute  p-2 z-10 bg-white shadow-md shadow-gray-300 mx-5 my-5">
                <p className="text-start mt-2 text-gray-800">
                  If checked expenses will be refunded and added to net profit
                </p>
              </div>
            )}
          </div>
        </div>
      </div>



      <div className="flex  w-full   flex-col  p-5 mt-5 bg-white border-t-[3px] rounded-md border-blue-600">
        <h1 className="flex text-sm text-start font-bold mb-5">Add Payment</h1>

        <h1 className="flex text-sm text-start font-bold">
          Advance Balance: <p className="mx-2"> 0</p>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col ">
            <div className="flex text-sm text-start font-bold">
              <h1>Amount:*</h1>
              <h2 className="text-red-400">
                {isserror && formData.amount.length === 0
                  ? "Required field"
                  : ""}
              </h2>
            </div>
            <div className="flex">
              <FaMoneyBillAlt
                size={15}
                className="w-8 h-8 p-2 border-[1px] border-gray-600"
              />

              <input
                value={formData.amount}
                onChange={(e) => {
                  setFormData({ ...formData, amount: e.target.value });
                }}
                type="number"
                placeholder="Amount"
                className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex text-sm text-start font-bold">
              <h1>Paid On :*</h1>
              <h2 className="text-red-400">
                {isserror && formData.paymentDate.length === 0
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
                value={formData.paymentDate}
                onChange={(e) => {
                  setFormData({ ...formData, paymentDate: e.target.value });
                }}
                type="Date"
                placeholder="Select Date Time"
                className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex text-sm text-start font-bold">
              <h1>Payment method:*</h1>
              <h2 className="text-red-400">
                {isserror && formData.paymentMethod.length === 0
                  ? "Required field"
                  : ""}
              </h2>
            </div>
            <div className="flex">
              <FaMoneyBillAlt
                size={15}
                className="w-8 h-8 p-2 border-[1px] border-gray-600"
              />
              <select
                value={formData.paymentMethod}
                onChange={(e) => {
                  setFormData({ ...formData, paymentMethod: e.target.value });
                }}
                type="text"
                className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
              >
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
          <div className="flex flex-col ">
            <div className="flex text-sm text-start font-bold">
              <h1>Payment Account:*</h1>
              <h2 className="text-red-400">
                {isserror && formData.paymentAccount.length === 0
                  ? "Required field"
                  : ""}
              </h2>
            </div>
            <div className="flex">
              <FaMoneyBillAlt
                size={15}
                className="w-8 h-8 p-2 border-[1px] border-gray-600"
              />
              <select
                value={formData.paymentAccount}
                onChange={(e) => {
                  setFormData({ ...formData, paymentAccount: e.target.value });
                }}
                type="text"
                className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none"
              >
                <option value={""}>None</option>
                <option value={"Test Account"}>Test Account</option>
                <option value={"Askari Bank"}>Askari Bank</option>
                <option value={"asd"}>asd</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col mt-3">
          <h1 className="flex text-sm  font-bold">Payment Note:</h1>

          <textarea
            rows={4}
            value={formData.paymentNote}
            onChange={(e) => {
              setFormData({ ...formData, paymentNote: e.target.value });
            }}
            className="px-2 py-[2px] w-full border-[1px] border-gray-600 focus:outline-none"
          />
        </div>

        <div className="w-full h-[1px] bg-black my-5"></div>

        <div className="flex items-end justify-end mt-5">
          <div className="flex ">
            <h1 className="font-bold mx-2">Payment Due:</h1>
            <h1 className=" mx-2">Rs 0.00</h1>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end mt-5">
        <button
          onClick={handleClick}
          className="bg-green-500 px-2 py-2 items-center justify-center flex"
        >
          {id ? "Update" : "Save"}
        </button>
      </div>
      {
        isCliked && (
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
        )
      }
    </div>
  );
};

export default ExpenseAdd;
