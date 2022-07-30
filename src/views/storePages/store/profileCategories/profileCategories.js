import './style.css'
import React, { useState, useReducer, useEffect } from 'react';
// import axios from "./api";
import mac from '@/assets/images/mac.png'
import iphone from '@/assets/images/iphone.png'
import ipad from '@/assets/images/ipad.png'
import watch from '@/assets/images/watch.png'
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import airpods from '@/assets/images/airpods.png'
import airtag from '@/assets/images/airtag.png'
import tv from '@/assets/images/tv.png'
import accessories from '@/assets/images/accessories.png'
import plus from '@/assets/images/plus.svg'
import Categories from '../../../../component/categories/categories';
import eventEmitter from "@/plugins/eventEmitter";
import axios from "./api";
import arrow from '@/assets/images/arrow.svg';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ProfileCategories() {
    const [categoriess, setCategoriess] = useState([]);
    const [brands, setBrands] = useState([])
    const [brandId, setBrandId] = useState(null)
    const [categoryMaster, setCategoryMaster] = useState([])
    const [categoryMasterId, setCategoryMasterId] = useState(null)
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(null)

    useEffect(() => {
        let loaded = 0
        eventEmitter.emit('loading', true);
        function checkLoaded() {
            if (loaded === 1) {
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

            axios.getMasters().then((res) => {
                setCategoryMaster(res.data.category);
                loaded++
                checkLoaded()
            }).catch((err) => {
                eventEmitter.emit('loading', false)
            })
            setCategoriess([
                { id: 1, name: "#APPLE_mac", pic: mac, showmenu: false },
                { id: 2, name: "#APPLE_iPhone", pic: iphone, showmenu: false },
                { id: 3, name: "#APPLE_iPad", pic: ipad, showmenu: false },
                { id: 4, name: "#APPLE_watch", pic: watch, showmenu: false },
                { id: 5, name: "#APPLE_AirPods", pic: airpods, showmenu: false },
                { id: 6, name: "#APPLE_AirTag", pic: airtag, showmenu: false },
                { id: 7, name: "#APPLE_TV", pic: tv, showmenu: false },
                { id: 8, name: "#APLLE_Accessories", pic: accessories, showmenu: false }
            ])


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

    const showMenu = (id) => {
        // try {
        //     let tmp = [...categoriess];
        //     tmp[index].showmenu = !tmp[index].showmenu;
        //     setCategoriess(tmp);
        //     console.log(categoriess)
        // } catch (e) { }
        // let filter = [...categoriess].filter((cat) => cat.id !== id);
        // setCategoriess(filter);
        // let filter = categoriess.map((cat)=>{
        //     if(cat.id==id){
        //         console.log(cat.showMenu)
        //     }
        // });

        const newState = categoriess.map(obj => {
            if (obj.id == id) {
                return { ...obj, showmenu: !obj.showmenu };
            }
            return obj;
        });

        setCategoriess(newState);
    }
    const deleteGroup = (id) => {
        let filter = [...categoriess].filter((cat) => cat.id !== id);
        setCategoriess(filter);

    }


    const rows = [
        { id: 1, group: 'APPLE_iPhone', brand: 'APPLE', masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES' },
        { id: 2, group: 'APPLE_Mac', brand: 'APPLE', masterCategory: 'ELECTRONICS', category: 'COMPUTERS', subCategory: 'LAPTOPS' },
        { id: 3, group: 'APPLE_iPhone', brand: 'APPLE', masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'DESKTOPS' },
        { id: 4, group: 'APPLE_iPhone', brand: 'APPLE', masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES' },
        { id: 5, group: 'APPLE_iPhone', brand: 'APPLE', masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES' },
        { id: 6, group: 'APPLE_iPhone', brand: 'APPLE', masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES' },
        { id: 7, group: 'APPLE_iPhone', brand: 'APPLE', masterCategory: 'ELECTRONICS', category: 'MOBILE', subCategory: 'SMARTPHONES' },


    ];
    const handleEdit = (event, cellValues) => {
        console.log(cellValues.id)
    }

    const columns = [
        { field: 'group', headerName: 'GROUP', width: 200 },
        { field: 'brand', headerName: 'BRAND', width: 150 },
        { field: 'masterCategory', headerName: 'MASTER CATEGORY', width: 200 },
        { field: 'category', headerName: 'CATEGORY', width: 150 },
        { field: 'subCategory', headerName: 'SUB-CATEGORY', width: 150 },
        {
            field: "actions", headerName: 'Actions', width: 120,
            renderCell: (cellValues) => {
                return (
                    <div className='flex justify-between w-100'>
                        <div className='pointer'

                            onClick={(event) => {
                                handleEdit(event, cellValues);
                            }}
                        >
                            Edit
                        </div>
                        <div className='pointer'>Check</div>
                    </div>
                );
            }
        }];
    return (
        <div className='profile-cat content'>
            <div className="flex flex-row responsive justify-between">
                <div className='categories border-forth-gray flex justify-between flex-wrap align-c-start'>
                    {categoriess.map((cat, index) => (
                        <Categories key={cat.id} props={{ id: cat.id, name: cat.name, pic: cat.pic, showmenu: cat.showmenu, index: index, showMenu, deleteGroup }} />
                    ))}
                    <div className='add-cat pointer' ><img src={plus} alt="add category" /></div>

                </div>
                <div className='left-content'>
                    <div className='flex flex-row responsive justify-between filter'>
                        <div className='w-48'>
                            <div className='title'>aplo</div>
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
                            <div className='flex align-i-center dropdawn-parent mt-20'>
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
                            <div className='flex  align-i-center dropdawn-parent mt-20'>
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
                            <div className='light col-gray btn-filed pointer'>ADD FIELD</div>
                        </div>
                        <div className='line'></div>
                        <div className='w-48'>
                            <div className='title'>APPLE</div>
                            <div className='group-filter'>
                                <div className='flex  align-i-center dropdawn-parent'>
                                    <div className='fs-18 label'>GROUP</div>
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
                                <div className="btn flex btn-add">
                                    <div className='text bold'>ADD</div>
                                    <div className="box-arrow"><img src={arrow} alt="" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* table */}
                    <div style={{ height: 450, width: '100%' }} className='table'>
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

                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Display first those available in store" />
                        <FormControlLabel value="2" control={<Radio />} label="Do not display products not available in store" />

                    </RadioGroup>

                </div>
            </div>

        </div>
    );
}

export default ProfileCategories;