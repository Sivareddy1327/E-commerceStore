import React,{useState} from 'react'
import Data from './data.json'

const Ecommerce = (props) =>{

    const [data,setData] =  useState(Data)
    const [category,setCategory] = useState('')
    const [filterdata,setFilterData] = useState([])
    const [product,setProduct] = useState('')
    const [cartdata,setCartData] = useState([])
    const [formerrors,setFormerrors] = useState({})
    const errors = {}
    let result = []
    const optioncategory = data.map((ele)=>{
       
        if(!result.includes(ele.category))
        {
            
           return result.push(ele.category)
        }
        return result
    })
    const runvalidation = () =>{
        if(category.length == 0){
            errors.category = 'cannot be blank'
        }
    }

    
    
    const handleChangecategory = (e) =>{
        setCategory(e.target.value)
        const result = data.filter((ele)=>{
            if(ele.category === e.target.value)
            {
                return ele
            }
        })
        
        setFilterData(result)
        
    }
    const handleChangeProduct = (e) =>{
        setProduct(e.target.value)
    }

    const handleChangeaddcart = () =>{

        const result = data.filter((ele)=>{
            let formdata
            if(ele.name == product)
            {
                if(ele.available > 0)
                {
                 formdata = {
                     id : Number(new Date()),
                    name : ele.name,
                    quantity : 1,
                    price : ele.price,
                }
                setCartData([...cartdata,formdata])
            }
            else 
            {
                errors.stock='stock not available'
            }
            }
            return formdata
        })
        setProduct('')
    }
    const handleChangeIncrement = (id,name) =>{
        const result = cartdata.map((ele)=>{
            
            if(ele.id==id)
            {
                if(ele.available > 0)
                {
                return {...ele,quantity : ele.quantity+1}
                }
                else 
                {
                   return {...ele}
                }
            }
            else 
            {
                return {...ele}
            }
        })
        setCartData(result)
        const result1 = data.map((ele)=>{
            if(ele.name === name)
            {
                if(ele.available > 0 )
                {
                return {...ele,available : ele.available-1}
                }
                else {
                    errors.stock = 'stock not available'
                    return {...ele}
                }
            }
            else {
                return {...ele}
            }
        })
        setData(result1)
    }
    console.log(data)
    const handleChangeDecrement = (id,quantity) =>{
        
        if(quantity >=2 )
        {
        const result = cartdata.map((ele)=>{
            if(ele.id==id)
            {
                
                return {...ele,quantity : ele.quantity-1}
            }
            else 
            {
                return {...ele}
            }
        })
        setCartData(result)
    }
    }
    const handleSubmit = () =>{
        runvalidation()
        if(Object.keys(errors).length==0)
        {
            setFormerrors({})
            console.log(cartdata)
            setCategory('')
        }
        else {
            setFormerrors(errors)
        }
       
    }

    const handleChangeremove = (id,name) =>{
        const result = cartdata.filter((ele)=>{
            return ele.id != id
        })
        setCartData(result)
        const result1 = data.map((ele)=>{
            if(ele.name === name)
            {
                
                return {...ele,available : ele.available+1}
                
            
            }
            else {
                return {...ele}
            }
        })
        setData(result1)

    }

    console.log(errors)


    return (
        <div style={{color : 'blue',display:'flex',marginLeft:'8%',justifyContent : 'space-around'}}>
        <div>
            <h1>E-commerce</h1>
            <select value={category} onChange={handleChangecategory}>
                <option value=''>Select</option>
                {result.map((ele,i)=>{
                    return <option key={i} value={ele}>{ele}</option>
                })}
            </select>
            <br/>
            {formerrors&&<span>{formerrors.category}</span>}
            <br/>
            <select value={product} onChange={handleChangeProduct}>
                <option value=''>Select</option>
                {filterdata.map((ele,i)=>{
                    return <option value={ele.name} key={i}>{ele.name}</option>
                })}
            </select>
            <br/>
            <button onClick={handleChangeaddcart}>Add cart</button>
            <br/>
            {errors&&<span>{errors.stock}</span>}
            <button onClick={handleSubmit}>submit</button>
            </div>
            <div>
            {Object.keys(cartdata).length == 0 ? (
                <h1 style={{color : 'red'}}>Cart is Empty</h1>
            ) : (
                 <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartdata.map((ele,i)=>{
                        return (
                            <tr key={i}>
                                <td>{ele.name}</td>
                                <td><button onClick={()=>{handleChangeDecrement(ele.id,ele.quantity)}}>-</button>{ele.quantity}<button onClick={()=>{handleChangeIncrement(ele.id,ele.name)}}>+</button></td>
                                <td>{ele.price}</td>
                                <td>{ele.quantity*ele.price}</td>
                                <td><button onClick={()=>{handleChangeremove(ele.id,ele.name)}}>delete</button></td>
                            </tr>
                        )
                        
                    })}
                </tbody>
            </table>

            )}
            </div>
           
        </div>
    )
}
export default Ecommerce