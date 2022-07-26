import TextField from '@mui/material/TextField';
import './style.css'
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from 'react';
import axios from "./api";
import { Autocomplete } from '@mui/material';
import eventEmitter from "@/plugins/eventEmitter";
import search from "@/assets/images/search-icon.svg"
import arrowDown from "@/assets/images/arrow-down.svg"

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';






function ProductDataBase() {
    const [productName, setProductName] = useState(null);
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
        console.log(brandId, categoryId, categoryMasterId, productName)
        let formData = new FormData();
        if (brandId != null) formData.append('brandId', brandId)
        if (categoryMasterId != null) formData.append('categoryMasterId', categoryMasterId)
        if (categoryId != null) formData.append('categoryId', categoryId)
        if (subCategoryId != null) formData.append('subCategoryId', subCategoryId)
        if (productName != null) formData.append('productName', productName)

        axios.getProducts(formData).then((res) => {
            setProducts(res.data.data);
        }).catch((err) => {
            eventEmitter.emit('loading', false)
        })
    }

    // table
    const columns = [
        { id: 'masterCategory', label: 'MASTER CATEGORY', minWidth: 150, },
        { id: 'category', label: 'CATEGORY', minWidth: 100 },
        {
            id: 'subCategory',
            label: 'SUB-CATEGORY',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'productTag',
            label: 'PRODUCT TAG',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'productName',
            label: 'PRODUCT NAME',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'brand',
            label: 'BRAND',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'action',
            label: 'Actions',
            minWidth: 170,
            align: 'left',
            render: function(data, type) {
                return type === 'display'? '<input class="chk-select" type="checkbox">' : '';
              }
            
        },
    ];

    function createData(masterCategory, category, subCategory, productTag, productName, brand, id) {
        return { masterCategory, category, subCategory, productTag, productName, brand, id };
    }
    let rows = [];
    products.map((p) => {
        rows.push(createData(p['category']['parent']['parent'].name, p['category']['parent'].name, p['category'].name, p.tag, p.name, p['brand'].name, p.id))
    })

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div className='productdb content'>
            <div className='flex flex-row responsive justify-between filter'>
                <div className="w-41">

                    <div className='flex  align-i-center dropdawn-parent'>
                        <div className='fs-18'>BRAND</div>
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

                    <div className='flex align-i-center dropdawn-parent mt-7'>
                        <div className='fs-18'>MASTER CATEGORY</div>
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


                    <div className='flex  align-i-center dropdawn-parent mt-7'>
                        <div className='fs-18'>CATEGORY</div>
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

                </div>
                <div className='flex justify-between align-i-end flex-col w-47'>
                    <div className='flex input-text align-i-center w-100'>
                        <div className='fs-18'>PRODUCT NAME</div>
                        <div className='line'></div>
                        <TextField variant="standard" onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="flex align-i-center search pointer" onClick={() => getProducts()}>
                        <div>SEARCH</div>
                        <div className='search-icon'><img src={search} /></div>
                    </div>
                </div>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === 'action') {
                                                    return (
                                                        <TableCell key='action' align="left">
                                                            <div className="flex justify-between">
                                                                <div onClick={() => console.log(row.id)}>
                                                                    Edit
                                                                </div>
                                                                <div onClick={() => console.log(row.masterCategory)}>
                                                                    Specs
                                                                </div>
                                                                <div onClick={() => console.log(row.masterCategory)}>
                                                                    Store
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                }
                                            })}

                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default ProductDataBase;