import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';

const Star = ({ stars }) => {
    const rating = Array.from({ length: 5 }, (ele, i) => {
        let number = i + 0.5;
        return (
            <span key={i}>
                {stars >= i + 1
                    ? <FaStar className='icon' /> :
                    stars >= number
                        ? <FaStarHalfAlt className='icon' /> : <BsStar className='icon' />
                }
            </span>
        )
    })
    return (
        <div style={{color:"gold"}}>
            {rating}
        </div>
    )
}

export default Star