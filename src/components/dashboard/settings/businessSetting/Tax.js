import React, { useState, useEffect } from 'react'
import { FaInfo } from 'react-icons/fa'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
const Tax = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    tax1Name: "",
    tax1No: 0,
    tax2Name: "",
    tax2No: 0
  })
  const handleSetting = () => {
    console.log("Update Setting", formData)
  }
  const fetchBusinessSetting = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/auth`, {
        headers: {
          'Authorization': token
        }
      });
      console.log(response)
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching Profile:', error);
    }
  };
  const addBusinessSetting = async () => {

    try {
      const token = localStorage.getItem('token');
      // console.log(finalFormData)
      const response = await axios.put(`http://localhost:8000/admin/auth`, formData, {
        headers: {
          'Authorization': token
        }
      });
      console.log(response)
      if (response.status === 200) {
        Navigate("/home/business-settings");
      }
    } catch (error) {
      console.error('Error Adding Tax:', error);
    }
  };
  useEffect(() => {
    // Make an API call to fetch user's roles records
    fetchBusinessSetting()

  }, []);
  return (
    <div className='flex flex-col bg-white p-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 '>
        <div className='flex flex-col '>
          <h1 className='flex text-start font-bold'>Tax 1 Name:</h1>
          <div className='flex'>
            <FaInfo size={15} className='w-8 h-9 border-[1px] px-2 py-1 border-gray-400' />
            <input value={formData.tax1Name} onChange={(e) => { setFormData({ ...formData, tax1Name: e.target.value }) }} type='text' placeholder='GST / VAT / Other' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
          </div>
        </div>
        <div className='flex flex-col '>
          <h1 className='flex text-start font-bold'>Tax 1 No.:</h1>
          <div className='flex'>
            <FaInfo size={15} className='w-8 h-9 border-[1px] px-2 py-1 border-gray-400' />
            <input value={formData.tax1No} onChange={(e) => { setFormData({ ...formData, tax1No: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
          </div>
        </div>
        <div className='flex flex-col '>
          <h1 className='flex text-start font-bold'>Tax 2 Name:</h1>
          <div className='flex'>
            <FaInfo size={15} className='w-8 h-9 border-[1px] px-2 py-1 border-gray-400' />
            <input value={formData.tax2Name} onChange={(e) => { setFormData({ ...formData, tax2Name: e.target.value }) }} type='text' placeholder='GST / VAT / Other' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
          </div>
        </div>
        <div className='flex flex-col '>
          <h1 className='flex text-start font-bold'>Tax 2 No.:</h1>
          <div className='flex'>
            <FaInfo size={15} className='w-8 h-9 border-[1px] px-2 py-1 border-gray-400' />
            <input value={formData.tax2No} onChange={(e) => { setFormData({ ...formData, tax2No: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
          </div>
        </div>

      </div>
      <div className='flex items-center justify-center mt-5'>
        <button onClick={() => { addBusinessSetting() }} className='bg-red-500 rounded-md text-white px-2 py-2'>Update Settings</button>
      </div>
    </div>
  )
}

export default Tax