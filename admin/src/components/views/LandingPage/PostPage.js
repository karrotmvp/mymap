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

    const shareOnClickHandler = (key, e) => {
        if(!window.confirm('정말 변경하시겠습니까?')) return ;
        axios.put(process.env.REACT_APP_SERVER + `post/admin/share/${Posts[key].postId}`,null,{
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }})
            .then((res) => {
                Posts[key].share = !Posts[key].share
                const newPosts = Posts;
                setPosts([])
                setPosts(newPosts);
            })
            .catch(() => {
                alert('변경에 실패했습니다');
            })
    }

    const deleteOnClick = (key, e) => {
        if(!window.confirm('정말 삭제하시겠습니까?')) return ;
        axios.delete(process.env.REACT_APP_SERVER + `post/${Posts[key].postId}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }})
            .then((res) => {
                Posts.splice(key, 1);
                const newPosts = Posts;
                setPosts([])
                setPosts(newPosts);
            })
            .catch(() => {
                alert('삭제에 실패했습니다');
            })
    }

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
                    <div>삭제하기</div>
                </div>
                {
                    Posts && Posts.map((post, key) => {
                        return (
                            <div className="theme_content" key={key}>
                                <div>{post.postId}</div>
                                <div>{post.title}</div>
                                <div>{post.pins.length}</div>
                                <div>{post.regionName}({post.regionId})</div>
                                <div>{post.userId}</div>
                                <div>{post.share ? "공개" : "비공개"}<button onClick={(e) => shareOnClickHandler(key, e)}>전환하기</button></div>
                                <div>{new Date(post.updatedAt).toLocaleString()}</div>
                                <div>{new Date(post.createdAt).toLocaleString()}</div>
                                <div><button onClick={(e) => deleteOnClick(key, e)}>삭제하기</button></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostPage
