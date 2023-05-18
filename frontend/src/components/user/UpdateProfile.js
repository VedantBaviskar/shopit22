import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert} from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'

import { countries } from 'countries-list'

import {updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = () => {

    const { user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState(user.address)
    const [city, setCity] = useState(user.city)
    const [postalCode, setPostalCode] = useState(user.postalCode)
    const [phoneNo, setPhoneNo] = useState(user.phoneNo)
    const [country, setCountry] = useState(user.country)

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
  
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countriesList = Object.values(countries)

    useEffect(() => {

        if(user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
            setAddress(user.address)
            setCity(user.city)
            setPostalCode(user.postalCode)
            setPhoneNo(user.phoneNo)
            setCountry(user.country)
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser())

            navigate('/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, user, alert, error, navigate, isUpdated])
    
    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('avatar', avatar)
        formData.set('address', address) 
        formData.set('city', city) 
        formData.set('postalCode', postalCode) 
        formData.set('phoneNo', phoneNo)
        formData.set('country', country) 
        dispatch(updateProfile(formData))
    }

    const onChange = e => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

  return (
    <Fragment>
        <MetaData title={'Update Profile'} />

        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                maxLength= "30"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {user.role !== 'admin' && (
                        <div>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                maxLength= "100"
                                onChange={(e) => setAddress(e.target.value)}                              
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                maxLength= "30"
                                onChange={(e) => setCity(e.target.value)}                       
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="number"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}                           
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}                        
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}              
                            >

                                {countriesList.map(country => (
                                <option key={country.name} value={country.name}>
                                    {country.name}
                                </option>
                                ))}

                            </select>
                        </div>
                        </div>)}

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" 
                        disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile