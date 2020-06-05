
import React ,{useState,useEffect}from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/dCandidate';
import { Grid,Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,withStyles, ButtonGroup, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import DCandidateForm from './DCandidateForm'

const style=()=>({
root:{
    //& means append rest of syles and add our new style to MuiTableCell-head css class in table heading
    "& .MuiTableCell-head":{
        fontSize:"1.26rem"
    }
},
    paper:{
        margin:16,
        padding:16

    }
})


//props.classes
// const[classes,...props]=props
const DCandidates=({classes,...props})=>{

const [currentId,setCurrentId]=useState(0);

//console.log(currentId)

    useEffect(()=>{
        props.fetchAllCandidate()
    },[])
     console.log(props.dCandidateList)

    return(
        // add more shading(shadow) use elevation property like this
    <Paper className={classes.paper} elevation={3}>
        <Grid container>
            <Grid item xs={6}>
                <DCandidateForm {...({currentId,setCurrentId})}/>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Blood Group</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                             <TableBody>
                                 {
                                     props.dCandidateList.map((record,index)=>{
                                         return(
                                         <TableRow key={index} hover>

                                        <TableCell>{record.fullName}</TableCell>
                                        <TableCell>{record.age}</TableCell>
                                        <TableCell>{record.bloodGroup}</TableCell>
                                        <TableCell>
                                             <ButtonGroup varient='text'>
                                        {/* // material UI icon import above */}
                                                 <Button><EditIcon 
                                                  onClick={()=>{setCurrentId(record.id)}}     
                                                 color='primary'/></Button>   
                                                 <Button><DeleteIcon color='secondary'/></Button>
                                        {/* // material UI icon import above */}

                                             </ButtonGroup>
                                        </TableCell>
                                         </TableRow>)
                                     })

                                 }
                             </TableBody>

                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Paper>
  
        )
 } 

const mapStateToProps=state=>{
    console.log(state.dCandidate.list)
    return{
        dCandidateList:state.dCandidate.list
    }
}

const mapActionProps={
    fetchAllCandidate:actions.fetchALL
}

export default connect(mapStateToProps,mapActionProps)(withStyles(style)(DCandidates));