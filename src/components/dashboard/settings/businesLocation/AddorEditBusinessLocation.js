import React, { useState, useEffect } from 'react'
import { FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddorEditBusinessLocation = ({ id }) => {
    const navigate = useNavigate()


    const [AccountsData, setAccountsData] = useState([]);
    const [spgData, setSpgData] = useState([]);

    const [col1, setCol1] = useState(false)
    const [col2, setCol2] = useState(false)
    const [col3, setCol3] = useState(false)

    const [col4, setCol4] = useState(false)
    const [col5, setCol5] = useState(false)
    const [col6, setCol6] = useState(false)

    const handleDelete = (index) => {
        let newArray = [...formData.featureProducts]
        newArray.splice(index, 1)
        setFormData({ ...formData, featureProducts: newArray })
    }
    const [open1, setOpen1] = useState(false)
    const [inputValue1, setInputValue1] = useState('')
    const [seletedValue, setSeletedValue] = useState('')

    const [formData, setFormData] = useState({

        name: '',
        city: '',
        locationId: null,
        zipCode: "",
        state: "",
        country: "",
        landmark: "",
        mobileNo: null,
        altContactNo: null,
        email: "",
        website: "",
        defaultSellingPriceGroup: null,
        // featureProducts: [],
        paymentOption: [
            { paymentMethod: "Cash", is_enabled: false, acount: null },
            { paymentMethod: "Card", is_enabled: false, acount: null },
            { paymentMethod: "Cheque", is_enabled: false, acount: null },
            { paymentMethod: "Bank Transfer", is_enabled: false, acount: null },
            { paymentMethod: "Other", is_enabled: false, acount: null },
            { paymentMethod: "Easy Paisa", is_enabled: false, acount: null },
            { paymentMethod: "Custom Payment 2", is_enabled: false, acount: null },
            { paymentMethod: "Custom Payment 3", is_enabled: false, acount: null },
            { paymentMethod: "Custom Payment 4", is_enabled: false, acount: null },
            { paymentMethod: "Custom Payment 5", is_enabled: false, acount: null },
            { paymentMethod: "Custom Payment 6", is_enabled: false, acount: null },
            { paymentMethod: "Custom Payment 7", is_enabled: false, acount: null },
        ]


    })
    const handleChange = (e, index) => {

        const updatedData = formData.paymentOption.map((item, ind) => {
            if (ind === index) {
                // Create a new copy of the item with the modified subItem
                return {
                    ...item, [e.target.name]: e.target.name === "acount" ? e.target.value : e.target.checked
                };
            }
            return item;
        });
        setFormData({ ...formData, paymentOption: updatedData });
    }
    const [isserror, setIsserror] = useState(false);
    const handleClick = (e) => {
        if (
            formData.name.length === 0 ||
            formData.city.length === 0 ||
            formData.zipCode.length === 0 ||
            formData.country.length === 0 ||
            formData.state.length === 0
        ) {
            setIsserror(true);
            console.log(isserror);
        } else if (id) {
            addLocationById()
            console.log("Handle Update", formData);
        } else {
            addLocation()
            console.log("Handle Save", formData);
        }
    };
    const fetchAccounts = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/add-accounts`,{
                headers: {
                    'Authorization': token
                }
            });

            // console.log(response)
            setAccountsData(response.data);
        } catch (error) {
            console.error('Error fetching Accounnt:', error);
        }
    };
    const fetchLocationById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:8000/admin/business-locations",{
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching Location:', error);
        }
    };
    const fetchSPG = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/selling-price-groups`,{
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response.data)
            setSpgData(response.data);
            // console.log(variationData)

        } catch (error) {
            console.error('Error fetching spg:', error);
        }
    };
    const addLocation = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.post(`http://localhost:8000/admin/business-locations`, formData,{
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            if (response.status === 201) {
                navigate("/home/business-location")
                console.log("Success")
            }
        } catch (error) {
            console.error('Error Adding Accounnt:', error);
        }
    };

    const addLocationById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/business-locations/${id}`, formData,{
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            if (response.status === 200) {
                navigate("/home/business-location")

                console.log("Success")
            }
        } catch (error) {
            console.error('Error Adding Accounnt:', error);
        }
    };
    useEffect(() => {
        // Make an API call to fetch SPG's records
        if (id) {
            fetchAccounts()
            fetchLocationById()
            fetchSPG()
        }
        else {
            fetchAccounts()
            fetchSPG()
        }
    }, [])
    return (
        <div className='flex flex-col w-full bg-white p-3'>
            <h1 className="text-2xl text-start font-semibold ">{id ? "Edit" : "Add a new"} business location</h1>

            <div className='flex flex-col mt-5'>
                <h2 className="text-start text-gray-500 flex ">
                    Name:*
                    <h2 className="text-red-400">
                        {isserror && formData.name.length === 0
                            ? "Required field"
                            : ""}
                    </h2>
                </h2>
                <input type="text" placeholder='Name' value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Location ID:
                    </h2>
                    <input type="text" placeholder='Location ID'
                        value={formData.locationId}
                        onChange={(e) => { setFormData({ ...formData, locationId: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Landmark:
                    </h2>
                    <input type="text" placeholder='Landmark'
                        value={formData.landmark}
                        onChange={(e) => { setFormData({ ...formData, landmark: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        City:*
                        <h2 className="text-red-400">
                            {isserror && formData.city.length === 0
                                ? "Required field"
                                : ""}
                        </h2>
                    </h2>
                    <input type="text" placeholder='City'
                        value={formData.city}
                        onChange={(e) => { setFormData({ ...formData, city: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Zip Code:*
                        <h2 className="text-red-400">
                            {isserror && formData.zipCode.length === 0
                                ? "Required field"
                                : ""}
                        </h2>
                    </h2>
                    <input type="text" placeholder='Zip Code'
                        value={formData.zipCode}
                        onChange={(e) => { setFormData({ ...formData, zipCode: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        State:*
                        <h2 className="text-red-400">
                            {isserror && formData.state.length === 0
                                ? "Required field"
                                : ""}
                        </h2>
                    </h2>
                    <input type="text" placeholder='State'
                        value={formData.state}
                        onChange={(e) => { setFormData({ ...formData, state: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Country:*
                        <h2 className="text-red-400">
                            {isserror && formData.country.length === 0
                                ? "Required field"
                                : ""}
                        </h2>
                    </h2>
                    <input type="text" placeholder='Country'
                        value={formData.country}
                        onChange={(e) => { setFormData({ ...formData, country: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Mobile:
                    </h2>
                    <input type="text" placeholder='Mobile'
                        value={formData.mobileNo}
                        onChange={(e) => { setFormData({ ...formData, mobileNo: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Website:
                    </h2>
                    <input type="text" placeholder='Website'
                        value={formData.website}
                        onChange={(e) => { setFormData({ ...formData, website: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Alternate Contact Number:
                    </h2>
                    <input type="text" placeholder='Alternate Contact Number'
                        value={formData.altContactNo}
                        onChange={(e) => { setFormData({ ...formData, altContactNo: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Email:
                    </h2>
                    <input type="email" placeholder='Email'
                        value={formData.email}
                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>

                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex relative">
                        Default Selling Price Group:
                        <FaInfoCircle onMouseOver={() => { setCol4(true) }} onMouseLeave={() => { setCol4(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                        {col4 &&
                            <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                                <p className='text-start mt-2 text-gray-800'>This price group will be used as the default price group in this location.</p>

                            </div>
                        }
                    </h2>
                    <select type="text" placeholder='Alternate Contact Number'
                        value={formData.defaultSellingPriceGroup}
                        onChange={(e) => { setFormData({ ...formData, defaultSellingPriceGroup: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" >
                        <option value={""}>Please Select</option>
                        {spgData.map((spg) => (
                            <option key={spg._id} value={spg._id}>
                                {(spg.isDefault) ? "Default Selling Price" : spg.name}
                            </option>
                        ))}

                    </select>
                </div>



            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 mt-5 gap-5'>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Custom Feild 1:
                    </h2>
                    <input type="text" placeholder='Custom Feild 1'
                        value={formData.customField1}
                        onChange={(e) => { setFormData({ ...formData, customField1: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Custom Feild 2:
                    </h2>
                    <input type="text" placeholder='Custom Feild 2'
                        value={formData.customField2}
                        onChange={(e) => { setFormData({ ...formData, customField2: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Custom Feild 3:
                    </h2>
                    <input type="text" placeholder='Custom Feild 3'
                        value={formData.customField3}
                        onChange={(e) => { setFormData({ ...formData, customField3: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Custom Feild 4:
                    </h2>
                    <input type="text" placeholder='Custom Feild 4'
                        value={formData.customField4}
                        onChange={(e) => { setFormData({ ...formData, customField4: e.target.value }) }}
                        className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
            </div>


            <div className='flex bg-black w-full h-[2px] mt-5'></div>

            <div className='flex flex-col justify-center items-center mt-5 mx-5'  >
                <div className='flex text-sm text-start font-bold relative'>
                    <h1> Payment Options:</h1>
                    <FaInfoCircle onMouseOver={() => { setCol6(true) }} onMouseLeave={() => { setCol6(false) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                    {col6 &&
                        <div className='flex flex-col w-[280px] rounded-md border-[2px] border-gray-400 absolute top-8 p-2 z-10 bg-white shadow-md shadow-gray-300'>
                            <p className='text-start mt-2 text-gray-800'>Enable or disable payment methods for the location</p>

                        </div>
                    }
                </div>

                <table id='usertbl' className="table-auto w-full mb-10  whitespace-no-wrap ">
                    <thead>
                        <tr>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">Payment Method</th>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">Enable</th>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">Default Account</th>


                        </tr>
                    </thead>
                    <tbody >
                        {formData.paymentOption.map((val, index) => {
                            return <tr key={index} className={`${(index + 1) % 2 === 0 ? "bg-gray-100" : ""}`}>
                                <td className="px-1 py-1 text-sm">{val.paymentMethod}</td>
                                <td>
                                    <input type='checkbox' name='is_enabled' checked={val.is_enabled ? true : false}
                                        onChange={(e) => { handleChange(e, index) }}
                                    />
                                </td>
                                <td className="px-1 py-1">
                                    <div className='flex flex-col'>
                                        <select name="acount" value={val.acount} onChange={(e) => { handleChange(e, index) }} className='border-[1px] mt-2 w-full px-1 py-1 border-black focus:outline-none'>
                                            <option value={""}>None</option>
                                            {AccountsData.map((acc) => (
                                                <option key={acc._id} value={acc._id}>
                                                    {(acc.name)}
                                                </option>
                                            ))}

                                        </select>

                                    </div>
                                </td>

                            </tr>
                        })}


                    </tbody>
                </table>

            </div>

            <div className='flex items-end justify-end'>
                <button
                    onClick={handleClick}
                    className="bg-green-500 w-[100px] px-2 py-2 items-center justify-center flex"
                >
                    {id ? "Update" : "Save"}
                </button>
            </div>

        </div>
    )
}

export default AddorEditBusinessLocation