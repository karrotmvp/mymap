import axios from 'axios' 
import React, { useState, useEffect } from 'react'
import './post.css'

function RecommendPage(props) {
    
    const [Region, setRegion] = useState("471abc99b378")
    const [PlaceName, setPlaceName] = useState("");
    const [SearchResult, setSearchResult] = useState([]);
    const [Places, setPlaces] = useState([]);
    const [Page, setPage] = useState(0);
    const [Numbers, setNumbers] = useState({
        "서초동": 0,
        "한남동": 0,
        "잠실동": 0
    })
    
    const regionList = {
        "서초동": "471abc99b378",
        "한남동": "79f5f58de451",
        "잠실동": "5424e9f7ec6d"
    }
    const keys = Object.keys(regionList)

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + 'place/admin/recommend', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: Page
            }
        })
        .then(res => {
            setPlaces(Places => [...Places, ...res.data])
        })
        .catch(e => {
            if (e.response.status === 401) {
                props.history.push('/login')
            } else {
                alert('불러오기 실패')
            }
        })

        axios.get(process.env.REACT_APP_SERVER + 'place/admin/recommend/region', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(res => {
            setNumbers(res.data);
        })
        .catch(e => {
            if (e.response.status === 401) {
                props.history.push('/login')
            } else {
                alert('불러오기 실패')
            }
        })
    }, [props.history, Page])

    const infiniteScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        let clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight === scrollHeight) {
            setPage(Page+1)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', infiniteScroll)
        return () => {
            window.removeEventListener('scroll', infiniteScroll)
        }
    })
    
    const onChangeHandler = (e) => {
        setPlaceName(e.target.value)
    }
    const onRegionChangeHandler = (e) => {
        setRegion(e.currentTarget.value);
    }

    const onSearchSubmitHandler = (e) => {
        e.preventDefault();

        axios.get(process.env.REACT_APP_SERVER + 'place/search/' + Region, {
            params: {
                query: PlaceName
            }
        })
        .then(res => {
            setSearchResult(res.data)
        })
        .catch(e => {
            if (e.response.status === 401) {
                props.history.push('/login')
            } else {
                alert('검색 실패')
            }
            
        })
    }
    const addOnClick = (key, e) => {
        const addPlace = [{
            placeId: SearchResult[key].placeId,
            coordinates: SearchResult[key].coordinates
        }]
        axios.post(process.env.REACT_APP_SERVER + 'place/admin/recommend', addPlace, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            setPlaces([...res.data, ...Places])
            const key = Object.keys(regionList).find(key => regionList[key] === Region);
            Numbers[key] += 1;
            setNumbers({...Numbers})
        })
        .catch(e => {
            if (e.response.status === 401) {
                props.history.push('/login')
            } else {
                alert('추가 실패')
            }
        })
    }

    const deleteOnClick = (key, e) => {
        axios.delete(process.env.REACT_APP_SERVER + 'place/admin/recommend/' + Places[key].placeId, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            Places.splice(key, 1);
            const newPlaces = Places;
            setPlaces([])
            setPlaces(newPlaces);
        })
        .catch(e => {
            if (e.response.status === 401) {
                props.history.push('/login')
            } else {
                alert('삭제 실패')
            }
        })
    }

    return (
        <div className="container">
            <div className="theme_container" id="search">
                <h1>검색 및 추가</h1>
                <form onSubmit={onSearchSubmitHandler}>
                    <input name="place_name" value={PlaceName} placeholder="검색어를 입력하세요" onChange={onChangeHandler}/>
                    <select onChange={onRegionChangeHandler}>
                        {keys.map((key, index) => {
                            return (
                                <option key={index} value={regionList[key]}>{key}</option>
                            )
                        })}
                    </select>
                    <button type="submit">검색하기</button>
                </form>
                <div>
                    <h3>검색 결과</h3>
                    <div className="theme">
                        <div>placeId</div>
                        <div>이름</div>
                        <div>주소</div>
                        <div>카테고리</div>
                        <div>추가하기</div>
                    </div>
                    {SearchResult && SearchResult.map((place, index) => {
                        return (
                            <div key={index} className="theme_content">
                                <div>{place.placeId}</div>
                                <div>{place.name}</div>
                                <div>{place.address}</div>
                                <div>{place.category.map(categoryItem => categoryItem + '/')}</div>
                                <button onClick={e => addOnClick(index, e)}>추가하기</button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="theme_container" id="list">
                <h1>추천 장소 리스트</h1>
                <span style={{ padding: "1rem" }}>서초동 : {Numbers.서초동}</span>
                <span style={{ padding: "1rem" }}>잠실동 : {Numbers.잠실동}</span>
                <span style={{ padding: "1rem" }}>한남동 : {Numbers.한남동}</span>
                <div className="theme">
                        <div>placeId</div>
                        <div>이름</div>
                        <div>주소</div>
                        <div>카테고리</div>
                        <div>삭제하기</div>
                    </div>
                {Places && Places.map((place, index) => {
                    return (
                        <div key={index} className="theme_content">
                            <div>{place.placeId}</div>
                            <div>{place.name}</div>
                            <div>{place.address}</div>
                            <div>{place.category.map(categoryItem => categoryItem + '/')}</div>
                            <button onClick={e => deleteOnClick(index, e)}>삭제하기</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecommendPage
