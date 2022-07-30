import './style.css'
import React, { useState } from 'react';
// import axios from "./api";

function MyStore() {
    const[brands,setBrands]=useState(6)
    const[products,setProducts]=useState(42)
    const[sales,setSales]=useState(14200)

    return (
        <div className='my-store'>
            <div className='border-forth-gray border'>
                <div className='flex justify-between align-i-stretch'>
                    <div className='border-third-gray item'>
                      BRANDS
                    </div>
                    <div className='bg-second-gray box flex align-i-center'>{brands}</div>
                </div>

                <div className='flex justify-between align-i-stretch m-19'>
                    <div className='border-third-gray item'>
                    PRODUCTS
                    </div>
                    <div className='bg-second-gray box flex align-i-center'>{products}</div>
                </div>

                <div className='flex justify-between align-i-stretch'>
                    <div className='border-third-gray item'>
                    SALES JUNE
                    </div>
                    <div className='bg-second-gray box flex align-i-center'>AED {sales}</div>
                </div>
            </div>
            
        </div>
    );
}

export default MyStore;