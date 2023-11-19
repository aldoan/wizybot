import { useState, useEffect } from 'react'
import ProductService from '../../services/ProductService'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Input from '../controls/Input'

import './AdditionalInfoForm.css'

function AdditionalInfoForm() {

  const initalInputValues = {
    topic:"",
    topicInfo:"",
    productsInfo:""
  }
  const initalErrors: { [key:string]: string } = {}
  
  const [products, setProducts] = useState<string[]>([])
  
  const [values, setValues] = useState(initalInputValues)
  const [errors, setErrors] = useState(initalErrors)

  const [productSelectedForTags, setProductSelectedForTags] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [productSelectedForInfo, setProductSelectedForInfo] = useState<string[]>([])
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const {name, value} = event.target
    setValues({
        ...values,
        [name]:value
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts: string[] = await ProductService.getProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])


  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    if ('topic' in fieldValues) temp.topic = fieldValues.topic ? "" : "This field is required."
    if ('topicInfo' in fieldValues) temp.topicInfo = fieldValues.topicInfo ? "" : "This field is required."
    if ('productsInfo' in fieldValues) temp.productsInfo = fieldValues.productsInfo ? "" : "This field is required."
    setErrors({...temp})

    if (fieldValues == values) return Object.values(temp).every(x => x == "")
  }

  const resetForm = () => {
    setValues(initalInputValues)
    setErrors({})
  }

  const handleSubmit =  (evt:React.FormEvent) => {
    evt.preventDefault()
    validate(values)
    if (validate()){
      const res = {
        "productSelectedForTags":productSelectedForTags,
        "tags": tags,
        "topic": values.topic,
        "topicInfo": values.topicInfo,
        productSelectedForInfo,
        "productsInfo":values.productsInfo
      }
      console.log("RESULT DATA TO POST", res)
      resetForm()
    }
  }

  return (
    <Box component="form" 
      action=''
      method='POST'
      onSubmit={ evt => handleSubmit(evt) } >
      <Stack spacing={2} className='formStackContainer'>
        <h2>Aditional Information</h2>
        <p>Improve  your customer support by supplementing Wizybot's knowledge with specific product info, policies and unique details.</p>
        <h3>Add product tags</h3>
        <Autocomplete
              multiple
              id="product-select-for-tags"
              options={products}
              onChange={(event, newValue: string[]) => {setProductSelectedForTags(newValue)}}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  placeholder="Select products..."/>
              )}
              renderOption={(props, option, state) => {
                const key = `listItem-${state.index}`
                return (<li {...props} key={key}> {option} </li>)
              }}
        />

        <Autocomplete
          multiple
          id="tags"
          freeSolo
          options={[]}
          onChange={(event, newValue: string[]) => { setTags(newValue)}}
          renderInput={
            (params) => 
              <TextField 
                {...params} 
                helperText="Type a tag name an hit enter"
                label="Tags" 
                placeholder="Tags"
              />
          }
        />

        <h3>Add topic info</h3>
        <Input  
          name="topic"
          label="Topic"
          value={values.topic}
          error={errors.topic}
          tooltip={true}
          handleChange={handleInputChange}
        />

        <Input  
          name="topicInfo"
          label="Topic Info"
          value={values.topicInfo}
          error={errors.topicInfo}
          multiline={true}
          minRows={3}
          maxRows={7}
          handleChange={handleInputChange}
        /> 

        <h3>Add products info</h3>
        <Autocomplete
          multiple
          id="product-select-for-info"
          options={products}
          onChange={(event, newValue: string[]) => {setProductSelectedForInfo(newValue)}}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField 
              {...params}  
              label="Products" 
              placeholder="Select products..." 
            />
          )}
          renderOption={(props, option, state) => {
            const key = `listItem-${state.index}`
            return (
              <li {...props} key={key}>
                {option}
              </li>
            )
          }}
        />

        <Input  
          name="productsInfo"
          label="Products Info"
          value={values.productsInfo}
          error={errors.productsInfo}
          multiline={true}
          minRows={3}
          maxRows={7}
          handleChange={handleInputChange}
        /> 
      </Stack>
      
      <Button variant="contained" type='submit' className='SubmitButton' size='large'> Send </Button>
        
    </Box >
  )
}

export default AdditionalInfoForm