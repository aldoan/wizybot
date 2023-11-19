import { useState, useEffect } from 'react'
import ProductService from '../../services/ProductService'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import Button from '@mui/material/Button'
import './AdditionalInfoForm.css'

function AdditionalInfoForm() {

const [products, setProducts] = useState<string[]>([])
const [productSelectedForTags, setProductSelectedForTags] = useState<string[]>([])
const [tags, setTags] = useState<string[]>([])
const [topic, setTopic] = useState<string>('')
const [topicInfo, setTopicInfo] = useState<string>('')
const [productSelectedForInfo, setProductSelectedForInfo] = useState<string[]>([])
const [productsInfo, setProductsInfo] = useState<string>('')

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

  const handleSubmit =  (evt:React.FormEvent) => {
    evt.preventDefault()
    
    console.log("Products Selected For Tags: ", productSelectedForTags)
    console.log("Tags: ", tags)
    console.log("Topic: ", topic)
    console.log("Topic Info: ", topicInfo)
    console.log("Products Selected For Info: ", productSelectedForInfo)
    console.log("productsInfo: ", productsInfo)

  }

  return (
    <form 
      action=''
      method='POST'
      onSubmit={ evt => handleSubmit(evt) } >
      <h1>Aditional Information</h1>
      <p>Improve  your customer support by supplementing Wizybot's knowledge with specific product info, policies and unique details.</p>
      <h3>Add product tags</h3>
      <Autocomplete
        multiple
        id="product-select-for-tags"
        options={products}
        onChange={(event, newValue: string[]) => { setProductSelectedForTags(newValue) }}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Products" 
            placeholder="Select products..."/>
        )}
        renderOption={(props, option, state) => {
          const key = `listItem-${state.index}`
          return (<li {...props} key={key}> {option} </li>)
        }}
      />

      <Autocomplete
        multiple
        id="product-tags"
        freeSolo
        options={[]}
        onChange={(event, newValue: string[]) => { setTags(newValue)}}
        renderInput={(params) => <TextField {...params} label="Tags" />}
      />

      <h3>Add topic info</h3>
      <TextField 
        id="topic" 
        label="Topic" 
        variant="outlined" 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setTopic(event.target.value)}}
      />
      <TextField
          id="topic-info"
          label="Topic Info"
          multiline
          minRows={3}
          maxRows={7}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setTopicInfo(event.target.value)}}
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
          <TextField {...params} label="Products" placeholder="Select products..." />
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
      <TextField
          id="products-info"
          label="Products Info"
          multiline
          minRows={3}
          maxRows={7}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setProductsInfo(event.target.value)}}
      /> 
      <Button variant="contained" type='submit' >Save</Button>
    </form >
  )
}

export default AdditionalInfoForm