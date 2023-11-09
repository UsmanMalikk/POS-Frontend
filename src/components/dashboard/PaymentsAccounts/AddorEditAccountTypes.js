import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddorEditAccountTypes = (props) => {
    const [AccountTypesData, setAccountTypesData] = useState([]);

    const [isserror, setIsserror] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        parentAccountType: "",

    })

    const handleSaveorEdit = () => {
        if (formData.name.length === 0) {
            setIsserror(true)
        } else if (props.id) {
            addAccountTypeById()
            console.log("Handle Update", formData)
        } else {
            addAccountType()
            console.log("Handle Save", formData)

        }
    }
    const fetchAccountTypes = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/accounttypes`, {
                headers: {
                    'Authorization': token
                }
            });

            // console.log(response)
            setAccountTypesData(response.data);
        } catch (error) {
            console.error('Error fetching Accounnt types:', error);
        }
    };
    const fetchAccountTypeById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/accounttypes/${props.id}`, {
                headers: {
                    'Authorization': token
                }
            });

            console.log(response)
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching Accounnt types:', error);
        }
    };
    const addAccountType = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.post(`http://localhost:8000/admin/accounttypes`, formData, {
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
            console.error('Error Adding Accounnt types:', error);
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

    const addAccountTypeById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/accounttypes/${props.id}`, formData, {
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
        } catch (error) {
            console.error('Error Adding Accounnt types:', error);
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
        if (props.id) {
            fetchAccountTypes()
            fetchAccountTypeById()
        }
        else {
            fetchAccountTypes()

        }
    }, [])
    return (
        <div className='flex flex-col w-full px-3 bg-white '>
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
            <div className='flex'>
                <h1 className='text-2xl font-semibold text-start '>{props.id ? "Edit Account Types" : "Add Account Type"}</h1>
            </div>
            <div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Name:*
                    <span className='text-red-400'>{isserror && formData.name.length === 0 ? "Required field" : ""}</span>

                </h1>
                <input type='text' value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} placeholder='Name' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
            </div>

            <div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Parent Account Type:

                </h1>
                <select type='text' value={formData.parentAccountType} onChange={(e) => { setFormData({ ...formData, parentAccountType: e.target.value }) }} placeholder='Variation Name' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' >
                    <option value={""}>Please Select</option>
                    {AccountTypesData.map((type) => (
                        <option key={type._id} value={type._id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>






            <div className='justify-end items-end flex py-5'>
                <button onClick={handleSaveorEdit} className='bg-green-400 text-white'>
                    <h1 className=' font-bold text-start px-3 py-2'>{props.id ? "Update" : "Save"}</h1>

                </button>
            </div>
        </div>
    )
}

export default AddorEditAccountTypes