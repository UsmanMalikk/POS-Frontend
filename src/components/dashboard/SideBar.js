import React, { useState, useEffect } from "react";
import { BiSolidChevronLeft } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import {
  FaAddressBook,
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaCalendarCheck,
  FaChartBar,
  FaCheckCircle,
  FaCog,
  FaCubes,
  FaDatabase,
  FaEnvelope,
  FaFire,
  FaIndustry,
  FaListAlt,
  FaMinusCircle,
  FaMoneyCheckAlt,
  FaProjectDiagram,
  FaQrcode,
  FaTachometerAlt,
  FaTruck,
  FaUsers,
  FaWordpress,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {motion} from "framer-motion"
import axios from 'axios';

const SideBar = () => {
  // const clicked = useSelector((state)=>state.sidebar.value)
  const openNewTab=  (URl)=>{
    const url = URl;
    window.open(url,'_blank')
}
  
  const [actionList, setActionList] = useState(Array(20).fill(false))

    const toggleDropdown = (index) => {
        const dropDownAction = [...actionList];
        dropDownAction.map((val, i) => {
            if (i === index) {
                dropDownAction[i] = !dropDownAction[i];

            } else {
                dropDownAction[i] = false
            }
            return dropDownAction
        })
        setActionList(dropDownAction);
      }
  const clicked = useSelector((state) => state.sidebar.value);
  const [selectedTheme, setSelectedTheme] = useState("")
  const themeColor = () => {
    if (selectedTheme === "black-light") {
        return 'bg-gray-100 text-black'
    }else if(selectedTheme === "blue"){
        return 'bg-gray-900 text-white'
    }else if(selectedTheme === "black"){
        return 'bg-gray-900 text-white'
    }else if(selectedTheme === "purple"){
        return 'bg-gray-900 text-white'
    }else if(selectedTheme === "green"){
        return 'bg-gray-900 text-white'
    }else if(selectedTheme === "red"){
        return 'bg-gray-900 text-white'
    }else if(selectedTheme === "yellow"){
        return 'bg-gray-900 text-white'
    }else if(selectedTheme === "blue-light"){
        return 'bg-gray-100 text-black'
    }else if(selectedTheme === "purple-light"){
        return 'bg-gray-100 text-black'
    }else if(selectedTheme === "green-light"){
        return 'bg-gray-100 text-black'
    }else if(selectedTheme === "red-light"){
        return 'bg-gray-100 text-black'
    }


}
const activeColor = () => {
  if (selectedTheme === "black-light") {
      return 'text-black'
  }else if(selectedTheme === "blue"){
      return 'text-gray-500'
  }else if(selectedTheme === "black"){
      return 'text-gray-500'
  }else if(selectedTheme === "purple"){
      return 'text-gray-500'
  }else if(selectedTheme === "green"){
      return 'text-gray-500'
  }else if(selectedTheme === "red"){
      return 'text-gray-500'
  }else if(selectedTheme === "yellow"){
      return 'text-gray-500'
  }else if(selectedTheme === "blue-light"){
      return 'text-black'
  }else if(selectedTheme === "purple-light"){
      return 'text-black'
  }else if(selectedTheme === "green-light"){
      return 'text-black'
  }else if(selectedTheme === "red-light"){
      return 'text-black'
  }


}
const fetchTheme = async () => {

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8000/admin/system-color`, {
      headers: {
        'Authorization': token
      }
    });
    // console.log(response.data.themeColor)
    setSelectedTheme(response.data.themeColor);

  } catch (error) {
    console.error('Error fetching Prefixes:', error);
  }
};
useEffect(() => {
  fetchTheme()


}, [])
  return (
    <div
      className={`whitespace-nowrap h-full py-[20px] w-full ${clicked ? "flex" : "hidden"
        }   md:flex ${themeColor()}  flex-col`}
    >
      {/* Home button */}
      <div className={`flex justify-between items-center`}>
        <Link
          to={"/home"}
          className="flex mx-2 px-2 py-1 items-center   justify-start"
        >
          <FaTachometerAlt size={20} />
          <h1 className="mt-1 ml-5 text-sm ">Home</h1>
        </Link>
      </div>
      {/* User Management */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(0)
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center   justify-start"
        >
          <FaAddressBook size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">User Management</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[0] && (
        <motion.div initial = {{ height: 0, opacity:0}} animate={{height: actionList[0] ? "auto" : 0, opacity:1}} transition={{duration:0.4}}  className={`flex flex-col mx-3 ${themeColor()}`}>
          <NavLink
            to={"/home/users"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className="mt-1 ml-5 text-sm">Users</h1>
          </NavLink>
          <NavLink
            to={"/home/roles"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()} py-1 items-center  ${themeColor()} justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Roles</h1>
          </NavLink>
          
        </motion.div>
      )}
      {/* Contacts */}
      <div  className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(1)
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center   justify-start"
        >
          <FaUsers size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Contacts</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[1] && (
        <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[1] ? "auto" : 0, opacity:1}} transition={{duration:0.4}} className={`flex flex-col mx-3 ${themeColor()}`}>
          <NavLink
            to={"/home/contacts/supplier"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Suppliers</h1>
          </NavLink>
          <NavLink
            to={"/home/contacts/customer"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()} py-1 items-center  ${themeColor()} justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Customers</h1>
          </NavLink>
          <NavLink
            to={"/home/contact/customer-group"}
            className={`flex hover:text-gray-500 hover:font-bold  py-1 items-center  aria-[current=page]:${activeColor()}  ${themeColor()}  justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              {" "}
              Customer Groups
            </h1>
          </NavLink>
          
        </motion.div>
      )}
      {/* Products */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(2);
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center   justify-start"
        >
          <FaCubes size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Products</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[2] && (
        <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[2] ? "auto" : 0, opacity:1}} transition={{duration:0.4}} className={`flex flex-col mx-3 ${themeColor()}`}>
          <NavLink
            to={"/home/products"}
            className={`flex hover:text-gray-500 hover:font-bold   aria-[current=page]:${activeColor()} ${themeColor()}  py-1 items-center   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">List Products</h1>
          </NavLink>
          <NavLink
            to={"/home/products/create"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Add Product</h1>
          </NavLink>
          
          
          <NavLink
            to={"/home/variation-templates"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Variations</h1>
          </NavLink>
          
          
          <NavLink
            to={"/home/selling-price-group"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              Selling Price Group
            </h1>
          </NavLink>
          <NavLink
            to={"/home/units"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Units</h1>
          </NavLink>
          <NavLink
            to={"/home/taxonomies/product"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()} py-1 items-center  ${themeColor()} justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Categories</h1>
          </NavLink>
          <NavLink
            to={"/home/brands"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Brands</h1>
          </NavLink>
          <NavLink
            to={"/home/warranties"}
            className={`flex hover:text-gray-500 hover:font-bold  py-1 items-center  aria-[current=page]:${activeColor()} ${themeColor()}  justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Warranties</h1>
          </NavLink>
        </motion.div>
      )}
      
      {/* Purchase */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(3)
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center   justify-start"
        >
          <FaArrowCircleDown size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Purchases</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[3] && (
        <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[3] ? "auto" : 0, opacity:1}} transition={{duration:0.4}} className={`flex flex-col mx-3 ${themeColor()}`}>
          
          <Link
            to={"/home/purchase"}
            className={`flex hover:text-gray-500 hover:font-bold  py-1 items-center  aria-[current=page]:${activeColor()}  ${themeColor()}  justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              List Purchases
            </h1>
          </Link>
          <NavLink
            to={"/home/purchase/create"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Add Purchase</h1>
          </NavLink>
          
        </motion.div>
      )}
      {/* Sell */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(4)
          }}
          className="flex mx-2 px-2  cursor-pointer py-1 items-center   justify-start"
        >
          <FaArrowCircleUp size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Sell</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>

      {actionList[4] && 
      <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[4] ? "auto" : 0, opacity:1}} transition={{duration:0.4}}  className='flex flex-col mx-4'>
        <NavLink to={"/home/sells"} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">All Sales</h1>
        </NavLink>
        <NavLink to={"/home/sell/create"} className={`flex hover:text-gray-500 hover:font-bold  py-1 items-center  ${themeColor()} aria-[current=page]:${activeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">Add Sale</h1>
        </NavLink>
        <NavLink to={"/home/pos"} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">List POS</h1>
        </NavLink>
        <NavLink  onClick={()=>{openNewTab("/pos/create")}} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()} ${themeColor()} py-1 items-center   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">POS</h1>
        </NavLink>
        <NavLink to={"/home/sell/create/draft"} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">Add Draft</h1>
        </NavLink>
        <NavLink to={"/home/sells/draft"} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">List Drafts</h1>
        </NavLink>
        <NavLink to={"/home/sell/create/quotation"} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">Add Quotation</h1>
        </NavLink>
        <NavLink to={"/home/sells/quotations"} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">List quotation</h1>
        </NavLink>
        
        <NavLink to={"/home/shipments"} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">Shipments</h1>
        </NavLink>
        <NavLink to={"/home/discounts"} className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}>
          <BsArrowRight size={15} />
          <h1 className="mt-1 ml-5 text-sm">Discounts</h1>
        </NavLink>
        
        
      </motion.div>
      }


      {/* Stock Transfer */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(5);
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center   justify-start"
        >
          <FaTruck size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Stock Transfer</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[5] && (
        <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[5] ? "auto" : 0, opacity:1}} transition={{duration:0.4}} className={`flex flex-col mx-3 ${themeColor()}`}>
          <NavLink
            to={"/home/stock-transfer"}
            className={`flex hover:text-gray-500 hover:font-bold   aria-[current=page]:${activeColor()} py-1 items-center  ${themeColor()}  justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              List Stock Transfer
            </h1>
          </NavLink>
          <NavLink
            to={"/home/stock-transfers/create"}
            className={`flex hover:text-gray-500 hover:font-bold  py-1 items-center  ${themeColor()} aria-[current=page]:${activeColor()} justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              Add Stock Transfer
            </h1>
          </NavLink>
        </motion.div>
      )}
      {/* Stock Adjustment */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(6);
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center    justify-start"
        >
          <FaDatabase size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Stock Adjustment</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[6] && (
        <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[6] ? "auto" : 0, opacity:1}} transition={{duration:0.4}} className={`flex flex-col mx-3 ${themeColor()}`}>
          <NavLink
            to={"/home/stock-adjustments"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              List Stock Adjustment
            </h1>
          </NavLink>
          <NavLink
            to={"/home/stock-adjustments/create"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              Add Stock Adjustment
            </h1>
          </NavLink>
        </motion.div>
      )}
      {/* Expenses */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(7);
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center   justify-start"
        >
          <FaMinusCircle size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Expenses</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[7] && (
        <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[7] ? "auto" : 0, opacity:1}} transition={{duration:0.4}} className={`flex flex-col mx-3 ${themeColor()}`}>
          <NavLink
            to={"/home/expenses"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">List Expenses</h1>
          </NavLink>
          <NavLink
            to={"/home/expenses/create"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Add Expenses</h1>
          </NavLink>
          <NavLink
            to={"/home/expenses-categories"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              Expense Categories
            </h1>
          </NavLink>
        </motion.div>
      )}
      {/* Payment Accounts */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(8);
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center   justify-start"
        >
          <FaMoneyCheckAlt size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Payment Accounts</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[8] && (
        <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[8] ? "auto" : 0, opacity:1}} transition={{duration:0.4}} className={`flex flex-col mx-3 ${themeColor()}`}>
          <NavLink
            to={"/home/accounts/accounts"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">List Accounts</h1>
          </NavLink>
          <NavLink
            to={"/home/accounts/balance-sheet"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Balance Sheet</h1>
          </NavLink>
          <NavLink
            to={"/home/accounts/trial-balance"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Trial Balance</h1>
          </NavLink>
          {/* <NavLink
            to={"/home/accounts/cash-flow"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">Cash Flow</h1>
          </NavLink> */}
          
        </motion.div>
      )}
      
      {/* Settings */}
      <div className={`flex justify-between items-center`}>
        <div
          onClick={() => {
            toggleDropdown(10);
          }}
          className="flex mx-2 px-2 cursor-pointer py-1 items-center   justify-start"
        >
          <FaCog size={20} />
          <h1 className=" mt-1 ml-5 text-sm ">Settings</h1>
        </div>
        <BiSolidChevronLeft size={20} className="mx-1" />
      </div>
      {actionList[10] && (
        <motion.div initial = {{ height:0, opacity:0}} animate={{height: actionList[10] ? "auto" : 0, opacity:1}} transition={{duration:0.4}} className={`flex flex-col mx-3 ${themeColor()}`}>
          <NavLink
            to={"/home/business-settings"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              Business Settings
            </h1>
          </NavLink>
          <NavLink
            to={"/home/business-location"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              Business Locations
            </h1>
          </NavLink>
          <NavLink
            to={"/home/invoice-scheme"}
            className={`flex hover:text-gray-500 hover:font-bold  aria-[current=page]:${activeColor()}  py-1 items-center ${themeColor()}   justify-start`}
          >
            <BsArrowRight size={15} />
            <h1 className=" mt-1 ml-5 text-sm ">
              Invoice Settings
            </h1>
          </NavLink>
          
          
          
          
        </motion.div>
      )}
      
    </div>
  );
};
export default SideBar;
