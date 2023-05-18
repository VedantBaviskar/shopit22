import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'

import { countries } from 'countries-list'
import CheckoutSteps from './CheckoutSteps'

import { saveShippingInfo } from '../../actions/cartActions'

const Shipping = () => {

    const { user } = useSelector(state => state.auth)

    const [address, setAddress] = useState(user.address)
    const [city, setCity] = useState(user.city)
    const [postalCode, setPostalCode] = useState(user.postalCode)
    const [phoneNo, setPhoneNo] = useState(user.phoneNo)
    const [country, setCountry] = useState(user.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countriesList = Object.values(countries)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country }))
        navigate('/order/confirm')
    }

  return (
    <Fragment>

    <MetaData title={'Shipping Info'} />

    <CheckoutSteps shipping />

    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Shipping Info</h1>
                <div className="form-group">
                    <label htmlFor="address_field">Address</label>
                    <input
                        type="text"
                        id="address_field"
                        className="form-control"
                        defaultValue={user.address}
                        maxLength= "100"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city_field">City</label>
                    <input
                        type="text"
                        id="city_field"
                        className="form-control"
                        defaultValue={user.city}
                        maxLength= "30"
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone_field">Phone No</label>
                    <input
                        type="number"
                        id="phone_field"
                        className="form-control"
                        defaultValue={user.phoneNo}
                        max= "9999999999"
                        min= "1000000000"
                        onChange={(e) => setPhoneNo(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="postal_code_field">Postal Code</label>
                    <input
                        type="number"
                        id="postal_code_field"
                        className="form-control"
                        defaultValue={user.postalCode}
                        max= "999999"
                        min= "100000"
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="country_field">Country</label>
                    <select
                        id="country_field"
                        className="form-control"
                        defaultValue={user.country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >

                        {countriesList.map(country => (
                            <option key={country.name} value={country.name}>
                                {country.name}
                            </option>
                        ))}

                    </select>
                </div>

                <button
                    id="shipping_btn"
                    type="submit"
                    className="btn btn-block py-3"
                >
                    CONTINUE
                    </button>
            </form>
        </div>
    </div>

</Fragment>
  )
}

export default Shipping