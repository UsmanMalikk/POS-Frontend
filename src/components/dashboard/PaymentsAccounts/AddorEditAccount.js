import React, { useState, useEffect } from 'react'
import axios from 'axios';

const AddorEditAccount = (props) => {
    const [AccountTypesData, setAccountTypesData] = useState([]);

    const [isserror, setIsserror] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        accountNumber: "",
        accountType: "",
        openingBalance: 0,
        lable1: "",
        value1: "",
        lable2: "",
        value2: "",
        lable3: "",
        value3: "",
        lable4: "",
        value4: "",
        lable5: "",
        value5: "",
        lable6: "",
        value6: "",
        note: ""
    })
    console.log(formData)
    const handleSaveorEdit = () => {
        if (formData.name.length === 0 || formData.accountNumber.length === 0) {
            setIsserror(true)
        } else if (props.id) {
            addAccountById()
            console.log("Handle Update", formData)
        } else {
            addAccount()
            console.log("Handle Save", formData)

        }
    }
    const fetchAccountTypes = async () => {

        try {
            // const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/accounttypes`);

            // console.log(response)
            setAccountTypesData(response.data);
        } catch (error) {
            console.error('Error fetching Accounnt types:', error);
        }
    };
    const fetchAccountById = async () => {

        try {
            // const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/add-accounts/${props.id}`);

            console.log(response)
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching Accounnt:', error);
        }
    };
    const addAccount = async () => {

        try {
            // const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.post(`http://localhost:8000/admin/add-accounts`, formData);
            console.log(response)
            if (response.status === 201) {
                window.location.reload();

                console.log("Success")
            }
        } catch (error) {
            console.error('Error Adding Accounnt:', error);
        }
    };

    const addAccountById = async () => {

        try {
            // const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/add-accounts/${props.id}`, formData);
            console.log(response)
            if (response.status === 200) {
                window.location.reload();

                console.log("Success")
            }
        } catch (error) {
            console.error('Error Adding Accounnt:', error);
        }
    };
    useEffect(() => {
        // Make an API call to fetch SPG's records
        if (props.id) {
            fetchAccountById()
            fetchAccountTypes()

        }
        else {
            fetchAccountTypes()

        }
    }, [])
    return (
        <div className='flex flex-col w-full px-3 bg-white '>
            <div className='flex'>
                <h1 className='text-2xl font-semibold text-start '>{props.id ? "Edit Account" : "Add Account"}</h1>
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
                    Account Number:*
                    <span className='text-red-400'>{isserror && formData.shortName.length === 0 ? "Required field" : ""}</span>

                </h1>
                <input type='text' value={formData.accountNumber} onChange={(e) => { setFormData({ ...formData, accountNumber: e.target.value }) }} placeholder='Account Number' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
            </div>
            <div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Account Type:

                </h1>
                <select type='text' value={formData.accountType} onChange={(e) => { setFormData({ ...formData, accountType: e.target.value }) }} placeholder='Variation Name' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' >
                    <option value={""}>Please Select</option>
                    {AccountTypesData.map((type) => (
                        <option key={type._id} value={type._id}>
                            {type.name}
                        </option>
                    ))}

                </select>
            </div>
            <div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Opening Balance:

                </h1>
                <input type='number' value={formData.openingBalance} onChange={(e) => { setFormData({ ...formData, openingBalance: e.target.value }) }} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
            </div>

            <div className='flex flex-col'>
                <h1 className='text-start font-bold'>Account details:</h1>
                <div className='grid  grid-cols-2 gap-5 mt-5'>
                    <input type='text' value={formData.lable1} onChange={(e) => { setFormData({ ...formData, lable1: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.value1} onChange={(e) => { setFormData({ ...formData, value1: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.lable2} onChange={(e) => { setFormData({ ...formData, lable2: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.value2} onChange={(e) => { setFormData({ ...formData, value2: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.lable3} onChange={(e) => { setFormData({ ...formData, lable3: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.value3} onChange={(e) => { setFormData({ ...formData, value3: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.lable4} onChange={(e) => { setFormData({ ...formData, lable4: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.value4} onChange={(e) => { setFormData({ ...formData, value4: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.lable5} onChange={(e) => { setFormData({ ...formData, lable5: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.value5} onChange={(e) => { setFormData({ ...formData, value5: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.lable6} onChange={(e) => { setFormData({ ...formData, lable6: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />
                    <input type='text' value={formData.value6} onChange={(e) => { setFormData({ ...formData, value6: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1  focus:outline-none' />



                </div>

            </div>
            <div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Note:

                </h1>
                <textarea rows={4} type='text' value={formData.note} onChange={(e) => { setFormData({ ...formData, note: e.target.value }) }} placeholder='Account Details' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
            </div>





            <div className='justify-end items-end flex py-5'>
                <button onClick={handleSaveorEdit} className='bg-green-400 text-white'>
                    <h1 className=' font-bold text-start px-3 py-2'>{props.id ? "Update" : "Save"}</h1>

                </button>
            </div>
        </div>
    )
}

export default AddorEditAccount