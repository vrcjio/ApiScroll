import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Star from './Star';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from 'react-bootstrap/Spinner';



const Home = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [limit, setLimit] = useState(9)
    const [end, setEnd] = useState(true)

    const getData = async () => {
        try {
            let res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
            let result = await res.json()
            setData(result.products)
            console.log("result",result.products)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getData();
    }, [limit])


    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            if (limit <= 100) {
                setLimit(limit + 9)
                return;
            }else{
                setEnd(false)
            }
        }, 0);
    };

    return (<>

        <InfiniteScroll
            dataLength={data.length}
            next={() => fetchMoreData()}
            hasMore={end}
            loader={
                <h1><center>Loading....</center></h1>
            }
        >
            <div className='container'>
                {data &&
                    data.map((item) => {
                        return (
                            <Card style={{ width: '100%', margin: "5%", padding: "5%", borderRadius: "1em 1em 0 0" }}>
                                <Card.Img variant="top" style={{ width: "100%", height: "50%" }} src={item.thumbnail} />
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
        </InfiniteScroll>
    </>
    )
}

export default Home