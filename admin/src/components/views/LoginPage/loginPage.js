import axios from 'axios';
import React, { useState } from 'react'

function LoginPage(props) {

    const [ApiKey, SetApiKey] = useState('');

    const onApiKeyChange = (e) => {
        SetApiKey(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        axios.get(process.env.REACT_APP_SERVER + 'user/login/admin', {
            headers: {
                'X-Api-Key': ApiKey
            }
        })
            .then(response => {
                localStorage.setItem('token', response.data);
                props.history.push('/')
            })
            .catch(e => {
                console.log(e);
                alert('로그인에 실패했습니다.')
            })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="ApiKey를 입력하세요"
                    name="apikey"
                    value={ApiKey}
                    onChange={onApiKeyChange}
                />
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default LoginPage
