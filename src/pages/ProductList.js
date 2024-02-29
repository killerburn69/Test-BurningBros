import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProductList, searchProduct } from '../store/actions/product.action'
import { CiStar } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from '../hooks/useDebounce';
import ItemList from '../components/ItemList';
const ProductList = () => {
    const [searchString,setSearchString]=useState("")

    const [dataProduct,setDataProduct] = useState([])
    const [dataProductSearch,setDataProductSearch] = useState([])

    const [skip,setSkip] = useState(0)
    const [skipSearch,setSkipSearch] = useState(0)

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [total,setTotal] = useState(0)

    const searchQuery = useDebounce(searchString, 2000)
    const dispatch = useDispatch()
    const getProductLists = async()=>{
        setIsLoading(true);
        setError(null);
        const payload = new URLSearchParams({
            "limit":"20",
            "skip":skip.toString()
        })
        const res = await dispatch(getProductList(payload))
        if(res.payload && res.meta.requestStatus === "fulfilled"){
            console.log(res)
            setDataProduct([...dataProduct,...res.payload.products])
            setSkip(skip+20);
            setTotal(res.payload.total)
            setIsLoading(false);
        }
    }
    const getSearchProduct = async(searchString)=>{
        setIsLoading(true);
        setError(null);
        const payload = new URLSearchParams({
            "q":searchString.toString(),
            "limit":"20",
            "skip":skipSearch.toString()
        })
        const res = await dispatch(searchProduct(payload))
        if(res.payload && res.meta.requestStatus === "fulfilled"){
            console.log(res)
            setDataProductSearch([...dataProductSearch,...res.payload.products])
            setSkipSearch(skipSearch+20);
            setTotal(res.payload.total)
            setIsLoading(false);
        }
    }
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
          return;
        }
        if(searchQuery === ""){
            getProductLists();
        }
        else{
            getSearchProduct(searchQuery)
        }
      };
      
      useEffect(() => {
        if(dataProduct.length <= total){
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
      }, [isLoading]);

      useEffect(()=>{
        if(searchQuery === ""){
            getProductLists()
        }else{
            getSearchProduct(searchQuery)
        }
      },[searchQuery])
      const onChangeInput = (e)=>{
        setTimeout(()=>{

            setSkip(0)
            setDataProduct([])
            setSkipSearch(0)
            setDataProductSearch([])
        },2000)
        setSearchString(e.target.value)
      }
  return (
    <div>
        <h1 className='text-center text-[24px] font-semibold mb-10'>Product List</h1>
        <form className='flex justify-center w-[600px] mx-auto mb-4' >
            <div className='flex items-center justify-between w-full px-[10px] py-[8px] border rounded-lg gap-x-5'>
                <div className='flex items-center flex-1 gap-x-2'>
                    <CiSearch className='text-2xl'/>
                    <input type='text' value={searchString} className='outline-none border-none flex-1 ' onChange={onChangeInput}/>
                </div>
                {/* <button type='submit' className='py-2 px-4 bg-blue-600 text-white rounded-xl'>Search</button>  */}
            </div>
        </form>
        <div className='grid grid-cols-4 gap-5 px-9'>
            {searchQuery === "" ? <ItemList data={dataProduct}/> : <ItemList data={dataProductSearch}/>}
        </div>
        {isLoading && <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>}
        {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default ProductList