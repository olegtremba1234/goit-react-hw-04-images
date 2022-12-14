import React from "react";
import PropTypes from 'prop-types'
import style from "./Gallery.module.css"

export default function ImageGalleryItem({ smallImg, id, openModal }){
    return(
        <li className={style.item} onClick={() => openModal(id)}>
            <img className={style.itemImage} src={smallImg} alt="" />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    smallImg: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    openModal: PropTypes.func.isRequired,
};