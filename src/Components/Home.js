import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Star from './Star';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from 'react-bootstrap/Spinner';
import ReactPaginate from 'react-paginate';



const Home = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [limit, setLimit] = useState(10)
    const [Skip, setSkiped] = useState(0)
    const [end, setEnd] = useState(true)
    

    const getData = async () => {
        try {
            let res = await fetch(`https://dummyjson.com/products?limit=10&skip=${Skip}`);
            let result = await res.json()
            setData(result.products)
            console.log("result", result.products)
        } catch (err) {
            console.log(err)
        }
    }

    const pageClick = (data) => {
        setSkiped(data.selected*10)
        
    }

    useEffect(() => {
        getData();
    }, [Skip])


    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            if (limit <= 100) {
                setLimit(limit + 9)
                return;
            } else {
                setEnd(false)
            }
        }, 1500);
    };

    return (<>
        {/* 
        <InfiniteScroll
            dataLength={data.length}
            next={() => fetchMoreData()}
            hasMore={end}
            loader={
                <h1><center>Loading....</center></h1>
            }
        > */}

        <div className='container'>
            {data &&
                data.map((item) => {
                    return (
                        <Card style={{ width: '100%', margin: "5%", padding: "5%", borderRadius: "1em 1em 0 0" }}>
                            <Card.Img variant="top" style={{ width: "100%", height: "200px" }} src={item.thumbnail} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    Rating: <Star stars={item.rating} />
                                    Price {item.price.toFixed(2)}$ <br />
                                    Actual Price :<s>{((item.price / 100) * (100 + item.discountPercentage)).toFixed(2)}</s> <br />
                                    Discount : {item.discountPercentage}%
                                </Card.Text>
                                <Button onClick={() => navigate(`/product?id=${item.id}`)} variant="warning" style={{ color: "white" }}>Buy now</Button>
                            </Card.Body>
                        </Card>

                    )
                }
                )}
        </div>


        <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={10}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={pageClick}
            className='myclass'
            activeClassName='activeClass'
        ></ReactPaginate>



        {/* </InfiniteScroll> */}
    </>
    )
}

export default Home