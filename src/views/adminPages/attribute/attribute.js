import TextField from '@mui/material/TextField';
import './style.css'
import React, { useState, useEffect } from 'react';
import axios from "./api";
import { Autocomplete } from '@mui/material';
import eventEmitter from "@/plugins/eventEmitter";
import search from "@/assets/images/search-icon.svg"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import arrow from '@/assets/images/arrow.svg';




function Attribute() {
    const [rows, setRows] = useState([])


    useEffect(() => {
        let loaded = 0
        eventEmitter.emit('loading', true);
        function checkLoaded() {
            if (loaded === 1) {
                eventEmitter.emit('loading', false);
            }
        }
        async function fetch() {
            axios.getAllAttributes().then((res) => {
                let data = res.data.attribute;
                let temp = [];
                data.map((d) => {
                    temp.push({ id: d.id, name: d.name, dependencies: d.dependencies })
                })
                setRows(temp);
                loaded++
                checkLoaded()
            }).catch((err) => {
                eventEmitter.emit('loading', false)
            })

        }
        fetch();
    }, [])

    const handleEdit = (event, cellValues) => {
        console.log(cellValues.id)
    }

    // const rows = [
    //     { id: 1, name: 'Color', dependencies: 'Picture and Inventory' },


    // ];

    const columns = [
        { field: 'name', headerName: 'NAME', flex: 0.3, minWidth: 50, },
        { field: 'dependencies', headerName: 'DEPENDENCIES', flex: 0.3, minWidth: 50,
        renderCell: (cellValues) => {
            return (
                {(cellValues.dependencies==1) ?
                <div>In</div>
                :
                }
                
            );
        } },
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
                        <div className='pointer'>Delete</div>
                    </div>
                );
            }
        }
    ];
    // table

    return (
        <div className='admin-attribute content'>
            <div className="btn flex btn-add">
                <div className='text bold'>ADD</div>
                <div className="box-arrow"><img src={arrow} alt="" /></div>
            </div>
            <div style={{ height: 500, width: '100%' }} className='table'>
                <DataGrid rows={rows} columns={columns}
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
        </div>
    );
}

export default Attribute;