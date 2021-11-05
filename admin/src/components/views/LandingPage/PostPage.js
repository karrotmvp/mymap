import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './post.css'
import '../../../index.css'

function PostPage(props) {

    const [Posts, setPosts] = useState([]);
    const [Page, setPage] = useState(0);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + 'post/admin', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: Page
            }
        })
            .then(res => {
                setPosts(Posts => [...Posts, ...res.data]);
            })
            .catch(e => {
                if (e.response.status === 401) {
                    props.history.push('/login')
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

    return (
        <div className="container">
            <div className="theme_container">
                <div className="theme">
                    <div>테마 아이디</div>
                    <div>제목</div>
                    <div>핀 갯수</div>
                    <div>지역이름(지역아이디)</div>
                    <div>유저 아이디</div>
                    <div>공개 여부</div>
                    <div>업데이트</div>
                    <div>생성일</div>
                </div>
                {
                    Posts && Posts.map((post, key) => {
                        console.log(post)
                        return (
                            <div className="theme_content" key={key}>
                                <div>{post.postId}</div>
                                <div>{post.title}</div>
                                <div>{post.pins.length}</div>
                                <div>{post.regionName}({post.regionId})</div>
                                <div>{post.userId}</div>
                                <div>{post.share ? "공개" : "비공개"}</div>
                                <div>{new Date(post.updatedAt).toLocaleString()}</div>
                                <div>{new Date(post.createdAt).toLocaleString()}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostPage