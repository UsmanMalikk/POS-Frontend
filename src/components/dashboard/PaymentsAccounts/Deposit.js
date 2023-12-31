import React, {  useState } from 'react'
import axios from 'axios';

const Deposit = (props) => {
        const data = props.data

    const [isserror, setIsserror] = useState(false)
    const [formData, setFormData] = useState({
        depositTo: "",
        depositFrom: "",
        amount: "",
        date: "",
        note: ""
    })
    


    const handleSaveorEdit = () => {
        if (
             
              formData.amount.length === 0 ||
              formData.date.length === 0) {
            setIsserror(true)
        } else if (props.id) {
            console.log("Handle Update", formData)
        } else {
            addFundsDeposit()
            console.log("Handle Save", formData)

        }
    }
const addFundsDeposit = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.post(`http://localhost:8000/admin/account/funds-deposit`, formData,{
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            if (response.status === 201) {
                console.log("Success")
            }
        } catch (error) {
            console.error('Error Depositing:', error);
        }
    };
    return (
        <div className='flex flex-col w-full px-3 bg-white '>
            <div className='flex'>
                <h1 className='text-2xl font-semibold text-start '>Deposit</h1>
            </div>

            <h1 className='text-sm font-semibold text-start '>Selecet Account   {props.name}</h1>

            <div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Deposit To:

                </h1>
                <select type='text' value={formData.depositTo} onChange={(e) => { setFormData({ ...formData, depositTo: e.target.value }) }} placeholder='Deposit To' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' >
                    <option value={""}>Please Select</option>
                    {data.map((acc) => (
                        <option key={acc._id} value={acc._id}>
                            {acc.name}
                        </option>
                    ))}

                </select>
                {/* <input type='text' value={formData.depositTo} onChange={(e) => { setFormData({ ...formData, depositTo: e.target.value }) }} placeholder='Transfer From' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' /> */}
            </div>
            <div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Amount:*
                    <span className='text-red-400'>{isserror && formData.amount.length === 0 ? "Required field" : ""}</span>

                </h1>
                <input type='number' value={formData.amount} onChange={(e) => { setFormData({ ...formData, amount: e.target.value }) }} placeholder='Transfer To' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
            </div>
            <div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Deposit From:

                </h1>
                <select type='text' value={formData.depositFrom} onChange={(e) => { setFormData({ ...formData, depositFrom: e.target.value }) }} placeholder='Deposit From' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' >
                    <option value={""}>Please Select</option>
                    {data.map((acc) => (
                        <option key={acc._id} value={acc._id}>
                            {acc.name}
                        </option>
                    ))}

                </select>
                {/* <input type='number' value={formData.depositFrom} onChange={(e) => { setFormData({ ...formData, depositFrom: e.target.value }) }}  className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' /> */}
            </div><div className='flex flex-col mt-3'>
                <h1 className='flex text-start font-bold'>
                    Date:*
                    <span className='text-red-400'>{isserror && formData.date.length === 0 ? "Required field" : ""}</span>

                </h1>
                <input type='date' value={formData.date} onChange={(e) => { setFormData({ ...formData, date: e.target.value }) }} placeholder='Account Number' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
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

export default Deposit