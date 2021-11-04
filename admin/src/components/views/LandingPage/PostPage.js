import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './post.css'

function PostPage(props) {

    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + 'post/admin', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                setPosts(res.data);
            })
            .catch(e => {
                if (e.response.status === 401) {
                    props.history.push('/login')
                }
            })
    }, [props.history])

    return (
        <div>
            <div className="theme_container">
                <div className="theme">
                    <div>테마 아이디</div>
                    <div>제목</div>
                    <div>핀 갯수</div>
                    <div>지역이름(지역아이디)</div>
                    <div>유저 아이디</div>
                    <div>공개 여부</div>
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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostPage
