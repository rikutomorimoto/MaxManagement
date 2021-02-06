import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import moment from 'moment'
import { Button, makeStyles, Typography ,Box} from '@material-ui/core'
import Icon from '@material-ui/icons'
import { DeleteIcon } from '@material-ui/icons/Delete'
import styled from 'styled-components'
import spacing from '@material-ui/system'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

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
        width: '100%', // Fix IE 11 issue.
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
    table: {
        display: 'flex'
    }
}));

const DrfApiFetch = (props) => {
    const classes = useStyles();
    const big3Menu = [
        {id: 1, title: "ベンチプレス"},
        {id: 2, title: "スクワット"},
        {id: 3, title: "デッドリフト"}        
    ]

    const chestMenu = [
        {id: 1, title: "インクラインベンチプレス"},
        {id: 2, title: "ダンベルフライ"},
        {id: 3, title: "ケーブルクロスオーバー"},        
    ]
    
    const backMenu = [
        {id: 1, title: "懸垂（順手）"},
        {id: 2, title: "ベントオーバーロウ"},
        {id: 3, title: "ワンハンドロウ"},
        {id: 4, title: "懸垂（逆手）"},
    ]

    const legMenu = [
        {id: 1, title: "レッグエクステンション"},　
        {id: 2, title: "レッグカール"},　
        {id: 3, title: "ブルガリアンスクワット"},　
    ]

    const sholderMenu = [
        {id: 1, part: "sholder", title: "ショルダープレス"},　
        {id: 2, part: "sholder", title: "サイドレイズ"},
        {id: 3, part: "sholder", title: "リアレイズ"}        
    ]

    const armMenu = [
        {id:1, title: "トライセプスエクステンション"},
        {id:2, title: "ケーブルプレス"},
        {id:3, title: "アームカール"},
        {id:4, title: "インクラインアームカール"},
    ]
    const username = props.userInfo.username
    const token = props.userInfo.token
    const [bigthree, setBigthree] = useState([])
    const [selectedBigthree, setSelectedBigthree] = useState([])
    const [id, setId] = useState([1])
    const [editedBigthree, setEditedBigthree] = useState({id:'', weight:'',reps:'', title:'', username: username})
    const [training, setTraining] = useState({id:'', title:'', username: username})
    

    useEffect(() => {
        axios.get('http://18.183.227.181//api/v1/bigthree/',{
            headers: {
                'Authorization': 'Token ${token}'
            }
        })
        .then(
            res => {setBigthree(res.data)})
            console.log(token)
    },[])

    const getBigthree = () =>{
        axios.get(`http://18.183.227.181/api/v1/bigthree/${id}/`,{
            headers: {
                'Authorization': 'Token ${token}'
            }
        })
        .then(res => {setSelectedBigthree(res.data)})
    }

    const editBigthree =(bigone) => {
        axios.put(`http://18.183.227.181/api/v1/bigthree/${bigone.id}/`, bigone, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ${token}'
            }})
        .then(res => {setBigthree(bigthree.map(bigone => (bigone.id === editedBigthree.id ? res.data : bigone)));
            setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})
        })
    }

    const handleInputChange = () => evt => {
        const value = evt.target.value;
        const name = evt.target.name;
        setEditedBigthree({... editedBigthree, [name]:value})
    }

    const newTraining = (one) => {
        const data = {
            title: one.title,
            weight: one.weight,
            reps: one.reps,
            username: username
        }
        axios.post("http://18.183.227.181/api/v1/bigthree/", data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ${token}'
            }})
            .then(res => {setBigthree([...bigthree, res.data]);
                setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})
            })
        }

    
    const convert = () => {
        const result = bigthree.map(bigone => {
            if((bigone.title === editedBigthree.title) && (bigone.username === username)){
            return {time:moment(bigone.created_at).valueOf(),
                    val1 : bigone.rm,
                    val2 : bigone.weight,
                    val3 : bigone.reps,
                    val4 : bigone.id
            }}
            else {
                return {time:false,val1:false,val2:false,val3:false,val4:false}
            }
        }).filter(one => {return one.time !== false})
        result.sort((a, b) => a.time < b.time ? -1 : 1)        
        return result
    }

    const convert2 = () => {
        const result = bigthree.filter(one => (one.title === editedBigthree.title) && (one.username === username))
        result.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
        return result
    }

    const tmpresult = convert2()
    const data = convert()

    const deleteTraining = (id) => {
        axios.delete(`http://18.183.227.181/api/v1/bigthree/${id}`,{
            headers: {
                'Authorization': 'Token ${token}'
            }})
            .then(res => {setBigthree(bigthree.filter(bigone => bigone.id !== id)); setSelectedBigthree([])})
            if (editedBigthree.id === id){
                setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})
            }
    }

    


    return (
        <div className={classes.paper}>
            <h1>あなたのトレーニングのMAX(1RM)は？</h1>                        
            <table>                            
            <th>
            <h1>BIG3</h1>            
            {big3Menu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
            onClick={()=>{setTraining(one);setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})}} >{ one.title }</Button></Box>
            )}
            <br />
            <h1>Chest</h1>
            {chestMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
            onClick={()=>{setTraining(one);setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})}} >{ one.title }</Button></Box>
            )}            
            <br />
            <h1>Back</h1>
            {backMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
            onClick={()=>{setTraining(one);setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})}} >{ one.title }</Button></Box>
            )}
            </th>
            <th>
            <h1>Leg</h1>
            {legMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
            onClick={()=>{setTraining(one);setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})}} >{ one.title }</Button></Box>
            )}
            <br />
            <h1>Sholder</h1>
            {sholderMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
            onClick={()=>{setTraining(one);setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})}} >{ one.title }</Button></Box>
            )}
            <br />
            <h1>Arm</h1>
            {armMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
            onClick={()=>{setTraining(one);setEditedBigthree({id: '', weight:'', reps:'', title:'', username: username})}} >{ one.title }</Button></Box>
            )}
            </th>
            </table>
            <h3>選択中：{ editedBigthree.title = training.title }</h3>
                <label>
                    <TextField 
                    variant="outlined" 
                    margin="dense" 
                    fullWidth 
                    required
                    name="weight"
                    label="weight"
                    value={editedBigthree.weight} 
                    Autocomplete
                    onChange={handleInputChange()} 
                    autoFocus
                    />
                </label> 
                <label>
                    <TextField 
                    variant="outlined" 
                    margin="dense" 
                    fullWidth 
                    required
                    name="reps"
                    label="reps"
                    value={editedBigthree.reps} 
                    Autocomplete
                    onChange={handleInputChange()} 
                    autoFocus
                    />
                </label> 
            { editedBigthree.id ? 
            <button onClick={()=>editBigthree(editedBigthree)}>Update</button> :
            <button onClick={()=>newTraining(editedBigthree)}>Create</button> }
            <table className={classes.table}>
                <th>
                    
                <LineChart
                width={1500}
                height={1000}
                data={data}
                margin={{
                    top:30,right:130,left:200,bottom:90,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="time"
                    domain={["auto", "auto"]}
                    tickFormatter={(t) => moment(t).format("YY/MM/DD")}
                    tick={{fontSize:30}}
                    scale="time"
                    type="number"
                    padding={{left:50}}
                    label={{
                        value: "Date", offset: -50, position: "insideBottomRight", fontSize:50
                    }}
                />
                < YAxis 
                    label={{ value: "1RM(kg)", offset:-70 ,angle:-90, position: "insideLeft" , fontSize:50}}
                    domain={'dataMin','dataMax'}
                    tick={{fontSize:30}}
                    padding={{bottom:50}}
                />
                <Tooltip />
                <Legend verticalAlign="top" /> 
                <Line type="linear" dataKey="val1" name="1RM" stroke="red" dot={{ stroke: "skyblue", strokeWidth: 7}} unit="kg"/>
                </LineChart>
                
                </th>                    
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: 300}}><h2>Date</h2></TableCell>
                            <TableCell style={{width: 100}}><h2>weight(kg)</h2></TableCell>
                            <TableCell style={{width: 100}}><h2>reps(回)</h2></TableCell>
                            <TableCell style={{width: 100}}><h2>1RM(kg)</h2></TableCell>
                            <TableCell style={{width: 20}}><h4>DEL</h4></TableCell>
                            <TableCell style={{width: 20}}><h4>UPD</h4></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tmpresult.map((bigone) => (
                        <TableRow >
                        <TableCell><h4>{bigone.created_at}</h4></TableCell>
                        <TableCell align="right"><h4>{bigone.weight}</h4></TableCell>
                        <TableCell align="right"><h4>{bigone.reps}</h4></TableCell>
                        <TableCell align="right"><h4>{bigone.rm}</h4></TableCell>
                        <TableCell>
                        <button onClick={() => deleteTraining(bigone.id)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        </TableCell>
                        <TableCell>
                        <button onClick={()=>setEditedBigthree(bigone)}>
                                <i className="fas fa-pen"></i>
                        </button>
                        </TableCell>
                    </TableRow>
                    ))}
                    </TableBody>                                    
                </Table>                                    
                
            </table>
        </div>
    )
}
export default DrfApiFetch