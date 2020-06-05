import React,{useState, useEffect} from 'react'
import { Grid, TextField,withStyles, InputLabel, MenuItem,FormControl,Select, Button, FormHelperText } from '@material-ui/core'
import useForm from'./useForm';
import * as actions from '../actions/dCandidate'
import {connect} from 'react-redux'

import{useToasts} from'react-toast-notifications' //notification msg display kirimata






const style=(theme)=>({
  root:{
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        minWidth: 230,
      }
  },
  formControlmy:{
    margin: theme.spacing(1),
    minWidth: 230,
  },
  btnMargin:{
    margin: theme.spacing(1)  
  }


})

const initialFieldValues={
    fullName:'',
    mobile:'',
    email:'',
    age:'',
    bloodGroup:'',
    address:''
}







const DCandidateForm=({classes,...props})=>{

  //Toast msg
  const {addToast}=useToasts();
 
//validate()
//validate({fullName:'Kasun'})

  const validate=(fieldValues=values)=>{
    let temp={...errors}
    if('fullName'in fieldValues)
    temp.fullName=fieldValues.fullName? "":"This field is required"
    if('mobile'in fieldValues)
    temp.mobile=fieldValues.mobile?"":"This field is required"
    if('bloodGroup'in fieldValues)
    temp.bloodGroup=fieldValues.bloodGroup?"":"This field is required"
    if('email'in fieldValues)
    temp.email=(/^$|.+@.+..+/).test(fieldValues.email)?"":"Email is not valid"
    setErrors({
      ...temp
    })
  
  if(fieldValues==values)
       return Object.values(temp).every(x=> x=="")  // temp kiyana object eke siyalu values ==""(empty) non true lesa return kirimata
  
  }


  const{
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }=useForm(initialFieldValues,validate,props.setCurrentId)


 
  const handleSubmit=(event)=>{
    event.preventDefault();
    if(validate()){
      const onSuccess=()=>{
        addToast("Submitted successfully",{appearance:'success'});
        resetForm();
    
    }
      if(props.currentId==0){
        //props.createDCandidate(values,()=>{window.alert('inserted.... ')})
        props.createDCandidate(values,onSuccess)
      }
      else{
       // props.updateDCandidate(props.currentId,values,()=>{window.alert("Updated... ")})
       props.updateDCandidate(props.currentId,values,onSuccess)
      }
     
    }
    console.log(values)
  }


//edit 
useEffect(()=>{
  console.log(props.currentId) 
 if(props.currentId!=0){
    
    setValues({
      ...props.dCandidateList.find(x=>x.id==props.currentId)
    })
    setErrors({});   
 }

},[props.currentId])




    return(
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
          <Grid container>
               <Grid item xs={6}>
                     <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value ={values.fullName}
                        onChange={handleInputChange}
                        // error={true}
                        // helperText={errors.fullName}
                       {...(errors.fullName && {error:true,helperText:errors.fullName})} 
                        />

                     <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value ={values.email}
                        onChange={handleInputChange}
                        {...(errors.email&& {error:true,helperText:errors.email})} 
                        />

                        <FormControl variant='outlined' 
                        className={classes.formControlmy }
                        {...(errors.email&& {error:true})} 
                        >
                            <InputLabel >Blood Group</InputLabel> 
                            <Select
                           
                                name='bloodGroup' 
                                value={values.bloodGroup}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="">Select Blood Group</MenuItem>
                                <MenuItem value="A+">A +ve</MenuItem>
                                <MenuItem value="A-">A -ve</MenuItem>
                                <MenuItem value="B+">B +ve</MenuItem>
                                <MenuItem value="B-">B -ve</MenuItem>
                                <MenuItem value="AB+">AB +ve</MenuItem>
                                <MenuItem value="AB-">AB -ve</MenuItem>
                                <MenuItem value="O+">O +ve</MenuItem>
                                <MenuItem value="O-">O -ve</MenuItem>
                                
                                </Select>    
                            {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                       </FormControl>  
               </Grid>

               <Grid item xs={6}>
               <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value ={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && {error:true,helperText:errors.mobile})} 
                        /> 

                      <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value ={values.age}
                        onChange={handleInputChange}
                        /> 
                         <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value ={values.address}
                        onChange={handleInputChange}
                        /> 

                        <div>
                            <Button className={classes.btnMargin}
                               variant='contained'
                               color='primary'
                               type='submit'
                               >
                                   Submit
                               </Button>

                               <Button className={classes.btnMargin}
                               variant='contained'
                              onClick={resetForm}
                               >
                                   Reset
                               </Button>
                        </div>
               </Grid>

          </Grid>

        </form>
    )
}


const mapStateToProps=(state)=>{
 return{
   dCandidateList:state.dCandidate.list
 }
}

const mapActionToProps={
  
    createDCandidate:actions.create,
    updateDCandidate:actions.update
  }
 




export default connect(mapStateToProps,mapActionToProps)( withStyles(style) (DCandidateForm));