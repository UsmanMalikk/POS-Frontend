import React, { useRef, useState, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import {
    FaColumns,
    FaEdit,
    FaEnvelope,
    FaEye,
    FaFileCsv,
    FaFileExcel,
    FaFilePdf,
    FaMoneyBillAlt,
    FaPrint,
    FaSearch,
    FaTrash,
    FaTruck,
    FaUndo,

} from "react-icons/fa";
import { FcCheckmark } from 'react-icons/fc';

import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import ViewSell from "../sell/ViewSell";
import EditShipping from "../sell/EditShipping";
import ViewPayment from "../payments/ViewPayment";
import axios from 'axios';
import Invoice from "../sell/Invoice";


const SalesTbl = () => {

    const printRef = useRef()
    let xlDatas = []
    //Export to Excel
    const handleExportExcl = (userDatas) => {
        userDatas.map((xlData) => {
            return xlDatas.push(xlData);
        });
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(xlDatas);
        XLSX.utils.book_append_sheet(wb, ws, "MySheet");
        XLSX.writeFile(wb, "user.xlsx");
    };

    //Export to pdf

    const generatePDF = () => {
        // const input = document.getElementById('mytable');
        htmlToImage.toCanvas(document.getElementById('usertbl'), { quality: 0.95 })
            .then(function (dataUrl) {
                const imgData = dataUrl.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("download.pdf");
            });

    }
    const [salesData, setSalesData] = useState([]);
    const [printInvoice, setPrintInvoice] = useState(false)

    const [search, setSearch] = useState('')
    const [recordPerpage, setRecordPerpage] = useState(25)
    const [crpage, setCrpage] = useState(1)

    const lasIndex = crpage * recordPerpage
    const frstIndex = lasIndex - recordPerpage
    const record = salesData.filter((item) => {
        return search.toLocaleLowerCase() === '' ? item : (item.invoiceNumber?.includes(search) || item.customer?.toLocaleLowerCase().includes(search))
    }).slice(frstIndex, lasIndex)
    const npage = Math.ceil(salesData.length / recordPerpage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const [colvis, setColvis] = useState(false)
    const [col1, setCol1] = useState(true)
    const [col2, setCol2] = useState(true)
    const [col3, setCol3] = useState(true)
    const [col4, setCol4] = useState(true)
    const [col5, setCol5] = useState(true)
    const [col6, setCol6] = useState(true)
    const [col7, setCol7] = useState(true)
    const [col8, setCol8] = useState(true)
    const [col9, setCol9] = useState(true)
    const [col10, setCol10] = useState(true)
    const [col11, setCol11] = useState(true)
    const [col12, setCol12] = useState(true)
    const [col13, setCol13] = useState(true)
    const [col14, setCol14] = useState(true)
    const [col15, setCol15] = useState(true)
    const [col16, setCol16] = useState(true)
    const [col17, setCol17] = useState(true)
    const [col18, setCol18] = useState(true)
    const [isedit, setIsedit] = useState(false)

    const [isShowPayment, setIsShowPayment] = useState(false);
    const [paymentId, setPaymentId] = useState(0);
    const [editShipId, setEditShipId] = useState(0);
    const [iseditship, setIseditship] = useState(false);
    const [editId, setEditId] = useState(0)
    const [isCliked, setIsCliked] = useState(false)
    const [actionList, setActionList] = useState(Array(1000).fill(false))
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
    };

    const csvData = [
        ["Username", "Name", "Role", "Email"],
        ...salesData.map(({ Username, Name, Role, Email }) => [
            Username,
            Name,
            Role,
            Email
        ]),
    ];

    //Function to print
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "ConsignmentReport",
        copyStyles: true,
        // pageStyle: "@page { size: 8.3in 11.7in }"
    });

    const prevPage = () => {
        if (crpage !== 1) {
            setCrpage(crpage - 1)
        }
    }
    const nextPage = () => {
        if (crpage !== numbers.length) {
            setCrpage(crpage + 1)
        }
    }
    const [permission, setPermission] = useState(false)
    const [isAlert, setIsAlert] = useState(false)
    const [isdelete, setIsdelete] = useState(false)
    const [deleteId, setDeleteId] = useState(0)

    const [isshow, setIsshow] = useState(false);
    const [showId, setShowId] = useState(0);
    const displayData = () => {
        console.log("");
        if (isshow === true) {
            return <ViewSell id={showId} name={"Sale"} />;
        } else if (iseditship === true) {
            return <EditShipping id={editShipId} />;
        } else if (printInvoice === true) {
            return <Invoice number={showId} name={"Sale"} />;
        }
    }

    const findTotalAmount = () => {
        let total = 0
        salesData.map(val => {
            return total += parseFloat(val.totalSaleAmount)
        })
        return total
    }
    // const total = findTotal()
    const findTotalPaid = () => {
        let total = 0
        salesData.map(val => {
            return total += parseFloat(val.amount)
        })
        return total
    }
    // const total = findTotal()
    const findTotalSellDue = () => {
        let total = 0
        salesData.map(val => {
            return total += (parseFloat(val.totalSaleAmount) - parseFloat(val.amount))
        })
        return total
    }
    // const total = findTotal()

    const fetchSales = async () => {
        // let final = "final"
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/sales/final`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            // console.log(response.data)
            setSalesData(response.data);
        } catch (error) {
            console.error('Error fetching Drafts:', error);
        }
    };


    const handleDeleteSale = async (saleId) => {
        
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`http://localhost:8000/admin/sales/final/${saleId}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                console.log('Sale deleted:', response.data);
                fetchSales()
            } catch (error) {
                console.error('Error deleting Sale:', error);
            }
        

       
    };
    
    useEffect(() => {

        fetchSales();
        const runDelete = () =>{
            if(permission === true){
        
                handleDeleteSale(deleteId)
            }
        }
        runDelete()
    
    }, [permission]);


    const Alert = () => {
        return (
            <div className="flex flex-col items-center px-4 justify-center w-[300px] py-5 h-[200px] bg-white rounded-md">
                <FcCheckmark size={100} className="items-center justify-center" />
                <h1 className="text-4xl text-gray-500 text-center ">Are you sure!</h1>
                <div className="flex items-center w-full justify-between mt-5">
                    <button onClick={() => { setPermission(false); setIsAlert(false); setIsdelete(false) }} className="text-md rounded-md mx-2 px-2 py-1 bg-red-500 text-white">Cancel</button>
                    <button onClick={() => { setPermission(true); setIsAlert(false); setIsdelete(false) }} className="text-md rounded-md mx-2 px-2 py-1 bg-green-500 text-white">OK</button>

                </div>
            </div>
        )
    }
    console.log("Delete Permission is ", permission)
    return (
        <div>
            <div className="flex  flex-col md:flex-row  items-center justify-center mt-3 md:justify-between mx-5">
                <div className="flex items-center justify-center my-2 md:my-0">
                    <h1 className="text-sm mx-1">Show</h1>
                    <select value={recordPerpage} onChange={(e) => { setRecordPerpage(e.target.value) }} className="w-[100px] border-[1px] border-black focus:outline-none text-center">
                        <option value={"25"}> 25</option>
                        <option value={"50"}> 50</option>
                        <option value={"100"}> 100</option>
                        <option value={"200"}> 200</option>
                        <option value={"500"}> 500</option>
                        <option value={"1,000"}> 1,000</option>
                        <option value={"All"}> All</option>
                    </select>
                    <h1 className="text-sm mx-1">enteries</h1>
                </div>
                <div className="flex items-center justify-center my-2 md:my-0">
                    <button className="flex border-[1px] px-2 py-1 hover:bg-gray-400 border-gray-600 bg-gray-200 ">
                        <FaFileCsv size={15} className=" mt-1 pr-[2px]" />
                        <CSVLink filename="users.csv" data={csvData}>
                            <h1 className="text-sm">Export to CSV</h1>
                        </CSVLink>
                    </button>
                    <button
                        onClick={() => {
                            handleExportExcl(salesData);
                        }}
                        className="flex border-[1px] px-2 py-1 hover:bg-gray-400 border-gray-600 bg-gray-200 "
                    >
                        <FaFileExcel size={15} className=" mt-1 pr-[2px]" />
                        <h1 className="text-sm">Export to Excle</h1>
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex border-[1px] px-2 py-1 hover:bg-gray-400 border-gray-600 bg-gray-200 "
                    >
                        <FaPrint size={15} className=" mt-1 pr-[2px]" />
                        <h1 className="text-sm">Print</h1>
                    </button>
                    <button
                        onClick={() => {
                            setColvis(!colvis);
                        }}
                        className="flex border-[1px] relative px-2 py-1 hover:bg-gray-400 border-gray-600 bg-gray-200 "
                    >
                        <FaColumns size={15} className=" mt-1 pr-[2px]" />
                        <h1 className="text-sm">Column Visibility</h1>
                        {colvis && (
                            <div className="absolute top-7 shadow-md shadow-gray-400 bg-white w-[150px]">
                                <ul className="flex flex-col items-center justify-center">
                                    <li
                                        className={` w-full py-1 ${col1 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol1(!col1);
                                        }}
                                    >
                                        Action
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col2 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol2(!col2);
                                        }}
                                    >
                                        Date
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col3 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol3(!col3);
                                        }}
                                    >
                                        Invoice No
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col4 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol4(!col4);
                                        }}
                                    >
                                        Customer Name
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col5 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol5(!col5);
                                        }}
                                    >
                                        Contact Number
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col6 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol6(!col6);
                                        }}
                                    >
                                        Location
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col7 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol7(!col7);
                                        }}
                                    >
                                        Payment Status
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col8 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol8(!col8);
                                        }}
                                    >
                                        Payment Method
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col9 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol9(!col9);
                                        }}
                                    >
                                        Total Amount
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col10 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol10(!col10);
                                        }}
                                    >
                                        Total Paid
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col11 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol11(!col11);
                                        }}
                                    >
                                        Sell Due
                                    </li>
                                    {/* <li
                                            className={` w-full py-1 ${col12 ? "" : "bg-blue-600"
                                                } hover:bg-blue-400 `}
                                            onClick={() => {
                                                setCol12(!col12);
                                            }}
                                        >
                                            Sell Return Due
                                        </li> */}
                                    <li
                                        className={` w-full py-1 ${col13 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol13(!col13);
                                        }}
                                    >
                                        {" "}
                                        Shipping Status
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col14 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol14(!col14);
                                        }}
                                    >
                                        Total Items
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col15 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol15(!col15);
                                        }}
                                    >
                                        Added By
                                    </li>
                                    <li
                                        className={` w-full py-1 ${col16 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol16(!col16);
                                        }}
                                    >
                                        Sell note
                                    </li>
                                    {/* <li
                                            className={` w-full py-1 ${col17 ? "" : "bg-blue-600"
                                                } hover:bg-blue-400 `}
                                            onClick={() => {
                                                setCol17(!col17);
                                            }}
                                        >
                                            Staff note
                                        </li> */}
                                    <li
                                        className={` w-full py-1 ${col18 ? "" : "bg-blue-600"
                                            } hover:bg-blue-400 `}
                                        onClick={() => {
                                            setCol18(!col18);
                                        }}
                                    >
                                        Shipping Detils
                                    </li>
                                </ul>
                            </div>
                        )}
                    </button>
                    <button
                        onClick={generatePDF}
                        className="flex border-[1px] px-2 py-1 hover:bg-gray-400 border-gray-600 bg-gray-200 "
                    >
                        <FaFilePdf size={15} className=" mt-1 pr-[2px]" />
                        <h1 className="text-sm">Export to PDF</h1>
                    </button>
                </div>
                <div className="flex items-center justify-center  w-[250px] md:w-auto my-2 md:my-0 border-[1px] border-black">
                    <FaSearch size={15} className=" mt-1 mx-1" />
                    <input
                        value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        className=" focus:outline-none px-2 py-1"
                        type="search"
                        id="search"
                        name="serch"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div
                className="flex flex-col  overflow-x-scroll  mt-5 mx-5"
                ref={printRef}
            >
                <table id="usertbl" className="table-fixed  mb-10   px-5 ">
                    <thead>
                        <tr className="h-[60px]">
                            {col1 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Action
                                </th>
                            )}
                            {col2 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Date
                                </th>
                            )}
                            {col3 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Invoice No.
                                </th>
                            )}
                            {col4 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Customer Name
                                </th>
                            )}
                            {col5 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Contact Number
                                </th>
                            )}
                            {col6 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Location
                                </th>
                            )}
                            {col7 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Payment Status
                                </th>
                            )}
                            {col8 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Payment Method
                                </th>
                            )}
                            {col9 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Total amount
                                </th>
                            )}
                            {col10 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Total paid
                                </th>
                            )}
                            {col11 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Sell Due
                                </th>
                            )}
                            {/* {col12 && (
                                    <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                        Sell Return Due
                                    </th>
                                )} */}
                            {col13 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Shipping Status
                                </th>
                            )}
                            {col14 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Total Items
                                </th>
                            )}
                            {col15 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Added By
                                </th>
                            )}
                            {col16 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Sell note
                                </th>
                            )}
                            {/* {col17 && (
                                    <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                        Staff note
                                    </th>
                                )} */}
                            {col18 && (
                                <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">
                                    Shipping Detils
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {record.map((value, index) => {
                            let date = new Date(value.salesDate).toLocaleDateString()


                            return (
                                <tr key={index} className="">
                                    {col1 && (
                                        <td className="py-1 flex ">
                                            <div
                                                onClick={() => {
                                                    toggleDropdown(index);
                                                }}
                                                className="flex px-2 py-1 relative cursor-pointer items-center bg-green-600 rounded-xl text-white justify-center"
                                            >
                                                <h1 className="text-sm">Action</h1>
                                                <AiFillCaretDown size={10} />
                                                {actionList[index] && (
                                                    <ul className="absolute top-5 left-10 z-20 flex flex-col items-start w-[200px] bg-white text-gray-600 shadow-xl shadow-gray-400 ">
                                                        <li className="w-full">
                                                            <Link
                                                                onClick={() => {
                                                                    setIsCliked(true);
                                                                    setIsshow(true);
                                                                    setShowId(value._id);
                                                                }}
                                                                className="flex px-2 py-1 w-full cursor-pointer hover:bg-gray-400 items-center "
                                                            >
                                                                <FaEye size={15} />
                                                                <h1 className="text-sm">View</h1>
                                                            </Link>
                                                        </li>
                                                        <li className="w-full">
                                                            <div
                                                                onClick={() => {
                                                                    setPrintInvoice(true);
                                                                    setShowId(value._id)
                                                                    setIsCliked(true);
                                                                }}
                                                                className="flex px-2 py-1 w-full cursor-pointer hover:bg-gray-400 items-center "
                                                            >
                                                                <FaPrint size={15} />
                                                                <h1 className="text-sm">Print Invoice</h1>
                                                            </div>
                                                        </li>
                                                        <li className="w-full">
                                                            <Link
                                                                to={`/home/sells/edit/${value._id}`}
                                                                onClick={() => {
                                                                    setIsedit(true);
                                                                    setIsCliked(true);
                                                                }}
                                                                className="flex px-2 py-1 w-full cursor-pointer hover:bg-gray-400 items-center "
                                                            >
                                                                <FaEdit size={15} />
                                                                <h1 className="text-sm">Edit</h1>
                                                            </Link>
                                                        </li>
                                                        <li className="w-full">
                                                            <div
                                                                onClick={() => {
                                                                    setIsAlert(!isCliked);
                                                                    setIsdelete(true)
                                                                    setDeleteId(value._id)
                                                                }}
                                                                className="flex px-2 py-1 w-full cursor-pointer hover:bg-gray-400 items-center "
                                                            >
                                                                <FaTrash size={15} />
                                                                <h1 className="text-sm">Delete</h1>
                                                            </div>
                                                        </li>
                                                        <li className="w-full">
                                                            <div
                                                                onClick={() => {
                                                                    setEditShipId(value._id);
                                                                    setIseditship(true);
                                                                    setIsCliked(true);
                                                                }}
                                                                className="flex px-2 py-1 w-full cursor-pointer hover:bg-gray-400 items-center "
                                                            >
                                                                <FaTruck size={15} />
                                                                <h1 className="text-sm">Edit Shipping</h1>
                                                            </div>
                                                        </li>


                                                    </ul>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                    {col2 && <td className="px-1 py-1 text-sm">{date}</td>}
                                    {col3 && <td className="px-1 py-1"> {value.invoiceNumber}</td>}
                                    {col4 && <td className="px-1 py-1">{value.customer?.prefix + " " + value.customer?.firstName}</td>}
                                    {col5 && <td className=" py-1 px-1">{value.customer?.mobile}</td>}

                                    {col6 && <td className=" py-1 px-1">{value.businesLocation?.name}</td>}
                                    {col7 && (
                                        <td className="px-1 py-1 text-sm">
                                            <button
                                                // onClick={() => {
                                                //     setIsCliked(true);
                                                //     setIsShowPayment(true);
                                                //     setPaymentId(value._id);
                                                // }}
                                                className="bg-green-400 text-white px-2 text-xs rounded-xl"
                                            >
                                                {(value.amount < value.totalSaleAmount || value.paymentMethod === "") ? "Due" : "Paid"}
                                            </button>
                                        </td>
                                    )}
                                    {/* {col7 && <td className="px-1 py-1 text-sm">{(value.amount < value.totalSaleAmount || value.paymentMethod === "") ? "Due" : "Paid"}</td>} */}
                                    {/* {col8 && <td className="px-1 py-1"> {value.paymentMethod}</td>} */}
                                    {col9 && <td className="px-1 py-1">{value.paymentMethod}</td>}
                                    {col10 && <td className=" py-1 px-1">{value.totalSaleAmount}</td>}
                                    {col11 && <td className=" py-1 px-1">{value.amount}</td>}
                                    {col12 && <td className="px-1 py-1 text-sm">{(value.totalSaleAmount - value.amount) >= 0 ? value.totalSaleAmount - value.amount : ""}</td>}
                                    {/* {col13 && <td className="px-1 py-1"> {(value.totalSaleAmount - value.amount) < 0 ? value.totalSaleAmount - value.amount : ""}</td>}      */}
                                    {col14 && <td className="px-1 py-1">{value.shippingStatus}</td>}
                                    {col15 && <td className=" py-1 px-1">{value.inputData?.length}</td>}
                                    {col16 && <td className=" py-1 px-1">{value.deliveryPersonUser?.firstName || value.deliveryPersonAdmin?.firstName}</td>}
                                    {col17 && <td className="px-1 py-1 text-sm">{value.sellNote}</td>}
                                    {col18 && <td className="px-1 py-1"> {value.shippingDetails}</td>}
                                </tr>
                            );
                        })}


                    </tbody>
                    <tfoot>
                        <tr className='h-[100px] bg-gray-400 '>
                            <td colSpan={5}>Total</td>
                            <td></td>

                            <td>
                                <div className='flex flex-col'>
                                    <h1 className='text-xs'> </h1>
                                    <h1 className='text-xs'> </h1>
                                </div>
                            </td>
                            <td>
                                <h1 className='text-xs'> </h1>
                            </td>
                            <td>
                                <h1 className='text-xs'> Rs. {findTotalAmount()}</h1>
                            </td>
                            <td>
                                <h1 className='text-xs'> Rs. {findTotalPaid()}</h1>
                            </td>
                            <td>
                                <h1 className='text-xs'> Rs. {findTotalSellDue()}</h1>
                            </td>




                            <td colSpan={6}>

                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <nav className="  my-2 w-full">
                <ul className="flex justify-end">
                    <li>
                        <button
                            disabled={crpage === 1 ? true : false}
                            className="p-3 mx-1 bg-green-400 text-white"
                            onClick={prevPage}
                        >
                            {" "}
                            Previous
                        </button>
                    </li>
                    {numbers.map((n, i) => {
                        return (
                            <li
                                key={i}
                                className={`${crpage === n ? "bg-blue-500" : ""
                                    } py-3 px-4 mx-1 border-[1px] border-gray-400`}
                            >
                                <button
                                    onClick={() => {
                                        setCrpage(n);
                                    }}
                                >
                                    {n}
                                </button>
                            </li>
                        );
                    })}
                    <li>
                        <button
                            className="p-3 bg-green-400 text-white mx-1 "
                            onClick={nextPage}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
            {isCliked && (
                <div className="absolute top-0 flex flex-col items-center  justify-center right-0 bg-black/70 w-full min-h-screen">
                    <div className="flex flex-col   w-full md:w-[75%]  mt-10 bg-white px-5 pt-2">
                        <div className="flex items-end justify-end ">
                            <MdCancel
                                onClick={() => {
                                    setIsCliked(!isCliked);
                                    setIsedit(false);
                                    setPrintInvoice(false)
                                    setIseditship(false)
                                    setIsshow(false);
                                    setShowId(0);
                                }}
                                size={20}
                            />
                        </div>
                        <div className="flex items-start justify-center">
                            {displayData()}
                        </div>
                    </div>


                </div>

            )}
            {isAlert &&
                <div className="absolute top-0 flex flex-col items-center  justify-center right-0 bg-black/70 w-full min-h-screen">
                    {isdelete && <Alert />}
                </div>
            }
        </div>
    )
}

export default SalesTbl