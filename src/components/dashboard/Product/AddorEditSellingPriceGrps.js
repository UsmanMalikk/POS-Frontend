import React, { useState, useEffect } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddorEditSellingPriceGrps = () => {
    const navigate = useNavigate()

    const location = useLocation();
    const formDataFromPreviousPage = location.state?.formData;
    const spgsFromPreviousPage = location.state?.spgData;
    const [isAddOther, setIsAddOther] = useState(false)
    const [isOpeningStock, setIsOpeningStock] = useState(false)
    const [actionList, setActionList] = useState(Array(spgsFromPreviousPage.length).fill(false))

    const toggleDropdown = (data, index) => {
        const dropDownAction = [...actionList];
        dropDownAction.map((val, i) => {
            if (i === index) {
                dropDownAction[i] = data;

            }

            return dropDownAction
        })

        setActionList(dropDownAction);
    };
    const resultData = spgsFromPreviousPage.map((spg) => {
        return { spg: spg?._id, amount: 0, type: "" }
    })

    const [formData, setFormData] = useState({
        ...formDataFromPreviousPage,

        grpPrices: resultData
    })



    const handleChange = (e, index) => {
        const updatedData = formData.grpPrices.map((item, ind) => {
            if (ind === index) {
                // Create a new copy of the item with the modified subItem
                return {
                    ...item, [e.target.name]: e.target.value
                };
            }
            return item;
        });
        setFormData({ ...formData, grpPrices: updatedData });
    }

    const handleOpeningStock = () => {
        navigate("/home/opening-stock/add", { state: { formData } });
    }
    const handleAddOther = () => {

        setTimeout(() => {
            navigate("/home/products/create");
        }, 1000);
    };

    const handleSave = () => {
        if (formDataFromPreviousPage._id) {
            addProductById()
            console.log("Handle update ", formData);

        } else {
            addProduct()
            console.log("Handle save ", formData);
        }

    };
    const fetchProductById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/products/${formDataFromPreviousPage._id}`,{
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)

            setFormData(response.data);

        } catch (error) {
            console.error('Error fetching Product:', error);
        }
    };
    const addProduct = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const formDataForSubmission = new FormData();
            formDataForSubmission.append('productName', formDataFromPreviousPage.productName);
            formDataForSubmission.append('sku', formDataFromPreviousPage.sku);
            formDataForSubmission.append('barcodeType', formDataFromPreviousPage.barcodeType);
            formDataForSubmission.append('unit', formDataFromPreviousPage.unit);
            formDataForSubmission.append('businessLocation', formDataFromPreviousPage.businessLocation);
            formDataForSubmission.append('manageStock', formDataFromPreviousPage.manageStock);
            formDataForSubmission.append('productImage', formDataFromPreviousPage.productImage);
            formDataForSubmission.append('productDescription', formDataFromPreviousPage.productDescription);
            formDataForSubmission.append('productType', formDataFromPreviousPage.productType);
            if (formDataFromPreviousPage.variationType[0]?.variationTempleateID !== null) {
                formDataForSubmission.append('variationType', formDataFromPreviousPage.variationType);
            }
            formDataForSubmission.append('combo', formDataFromPreviousPage.combo);
            formDataForSubmission.append('netTotal', formDataFromPreviousPage.netTotal);
            formDataForSubmission.append('dfltSellingPrice', formDataFromPreviousPage.dfltSellingPrice);
            formDataForSubmission.append('margin', formDataFromPreviousPage.margin);


            formData.grpPrices.forEach((grpPrice, index) => {
                formDataForSubmission.append(`grpPrices[${index}][spg]`, grpPrice.spg);
                formDataForSubmission.append(`grpPrices[${index}][amount]`, grpPrice.amount);
                formDataForSubmission.append(`grpPrices[${index}][type]`, grpPrice.type);
            });
            const response = await axios.post(`http://localhost:8000/admin/products`, formDataForSubmission,{
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            if (response.status === 201) {
                navigate("/home/products");
            }
        } catch (error) {
            console.error('Error Adding Product:', error);
        }
    };
    const addProductById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/products/${formDataFromPreviousPage._id}`, formData,{
                headers: {
                    'Authorization': token
                }
            });
            //   console.log(response)

            if (response.status === 200) {
                navigate("/home/products")
                console.log("Success")
            }
        } catch (error) {
            console.error('Error Adding Product:', error);
        }
    };
    useEffect(() => {

        if (formDataFromPreviousPage._id) {
            fetchProductById()

        }
    }, []);
    return (
        <div className='flex flex-col w-full px-5 bg-white '>
            <div className='flex'>
                <h1 className='text-2xl font-semibold text-start '>Add or edit Group Prices</h1>
            </div>
            <div className='flex flex-col p-5 bg-gray-100'>
                <div className='flex'>
                    <h1 className=' font-semibold text-start '>Product:</h1>
                    <h1 className=' font-semibold text-start mx-1 '>{formDataFromPreviousPage.productName}</h1>
                    {/* <h1 className=' font-semibold text-start mx-1'>({formDataFromPreviousPage.sku})</h1> */}

                </div>
                <table className="table-auto mt-5  w-full  items-start">
                    <thead>
                        <tr className='Fixed bg-green-500 '>
                            <th>
                                <div className='flex px-2 py-1 border-[1px] border-white   Fixed'>
                                    <h1 className='text-start font-bold text-white'>Default Selling Price (Inc. Tax)</h1>
                                </div>
                            </th>
                            {spgsFromPreviousPage.map((val, index) => {
                                return <th key={index}>
                                    <div className='flex px-2 py-1 border-[1px] border-white  relative  Fixed'>

                                        <h1 className='text-start font-bold text-white'>{val.name}</h1>
                                        <FaInfoCircle onMouseOver={() => { toggleDropdown(true, index) }} onMouseLeave={() => { toggleDropdown(false, index) }} size={15} style={{ color: "skyblue" }} className='mx-1 mt-1 cursor-help' />
                                        {actionList[index] &&
                                            <div className='flex text-gray-500 flex-col w-[180px] rounded-md  border-[2px] border-gray-400 absolute top-8 p-2 20 bg-white shadow-md shadow-gray-300'>
                                                <p className='text-start'>
                                                    if <span className='font-bold'>Fixedd</span>
                                                    - the entered price will be used. if
                                                    <span className='font-bold'>Percentage</span> - price will be that much % of default selling price </p>

                                            </div>
                                        }
                                    </div>
                                </th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>
                                <h1>{formDataFromPreviousPage.dfltSellingPrice}</h1>
                            </td>
                            {formData.grpPrices.map((val, index) => {
                                {/* console.log(formData.grpPrices) */ }
                                return <td key={index}>
                                    <div className='flex flex-col'>
                                        <input type='number' name={"amount"} value={val.amount} onChange={(e) => { handleChange(e, index) }} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' />
                                        <select name={`type`} value={val.type} onChange={(e) => { handleChange(e, index) }} className='border-[1px] px-2 py-1 border-gray-400 focus:outline-none' >
                                            <option value={"Fixed"}>Fixed</option>
                                            <option value={"Percentage"}>Percentage</option>

                                        </select>
                                    </div>


                                </td>
                            })}


                        </tr>




                    </tbody>

                </table>

            </div>


            <div className='justify-end items-end flex py-5'>
                <button onClick={() => { handleOpeningStock() }} className='bg-blue-500  px-2 py-2 text-white items-center justify-center flex'>Save & Add Opening Stock</button>
                <button onClick={() => { handleAddOther() }} className='bg-red-500  px-2 py-2 text-white items-center justify-center flex'>Save & Add Another</button>
                <button onClick={() => { handleSave() }} className='bg-green-400 text-white'><h1 className='  text-start px-3 py-2'>Save</h1></button>
            </div>

        </div>
    )
}

export default AddorEditSellingPriceGrps