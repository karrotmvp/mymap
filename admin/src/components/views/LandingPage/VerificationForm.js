import axios from 'axios';
import React, { useState } from 'react'

function VerificationForm(props) {

    const [RequestName, SetRequestName] = useState("");
    const [ThemeName, SetThemeName] = useState("");
    const [PostNum, SetPostNum] = useState(0);
    const [UserId, setUserId] = useState(0)

    let uri = process.env.REACT_APP_SERVER + 'notification/admin/verification/';
    switch(props.type) {
        case 1:
            uri = uri + "one";
            break;
        case 2:
            uri = uri + "two";
            break;
        case 3:
            uri = uri + "three";
            break;
        case 4:
            uri = uri + "four";
            break;
        default:
            uri = uri + "one";
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!window.confirm('정말 발송하시겠습니까?')) return ;

        const data = {
            "$(request_name)": RequestName,
            "$(theme_name)": ThemeName,
            "$(post_num)": PostNum
        }

        axios.post(uri, data, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                userId: UserId
            }
        })
        .then(res => {
            alert('전송 성공')
        })
        .catch(e => {
            if (e.response.status === 401) {
                props.history.push('/login');
            } else {
                alert('전송에 실패했습니다')
            }
        })

    }

    return (
        <div>
            <h4>{props.type}</h4>
            <form onSubmit={onSubmit}>
                <div>
                    <label>request_name</label>
                    <input
                        placeholder="request name"
                        name="request_name"
                        value={RequestName}
                        onChange={(e) => SetRequestName(e.target.value)}
                    />
                </div>
                <div>
                    <label>theme_name</label>
                    <input 
                        placeholder="theme name"
                        name="theme_name"
                        value={ThemeName}
                        onChange={(e) => SetThemeName(e.target.value)}
                    />
                </div>
                <div>
                    <label>user_id</label>
                    <input 
                        placeholder="user id"
                        name="user_id"
                        value={UserId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div>
                    <label>post_num</label>
                    <input
                        placeholder="post num"
                        name="post_num"
                        value={PostNum}
                        onChange={(e) => SetPostNum(e.target.value)}
                    />
                </div>
                <button type="submit">보내기</button>
            </form>
        </div>
    )
}

export default VerificationForm
