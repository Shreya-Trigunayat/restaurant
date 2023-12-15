import React,{useState} from 'react'
import {toast} from 'react-hot-toast'
import {BiCloudUpload} from 'react-icons/bi'
import { ImagetoBase64 } from '../utility/imagetoBase64';

const Newproduct = () => {
  const [data,setData]=useState({
    name:"",
    category:"",
    image:"",
    price:"",
    description:""
  })
  const handleOnChange=(e)=>{
    const {name,value}=e.target

    setData((preve)=>{
      return{
        ...preve,
        [name]:value
      }
    })
  }
  const uploadImage=async(e)=>{
    const data=await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image:data
      }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} =data
    if(name && image && category && price){
      const fetchData =await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const fetchRes=await fetchData.json()
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name:"",
          category:"",
          image:"",
          price:"",
          description:""
        }
      })

    }
    else{
      toast("enter required fields")
    }
  }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md p-4 shadow flex flex-col bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name="name" id='name' className='bg-slate-200 p-1 my-3' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-3' id='category' name="category" onChange={handleOnChange} value={data.category}>
          <option value={"other"}>Select Category</option>
          <option value={"european cuisines"}>European Cuisines</option>
          <option value={"indian cuisines"}>Indian Cuisines</option>
          <option value={"beverages"}>Beverages</option>
          <option value={"indian desserts"}>Indian Desserts</option>
        </select>
        
        <label htmlFor='image'>Image
        <div className='h-40 w-full bg-slate-200 my-3 rounded flex items-center justify-center'>
          {data.image ? <img src={data.image} className='h-full'/> :<span className='text-5xl '><BiCloudUpload/></span>}
          
          <input type={"file"} id="image" accept="image/*" className="hidden" onChange={uploadImage}/>
        </div>
        </label>

        <label htmlFor='price'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name="price" id="price" onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Description</label>
        <textarea value={data.description} rows={3} className='bg-slate-200 p-1 my-1 resize-none' id="description" name="description" onChange={handleOnChange}></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white my-2 text-lg font-medium drop-shadow'>Save</button>
      </form>
    </div>
  )
}

export default Newproduct;