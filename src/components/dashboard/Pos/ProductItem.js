import React from 'react'

const ProductItem = (props) => {
    const item = props.data
    let baseURL = 'http://localhost:8000/'

  return (
    <div className='w-full h-full flex flex-col items-center cursor-pointer justify-center bg-white rounded-md'>
        <img src={baseURL+item.productImage} alt={item.productName} className='w-[100px] h-[50px]' />
        <div className=' flex w-full px-1 justify-between'>
             <h1 className='font-bold text-xs p-1'>{item.productName}</h1>
            <h1 className='font-bold text-xs p-1'>{item.sku}</h1>
        </div>
    </div>
  )
}

export default ProductItem