import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = ({ setAuthToken, BASE_URL }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginResponse, setLoginResponse] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            })
            const json = await response.json()
            const data = await json.data
            if(json.success) {
                setAuthToken(data.token)
                window.localStorage.setItem('st-token', data.token)
                setLoginResponse(data.message)
                navigate('/profile')
            } else {
                setLoginResponse(json.error.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
      <div>
        <div className='content'>
            <h2>Login</h2>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className='reg-form'
                onSubmit={handleSubmit}
            >            
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    className='reg-form-elem'
                    value={username}
                    onChange={handleUsername}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    className='reg-form-elem'
                    value={password}
                    onChange={handlePassword}
                />
                <Button className='reg-form-elem' type='submit' variant="contained">Log in</Button>
                <h4>{loginResponse ? loginResponse : ''}</h4>
            </Box>
        </div>
      </div>
    );
  }
  
export default Login;