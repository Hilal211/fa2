import React, { useState } from 'react';
// import axios from "./api";
import mac from '@/assets/images/mac.png'
import iphone from '@/assets/images/iphone.png'
import ipad from '@/assets/images/ipad.png'
import watch from '@/assets/images/watch.png'
import more from '@/assets/images/icons-dark-more.svg'

import airpods from '@/assets/images/airpods.png'
import airtag from '@/assets/images/airtag.png'
import tv from '@/assets/images/tv.png'
import accessories from '@/assets/images/accessories.png'
import plus from '@/assets/images/plus.svg'

function Categories({ props }) {
    return (

        <div className='item'>
            <div className='border'>
                <img src={props.pic} alt="" />
                <div className='more pointer' onClick={() => {
                    props.showMenu(props.id)
                }}><img src={more} alt="more" /></div>
            </div>
            <div className='fs-12 col-white center'>{props.name}</div>



            {[props.showmenu && <div key={props.id} className="bg-second-gray menu-de">
                <div className='item-menu pointer' onClick={() => {
                    props.deleteGroup(props.id)
                }}>DELETE</div>
                <div className='line'></div>
                <div className='item-menu pointer'>EDIT</div>
            </div>]}

        </div>

    );
}

export default Categories;