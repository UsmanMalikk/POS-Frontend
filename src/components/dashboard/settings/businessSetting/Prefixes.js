import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Prefixes = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        purchase: "",
        purchaseReturn: "",
        purchaseOrder: "",
        stockTransfer: "",
        stockAdjustment: "",
        expenses: "",
        contacts: "",
        purchasePayment: "",
        sellPayment: "",
        expensePayment: "",
        businessLocation: "",
        draft: ""
    })
    const handleSetting = () => {
        addPrefixes()
        console.log("Update Setting", formData)
    }


    const fetchPrefixes = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/prefix`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response.data)
            setFormData(response.data);
            // console.log(variationData)

        } catch (error) {
            console.error('Error fetching Prefixes:', error);
        }
    };
    const addPrefixes = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/prefix`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            if (response.status === 200) {
                navigate("/home/business-settings")
                console.log("Success")
            }
        } catch (error) {
            console.error('Error Adding Prefixes:', error);
        }
    };
    // const updatePrefixes = async () => {

    //     try {
    //         const token = localStorage.getItem('token');
    //         // console.log(formData)
    //         const response = await axios.put(`http://localhost:8000/admin/business-locations/${id}`, formData, {
    //             headers: {
    //                 'Authorization': token
    //             }
    //         });
    //         console.log(response)
    //         if (response.status === 200) {
    //             navigate("/home/business-location")

    //             console.log("Success")
    //         }
    //     } catch (error) {
    //         console.error('Error Adding Accounnt:', error);
    //     }
    // };


    useEffect(() => {
        fetchPrefixes()
            
        
    }, [])
    return (
        <div className='flex flex-col bg-white p-5 w-full'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Purchase:</h1>
                    <input value={formData.purchase} onChange={(e) => { setFormData({ ...formData, purchase: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Purchase Return:</h1>
                    <input value={formData.purchaseReturn} onChange={(e) => { setFormData({ ...formData, purchaseReturn: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
            
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Purchase Order:</h1>
                    <input value={formData.purchaseOrder} onChange={(e) => { setFormData({ ...formData, purchaseOrder: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Stock Transfer:</h1>
                    <input value={formData.stockTransfer} onChange={(e) => { setFormData({ ...formData, stockTransfer: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Stock Adjustments:</h1>
                    <input value={formData.stockAdjustment} onChange={(e) => { setFormData({ ...formData, stockAdjustment: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Expenses:</h1>
                    <input value={formData.expenses} onChange={(e) => { setFormData({ ...formData, expenses: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Contacts:</h1>
                    <input value={formData.contacts} onChange={(e) => { setFormData({ ...formData, contacts: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Purchase Payment:</h1>
                    <input value={formData.purchasePayment} onChange={(e) => { setFormData({ ...formData, purchasePayment: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Sell Payment:</h1>
                    <input value={formData.sellPayment} onChange={(e) => { setFormData({ ...formData, sellPayment: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Expense Payment:</h1>
                    <input value={formData.expensePayment} onChange={(e) => { setFormData({ ...formData, expensePayment: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Business Location:</h1>
                    <input value={formData.businessLocation} onChange={(e) => { setFormData({ ...formData, businessLocation: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                
                <div className='flex flex-col '>
                    <h1 className='flex text-start font-bold'>Draft:</h1>
                    <input value={formData.draft} onChange={(e) => { setFormData({ ...formData, draft: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                </div>
                

            </div>

            <div className='flex items-center justify-center mt-5'>
                <button onClick={() => { handleSetting() }} className='bg-red-500 rounded-md text-white px-2 py-2'>Update Settings</button>
            </div>
        </div>
    )
}

export default Prefixes