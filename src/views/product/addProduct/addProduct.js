import TextField from '@mui/material/TextField';
import './style.css'
import React, { useState, useEffect, useReducer, useRef } from 'react';
import axios from "./api";
import { Autocomplete } from '@mui/material';
import eventEmitter from "@/plugins/eventEmitter";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import arrow from '@/assets/images/arrow.svg';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'} variant={'body2'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function AddProduct() {
    // data


    const variontionDetails = [
        {
            id: 1,
            name: 'Color',
            value: [
                {
                    id: 1,
                    desc: "Graphite"
                },
                {
                    id: 2,
                    desc: "Alpine Green"
                },
                {
                    id: 3,
                    desc: "Gold"
                },
                {
                    id: 4,
                    desc: "Silver"
                },
            ]
        },
        {
            id: 2,
            name: 'Storage capacity',
            value: [
                {
                    id: 5,
                    desc: "125 Gb"
                },
                {
                    id: 6,
                    desc: "256 Gb"
                },
            ]
        },
        {
            id: 3,
            name: 'Display size',
            value: [
                {
                    id: 7,
                    desc: "6''"
                },
                {
                    id: 8,
                    desc: "7.5''"
                },
            ]
        },
    ]

    const [brands, setBrands] = useState([])
    const [categoryMaster, setCategoryMaster] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [attributee, setAttributee] = useState([])

    const [subCatName, setSubCatName] = useState('')
    const [catName, setCatName] = useState('')
    const [brandName, setBrandName] = useState('')

    const [brandId, setBrandId] = useState(null)
    const [categoryMasterId, setCategoryMasterId] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [subCategoryId, setSubCategoryId] = useState(null)

    const [productName, setProductName] = useState(null);
    const [products, setProducts] = useState([])
    const [productSpecs, setProductSpecs] = useState(false)


    const [attributeSelected, setAttributeSelected] = useState([]);
    const [attribute, setAttribute] = useState([]);
    const [variationSelected, setVariationSelected] = useState({});
    const [pictureView, setpictureView] = useState({});
    const [pictureFile, setpictureFile] = useState([]);
    const [x, forceUpdate] = useReducer(x => x + 1, 0);
    const variationPic = useRef(null)

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // function pub() {
    //     let tmp = variationSelected;
    //     willfuckussowewishfuckitfirst(tmp, null)
    // }
    // const willfuckussowewishfuckitfirst = (object, item) => {
    //     let tmp = object;
    //     if (Object.keys(tmp).length === 0) {

    //     } else {

    //         delete tmp[Object.keys(tmp)[0]];
    //         willfuckussowewishfuckitfirst(tmp, item)
    //     }
    // }

    function getCombn(arr, pre) {
        pre = pre || '';
        if (!arr.length) {
            return pre;
        }
        var ans = arr[0].reduce(function (ans, value) {
            return ans.concat(getCombn(arr.slice(1), pre + value));
        }, []);
        return ans;
    }

    let alldata = [];
    Object.keys(variationSelected).map((key) => {
        variationSelected[key].map((v) => {
            alldata.push({ desc: v.desc })
        })

    })


    const clickk = () => {
        let comb = getCombn(alldata, "");
        console.log("f", (alldata))
    }




    const addAtr = () => {

        // here call a api 
        // let result = variontionDetails.filter(vd => attributeSelected.some(v => v.id === vd.id));
        // console.log(result)
        setAttribute(attributeSelected);
        setOpen(false);
    };

    const UploadImg = (index) => {
        document.getElementById(index).click();
    };

    const handleChangeAttribute = (event) => {
        const {
            target: { value },
        } = event;
        let duplicateRemoved = [];

        value.forEach((item) => {
            if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
                duplicateRemoved = duplicateRemoved.filter((x) => x.id !== item.id);
            } else {
                duplicateRemoved.push(item);
            }
        });
        setAttributeSelected(duplicateRemoved);
    };

    const handleDefaultRow = (key, indexVs) => {
        let varia=variationSelected;
        varia[key].map((v) => {
            v.defaultPicture = false
        })
        varia[key][indexVs].defaultPicture = true;
        setVariationSelected(varia)
        console.log(variationSelected)
        forceUpdate()
    }

    useEffect(() => {
        let loaded = 0
        eventEmitter.emit('loading', true);
        function checkLoaded() {
            if (loaded === 3) {
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

            axios.getAttribute().then((res) => {
                setAttributee(res.data.attribute);
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
            setCatName('');
            setCategories(res.data.data);
        }).catch((err) => {
            eventEmitter.emit('loading', false)
        })
    }

    const getSubCategories = (id) => {
        let formData = new FormData();
        formData.append('id', id)
        axios.getCategory(formData).then((res) => {
            setSubCatName('')
            setSubCategories(res.data.data);
        }).catch((err) => {
            eventEmitter.emit('loading', false)
        })
    }
    // main tap
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // attribute tap
    const [valueAtt, setValueAtt] = useState(0);
    const handleChangeAttTap = (event, newValue) => {
        setValueAtt(newValue);
    };

    const selectVariation = (value, desc, attributeId) => {
        let att = attribute;
        const index = att.indexOf(att.find(x => x.id === attributeId))
        let valueS = att[index].attributeValues
        let indexS = valueS.indexOf(valueS.find(x => x.id === value))
        valueS.splice(valueS[indexS], 1)
        let temp = { attributeId: attributeId, value: value, desc: desc };
        let allData = variationSelected;
        if (typeof allData[att[index].name] === "undefined")
            allData[att[index].name] = [];
        let tmp = allData[att[index].name];
        tmp.push(temp);
        allData[att[index].name] = tmp;
        setVariationSelected(allData);
        forceUpdate();
    }
    const cancelVariation = (id, attId, index, attributeName) => {
        let att = attribute;
        const indexMain = att.indexOf(att.find(x => x.id === attId))
        let values = att[indexMain].attributeValues
        values.push({ id: variationSelected[attributeName][index].value, attributeId: variationSelected[attributeName][index].attributeId, value: variationSelected[attributeName][index].desc })
        let filter = [...variationSelected[attributeName]].filter((vs) => vs.value !== id);
        let allData = variationSelected;
        allData[attributeName] = filter
        setVariationSelected(allData);
        forceUpdate();

    }
    const handlePicture = (id, checked) => {
        let att = [...attribute];
        const index = att.indexOf(att.find(x => x.id === id))
        att[index].picture = checked;
        setAttribute(att)
    }
    const handleInventory = (id, checked) => {
        let att = [...attribute];
        const index = att.indexOf(att.find(x => x.id === id))
        att[index].inventory = checked;
        setAttribute(att)
    }
    const handleInformational = (id, checked) => {
        let att = [...attribute];
        const index = att.indexOf(att.find(x => x.id === id))
        att[index].informational = checked;
        if (checked) {
            att[index].picture = false;
            att[index].inventory = false;
        }
        setAttribute(att)
        forceUpdate();
    }


    return (
        <div className='add-product content'>
            <div className='flex flex-row responsive justify-between filter'>
                <div className='flex  align-i-center dropdawn-parent w-32'>
                    <div className='fs-18'>BRAND</div>
                    <div className='line'></div>
                    <div className='dropdawn'>
                        <Autocomplete
                            options={brands}
                            inputValue={brandName}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, value) => { if (value != null) { setBrandId(value.id); setBrandName(value.name) } else { setBrandId(null) } }}
                            renderInput={(params) => <TextField {...params} placeholder='Select' />}
                            fullWidth
                        />
                    </div>
                </div>

                <div className='flex align-i-center dropdawn-parent w-32'>
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

                <div className='flex justify-between align-i-end flex-col w-32'>
                    <div className='flex input-text align-i-center w-100'>
                        <div className='fs-18'>PRODUCT TAG</div>
                        <div className='line'></div>
                        <TextField variant="standard" onChange={(e) => setProductName(e.target.value)} />
                    </div>

                </div>
            </div>
            <div className='line-h'></div>

            <Box sx={{ width: '100%' }} className='mt-40'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="main-tap">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="BASIC INFO" {...a11yProps(0)} className="tab" />
                        <Tab label="PICTURES" {...a11yProps(1)} className="tab" />
                        <Tab label="INVENTORY" {...a11yProps(2)} className="tab" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>

                    <div className='flex flex-row responsive justify-between'>
                        <div className='w-38'>
                            <div className='fs-20 light'>PRODUCT BASIC INFO</div>
                            <div className='line-h mb-40 mt-10'></div>

                            <div className='flex input-text align-i-center'>
                                <div className='fs-18'>PRODUCT NAME</div>
                                <div className='line'></div>
                                <TextField variant="standard" onChange={(e) => setProductName(e.target.value)} />
                            </div>

                            <div className='flex  align-i-center dropdawn-parent mt-10'>
                                <div className='fs-18'>CATEGORY</div>
                                <div className='line'></div>
                                <div className='dropdawn'>
                                    <Autocomplete
                                        options={categories}
                                        inputValue={catName}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, value) => { if (value != null) { setCategoryId(value.id); setCatName(value.name); getSubCategories(value.id) } else { setCategoryId(null) } }}
                                        renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className='flex  align-i-center dropdawn-parent mt-10'>
                                <div className='fs-18'>SUB-CATEGORY</div>
                                <div className='line'></div>
                                <div className='dropdawn'>
                                    <Autocomplete
                                        options={subCategories}
                                        inputValue={subCatName}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, value) => { setSubCatName(value.name); if (value != null) { setSubCategoryId(value.id); } else { setCategoryId(null) } }}
                                        renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className='flex  align-i-center dropdawn-parent mt-10'>
                                <div className='fs-18'>BRAND</div>
                                <div className='line'></div>
                                <div className='dropdawn'>
                                    <Autocomplete
                                        options={brands}
                                        inputValue={brandName}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, value) => { if (value != null) { setBrandId(value.id); setBrandName(value.name) } else { setBrandId(null) } }}
                                        renderInput={(params) => <TextField {...params} placeholder='Select' />}
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className='flex input-text align-i-center mt-10'>
                                <div className='fs-18'>UPID</div>
                                <div className='line'></div>
                                <TextField variant="standard" onChange={(e) => setProductName(e.target.value)} />
                            </div>

                            <div className='flex  align-i-center dropdawn-parent mt-10'>
                                <div className='fs-18'>STYLE</div>
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
                        <div className='w-53'>
                            <div className='fs-20 light'>PRODUCT DESCRIPTION</div>
                            <div className='line-h mb-40 mt-10'></div>
                            <TextareaAutosize
                                minRows={7}
                                maxRows={10}
                                placeholder="TYPE"
                            />
                        </div>
                    </div>
                    <div className='w-60'>
                        <div className='flex justify-between fs-20 light'>
                            <div>PRODUCT SPECS</div>
                            <div><span className={productSpecs ? 'bold pointer' : 'pointer'} onClick={() => { setProductSpecs(true) }}>YES</span> / <span className={!productSpecs ? 'bold pointer' : 'pointer'} onClick={() => { setProductSpecs(false) }}>NO</span></div>
                        </div>
                        <div className='line-h mb-40 mt-10'></div>
                    </div>
                    {productSpecs &&
                        <div className='attribute'>
                            <div className='flex align-i-center'>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={valueAtt} onChange={handleChangeAttTap} >
                                        {attribute.map((att, index) => (
                                            <Tab label={att.name} {...a11yProps(index)} className="tab-att" key={index} />
                                        ))}
                                    </Tabs>
                                </Box>
                                <div className='add-btn' onClick={handleClickOpen}>+</div>
                            </div>
                            {attribute.map((att, index) => (
                                <TabPanel value={valueAtt} index={index} key={index}>
                                    <div className='flex align-i-center align-i-start justify-between'>
                                        <div className='flex  align-i-center dropdawn-parent w-32'>
                                            <div className='dropdawn'>
                                                <Autocomplete
                                                    options={att.attributeValues}
                                                    getOptionLabel={(option) => option.value}
                                                    onChange={(event, value) => { selectVariation(value.id, value.value, value.attributeId) }}
                                                    renderInput={(params) => <TextField {...params} placeholder={'ADD ' + att.name} />}
                                                    fullWidth
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap w-57'>
                                            {typeof variationSelected[att.name] !== "undefined" && variationSelected[att.name].map((item, index) => (
                                                <VariationCart key={index} desc={item.desc} id={item.value} attributeId={att.id} attributeName={att.name} index={index} cancel={cancelVariation} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className='flex align-i-center mt-24 dep'>
                                        <div className='fs-18 light mr-24'>DEPEDENCIES</div>
                                        <FormControlLabel control={<Checkbox value={att.picture} checked={att.picture ? true : false} disabled={att.informational ? true : false} />} label="Pictures" onChange={(e) => { handlePicture(att.id, e.target.checked) }} />
                                        <FormControlLabel control={<Checkbox value={att.inventory} checked={att.inventory ? true : false} disabled={att.informational ? true : false} />} label="Inventory" onChange={(e) => { handleInventory(att.id, e.target.checked) }} />
                                        <FormControlLabel control={<Checkbox value={att.informational} checked={att.informational ? true : false} />} label="Informational" onChange={(e) => { handleInformational(att.id, e.target.checked) }} />
                                    </div>

                                </TabPanel>
                            ))}

                        </div>
                    }
                    <div className="btn flex btn-next" onClick={()=>{console.log(pictureFile)}}>
                        <div className='text bold'>NEXT</div>
                        <div className="box-arrow"><img src={arrow} alt="" /></div>
                    </div>
                </TabPanel>
                {/* pictures tap */}
                <TabPanel value={value} index={1}>
                    <Typography variant="body2" component={"span"}>
                        <div>

                            {attribute.map((att, index) => {
                                if (att.picture && Object.keys(variationSelected).length !== 0) {
                                    return (
                                        <div key={index}>
                                            <div className='fs-20 light'>{att.name} WISE</div>
                                            <div className='line-h mb-40 mt-10'></div>
                                            {variationSelected[att.name].map((vs, indexVs) => {
                                                if (vs.attributeId === att.id) {
                                                    return (
                                                        <div className='flex line-pic' key={indexVs}>
                                                            <div className='col-white fs-16 bold attriute'>{vs.desc}</div>


                                                            <div className='picture-parent'>
                                                                <div onClick={() => { UploadImg("img" + indexVs + index + 1) }}>
                                                                    <input type="file" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" id={"img" + indexVs + index + 1} onChange={(e) => {
                                                                        try {
                                                                            let tmp = pictureView;
                                                                            tmp[indexVs.toString() + index.toString() + 1] = URL.createObjectURL(e.target.files[0]);
                                                                            setpictureView(tmp);
                                                                            let file = e.target.files[0];
                                                                            let temp = { attributeId: att.id, attributeValueId: vs.value, image: file };
                                                                            let picfile = [...pictureFile];
                                                                            let indexOfOld = picfile.findIndex((e) => { return e.attributeValueId == vs.value && e.attributeId == att.id && e.file == file });
                                                                            if (indexOfOld === -1) {
                                                                                picfile.push(temp)
                                                                            } else {
                                                                                picfile[indexOfOld].image = file;
                                                                            }
                                                                            setpictureFile(picfile);
                                                                            forceUpdate();
                                                                        }
                                                                        catch (ex) {

                                                                        }
                                                                    }} ref={variationPic} style={{ display: "none" }} />

                                                                    {pictureView[indexVs.toString() + index.toString() + 1] !== undefined ?
                                                                        <div className='picture-porduct'>
                                                                            <img src={pictureView[indexVs.toString() + index.toString() + 1]} />
                                                                        </div>
                                                                        :
                                                                        <div className='picture-btn relative pointer'><div className='icon-btn col-black fs-18'>+</div></div>
                                                                    }
                                                                </div>
                                                                <div className='fs-16 center col-gray'>Default photo</div>
                                                            </div>

                                                            {/* picture 2 */}
                                                            <div className='picture-parent mg-30'>
                                                                <div onClick={() => { UploadImg("img" + indexVs + index + 2) }}>
                                                                    <input type="file" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" id={"img" + indexVs + index + 2} onChange={(e) => {
                                                                        try {
                                                                            let tmp = pictureView;
                                                                            tmp[indexVs.toString() + index.toString() + 2] = URL.createObjectURL(e.target.files[0]);
                                                                            setpictureView(tmp);
                                                                            let file = e.target.files[0];
                                                                            let temp = { attributeId: att.id, attributeValueId: vs.value, image: file };
                                                                            let picfile = [...pictureFile];
                                                                            let indexOfOld = picfile.findIndex((e) => { return e.attributeValueId == vs.value && e.attributeId == att.id && e.file == file });
                                                                            if (indexOfOld === -1) {
                                                                                picfile.push(temp)
                                                                            } else {
                                                                                picfile[indexOfOld].image = file;
                                                                            }
                                                                            setpictureFile(picfile);
                                                                            forceUpdate();
                                                                        }
                                                                        catch (ex) {

                                                                        }
                                                                    }} ref={variationPic} style={{ display: "none" }} />

                                                                    {pictureView[indexVs.toString() + index.toString() + 2] !== undefined ?
                                                                        <div className='picture-porduct'>
                                                                            <img src={pictureView[indexVs.toString() + index.toString() + 2]} />
                                                                        </div>
                                                                        :
                                                                        <div className='picture-btn relative pointer'><div className='icon-btn col-black fs-18'>+</div></div>
                                                                    }
                                                                </div>
                                                                <div className='fs-16 center col-gray'>Default photo</div>
                                                            </div>

                                                            {/* picture 3 */}
                                                            <div className='picture-parent'>
                                                                <div onClick={() => { UploadImg("img" + indexVs + index + 3) }}>
                                                                    <input type="file" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" id={"img" + indexVs + index + 3} onChange={(e) => {
                                                                        try {
                                                                            let tmp = pictureView;
                                                                            tmp[indexVs.toString() + index.toString() + 3] = URL.createObjectURL(e.target.files[0]);
                                                                            setpictureView(tmp);
                                                                            let file = e.target.files[0];
                                                                            let temp = { attributeId: att.id, attributeValueId: vs.value, image: file };
                                                                            let picfile = [...pictureFile];
                                                                            let indexOfOld = picfile.findIndex((e) => { return e.attributeValueId == vs.value && e.attributeId == att.id && e.file == file });
                                                                            if (indexOfOld === -1) {
                                                                                picfile.push(temp)
                                                                            } else {
                                                                                picfile[indexOfOld].image = file;
                                                                            }
                                                                            setpictureFile(picfile);
                                                                            forceUpdate();
                                                                        }
                                                                        catch (ex) {

                                                                        }
                                                                    }} ref={variationPic} style={{ display: "none" }} />

                                                                    {pictureView[indexVs.toString() + index.toString() + 3] !== undefined ?
                                                                        <div className='picture-porduct'>
                                                                            <img src={pictureView[indexVs.toString() + index.toString() + 3]} />
                                                                        </div>
                                                                        :
                                                                        <div className='picture-btn relative pointer'><div className='icon-btn col-black fs-18'>+</div></div>
                                                                    }
                                                                </div>
                                                                <div className='fs-16 center col-gray'>Default photo</div>
                                                            </div>
                                                            <div className={`align-s-center fs-16 center pointer ${(vs.defaultPicture)?'bold col-white ':'col-gray'}`} onClick={() => { handleDefaultRow(att.name, indexVs) }}>Product default photo</div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </Typography>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add Attribute to this product"}
                </DialogTitle>
                <DialogContent>
                    <div className='selectv'>
                        <Select
                            inputProps={{ 'aria-label': 'Without label' }}
                            displayEmpty
                            id="demo-multiple-checkbox"
                            multiple
                            value={attributeSelected}
                            onChange={handleChangeAttribute}
                            renderValue={(selected) => selected.map((x) => x.name).join(', ')}
                            fullWidth
                        >
                            <MenuItem disabled value="">
                                <em>Attribute</em>
                            </MenuItem>
                            {attributee.map((variant) => (
                                <MenuItem key={variant.id} value={variant}>
                                    <Checkbox
                                        color="primary"
                                        checked={
                                            attributeSelected.findIndex((item) => item.id === variant.id) >= 0
                                        }
                                    />
                                    <ListItemText primary={variant.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        CLOSE
                    </Button>
                    <Button onClick={addAtr} autoFocus>
                        ADD
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

function VariationCart({ desc, cancel, id, attributeId, index, attributeName }) {
    return (
        <div className="variation-cart fs-16 bold col-white relative">
            {desc}
            <div className='fs-16 unselect pointer' onClick={() => { cancel(id, attributeId, index, attributeName) }}>x</div>
        </div>
    );
}



export default AddProduct;