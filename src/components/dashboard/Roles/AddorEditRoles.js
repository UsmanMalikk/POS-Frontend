import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom"


const AddorEditRoles = () => {
    const Navigate = useNavigate();

    const [otherPerm, setOtherPerm] = useState([
        { name: "service_Staff", lable: "Service Staff" },
        { name: "view_export_to_buttons", lable: " View export to buttons (csv/excel/print/pdf) on tables" }

    ])
    const [userPerm, setUserPerm] = useState([
        { name: "view_user", lable: " View user" },
        { name: "add_user", lable: "Add user" },
        { name: "edit_user", lable: "Edit user" },
        { name: "delete_user", lable: "Delete user" }
    ])
    const [rolePerm, setRolePerm] = useState([
        { name: "view_role", lable: " View role" },
        { name: "add_role", lable: "Add role" },
        { name: "edit_role", lable: "Edit role" },
        { name: "delete_role", lable: "Delete role" }
    ])
    const [supplierPerm, setSupplierPerm] = useState([
        { name: "view_all_supplier", lable: " View All Supplier" },
        { name: "view_all_supplier", lable: "View Own Supplier" },
        { name: "view_supplier", lable: " View supplier" },
        { name: "add_supplier", lable: "Add supplier" },
        { name: "edit_supplier", lable: "Edit supplier" },
        { name: "delete_supplier", lable: "Delete supplier" }
    ])
    const [customerPerm, setCustomerPerm] = useState([
        { name: "view_all_customer", lable: " View All Customer" },
        { name: "view_all_customer", lable: "View Own Customer" },
        { name: "view_sell_customer", lable: "View customers with no sell from one month only" },
        { name: "view_sell_customer", lable: "View customers with no sell from three months only" },
        { name: "view_sell_customer", lable: "View customers with no sell from six months only" },
        { name: "view_sell_customer", lable: "View customers with no sell from one year only" },
        { name: "view_sell_customer", lable: "View customers with no sell from one year only" },
        { name: "add_customer", lable: "Add Customer" },
        { name: "edit_customer", lable: "Edit Customer" },
        { name: "delete_customer", lable: "Delete Customer" }
    ])
    const [productPerm, setProductPerm] = useState([
        { name: "view_product", lable: " View Product" },
        { name: "add_product", lable: "Add Product" },
        { name: "edit_product", lable: "Edit Product" },
        { name: "delete_product", lable: "Delete Product" },
        { name: "add_operning_stock", lable: "Add Opening Stock" },
        { name: "view_purchase_price", lable: "View Purchase Price" }
    ])
    const [purStkAdjusPerm, setPurStkAdjusPerm] = useState([
        { name: "view_all_psd", lable: " View All Purchase & Stock Adjustment" },
        { name: "view_all_psd", lable: "View Own Purchase & Stock Adjustment" },
        { name: "add_psd", lable: "Add purchase & Stock Adjustment" },
        { name: "edit_psd", lable: "Edit purchase & Stock Adjustment" },
        { name: "delete_psd", lable: "Delete purchase & Stock Adjustment" },
        { name: "add_purch_pmnt", lable: "Add purchase payment" },
        { name: "edit_purch_pmnt", lable: "Edit purchase payment" },
        { name: "delete_purch_pmnt", lable: "Delete purchase payment" },
        { name: "update_status", lable: "Update Status" }

    ])
    const [purOrderPerm, setPurOrderPerm] = useState([
        { name: "view_all_purcOrder", lable: " View All Purchase Order" },
        { name: "view_all_purcOrder", lable: "View Own Purchase Order" },
        { name: "add_purcOrder", lable: "Add Purchase Order" },
        { name: "edit_purcOrder", lable: "Edit Purchase Order" },
        { name: "delete_purcOrder", lable: "Delete Purchase Order" }
    ])
    const [posPerm, setPosPerm] = useState([
        { name: "view_pos", lable: " View Product" },
        { name: "add_pos", lable: "Add Product" },
        { name: "edit_pos", lable: "Edit Product" },
        { name: "delete_pos", lable: "Delete Product" },
        { name: "edit_prdct_price_fromPosScreen", lable: "Edit Product Price From POS Screen" },
        { name: "edit_prdct_discount_fromPosScreen", lable: "Edit Product Discount From POS Screen" },
        { name: "addEdit_pmnt", lable: "Add/Edit Payment" },
        { name: "prnt_Invoice", lable: "Print Invoice" },
    ])
    const [sellPerm, setSellPerm] = useState([
        { name: "view_all_sell", lable: " View All Sell" },
        { name: "view_all_sell", lable: "View Own Sell only" },
        { name: "view_paid_sell_only", lable: "View Paid Sell Only" },
        { name: "view_due_sell_only", lable: "View Due Sell Only" },
        { name: "view_partially_paid_sell_only", lable: "View Partially Paid Sell Only" },
        { name: "view_overdue_sell_only", lable: "View Overdue Sell Only" },
        { name: "add_sell", lable: "Add Sell" },
        { name: "update_sell", lable: "Update Sell" },
        { name: "delete_sell", lable: "Delete Sell" },
        { name: "add_sell_payment", lable: "AdD Sell Payment" },
        { name: "edit_sell_payment", lable: "Edit Sell Payment" },
        { name: "delete_sell_payment", lable: "Delete Sell Payment" },
        { name: "edit_prdct_price_fromSaleScreen", lable: "Edit Product Price From Sale Screen" },
        { name: "edit_prdct_discount_fromSaleScreen", lable: "Edit Product Discount From Sale Screen" },
        { name: "ad_edt_dlt_discount", lable: "ADD/Edit/Delete Discount" },
        { name: "access_typesOfService", lable: "Access Types Of Service" },
        { name: "access_all_sell_return", lable: "Access All Sell Return" },
        { name: "access_own_sell_return", lable: "Access Own Sell Return" },
        { name: "ad_edt_Invoice_number", lable: "Add/Edit Invoice Number" }
    ])
    const [draftPerm, setDraftPerm] = useState([
        { name: "view_draft", lable: " View All Draft" },
        { name: "view_draft", lable: "View Own Draft" },
        { name: "edit_draft", lable: "Edit Draft" },
        { name: "delete_draft", lable: "Delete Draft" }
    ])
    const [quotationPerm, setQuotationPerm] = useState([
        { name: "view_quotation", lable: " View All Quotation" },
        { name: "view_quotation", lable: "View Own Quotation" },
        { name: "edit_quotation", lable: "Edit Quotation" },
        { name: "delete_quotation", lable: "Delete Quotation" }
    ])
    const [shipmentPerm, setShipmentPerm] = useState([
        { name: "view_shipmet", lable: " View All Shipment" },
        { name: "view_shipmet", lable: "View Own Shipment" },
        { name: "edit_shipmet", lable: "Edit Shipment" },
        { name: "delete_shipmet", lable: "Delete Shipment" }
    ])
    // const [cashPerm, setCashPerm] = useState([

    //     { name: "view_cash_register", lable: "View Cash Register" },
    //     { name: "close_cash_register", lable: "Close Cash Register" }
    // ])
    const [brandPerm, setBrandPerm] = useState([
        { name: "view_brand", lable: "View Brand" },
        { name: "add_brand", lable: "Add Brand" },
        { name: "edit_brand", lable: "Edit Brand" },
        { name: "delete_brand", lable: "Delete Brand" }
    ])
    // const [taxratePerm, setTaxratePerm] = useState([
    //     { name: "view_tax_rate", lable: "View Tax Rate" },
    //     { name: "add_tax_rate", lable: "Add Tax Rate" },
    //     { name: "edit_tax_rate", lable: "Edit Tax Rate" },
    //     { name: "delete_tax_rate", lable: "Delete Tax Rate" }
    // ])
    const [unitPerm, setUnitPerm] = useState([
        { name: "view_unit", lable: "View Unit" },
        { name: "add_unit", lable: "Add Unit" },
        { name: "edit_unit", lable: "Edit Unit" },
        { name: "delete_unit", lable: "Delete Unit" }
    ])
    const [categoryPerm, setCategoryPerm] = useState([
        { name: "view_category", lable: "View Category" },
        { name: "add_category", lable: "Add Category" },
        { name: "edit_category", lable: "Edit Category" },
        { name: "delete_category", lable: "Delete Category" }
    ])
    const [reportPerm, setReportPerm] = useState([
        { name: "view_pr_sell_report", lable: "View Purchase  & Sell Report" },
        { name: "view_tax_report", lable: "View Tax Report" },
        { name: "view_suplr_custmr_report", lable: "View Supplier & Customer Report" },
        { name: "view_expense_report", lable: "View Expense Reoprt" },
        { name: "view_prft_los_report", lable: "View Profit/loss Report" },
        { name: "view_stk_adjsmnt_expiry_report", lable: "View stock report, stock adjustment report & stock expiry report" },
        { name: "view_trndng_prdct_report", lable: "View Trending Product Report" },
        { name: "view_register_report", lable: "View Register Report" },
        { name: "view_sls_rprsntative_report", lable: "View Sales Representative Report" },
        { name: "view_prdct_stk_value", lable: "View Product Stock Value" }
    ])
    const [settingPerm, setSettingPerm] = useState([
        { name: "axs_bzns-stng", lable: "Access Business Setting" },
        { name: "axs_invic_stng", lable: "Access Invoice Setting" },
    ])
    const [expensePerm, setExpensePerm] = useState([
        { name: "axs_expense", lable: "Access all Expense" },
        { name: "axs_expense", lable: "Access only own Expense" },
        { name: "add_expense", lable: "Add Expense" },
        { name: "edit_expense", lable: "Edit Expense" },
        { name: "delete_expense", lable: "Delete Expense" }

    ])
    const [homePerm, setHomePerm] = useState([
        { name: "view_home_data", lable: "View Home Data", isChecked: true }
    ])
    const [accountPerm, setAccountPerm] = useState([
        { name: "axs_accounts", lable: "Access Accounts" },
        { name: "edit_account_trx", lable: "Edit Account Transaction" },
        { name: "delete_account_trx", lable: "Delete Account Transaction" }

    ])




    const parms = useParams()
    const id = parms.id


    const [formData, setFormData] = useState({
        roleName: "",
        // accessAccounts: false,
        // accessAllSellReturn: false,
        // accessAllShipments: false,
        // accessAlleEpenses: false,
        // accessBusinessSettings: false,
        // accessInvoiceSettings: false,
        // accessOwnSellReturn: false,
        // accessOwnShipments: false,
        // accessProduction: false,
        // accessTypesOfService: false,
        // addBrand: false,
        // addCategory: false,
        // addCustomer: false,
        // addEditDeleteDiscount: false,
        // addEditInvoiceNumber: false,
        // addExpense: false,
        // addOpeningStock: false,
        // addPossell: false,
        // addProduct: false,
        // addPurchasePayment: false,
        // addPurchaseStockAdjustment: false,
        // addRecipe: false,
        // addRole: false,
        // addSell: false,
        // addSellPayment: false,
        // addSupplier: false,
        // addTaxRate: false,
        // addUnit: false,
        // addUser: false,
        // addeditPayment: false,
        // closeCashRegister: false,
        // createPurchaseOrder: false,
        // defaultSellingPrice: false,
        // deleteAccountTransaction: false,
        // deleteBrand: false,
        // deleteCategory: false,
        // deleteCustomer: false,
        // deleteDraft: false,
        // deleteExpense: false,
        // deletePossell: false,
        // deleteProduct: false,
        // deletePurchaseOrder: false,
        // deletePurchasePayment: false,
        // deletePurchaseStockAdjustment: false,
        // deleteQuotation: false,
        // deleteRole: false,
        // deleteSell: false,
        // deleteSellPayment: false,
        // deleteSupplier: false,
        // deleteTaxRate: false,
        // deleteUnit: false,
        // deleteUser: false,
        // editAccountTransaction: false,
        // editBrand: false,
        // editCategory: false,
        // editCustomer: false,
        // editDraft: false,
        // editExpense: false,
        // editPossell: false,
        // editProduct: false,
        // editProductDiscountFromSalesScreen: false,
        // editProductPriceFromSalesScreen: false,
        // editProductdiscountfromposscreen: false,
        // editProductpricefromposscreen: false,
        // editPurchaseOrder: false,
        // editPurchasePayment: false,
        // editPurchaseStockAdjustment: false,
        // editQuotation: false,
        // editRecipe: false,
        // editRole: false,
        // editSellPayment: false,
        // editSupplier: false,
        // editTaxRate: false,
        // editUnit: false,
        // editUser: false,
        // localSale: false,
        // minimumPrice: false,
        // printinvoice: false,
        // retail: false,

        // saleMan: false,
        // salePoint: false,
        // updateSell: false,
        // updateStatus: false,
        // viewAllCustomer: false,
        // viewAllDrafts: false,
        // viewAllPurchaseStockAdjustment: false,
        // viewAllQuotations: false,
        // viewAllSell: false,
        // viewAllSupplier: false,
        // viewBrand: false,
        // viewCategory: false,
        // viewHomeData: false,
        // viewOverDueSellsOnly: false,
        // viewOwnCutomer: false,
        // viewOwnDrafts: false,
        // viewOwnExpenseOnly: false,
        // viewOwnPurchaseStockAdjustment: false,
        // viewOwnQuotations: false,
        // viewOwnSellOnly: false,
        // viewOwnSupplier: false,
        // viewPaidSellOnly: false,
        // viewPossell: false,
        // viewProduct: false,
        // viewPurchasePrice: false,
        // viewRole: false,
        // viewUnit: false,
        // viewUser: false,
        // viewdueSellOnly: false
    })
    const [iserror, setIserror] = useState(false)

    const fetchRoleById = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/admin/roles/${id}`, {
                headers: {
                    'Authorization': token
                }
            });

            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };
    const addRole = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(finalFormData)
            const response = await axios.post(`http://localhost:8000/admin/roles`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            console.log(response)
            if (response.status === 201) {
                Navigate("/home/roles");
            }
        } catch (error) {
            console.error('Error Adding roles:', error);
        }
    };
    const addRoleById = async () => {

        try {
            const token = localStorage.getItem('token');
            // console.log(formData)
            const response = await axios.put(`http://localhost:8000/admin/roles/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            });
            //   console.log(response.data)
            if (response.status === 200) {
                Navigate("/home/roles");
            }
        } catch (error) {
            console.error('Error Adding roles:', error);
        }
    };
    const handleClick = (e) => {
        e.preventDefault()
        if (formData.roleName.length === 0) {
            setIserror(true)
            toast.error('Some fields are required', {
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
        else if (id) {
            addRoleById()
            console.log("Handle Update", formData)
        } else {
            addRole()
            console.log("Handle Create", formData)
        }

    }
    const handleChange = (e, array, setArray) => {
        const { name, checked } = e.target
        let tempData = array.map(val => val.name === name ? { ...val, isChecked: checked } : val)
        setArray(tempData)
        setFormData({ ...formData, [name.replace(/_./g, (m) => m[1].toUpperCase())]: checked || false })

    }

    const handleAllSelect = (e, array, setArray, id) => {
        const { name, checked } = e.target
        if (name === id) {
            let tempData = array.map((val) => {
                return { ...val, isChecked: checked }

            });
            let newObj = { ...formData }
            tempData.forEach(element => {
                newObj[element.name.replace(/_./g, (m) => m[1].toUpperCase())] = element.type === "radio" ? element.lable : true

            })
            setFormData(newObj)
            console.log(formData)
            setArray(tempData)

        }

    }
    // const toCamelCase = (str) =>{
    //     str = str.replace(/-./g, (m) => m[1].toUpperCase())
    //     console.log(str)
    //     return str

    // }


    useEffect(() => {
        // Make an API call to fetch SPG's records
        if (id) {
            fetchRoleById()

        }

    }, [])

    return (
        <div className='w-full min-h-screen bg-gray-200 p-2'>
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
            <h1 className='text-2xl items-start flex mx-6 justify-start  font-semibold'>{id ? "Edit Role" : "Add Role"}</h1>
            <div className='flex flex-col rounded-md border-t-[3px] p-5 border-blue-600 bg-white w-[96%] mx-[2%] min-h-screen'>
                <div className='flex flex-col items-start w-full'>

                    <h1 className='text-lg flex'>Role Name: *  <span className='text-red-500 mx-2 mt-1 text-sm'>{iserror && formData.roleName.length === 0 ? "Required Field" : ""} </span></h1>
                    <input type='text' value={formData.roleName} onChange={(e) => { setFormData({ ...formData, roleName: e.target.value }) }} placeholder='First Name' className='focus:outline-none w-full md:w-1/3 border-[1px] border-gray-300 px-2  rounded-sm p-1' />

                </div>
                <h1 className='flex text-lg font-semibold'>Permissions:</h1>
                {/* Others */}
                <h1 className='flex  text-xl mt-3'>Others:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={otherPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, otherPerm, setOtherPerm, "othersAll") }}
                                name='othersAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1'>

                        {otherPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}


                                    onChange={(e) => { handleChange(e, otherPerm, setOtherPerm); }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>

                            </div>

                        })}


                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* User */}
                <h1 className='flex text-xl mt-3'>User:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox' checked={userPerm.filter((data) => data?.isChecked !== true).length < 1} onChange={(e) => { handleAllSelect(e, userPerm, setUserPerm, "userAll") }} name='userAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {userPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, userPerm, setUserPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>

                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Roles */}
                <h1 className='flex text-xl mt-3'>Roles:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>

                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={rolePerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, rolePerm, setRolePerm, "roleAll") }}
                                name='roleAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {rolePerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, rolePerm, setRolePerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>

                            </div>

                        })}
                    </div>


                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Supplier */}
                <h1 className='flex text-xl mt-3'>Supplier:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={supplierPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, supplierPerm, setSupplierPerm, "supllierAll") }}
                                name='supllierAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {supplierPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, supplierPerm, setSupplierPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>
                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Customer */}
                <h1 className='flex text-xl mt-3'>Customer:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={customerPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, customerPerm, setCustomerPerm, "customerAll") }}
                                name='customerAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {customerPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, customerPerm, setCustomerPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Product */}
                <h1 className='flex text-xl mt-3'>Product:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={productPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, productPerm, setProductPerm, "productAll") }}
                                name='productAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {productPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, productPerm, setProductPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Purchase & Stock Adjustment */}
                <h1 className='flex text-xl mt-3'>Purchase & Stock Adjustment:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={purStkAdjusPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, purStkAdjusPerm, setPurStkAdjusPerm, "prcstkadjAll") }}
                                name='prcstkadjAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {purStkAdjusPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, purStkAdjusPerm, setPurStkAdjusPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Purchase Order */}
                <h1 className='flex text-xl mt-3'>Purchase Order:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={purOrderPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, purOrderPerm, setPurOrderPerm, "prcordrAll") }}
                                name='prcordrAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {purOrderPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, purOrderPerm, setPurOrderPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* POS */}
                <h1 className='flex text-xl mt-3'>POS:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={posPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, posPerm, setPosPerm, "posAll") }}
                                name='posAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>


                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {posPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, posPerm, setPosPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>



                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Sell */}
                <h1 className='flex text-xl mt-3'>Sell:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={sellPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, sellPerm, setSellPerm, "sellAll") }}
                                name='sellAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {sellPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, sellPerm, setSellPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Draft */}
                <h1 className='flex text-xl mt-3'>Draft:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={sellPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, draftPerm, setDraftPerm, "draftAll") }}
                                name='draftAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {draftPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, draftPerm, setDraftPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Quotation */}
                <h1 className='flex text-xl mt-3'>Quotation:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={quotationPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, quotationPerm, setQuotationPerm, "quotationAll") }}
                                name='quotationAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {quotationPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, quotationPerm, setQuotationPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Shipments */}
                <h1 className='flex text-xl mt-3'>Shipments:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={shipmentPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, shipmentPerm, setShipmentPerm, "shipmentAll") }}
                                name='shipmentAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {shipmentPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, shipmentPerm, setShipmentPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>

                {/* Brand */}
                <h1 className='flex text-xl mt-3'>Brand:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={brandPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, brandPerm, setBrandPerm, "brandAll") }}
                                name='brandAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {brandPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, brandPerm, setBrandPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>
                    {/* Tax Rate */}
                </div>

                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Unit */}
                <h1 className='flex text-xl mt-3'>Unit:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={unitPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, unitPerm, setUnitPerm, "taxrateAll") }}
                                name='taxrateAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {unitPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, unitPerm, setUnitPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Category */}
                <h1 className='flex text-xl mt-3'>Category:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={categoryPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, categoryPerm, setCategoryPerm, "categoryAll") }}
                                name='categoryAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {categoryPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, categoryPerm, setCategoryPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Report */}
                <h1 className='flex text-xl mt-3'>Report:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={reportPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, reportPerm, setReportPerm, "reportAll") }}
                                name='reportAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {reportPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, reportPerm, setReportPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Settings */}
                <h1 className='flex text-xl mt-3'>Settings:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={settingPerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, settingPerm, setSettingPerm, "settingAll") }}
                                name='settingAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {settingPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, settingPerm, setSettingPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Expense */}
                <h1 className='flex text-xl mt-3'>Expense:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>
                        <div className='flex  items-center justify-start'>
                            <input type='checkbox'
                                checked={expensePerm.filter((data) => data?.isChecked !== true).length < 1}
                                onChange={(e) => { handleAllSelect(e, expensePerm, setExpensePerm, "expenseAll") }}
                                name='expenseAll' className='w-5 h-5 mt-2 mx-2' />
                            <h1 className='flex text-sm mt-3'>Select All</h1>

                        </div>
                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {expensePerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, expensePerm, setExpensePerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Home */}
                <h1 className='flex text-xl mt-3'>Home:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>

                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {homePerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, homePerm, setHomePerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>
                {/* Account */}
                <h1 className='flex text-xl mt-3'>Account:</h1>
                <div className='flex flex-col md:flex-row w-full mt-3'>
                    <div className='w-full md:w-1/4'>

                    </div>
                    <div className='w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2'>
                        {accountPerm.map((data, index) => {
                            return <div key={index} className='flex  items-center justify-start'>
                                <input type='checkbox'
                                    checked={data?.isChecked || false}
                                    onChange={(e) => { handleChange(e, accountPerm, setAccountPerm) }}
                                    name={data.name}
                                    className='w-5 h-5 mt-2 mx-2'
                                />
                                <h1 className='flex text-sm mt-3'>{data.lable}</h1>
                            </div>

                        })}
                    </div>

                </div>
                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>

                <div className=' w-[94%] mx-[3%] mt-5 h-[2px] bg-black'></div>

                ``<button onClick={handleClick} className='flex items-center  text-white w-20 bg-green-400 rounded-sm px-3 py-1 justify-start m-5'>{id ? "Update" : "Save"}</button>

            </div>

        </div>
    )
}

export default AddorEditRoles