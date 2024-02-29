import React from 'react'
import { CiStar } from 'react-icons/ci'

const ItemList = ({data}) => {
  return (
    <>
    {data.length === 0 ? <p className='text-center'>No items</p>:
    
    <>
    {data.map((item,index)=>(
                <div key={item.id} className='border rounded-md overflow-hidden shadow-md'>
                    <img src={item.thumbnail} className='w-full h-[200px] object-contain bg-slate-300 overflow-hidden p-5 ' />
                    <div className='px-[10px] py-[8px]'>
                        <div className='flex flex-col gap-y-1 mb-5'>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-x-2 items-center'>
                                    <h1 className='text-[20px]'>${Math.floor(item.price - ((item.price*item.discountPercentage)/100))}</h1>
                                    <span className='line-through text-slate-300'>${item.price}</span>
                                </div>
                                <span className='text-[14px]'>{item.discountPercentage}%</span>
                            </div>
                            <h2 className='text-[16px]'>{item.title}</h2>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <CiStar className='text-xl text-[#FFD700]'/>
                                <p>{item.rating}</p>
                            </div>
                            <p className='text-[14px]'>{item.stock} in stocks</p>
                        </div>
                    </div>
                </div>
            ))}
    </>
    }
    </>
  )
}

export default ItemList