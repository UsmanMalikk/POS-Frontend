import React, { useState, useEffect } from 'react'
import axios from 'axios';

const AddorEditExpenseCategory = (props) => {
    const [expenseCategoryData, setExpenseCategoryData] = useState([]); //update dropdown py use hogi

    const [formData, setFormData] = useState({
        categoryName: '',
        categoryCode: '',
        subCategory: false,
        parentCategory: ""
    })
    const [isserror, setIsserror] = useState(false);
    const handleClick = (e) => {
        if (
            formData.categoryName.length === 0
        ) {
            setIsserror(true);
            console.log(isserror);
        } else if (props.id) {
            addExpenseCategoryById()
            console.log("Handle Update", formData);
        } else {
            addExpenseCategory()
            console.log("Handle Save", formData);
        }
    };
    const fetchExpenseCategories = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/expense-categories`, {
                headers: {
                    'Authorization': token
                }
            });

            // console.log(response)
            setExpenseCategoryData(response.data);
        } catch (error) {
            console.error('Error fetching expense-categories:', error);
        }
    };
    const fetchExpenseCategoryById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/expense-categories/${props.id}`, {
                headers: {
                    'Authorization': token
                }
            });

            console.log(response)
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching expense-categories:', error);
        }
    };
    const addExpenseCategory = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.post(`http://localhost:8000/admin/expense-categories`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            if (response.status === 201) {
                window.location.reload();

                console.log("Success")
            }
        } catch (error) {
            console.error('Error Adding expense-categories:', error);
        }
    };

    const addExpenseCategoryById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/expense-categories/${props.id}`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)

        } catch (error) {
            console.error('Error Adding expense-categories:', error);
        }
    };
    useEffect(() => {
        // Make an API call to fetch SPG's records
        if (props.id) {
            fetchExpenseCategoryById()
            fetchExpenseCategories()

        }
        else {
            fetchExpenseCategories()

        }
    }, [])

    return (
        <div className='flex flex-col w-full bg-white p-3'>
            <h1 className="text-xl text-start font-bold ">{props.id ? "Edit" : "Add"} Expense Category</h1>

            <div className='flex flex-col'>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Category Name:*
                        <h2 className="text-red-400">
                            {isserror && formData.categoryName.length === 0
                                ? "Required field"
                                : ""}
                        </h2>
                    </h2>
                    <input type="text" placeholder='Name' value={formData.categoryName} onChange={(e) => { setFormData({ ...formData, categoryName: e.target.value }) }} className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex flex-col mt-5'>
                    <h2 className="text-start text-gray-500 flex ">
                        Category Code
                    </h2>
                    <input type="text" placeholder='Category Code' value={formData.categoryCode} onChange={(e) => { setFormData({ ...formData, categoryCode: e.target.value }) }} className="px-2 py-1 w-full border-[1px] border-gray-600 focus:outline-none" />
                </div>
                <div className='flex mt-5'>
                    <input type="checkbox" placeholder='Name' checked={formData.subCategory ? true : false} onChange={(e) => { setFormData({ ...formData, subCategory: e.target.checked }) }} className="mx-3 w-6 h-6 " />
                    <h2 className="text-start flex ">
                        <b>Add as Sub-Category</b>
                    </h2>
                </div>
                {formData.subCategory === true &&
                    <div className='flex flex-col'>
                        <h1 className='text-start font-bold'>Select Parent Category</h1>
                        <select value={formData.parentCategory} onChange={(e) => { setFormData({ ...formData, parentCategory: e.target.value }) }} className='border-[1px] border-gray-400 px-2 py-1 focus:outline-none mx-2' >
                            <option value={""}>None</option>
                            {expenseCategoryData.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.categoryName}
                                </option>
                            ))}

                        </select>

                    </div>
                }
            </div>
            <div className='flex items-end justify-end'>
                <button
                    onClick={handleClick}
                    className="bg-green-500 w-[100px] px-2 py-2 items-center justify-center flex"
                >
                    {props.id ? "Update" : "Save"}
                </button>
            </div>

        </div>
    )
}

export default AddorEditExpenseCategory