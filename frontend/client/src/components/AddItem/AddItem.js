import React,{useState,useEffect} from 'react'
import './AddItem.css'
import { useDispatch,useSelector } from 'react-redux';
import  {addNewProducts} from '../../actions/productAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddItem() {

  const dispatch= useDispatch();
  const [name,setName]=useState('');
  const [desc,setDesc]=useState('');
  const [cat,setCat]=useState('');
  const [Img,setImg]=useState('');
  const [var1,setVar1]=useState('');
  const [var2,setVar2]=useState('');
  const [var3,setVar3]=useState('');
  const[ var1p,setVar1p ]=useState(0);
  const[ var2p,setVar2p ]=useState(0);
  const[ var3p,setVar3p ]=useState(0);

  const { loading, success } = useSelector(state => state.addNewProductsReducer);
  const notify = (callId, msg, timex) => {{
      toast.success(msg, { position: toast.POSITION.TOP_CENTER, autoClose: timex })}
  }
  function reqItemADD(){
  
  if(!var1 || !name || !desc || !cat || !Img || !var1p ){
    toast.info("Fill Properly and First Variant Must Be Filled", {position: toast.POSITION.TOP_LEFT,autoClose: 3000})
    return;
  }

  // if( (!var2 || !var3 || !var2p || !var3p )){
  //   toast.info("Incomplete/Invalid Field is ignored", {position: toast.POSITION.TOP_CENTER,autoClose: 2000})
  // }



  let arrVarients=[var1];
  let arrPrices=new Map(); 
  arrPrices[var1]=parseInt(var1p);
  if(var2){arrVarients.push(var2);  arrPrices[var2]=parseInt(var2p);  }
  if(var3){arrVarients.push(var3); arrPrices[var3]=parseInt(var3p); }

  let xap=[arrPrices]
  // console.log(arrVarients+ "   x  "+JSON.stringify(xap));

  const newItem={

     name,
     category:cat,
     description: desc,
     image:Img,
     varients: arrVarients,
     prices: xap,
   }
   console.log(newItem)
   dispatch(addNewProducts(newItem))
  }


  return (
    <div className="add-item-container">       
      <ToastContainer limit={2} containerId="default"/>

      <div className='add-item-card'>
        <div className='add-item-header'>
          <h1>Add New Product</h1>
          <p>Create an amazing product listing that captures attention</p>
        </div>

        <div className='add-item-form'>
          <div className='form-group'>
            <label>Product Name</label>
            <input 
              type='text'
              placeholder="Enter product name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label>Description</label>
            <textarea
              placeholder="Describe your product"
              value={desc}
              onChange={(e)=>setDesc(e.target.value)}
              required
            />
          </div>

          <div className='form-row'>
            <div className='form-group half'>
              <label>Category</label>
              <input
                type='text'
                placeholder="Product category"
                value={cat}
                onChange={(e)=>setCat(e.target.value)}
                required
              />
            </div>
            <div className='form-group half'>
              <label>Image URL</label>
              <input
                type='text'
                placeholder="Image permalink"
                value={Img}
                onChange={(e)=>setImg(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='variants-section'>
            <h3>Manufacturers</h3>
            
            <div className='variants-grid'>
              <div className='variant-column'>
                <label>Manufacturer Names</label>
                <input
                  type='text'
                  placeholder='Primary manufacturer'
                  value={var1}
                  onChange={(e)=>setVar1(e.target.value)}
                  required
                />
                <input
                  type='text'
                  placeholder='Secondary manufacturer (optional)'
                  value={var2}
                  onChange={(e)=>setVar2(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Tertiary manufacturer (optional)'
                  value={var3}
                  onChange={(e)=>setVar3(e.target.value)}
                />
              </div>

              <div className='variant-column'>
                <label>Manufacturer Prices</label>
                <input
                  type='number'
                  placeholder='Primary price'
                  value={var1p}
                  onChange={(e)=>setVar1p(e.target.value)}
                  required
                />
                <input
                  type='number'
                  placeholder='Secondary price'
                  value={var2p}
                  onChange={(e)=>setVar2p(e.target.value)}
                />
                <input
                  type='number'
                  placeholder='Tertiary price'
                  value={var3p}
                  onChange={(e)=>setVar3p(e.target.value)}
                />
              </div>
            </div>
          </div>

          {success && !loading && (notify('reg', "Product added successfully", 2000))}

          <div className='form-actions'>
            <button className='add-product-btn' onClick={reqItemADD}>
              <i className='fas fa-plus-circle'></i>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
