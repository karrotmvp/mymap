import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../../index.css'
import './post.css'

function UserPage(props) {

    const [Users, setUsers] = useState([])
    const [Page, setPage] = useState(0)

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + 'user/admin', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: Page
            }
        })
            .then(res => {
                setUsers(Users => [...Users, ...res.data]);
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
                    <div>유저 아이디</div>
                    <div style={{ width: '300px' }}>당근 아이디</div>
                    <div>만든 테마 갯수</div>
                    <div>저장한 테마 갯수</div>
                    <div>업데이트</div>
                    <div>생성일</div>
                </div>
                {
                    Users && Users.map((user, key) => {
                        console.log(user)
                        return (
                            <div className="theme_content" key={key}>
                                <div>{user.userId}</div>
                                <div style={{ width: '300px' }}>{user.uniqueId}</div>
                                <div>{user.posts.length}</div>
                                <div>{user.savedPosts.length}</div>
                                <div>{new Date(user.updatedAt).toLocaleString()}</div>
                                <div>{new Date(user.createdAt).toLocaleString()}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserPage
