import React, { useRef, useEffect, useState } from "react";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import axios from 'axios';

const ViewStock = (props) => {
  // console.log(props.id)
  
  const [stkData, setstkData] = useState([]);

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "SellReport",
    copyStyles: true,
  });
  const fetchSTK = async () => {

    try {
      // const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/stock-adjustment/${props.id}`);
      console.log(response.data)
      response.data.date = new Date(response.data.date).toLocaleDateString()

      setstkData(response.data);
    } catch (error) {
      console.error('Error fetching Stock Ajustments:', error);
    }
  };
  useEffect(() => {
    // Make an API call to fetch user's user records
    fetchSTK();

  }, []);
  return (
    <div className="w-full  flex  flex-col  bg-white">
      <div className="w-full px-2 my-2" ref={printRef}>
        <div className="flex items-start ">
          <h1 className="text-xl">Stock Adjustment Details (</h1>
          <h1 className="text-xl font-bold">Reference No:</h1>
          <h1 className="text-xl ">{stkData.referenceNumber} )</h1>
        </div>
        <div className="h-[1px] bg-gray-300 mt-1 w-full"></div>
        <div className="flex items-end justify-end">
          <p className="font-bold">Date:</p>
          <p className="mx-1">{stkData.date}</p>
        </div>
        <div className="grid grid-cols-1 mt-4 gap-2 md:grid-cols-3">
          <div className="flex  items-start flex-col ">
            <div className="flex">
              <h1 className="font-bold">Business: </h1>
            </div>
            <div className="flex">
              <h1 className="font-bold">
                {stkData.businesLocation?.name}
              </h1>
            </div>
            <div className="flex">
              <h1>{stkData.businesLocation?.landmark}</h1>
            </div>
            <div className="flex">
              <h1>{stkData.businesLocation?.city},{stkData.businesLocation?.state},{stkData.businesLocation?.country}</h1>
            </div>
            <div className="flex">
              <h1>Mobile: {stkData.businesLocation?.mobileNo}</h1>
            </div>
          </div>
          <div className="flex  items-start flex-col ">
            <div className="flex">
              <h1 className="font-bold">Reference NO: </h1>
              <h1 className="mx-1">#{stkData.referenceNumber}</h1>
            </div>
            <div className="flex">
              <h1 className="font-bold">Date: </h1>
              <h1 className="mx-1">{stkData.date}</h1>
            </div>
            <div className="flex">
              <h1 className="font-bold">Adjustment type: </h1>
              <h1 className="mx-1">{stkData.adjustmentType}</h1>
            </div>
            <div className="flex">
              <h1 className="font-bold">Reason: </h1>
              <h1 className="mx-1">{stkData.reason}</h1>
            </div>
          </div>
        </div>
        <div className="flex  mt-5 ">
          <table className="table-auto w-full  mb-2   px-5 ">
            <thead>
              <tr className="h-[50px] bg-green-500">
                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">
                  #
                </th>
                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">
                  Product Name
                </th>
                {/* <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">
                  Lot & Expiry
                </th> */}
                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">
                  Quantity
                </th>
                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">
                  Unit Price
                </th>

                <th className=" py-2 title-font  tracking-wider font-bold text-white text-sm ">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {(stkData.inputData) && stkData.inputData.map((value, index) => {
                return (
                  <tr
                    key={index}
                    className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""}`}
                  >
                    <td className=" py-1 px-1">{index + 1}</td>
                    <td className=" py-1 px-1">{value.product?.productName}</td>
                    {/* <td className="px-1 py-1 text-sm">{value.Username}</td> */}
                    <td className="px-1 py-1"> {value.quantity}</td>
                    <td className="px-1 py-1">{value.unitPrice}</td>

                    <td className="px-1 py-1"> {value.subtotal}</td>
                  </tr>
                );

              })}
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>

        <div className='flex flex-col mt-11'>
          <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1'>
            <h1 className='font-bold'>Total Amount:</h1>
            <h1 className=''>Rs {stkData.totalAmount}</h1>
          </div>
          <div className='flex justify-between border-t-[1px] border-b-[1px] border-gray-200 py-1'>
            <h1 className='font-bold'>Total Amount Recovered:</h1>
            <h1 className=''>Rs {stkData.totalamountRecovered}</h1>
          </div>


        </div>
      </div>
      <div className="flex items-end justify-end mx-4">
        <div
          className="flex bg-green-400 text-white cursor-pointer px-2 py-1"
          onClick={handlePrint}
        >
          <FaPrint size={15} />
          <h1 className="text-sm mx-1">Print</h1>
        </div>
      </div>
    </div>
  );
};

export default ViewStock;
