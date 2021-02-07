import {React, useState} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { makeStyles, Typography } from '@material-ui/core'

import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
    margin: theme.spacing(3, 0, 2),
    },
    span: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'teal',
    },
    spanError: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'fuchsia',
        marginTop: 10,
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const [flag, setFlag] = useState({loginerr: false, createerr: false, createdone:false})
    const [credentials, setCredentials] = useState({username:'', password:''})
    const [newUser, setNewUser] = useState({username:'', password:''})

    const login = (evt) => {
        const data = {
            username: credentials.username,
            password: credentials.password
        }
        
        axios.post("http://18.183.227.181/auth/", data,{
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res =>{            
                props.setUserInfo({username: credentials.username,token: res.data.token})
            })
            .catch(err =>{
                setFlag({loginerr:true})
                console.log(err)
            })
    }

    const create = (evt) =>{
        const data = {
            username: newUser.username,
            password: newUser.password
        }
        console.log(data)
        axios.post("http://18.183.227.181/api/v1/users/", data,{
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res =>{
                setFlag({createdone:true})
            })
            .catch(err =>{
                setFlag({createerr:true})
                console.log(err)
                
            })
    }

    const handleInputChange = (handle, userinfo) => evt => {
        const value = evt.target.value;
        const name = evt.target.name;
        handle({... userinfo, [name]:value})
    }    

    return (
        <Container component="main" >
            
            <div className={classes.paper}>
            
                <Typography variant="h2">1RM(Rep Max)管理サイト</Typography>
                <Typography component="h1" variant="h3">Sign in</Typography>
                
                <label>
                    <TextField 
                    variant="outlined" 
                    margin="normal" 
                    fullWidth 
                    required
                    name="username"
                    label="ユーザー名"
                    value={credentials.username} 
                    Autocomplete="current-username"
                    onChange={handleInputChange(setCredentials, credentials)} 
                    autoFocus
                    />
                </label>
                <label>
                    <TextField 
                    variant="outlined" 
                    margin="normal" 
                    fullWidth 
                    required
                    name="password"
                    label="パスワード"
                    value={credentials.password} 
                    Autocomplete="current-password"
                    onChange={handleInputChange(setCredentials, credentials)} 
                    autoFocus
                    />
                </label>
                <br />
                <Button 
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => login()}>Login</Button>
                { flag.loginerr && (<h1>ユーザー名，もしくはパスワードが間違っています</h1>)}
                <h4>新規登録される場合は↓↓↓</h4>
                <Typography component="h1" variant="h3">Create User</Typography>
                <label>        
                    <TextField 
                    variant="outlined" 
                    margin="normal" 
                    fullWidth 
                    required
                    name="username"
                    label="ユーザー名"
                    value={newUser.username} 
                    Autocomplete="current-username"
                    onChange={handleInputChange(setNewUser, newUser)} 
                    autoFocus
                    />
                </label>                
                <label>                    
                    <TextField 
                    variant="outlined" 
                    margin="normal" 
                    fullWidth 
                    required
                    name="password"
                    label="パスワード"
                    value={newUser.password} 
                    Autocomplete="current-password"
                    onChange={handleInputChange(setNewUser, newUser)} 
                    autoFocus
                    />
                </label>                
                <Button 
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => create()}>User create</Button>
                { flag.createerr &&
                <ul>
                <h2>以下のエラーに該当しています</h2>
                <li><h1>既に登録済みのユーザー名</h1></li>
                <li><h1>ユーザー名，パスワードが無効な値</h1></li>
                <h4>別のユーザー名，パスワードでリトライして下さい</h4>
                </ul>
                }
                {flag.createdone &&
                    <ul>
                        ユーザー登録が完了しました．Login formからログインしてください．
                    </ul>
                }            
            </div>
        
        </Container>
    )
}

export default Login;