import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
const CustomLables = () => {
    const Navigate = useNavigate();

    const [productCustomData, setProductCustomData] = useState({
        customLable1: "",
        customLableType1: "",
        dropdownOptions1: "",
        customLable2: "",
        customLableType2: "",
        dropdownOptions2: "",
        customLable3: "",
        customLableType3: "",
        dropdownOptions3: "",
        customLable4: "",
        customLableType4: "",
        dropdownOptions4: "",
        customLable5: "",
        customLableType5: "",
        dropdownOptions5: "",
        customLable6: "",
        customLableType6: "",
        dropdownOptions6: "",
        customLable7: "",
        customLableType7: "",
        dropdownOptions7: "",
        customLable8: "",
        customLableType8: "",
        dropdownOptions8: "",
        customLable9: "",
        customLableType9: "",
        dropdownOptions9: "",
        customLable10: "",
        customLableType10: "",
        dropdownOptions10: "",
    })

    const [contactCustomData, setContactCustomData] = useState({
        customLable1: "",
        customLable2: "",
        customLable3: "",
        customLable4: "",
        customLable5: "",
        customLable6: "",
        customLable7: "",
        customLable8: "",
        customLable9: "",
        customLable10: "",
    })
    const [purchaseCustomData, setPurchaseCustomData] = useState({
        customLable1: "",
        isRequired1: false,
        customLable2: "",
        isRequired2: false,
        customLable3: "",
        isRequired3: false,
        customLable4: "",
        isRequired4: false,
    })



    const handleSetting = () => {
        updateProductCustomFieldById()
        updatePurchaseCustomFieldById()
        updateContactCustomFieldById()

        // addContactCustomLabel()
        // addProductCustomLabel()
        // addPurchaseCustomLabel()
        console.log("Update Setting", productCustomData, "\n", contactCustomData, "\n", purchaseCustomData)
    }
    // const addContactCustomLabel = async () => {

    //     try {
    //         const token = localStorage.getItem('token');
    //         // console.log(formData)
    //         const response = await axios.post(`http://localhost:8000/admin/contact-custom-label`, contactCustomData, {
    //             headers: {
    //                 'Authorization': token
    //             }
    //         });
    //         // console.log(response)
    //         if (response.status === 201) {
    //             console.log("Yesshs")
    //             // Navigate("/home/business-settings/custom-lables");
    //         }
    //     } catch (error) {
    //         console.error('Error Adding Stock Tranfers:', error);
    //     }
    // };
    // const addProductCustomLabel = async () => {

    //     try {
    //         const token = localStorage.getItem('token');
    //         // console.log(formData)
    //         const response = await axios.post(`http://localhost:8000/admin/product-custom-label`, productCustomData, {
    //             headers: {
    //                 'Authorization': token
    //             }
    //         });
    //         // console.log(response)
    //         if (response.status === 201) {
    //             console.log("Yesshs")
    //             // Navigate("/home/business-settings/custom-lables");
    //         }
    //     } catch (error) {
    //         console.error('Error Adding Stock Tranfers:', error);
    //     }
    // };
    // const addPurchaseCustomLabel = async () => {

    //     try {
    //         const token = localStorage.getItem('token');
    //         // console.log(formData)
    //         const response = await axios.post(`http://localhost:8000/admin/purchase-custom-label`, purchaseCustomData, {
    //             headers: {
    //                 'Authorization': token
    //             }
    //         });
    //         // console.log(response)
    //         if (response.status === 201) {
    //             console.log("Yesshs")
    //             // Navigate("/home/business-settings/custom-lables");
    //         }
    //     } catch (error) {
    //         console.error('Error Adding Stock Tranfers:', error);
    //     }
    // };
    const fetchPurchaseCustomFields = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:8000/admin/purchase-custom-label`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response.data);
            setPurchaseCustomData(response.data);

        } catch (e) {
            console.error(e)
        }

    }
    const fetchProductCustomFields = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:8000/admin/product-custom-label`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response.data);
            setProductCustomData(response.data);

        } catch (e) {
            console.error(e)
        }

    }
    const fetchContactCustomFields = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:8000/admin/contact-custom-label`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response.data);
            setContactCustomData(response.data);

        } catch (e) {
            console.error(e)
        }

    }
    useEffect(() => {
        fetchPurchaseCustomFields()
        fetchProductCustomFields()
        fetchContactCustomFields()

    }, []);
    const updateProductCustomFieldById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/product-custom-label`, productCustomData, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            if (response.status === 200) {
                Navigate("/home/business-settings/custom-lables");
            }
        } catch (error) {
            console.error('Error Adding Stock Tranfers:', error);
        }
    };
    const updatePurchaseCustomFieldById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/purchase-custom-label`, purchaseCustomData, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            if (response.status === 200) {
                Navigate("/home/business-settings/custom-lables");
            }
        } catch (error) {
            console.error('Error Adding Stock Tranfers:', error);
        }
    };
    const updateContactCustomFieldById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/contact-custom-label`, contactCustomData, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            if (response.status === 200) {
                Navigate("/home/business-settings/custom-lables");
            }
        } catch (error) {
            console.error('Error Adding Stock Tranfers:', error);
        }
    };
    return (
        <div className='bg-white py-5 flex flex-col'>

            <div className='flex flex-col mt-5'>
                <h1 className='text-start text-xl font-bold'>Labels for contact custom fields</h1>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mt-5'>

                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 1</h1>
                        <input value={contactCustomData.customLable1} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable1: e.target.value }) }} type='text' placeholder={`Custom Field 1`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 2</h1>
                        <input value={contactCustomData.customLable2} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable2: e.target.value }) }} type='text' placeholder={`Custom Field 2`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 3</h1>
                        <input value={contactCustomData.customLable3} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable3: e.target.value }) }} type='text' placeholder={`Custom Field 3`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 4</h1>
                        <input value={contactCustomData.customLable4} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable4: e.target.value }) }} type='text' placeholder={`Custom Field 4`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 5</h1>
                        <input value={contactCustomData.customLable5} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable5: e.target.value }) }} type='text' placeholder={`Custom Field 5`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 6</h1>
                        <input value={contactCustomData.customLable6} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable6: e.target.value }) }} type='text' placeholder={`Custom Field 6`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 7</h1>
                        <input value={contactCustomData.customLable7} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable7: e.target.value }) }} type='text' placeholder={`Custom Field 7`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 8</h1>
                        <input value={contactCustomData.customLable8} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable8: e.target.value }) }} type='text' placeholder={`Custom Field 8`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 9</h1>
                        <input value={contactCustomData.customLable9} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable9: e.target.value }) }} type='text' placeholder={`Custom Field 9`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 10</h1>
                        <input value={contactCustomData.customLable10} name='customLable' onChange={(e) => { setContactCustomData({ ...contactCustomData, customLable10: e.target.value }) }} type='text' placeholder={`Custom Field 10`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                    </div>




                </div>
            </div>
            <div className='flex flex-col mt-5'>
                <h1 className='text-start text-xl font-bold'>Labels for product custom fields</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>

                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  1 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable1} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable1: e.target.value }) }} type='text' placeholder={`Custom Field 1`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType1} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType1: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType1 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions1} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions1: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>

                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  2 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable2} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable2: e.target.value }) }} type='text' placeholder={`Custom Field 2`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType2} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType2: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType2 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions2} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions2: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  3 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable3} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable3: e.target.value }) }} type='text' placeholder={`Custom Field 1`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType3} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType3: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType3 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions3} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions3: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  4 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable4} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable4: e.target.value }) }} type='text' placeholder={`Custom Field 4`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType4} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType4: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType4 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions4} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions4: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  5 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable5} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable5: e.target.value }) }} type='text' placeholder={`Custom Field 5`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType5} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType5: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType5 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions5} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions5: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  6 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable6} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable6: e.target.value }) }} type='text' placeholder={`Custom Field 6`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType6} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType6: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                    </div>
                    {productCustomData.customLableType6 === "Dropdown" &&
                        <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions6} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions6: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                    }
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  7 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable7} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable7: e.target.value }) }} type='text' placeholder={`Custom Field 7`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType7} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType7: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType7 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions7} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions7: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  8 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable8} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable8: e.target.value }) }} type='text' placeholder={`Custom Field 8`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType8} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType8: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType8 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions8} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions8: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  9 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable9} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable9: e.target.value }) }} type='text' placeholder={`Custom Field 9`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType9} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType9: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType9 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions9} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions9: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field  10 </h1>
                        <div className='flex'>
                            <input name='customLable' value={productCustomData.customLable10} onChange={(e) => { setProductCustomData({ ...productCustomData, customLable10: e.target.value }) }} type='text' placeholder={`Custom Field 1`} className='border-[1px] px-2 w-2/4 py-1 border-gray-400 focus:outline-none' />
                            <select name='customLableType' value={productCustomData.customLableType10} onChange={(e) => { setProductCustomData({ ...productCustomData, customLableType10: e.target.value }) }} type='text' className='border-[1px] px-2 py-1 w-2/4 border-gray-400 focus:outline-none' >
                                <option value={""}>Field type</option>
                                <option value={"text"}>text</option>
                                <option value={"datetime-local"}>Datepicker</option>
                                <option value={"Dropdown"}>Dropdown</option>
                            </select>
                        </div>
                        {productCustomData.customLableType10 === "Dropdown" &&
                            <textarea rows={2} name='dropdownOptions' value={productCustomData.dropdownOptions10} onChange={(e) => { setProductCustomData({ ...productCustomData, dropdownOptions10: e.target.value }) }} type='text' placeholder='Enter dropdown options, one option per line ' className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />

                        }
                    </div>
                </div>



            </div>
            <div className='flex flex-col mt-5'>
                <h1 className='text-start text-xl font-bold'>Labels for Purchase custom fields</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 1:</h1>
                        <div className='flex'>

                            <input name='customLable' value={purchaseCustomData.customLable1} onChange={(e) => { setPurchaseCustomData({ ...purchaseCustomData, customLable1: e.target.value }) }} type='text' placeholder={`Custom Field 1`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                            <div className='flex items-center border-[1px] px-2 py-1 border-gray-400'>
                                <input name='isRequired' checked={purchaseCustomData.isRequired1 ? true : false} onChange={(e) => { setPurchaseCustomData({ ...purchaseCustomData, isRequired1: e.target.checked }) }} type='checkbox' className=' w-4 h-4 mx-2' />
                                <h1 className='text-sm'>Is required</h1>
                            </div>


                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 2:</h1>
                        <div className='flex'>

                            <input name='customLable' value={purchaseCustomData.customLable2} onChange={(e) => { setPurchaseCustomData({ ...purchaseCustomData, customLable2: e.target.value }) }} type='text' placeholder={`Custom Field 2`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                            <div className='flex items-center border-[1px] px-2 py-1 border-gray-400'>
                                <input name='isRequired' checked={purchaseCustomData.isRequired2 ? true : false} onChange={(e) => { setPurchaseCustomData({ ...purchaseCustomData, isRequired2: e.target.checked }) }} type='checkbox' className=' w-4 h-4 mx-2' />
                                <h1 className='text-sm'>Is required</h1>
                            </div>


                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 3:</h1>
                        <div className='flex'>

                            <input name='customLable' value={purchaseCustomData.customLable3} onChange={(e) => { setPurchaseCustomData({ ...purchaseCustomData, customLable3: e.target.value }) }} type='text' placeholder={`Custom Field 3`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                            <div className='flex items-center border-[1px] px-2 py-1 border-gray-400'>
                                <input name='isRequired' checked={purchaseCustomData.isRequired3 ? true : false} onChange={(e) => { setPurchaseCustomData({ ...purchaseCustomData, isRequired3: e.target.checked }) }} type='checkbox' className=' w-4 h-4 mx-2' />
                                <h1 className='text-sm'>Is required</h1>
                            </div>


                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <h1 className='flex text-start font-bold'>Custom Field 4:</h1>
                        <div className='flex'>

                            <input name='customLable' value={purchaseCustomData.customLable4} onChange={(e) => { setPurchaseCustomData({ ...purchaseCustomData, customLable4: e.target.value }) }} type='text' placeholder={`Custom Field 4`} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                            <div className='flex items-center border-[1px] px-2 py-1 border-gray-400'>
                                <input name='isRequired' checked={purchaseCustomData.isRequired4 ? true : false} onChange={(e) => { setPurchaseCustomData({ ...purchaseCustomData, isRequired4: e.target.checked }) }} type='checkbox' className=' w-4 h-4 mx-2' />
                                <h1 className='text-sm'>Is required</h1>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
            <div className='flex items-center justify-center mt-5'>
                <button onClick={() => { handleSetting() }} className='bg-red-500 rounded-md text-white px-2 py-2'>Update Settings</button>
            </div>
        </div>

    )
}
export default CustomLables