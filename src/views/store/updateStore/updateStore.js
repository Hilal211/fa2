import TextField from '@mui/material/TextField';
import './style.css'
import React, { useState, useEffect } from 'react';
import axios from "./api";
import { Autocomplete } from '@mui/material';
import eventEmitter from "@/plugins/eventEmitter";
import search from "@/assets/images/search-icon.svg"
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import arrow from '@/assets/images/arrow.svg';




function ProductDataBase() {
    const [brands, setBrands] = useState([])
    const [categoryMasterId, setCategoryMasterId] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [subCategoryId, setSubCategoryId] = useState(null)
    const [brandId, setBrandId] = useState(null)
    const [products, setProducts] = useState([])
    const [categoryMaster, setCategoryMaster] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
        let loaded = 0
        eventEmitter.emit('loading', true);
        function checkLoaded() {
            if (loaded === 2) {
                eventEmitter.emit('loading', false);
            }
        }
        async function fetch() {
            axios.getAllBrands().then((res) => {
                setBrands(res.data.data);
                loaded++
                checkLoaded()
            }).catch((err) => {
                eventEmitter.emit('loading', false)
            })
            let formData = new FormData();
            axios.getProducts(formData).then((res) => {
                setProducts(res.data.data);
                loaded++
                checkLoaded()
            }).catch((err) => {
                eventEmitter.emit('loading', false)
            })
            axios.getMasters().then((res) => {
                setCategoryMaster(res.data.category);
                loaded++
                checkLoaded()
            }).catch((err) => {
                eventEmitter.emit('loading', false)
            })


        }
        fetch();
    }, [])

    const rows = [
        { id: 1, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 2, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 3, masterCategory: 'dd', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 4, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 5, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 6, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 7, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 8, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 9, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 10, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 11, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },
        { id: 12, masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES', productTag: 'iPhone13pro', produvctName: 'iPhone 13 Pro', brand: 'Apple', upid: 'A2638', displaySize: '6.1’’', color: 'Graphite', storageCapacity: '256 GB', barcode: '938283987232', mrp: 'AED 4,109', qunatity: '14' },


    ];

    const columns = [
        { field: 'masterCategory', headerName: 'MASTER CATEGORY', width: 200 },
        { field: 'category', headerName: 'CATEGORY', width: 150 },
        { field: 'subCategory', headerName: 'SUB-CATEGORY', width: 150 },
        { field: 'productTag', headerName: 'PRODUCT TAG', width: 150 },
        { field: 'produvctName', headerName: 'PRODUCT NAME', width: 150 },
        { field: 'brand', headerName: 'BRAND', width: 150 },
        { field: 'upid', headerName: 'UPID', width: 150 },
        { field: 'displaySize', headerName: 'DISPLAY SIZE', width: 150 },
        { field: 'color', headerName: 'COLOR', width: 150 },
        { field: 'storageCapacity', headerName: 'STORAGE CAPACITY', width: 200 },
        { field: 'barcode', headerName: 'BARCODE', width: 150 },
        { field: 'mrp', headerName: 'MRP', width: 150 },
        { field: 'qunatity', headerName: 'QUANTITY', width: 150 },

    ];

    const getCategories = (id) => {
        let formData = new FormData();
        formData.append('id', id)
        axios.getCategory(formData).then((res) => {
            setCategories(res.data.data);
        }).catch((err) => {
            eventEmitter.emit('loading', false)
        })
    }

    const getProducts = () => {
        // console.log(brandId, categoryId, categoryMasterId, productName)
        let formData = new FormData();
        if (brandId != null) formData.append('brandId', brandId)
        if (categoryMasterId != null) formData.append('categoryMasterId', categoryMasterId)
        if (categoryId != null) formData.append('categoryId', categoryId)
        if (subCategoryId != null) formData.append('subCategoryId', subCategoryId)
        // if (productName != null) formData.append('productName', productName)

        axios.getProducts(formData).then((res) => {
            setProducts(res.data.data);
        }).catch((err) => {
            eventEmitter.emit('loading', false)
        })
    }

    // table



    return (
        <div className='update-store content'>
            <div className='filter'>
                <div className='flex flex-row responsive justify-between '>
                    <div className="w-30">
                        <div className='flex  align-i-center dropdawn-parent'>
                            <div className='fs-18 label'>BRAND</div>
                            <div className='line'></div>
                            <div className='dropdawn'>
                                <Autocomplete
                                    options={brands}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => { (value != null) ? setBrandId(value.id) : setBrandId(null) }}
                                    renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                    fullWidth
                                />
                            </div>
                        </div>

                        <div className='flex align-i-center dropdawn-parent mt-19'>
                            <div className='fs-18 label'>SUB-CATEGORY</div>
                            <div className='line'></div>
                            <div className='dropdawn'>
                                <Autocomplete
                                    options={categoryMaster}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => { if (value != null) { setCategoryMasterId(value.id); getCategories(value.id) } else { setCategoryMasterId(null); setCategories([]) } }}
                                    renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                    fullWidth
                                />
                            </div>
                        </div>

                    </div>

                    <div className="w-30">

                        <div className='flex align-i-center dropdawn-parent'>
                            <div className='fs-18 label'>MASTER CATEGORY</div>
                            <div className='line'></div>
                            <div className='dropdawn'>
                                <Autocomplete
                                    options={categoryMaster}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => { if (value != null) { setCategoryMasterId(value.id); getCategories(value.id) } else { setCategoryMasterId(null); setCategories([]) } }}
                                    renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                    fullWidth
                                />
                            </div>
                        </div>
                        <div className='flex  align-i-center dropdawn-parent mt-19'>
                            <div className='fs-18 label'>UPID</div>
                            <div className='line'></div>
                            <div className='dropdawn'>
                                <Autocomplete
                                    options={brands}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => { (value != null) ? setBrandId(value.id) : setBrandId(null) }}
                                    renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-33">
                        <div className='flex  align-i-center dropdawn-parent'>
                            <div className='fs-18 label'>CATEGORY</div>
                            <div className='line'></div>
                            <div className='dropdawn'>
                                <Autocomplete
                                    options={categories}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => { value != null ? setCategoryId(value.id) : setCategoryId(null) }}
                                    renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                    fullWidth
                                />
                            </div>
                        </div>

                        <div className='flex align-i-center dropdawn-parent mt-19'>
                            <div className='fs-18 '>PRODUCT TAG</div>
                            <div className='line'></div>
                            <div className='dropdawn'>
                                <Autocomplete
                                    options={categoryMaster}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, value) => { if (value != null) { setCategoryMasterId(value.id); getCategories(value.id) } else { setCategoryMasterId(null); setCategories([]) } }}
                                    renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between mt-33'>
                    <div className='border-third-gray update-btn pointer'>UPDATE XML FEED</div>
                    <div className="flex align-i-center search pointer" onClick={() => getProducts()}>
                        <div>SEARCH</div>
                        <div className='search-icon'><img src={search} alt="search"/></div>
                    </div>
                </div>
            </div>
            <div style={{ height: 500, width: '100%' }} className='table'>
                <DataGrid rows={rows} columns={columns} checkboxSelection
                    disableSelectionOnClick disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }} />
            </div>
            <div className="btn flex">
                <div className='text bold'>UPDATE</div>
                <div className="box-arrow"><img src={arrow} alt="" /></div>
            </div>
        </div>
    );
}

export default ProductDataBase;