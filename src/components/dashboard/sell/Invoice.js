import React, { useRef, useState, useEffect } from 'react'
import { FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';

const Invoice = (props) => {
  const findTotal = () => {
    let total = 0
    saleData.inputData?.map(val => {
      return total += val.subtotal
    })
    return total
  }
  const printRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Invoice",
    copyStyles: true,
    // pageStyle: "@page { size: 8.3in 11.7in }"
  });
  const [saleData, setSaleData] = useState([]);


  const fetchSaleById = async () => {

    try {
      const token = localStorage.getItem('token');
      if (props.name === 'Sale') {
        const response = await axios.get(`http://localhost:8000/admin/sales/final/${props.number}`, {
          headers: {
            'Authorization': token
          }
        });
        //   console.log(response.data)
        let date = new Date(response.data.salesDate).toLocaleDateString()
        let paymentDate = new Date(response.data.paymentDate).toLocaleDateString()

        setSaleData({ ...response.data, salesDate: date, paymentDate: paymentDate });
      } else if (props.name === 'Pos') {
        const response = await axios.get(`http://localhost:8000/admin/pos/${props.number}`, {
          headers: {
            'Authorization': token
          }
        });
        //   console.log(response.data)
        let date = new Date(response.data.salesDate).toLocaleDateString()
        let paymentDate = new Date(response.data.paymentDate).toLocaleDateString()

        setSaleData({ ...response.data, salesDate: date, paymentDate: paymentDate });
      }
      else if (props.name === 'Shipment') {
        const response = await axios.get(`http://localhost:8000/admin/sales/shipments/${props.id}`, {
          headers: {
            'Authorization': token
          }
        });
          console.log(response.data)
        let date = new Date(response.data.salesDate).toLocaleDateString()
        let paymentDate = new Date(response.data.paymentDate).toLocaleDateString()

        setSaleData({ ...response.data, salesDate: date, paymentDate: paymentDate });
      }



    }
    catch (error) {
      console.error('Error fetching Sale:', error);
    }
  };
  useEffect(() => {
    // Make an API call to fetch user's user records
    fetchSaleById();

  }, []);


  return (
    <div className='py-5'>
      <div ref={printRef} className='flex flex-col max-h-screen  min-w-[595px] px-2 py-2'>
        <h1 className='text-center text-2xl font-bold'>{saleData.businesLocation?.name}</h1>
        <h1 className='text-center text-sm font-bold'>Invoice</h1>
        <div className='flex justify-between mt-4'>
          <div className='flex flex-col'>
            <div className='flex'>
              <h1 className='font-bold'>Invoice No:</h1>
              <h1 className=''>{saleData.invoiceNumber}</h1>
            </div>
            <div className='flex'>
              <h1 className='font-bold'>Customer:</h1>
              <h1 className=''>{saleData.customer?.prefix + " " + saleData.customer?.firstName}</h1>
            </div>
            <div className='flex'>
              <h1 className='font-bold'>Mobile:</h1>
              <h1 className=''>{saleData.customer?.mobile}</h1>
            </div>
          </div>
          <div className='flex'>
            <div className='flex'>
              <h1 className='font-bold'>Date:</h1>
              <h1 className=''>{saleData.salesDate}</h1>

            </div>
          </div>
        </div>
        <div className='flex overflow-x-scroll  mt-5 ' >
          <table className="table-auto  mb-2 w-full  px-5 ">
            <thead>
              <tr className='h-[50px]'>
                <th className=" py-2 title-font text-start  tracking-wider font-bold  text-sm ">Product</th>
                <th className=" py-2 title-font text-start  tracking-wider font-bold  text-sm ">Quantity</th>
                <th className=" py-2 title-font text-start  tracking-wider font-bold  text-sm ">Unit Price</th>
                <th className=" py-2 title-font text-start  tracking-wider font-bold  text-sm ">Discount </th>
                <th className=" py-2 title-font text-start  tracking-wider font-bold  text-sm ">Subtotal</th>

              </tr>
            </thead>
            <tbody >
              {(saleData.inputData) && saleData.inputData.map((value, index) => {
                return <tr key={index} className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : ""} `}>
                  <td>{value.product?.productName}</td>
                  <td>{value.quantity}</td>
                  <td>{value.unitPrice}</td>
                  <td>{value.discount}</td>
                  <td>{value.subtotal}</td>
                </tr>
              })}


            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>

        <div className='bg-black h-[1px] w-full'></div>
        <div className='flex flex-col items-end justify-end'>
          {/* <div className='flex'>
            <h1 className='font-bold'>Subtotal:</h1>
            <h1 className=''>subtotal</h1>
          </div> */}
          <div className='flex'>
            <h1 className='font-bold'>Total:</h1>
            <h1 className=''>Rs {findTotal()}</h1>
          </div>
          <div className='flex'>
            <h1 className='font-bold'>Discount:</h1>
            <h1 className='font-bold '>(-)</h1>
            <h1 className=''>{saleData.discountAmount}</h1>
          </div>

          <div className='flex'>
            <h1 className='font-bold'>Shipping:</h1>
            <h1 className='font-bold '>(+)</h1>
            <h1 className=''>Rs {saleData.shippingCharges}</h1>
          </div>

          <div className='flex'>
            <h1 className='font-bold'>Total Payable:</h1>
            <h1 className=''>Rs {saleData.totalSaleAmount}</h1>
          </div>
        </div>


      </div>
      <div onClick={handlePrint} className='flex w-[100px] justify-center items-center mt-5 cursor-pointer rounded-md text-white bg-green-400'>
        <FaPrint size={15} style={{ color: "white" }} />
        <h1 className='mx-2'>Print</h1>
      </div>
    </div>
  )
}

export default Invoice