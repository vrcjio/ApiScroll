import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';

import Star from './Star';

const ProductSlug = (props) => {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const [item, setItem] = useState();

    const getData = async () => {
        try {
            let res = await fetch(`https://dummyjson.com/products/${id}`);
            let result = await res.json()
            setItem(result);
            console.log(item.title)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (<>
        {
            item &&
            <div >

                    <div style={{height:"30%", width:"20%"}}>
                    <Carousel style={{height:"30%", padding: "1%",border:"2px solid black" }}>
                        {item.images.map((url, i) =>{
                        return(

                            <Carousel.Item>
                                <img
                                    className="d-block w-100 h-50"
                                    src={url}
                                />
                            </Carousel.Item>
                        )}
                        )}
                    </Carousel>
                    </div>

                        <Accordion alwaysOpen>
                            <Accordion.Header>

                                <Card.Title><b>{item.title}</b><br />
                                    rating <Star stars={item.rating} /> </Card.Title><br />

                            </Accordion.Header>
                            <Accordion.Body style={{color:"black"}}>
                                <Card.Text>
                                    Price {item.price.toFixed(2)}$ <br />
                                    Actual Price :<s>{((item.price / 100) * (100 + item.discountPercentage)).toFixed(2)}</s> <br />
                                    Discount : {item.discountPercentage}%
                                </Card.Text>
                                <b>Description</b><br />
                                {item.description}
                            </Accordion.Body>
                        </Accordion>
                        <Button variant="success" style={{margin:"2%"}}>buy now</Button>
            </div>
        }
    </>
    )
}

export default ProductSlug