import React from 'react'

const UserInfo = (props) => {
  const userData= props.userData
  let date = new Date(userData.dateOfBirth).toLocaleDateString()

  return (
    <div div className='flex flex-col w-full'>
      <div className='grid mx-4 grid-cols-1 md:grid-cols-2 '>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Allowed Contacts: </h1>
          <p className='text-sm mx-3 '>All</p>

        </div>

      </div>
      <div className='flex mx-4  mt-5'>
        <h1 className='text-2xl  text-gray-600 text-start'>More Information: </h1>

      </div>
      <div className='grid mx-4 grid-cols-1 md:grid-cols-3 '>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Date of Birth: </h1>
          <p className='text-sm mx-3 mt-1'>{date}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Facebook Link: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.facebookLink}</p>

        </div>

        {/* <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Custom Field 1: </h1>
          <p className='text-sm mx-3 mt-1'></p>

        </div> */}
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Gender: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.gender}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Twitter Link: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.twitterLink}</p>

        </div>
        {/* <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Custom Field 2: </h1>
          <p className='text-sm mx-3 mt-1'></p>

        </div> */}
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Martial Status: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.maritalStatus}</p>

        </div>
        {/* <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Social Media 1: </h1>
          <p className='text-sm mx-3 mt-1'></p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Custom Field 3: </h1>
          <p className='text-sm mx-3 mt-1'></p>

        </div> */}
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Blood Group: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.bloodGroup}</p>

        </div>
        {/* <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Social Media 2: </h1>
          <p className='text-sm mx-3 mt-1'></p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Custom Field 4: </h1>
          <p className='text-sm mx-3 mt-1'></p>

        </div> */}

      </div>
      <div className='flex mx-4 flex-col mt-2'>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Alternate Contact Number: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.alternateContactNumber}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Family contact Number: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.familyContactNumber}</p>

        </div>

      </div>
      <div className='grid mx-4 grid-cols-1 md:grid-cols-3'>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>ID Proof Name: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.idProofName}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>ID Proof Number: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.idProofNumber}</p>

        </div>
        <div className='flex mt-2'>


        </div>
      </div>
      <div className='flexw-[96%] mx-[2%] mt-5 h-[1px] bg-black'></div>
      <div className='grid mx-4 grid-cols-1 md:grid-cols-3'>
        <div className='flex flex-col mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Permenent Address: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.permanentAddress}</p>

        </div>
        <div className='flex flex-col mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Current Address: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.currentAddress}</p>

        </div>

      </div>
      <div className='flex w-[96%] mx-[2%] mt-5 h-[1px] bg-black'></div>
      <div className='flex mx-4  mt-5'>
        <h1 className='text-sm font-bold text-gray-600 text-start'>Bank Details: </h1>
      </div>
      <div className='grid mx-4 grid-cols-1 md:grid-cols-3'>
        <div className='flex  mt-5'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Account Holder's Name: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.accountHolderName}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Bank Name: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.bankName}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Branch: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.branch}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Account Number: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.accountNumber}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Bank Identifier Code: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.bankIdentifierCode}</p>

        </div>
        <div className='flex mt-2'>
          <h1 className='text-sm font-bold text-gray-600 text-start'>Tax Payer ID: </h1>
          <p className='text-sm mx-3 mt-1'>{userData.taxPayerId}</p>

        </div>

      </div>
      



    </div>
  )
}

export default UserInfo