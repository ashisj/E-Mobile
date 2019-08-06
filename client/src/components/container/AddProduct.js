import React, { Component,Fragment } from 'react'
import {addProduct} from '../../store/actions';
import {connect} from 'react-redux';
//import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
//import {Link} from 'react-router-dom'

export class AddProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            product : {
                title:'',
                image:'Choose file',
                imageFiles:[],
                price:'',
                company:'',
                info:''
            },
            error : {
                title: '',
                image: '',
                price: '',
                company: '',
                info: '',
            }
        }
    }

    handleChange = (e) => {
        let product = this.state.product;
        if(e.target.id === 'image'){
            const files = e.target.files;
            let fileName = ''
            for(let file of files){
                fileName += file.name + ','
                //imageFile.push(file);
            }
            fileName = fileName.slice(0,-1);
            product[[e.target.id]] = fileName;
            product.imageFiles = files;
            
        } else {
            product[[e.target.id]] = e.target.value
        }
        this.setState({
            product
        });
    }

    checkValidity = (e) => {
        const name = e.target.id;
        const value = e.target.value.trim();
        const error = this.state.error;

        if(value === ''){
            error[[name]] = 'Please fill this field'
        }

        this.setState({
            error
        });
    }

    clearError = (e) => {
        const name = e.target.id;
        const error = this.state.error;
        error[[name]] = '';

        this.setState({
            error
        });
    }

    submitProduct = (e) => {
        e.preventDefault();
        //this.checkValidity()
        const {title,price,company,info} = this.state.error;
        const product = {...this.state.product}

        if(title === '' && price === '' && company === '' && info === ''){  
            const formData = new FormData();
            
            for(const key of Object.keys(product)){
                if(!(key === 'image' || key === 'imageFiles')){
                    formData.append(key, product[key]);
                }
            }

            for(const file of product.imageFiles){
                formData.append('imageFiles',file);
            }

            this.props.addProduct(formData);

            for(const key of Object.keys(product)){
                if(key === 'image'){
                    product[key] = 'Choose file'
                } else {
                    product[key] = ''
                }
            }
            this.setState({
                product
            });
        }
    }

    render() {
        const {successMessage} = this.props;
        const {product,error} = this.state;
        return (
            <Fragment>
                <div className='row'>
                    <div className='col-10 col-md-6 offset-md-3'>
                        <div className='center-align'>
                            <div className='row'>
                            <span className='text-success mb-5 ml-5'>
                                { ReactHtmlParser(successMessage) }
                            </span>
                            </div>
                            <div className='card'>
                                <div className='card-header'>
                                    <h3 className='text-center'>Add New Product</h3>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={this.submitProduct}>

                                        {/* input for title */}
                                        <div className='form-group'>
                                            <label htmlFor='title'>Title:</label>
                                            <input type='text' className='form-control' id='title' placeholder='Enter the title'
                                                value={product.title} onChange={this.handleChange} onBlur={this.checkValidity} onFocus={this.clearError} required/>
                                            <div className='text-danger'>{error.title}</div>
                                        </div>

                                        {/* input for image */}
                                        <div className="form-group">
                                            <label htmlFor='image'>Image:</label>
                                            <div className='custom-file'>
                                                <input type='file' multiple className='custom-file-input' id='image' 
                                                    onChange={this.handleChange}  onBlur={this.checkValidity} onFocus={this.clearError} required/>
                                                <label htmlFor='image' className="custom-file-label">{product.image}</label>
                                                <div className='text-danger'>{error.image}</div>
                                            </div>
                                        </div>

                                        {/* input for price */}
                                        <div className='form-group'>
                                            <label htmlFor='price'>Price:</label>
                                            <input type='number' className='form-control' id='price' placeholder='Enter the price'
                                                value={product.price} onChange={this.handleChange}  onBlur={this.checkValidity} onFocus={this.clearError} required/>
                                            <div className='text-danger'>{error.price}</div>
                                        </div>

                                        {/* input for company */}
                                        <div className='form-group'>
                                            <label htmlFor='company'>Company:</label>
                                            <input type='text' className='form-control' id='company' placeholder='Enter the Company'
                                                value={product.company} onChange={this.handleChange} onBlur={this.checkValidity} onFocus={this.clearError} required/>
                                            <div className='text-danger'>{error.company}</div>
                                        </div>

                                        {/* input for info */}
                                        <div className='form-group'>
                                            <label htmlFor='info'>Information:</label>
                                            <textarea className='form-control' id='info' placeholder='Enter more Information'
                                                value={product.info} onChange={this.handleChange} onBlur={this.checkValidity} onFocus={this.clearError} required/>
                                            <div className='text-danger'>{error.info}</div>
                                        </div>

                                        <button type='submit' className='btn btn-primary btn-block'>Add Product</button>
                                    </form> {/* form */}
                                </div> {/* card body */}
                            </div>{/* card */} 
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

// AddProduct.propTypes = {
//     successMessage : PropTypes.
//      addProduct : PropTypes.func.isRequired
// }

const mapStateToProps = state => ({
    successMessage: state.product.successMessage
});

export default connect(mapStateToProps,{addProduct})(AddProduct)
