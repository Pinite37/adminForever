import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backend_url, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    console.log(backend_url);
    try {
      const { data } = await axios.get(`${backend_url}/api/product/list`)
      if (data.success) {
        setList(data.products)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const { data } = await axios.post(`${backend_url}/api/product/remove`, { id }, {  headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await fetchList()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }  

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <p className='mb-2'>All Products</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/*  Product list  */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price} {currency}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right px-10 md:text-center cursor-pointer text-lg'><img className='w-10' src={assets.cancel_icon} alt="" /></p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List