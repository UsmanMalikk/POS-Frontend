import React, { useState, useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { Button } from 'react-bootstrap';
import { FcCheckmark } from 'react-icons/fc';

const RolesTable = () => {
    const [permission, setPermission] = useState(false)
    const [isAlert, setIsAlert] = useState(false)
    const [isdelete, setIsdelete] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const [rolesData, setRolesData] = useState([]);
    const fetchRoles = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/roles`, {
                headers: {
                    'Authorization': token
                }
            });
            // console.log(response)
            setRolesData(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const [crpage, setCrpage] = useState(1)
    const rcrdprpg = 5
    const lasIndex = crpage * rcrdprpg
    const frstIndex = lasIndex - rcrdprpg
    const record = rolesData.slice(frstIndex, lasIndex)
    const npage = Math.ceil(rolesData.length / rcrdprpg)
    const numbers = [...Array(npage + 1).keys()].slice(1)




    const prevPage = () => {
        if (crpage !== 1) {
            setCrpage(crpage - 1)
        }
    }
    const nextPage = () => {
        if (crpage !== numbers.length) {
            setCrpage(crpage + 1)
        }
    }
    const Alert = () => {
        return (
            <div className="flex flex-col items-center px-4 justify-center w-[300px] py-5 h-[200px] bg-white rounded-md">
                <FcCheckmark size={100} className="items-center justify-center" />
                <h1 className="text-4xl text-gray-500 text-center ">Are you sure!</h1>
                <div className="flex items-center w-full justify-between mt-5">
                    <button onClick={() => { setPermission(false); setIsAlert(false); setIsdelete(false) }} className="text-md rounded-md mx-2 px-2 py-1 bg-red-500 text-white">Cancel</button>
                    <button onClick={() => { setPermission(true); setIsAlert(false); setIsdelete(false) }} className="text-md rounded-md mx-2 px-2 py-1 bg-green-500 text-white">OK</button>

                </div>
            </div>
        )
    }
    const handleDeleteRole = async (userId) => {

        try {
                const token = localStorage.getItem('token');
                // Make an API call to delete attendance for a specific record
                const response = await axios.delete(`http://localhost:8000/admin/roles/${userId}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                console.log('Role deleted:', response.data); // Handle success response
                fetchRoles()

        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };
    useEffect(() => {
        // Make an API call to fetch user's roles records
        fetchRoles();
        const runDelete = () => {
            if (permission === true) {

                handleDeleteRole(deleteId)
            }
        }
        runDelete()
    }, [permission]);

    return (
        <div>
            <div className='flex  flex-col md:flex-row  items-center justify-center md:justify-between mx-5'>
                <div className='flex items-center justify-center my-2 md:my-0'>
                    <h1 className='text-sm mx-1'>Show</h1>
                    <select className='w-[100px] border-[1px] border-black focus:outline-none text-center' >
                        <option value={"25"}> 25</option>
                        <option value={"50"}> 50</option>
                        <option value={"100"}> 100</option>
                        <option value={"200"}> 200</option>
                        <option value={"500"}> 500</option>
                        <option value={"1,000"}> 1,000</option>
                        <option value={"All"}> All</option>

                    </select>
                    <h1 className='text-sm mx-1'>enteries</h1>

                </div>

                <div className='flex items-center justify-center  w-[300px] md:w-auto my-2 md:my-0 border-[1px] border-black'>
                    <FaSearch size={15} className=' mt-1 mx-1' />
                    <input className=' focus:outline-none px-2' type='search' id="search" name='serch' placeholder='Search' />
                </div>


            </div>
            <div className='flex flex-col justify-center items-center mt-5 mx-5'  >
                <table id='usertbl' className="table-auto w-full mb-10  whitespace-no-wrap border-[1px] border-gray-400">
                    <thead>
                        <tr>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">Roles</th>
                            <th className=" py-2 title-font  tracking-wider font-medium text-gray-900 text-sm bg-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {record.map((value, index) => {
                            return <tr key={index} className=''>

                                <td className=" py-1 px-1">{value.roleName}</td>
                                <td className='py-1 flex '>

                                    <Button as={Link} to={`/home/roles/editroles/${value._id}`} className='flex mx-1 p-1 items-center bg-blue-600 text-white justify-center'>
                                        <FaEdit size={15} />
                                        <h1 className='text-sm'>Edit</h1>
                                    </Button>

                                    <Button onClick={() => {
                                        setIsAlert(true);
                                        setIsdelete(true)
                                        setDeleteId(value._id)
                                    }} className='flex mx-1 p-1 items-center bg-red-500 text-white justify-center'>
                                        <AiOutlineDelete size={15} />
                                        <h1 className='text-sm'>Delete</h1>
                                    </Button>
                                </td>
                            </tr>
                        })}


                    </tbody>
                </table>
                <nav className='  my-2 w-full'>
                    <ul className='flex justify-end'>
                        <li>
                            <button disabled={crpage === 1 ? true : false} className='p-3 mx-1 bg-green-400 text-white' onClick={prevPage}> Previous</button>
                        </li>
                        {
                            numbers.map((n, i) => {
                                return <li key={i} className={`${crpage === n ? 'bg-blue-500' : ''} py-3 px-4 mx-1 border-[1px] border-gray-400`}>
                                    <button onClick={() => { setCrpage(n) }}>{n}</button>
                                </li>
                            })
                        }
                        <li>
                            <button className='p-3 bg-green-400 text-white mx-1 ' onClick={nextPage}> Next</button>
                        </li>
                    </ul>
                </nav>
                {isAlert &&
                    <div className="absolute top-0 flex flex-col items-center  justify-center right-0 bg-black/70 w-full min-h-screen">
                        {isdelete && <Alert />}
                    </div>
                }
            </div>
        </div>
    )
}

export default RolesTable