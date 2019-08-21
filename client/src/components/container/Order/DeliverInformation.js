import React, { Component } from 'react'
import {addDeliveryData} from '../../../store/actions';
import {connect} from 'react-redux';

export class DeliverInformation extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            deliveryInfo:{
                name: '',
                address: '',
                state: '',
                dist: '',
                city: '',
                pincode: ''
            }
        }
    }
    
    componentDidMount(){
        const {name,address,state,dist,city,pincode} = this.props.deliveryInfo || '';
        const deliveryInfo = {
            name: name || '',
            address: address || '',
            state: state || '',
            dist: dist || '',
            city: city || '',
            pincode: pincode || ''
        }
        this.setState({
            deliveryInfo
        });        
    }
    handleChange = (e) => {
        const deliveryInfo = this.state.deliveryInfo;
        deliveryInfo[[e.target.id]] = e.target.value
        
        this.setState({
            deliveryInfo
        });
    }

    submitDetails = (e) => {
        e.preventDefault();
        const {deliveryInfo} = this.state;
        const {name,address,state,dist,city,pincode} = deliveryInfo;

        if(name.trim().length && address.trim().length && state.trim().length && dist.trim().length && city.trim().length && pincode.trim().length){
            this.props.addDeliveryData(deliveryInfo);
        }
    }
    
    render() {
        const {deliveryInfo} = this.state

        return (
            <>
                <form onSubmit={this.submitDetails}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' className='form-control' id='name' placeholder='Enter your name'
                            value={deliveryInfo.name} onChange={this.handleChange} required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='address'>Address:</label>
                        <textarea type='text' className='form-control' id='address' placeholder='Enter your address'
                        value={deliveryInfo.address} onChange={this.handleChange} required/>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className='form-group'>
                                <label htmlFor='state'>State:</label>
                                <input type='text' className='form-control' id='state' placeholder='Enter your state'
                                    value={deliveryInfo.state} onChange={this.handleChange} required/>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className='form-group'>
                                <label htmlFor='district'>District:</label>
                                <input type='text' className='form-control' id='dist' placeholder='Enter your district'
                                    value={deliveryInfo.dist} onChange={this.handleChange} required/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className='form-group'>
                                <label htmlFor='city'>City:</label>
                                <input type='text' className='form-control' id='city' placeholder='Enter your city'
                                    value={deliveryInfo.city} onChange={this.handleChange} required/>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className='form-group'>
                                <label htmlFor='pincode'>Pincode:</label>
                                <input type='number' className='form-control' id='pincode' placeholder='Enter your pincode'
                                    value={deliveryInfo.pincode} onChange={this.handleChange} required/>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary btn-block'>Add Details</button>
                </form>  
            </>
        )
    }
}

const mapStateToProps = state => ({
    deliveryInfo : state.order.deliveryInfo
});

export default connect(mapStateToProps,{addDeliveryData})(DeliverInformation);
