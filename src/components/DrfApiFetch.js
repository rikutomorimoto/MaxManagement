import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import moment from 'moment'
import { Button, makeStyles ,Box} from '@material-ui/core'
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
    const [editedBigthree, setEditedBigthree] = useState({id:'', weight:'',reps:'', title:'', username: username})
    const [training, setTraining] = useState({id:'', title:'', username: username})
    

    useEffect(() => {
        axios.get('http://18.183.227.181/api/v1/bigthree/',{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(
            res => {setBigthree(res.data)})
    },[])

    /* const getBigthree = () =>{
        axios.get(`http://18.183.227.181/api/v1/bigthree/${id}/`,{
            headers: {
                'Authorization': 'Token ${token}'
            }
        })
        .then(res => {setSelectedBigthree(res.data)})
    } */

    const editBigthree =(bigone) => {
        axios.put(`http://18.183.227.181/api/v1/bigthree/${bigone.id}/`, bigone, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
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
                Authorization: `Token ${token}`
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
        console.log(editedBigthree.title)
        result.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
        return result
    }

    const deleteTraining = (id) => {
        axios.delete(`http://18.183.227.181/api/v1/bigthree/${id}`,{
            headers: {
                Authorization: `Token ${token}`
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
            <h3>BIG3</h3>            
            {big3Menu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.submit}
            onClick={()=>{setTraining(one)}} >{ one.title }</Button></Box>
            )}
            <br />
            <h3>Chest</h3>
            {chestMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.submit}
            onClick={()=>{setTraining(one)}} >{ one.title }</Button></Box>
            )}            
            <br />
            <h3>Back</h3>
            {backMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.submit}
            onClick={()=>{setTraining(one)}} >{ one.title }</Button></Box>
            )}
            </th>
            <th>
            <h3>Leg</h3>
            {legMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.submit}
            onClick={()=>{setTraining(one)}} >{ one.title }</Button></Box>
            )}
            <br />
            <h3>Sholder</h3>
            {sholderMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.submit}
            onClick={()=>{setTraining(one)}} >{ one.title }</Button></Box>
            )}
            <br />
            <h3>Arm</h3>
            {armMenu.map(one => <Box component="span" m={1}>
            <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.submit}
            onClick={()=>{setTraining(one)}} >{ one.title }</Button></Box>
            )}
            </th>
            </table>
            <h4>選択中：{ editedBigthree.title = training.title }</h4>
                <label>
                    <TextField 
                    variant="outlined" 
                    margin="dense" 
                    fullWidth 
                    required
                    name="weight"
                    label="weight"
                    value={editedBigthree.weight} 
                    autocomplete
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
                    autocomplete
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
                width={1000}
                height={500}
                data={convert()}
                margin={{
                    top:30,right:130,left:200,bottom:90,
                }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="time"
                    domain={["auto", "auto"]}
                    tickFormatter={(t) => moment(t).format("YY/MM/DD")}
                    tick={{fontSize:10}}
                    scale="time"
                    type="number"
                    padding={{left:50}}
                    label={{
                        value: "Date", offset: -30, position: "insideBottomRight", fontSize:20
                    }}
                />
                < YAxis 
                    label={{ value: "1RM(kg)", offset:-10 ,angle:-90, position: "insideLeft" , fontSize:20}}
                    domain={'dataMin','dataMax'}
                    tick={{fontSize:10}}
                    padding={{bottom:50}}
                />
                <Tooltip />
                <Legend verticalAlign="top" /> 
                <Line type="linear" dataKey="val1" name="1RM" stroke="red" dot={{ stroke: "skyblue", strokeWidth: 3}} unit="kg"/>
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
                    {convert2().map((bigone) => (
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