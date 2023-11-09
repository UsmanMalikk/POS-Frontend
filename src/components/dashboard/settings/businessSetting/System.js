import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const System = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({

  })
  const handleSetting = () => {
    addTheme()
    console.log("Update Setting", formData)
  }

  const fetchTheme = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/admin/system-color`, {
        headers: {
          'Authorization': token
        }
      });
      console.log(response.data)
      setFormData(response.data);

    } catch (error) {
      console.error('Error fetching Prefixes:', error);
    }
  };
  const addTheme = async () => {

    try {
      const token = localStorage.getItem('token');
      // console.log(formData)
      const response = await axios.put(`http://localhost:8000/admin/system-color`, formData, {
        headers: {
          'Authorization': token
        }
      });
      console.log(response)
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error Adding Prefixes:', error);
    }
  };
  useEffect(() => {
    fetchTheme()


  }, [])
  return (
    <div className='flex flex-col p-5'>
      <div className='flex flex-col'>
        <h1 className='text-start font-bold'>Theme Color</h1>
        <div className='flex'>
          <select value={formData.themeColor} onChange={(e) => { setFormData({ ...formData, themeColor: e.target.value }) }} type='text' className='w-full border-[1px] px-2 py-1 border-gray-400 focus:outline-none' >
            <option value={""}>Please Select</option>
            <option value={'blue'}>Blue</option>
            <option value={'black'}>Black</option>
            <option value={'purple'}>Purple</option>
            <option value={'green'}>Green</option>
            <option value={'red'}>Red</option>
            <option value={'yellow'}>Yellow</option>
            <option value={'blue-light'}>Blue Light</option>
            <option value={'black-light'}>Black Light</option>
            <option value={'purple-light'}>Purple Light</option>
            <option value={'green-light'}>Green Light</option>
            <option value={'red-light'}>Red Light</option>
          </select>
        </div>
      </div>
      <div className='flex items-center justify-center mt-5'>
        <button onClick={() => { handleSetting() }} className='bg-red-500 rounded-md text-white px-2 py-2'>Update Settings</button>
      </div>
    </div>
  )
}

export default System