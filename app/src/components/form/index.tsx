import * as React from 'react'
import Input from '../formElements/input'
import Textarea from '../formElements/textarea'
import Select from '../formElements/select'
import * as Selects from './selects'
import * as types from '../../store/types'
import Post from './post'
import Spinner from '../utilities/spinner'

type props = {
    user: types.user
    returnSuccess: (success: boolean) => void
}

type state = {
    spinner: boolean
    department: select
    cashClosings: string
    paymentTypes: string
    customerFacing: select
    onlineOrCounter: string
    listComputers: string
}

type select = { label: string, value: string}

export default class Form extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            spinner: false,
            department: undefined,
            cashClosings: '',
            paymentTypes: '',
            customerFacing: undefined,
            onlineOrCounter: '',
            listComputers: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    submit() {
        this.setState ({
            spinner: true
        }, async () => {
            // communicate success/failure
            let success = true
            success = await Post(this.state, this.props.user)
            if (success == true) {
                this.props.returnSuccess(true)
            } else {
                this.props.returnSuccess(false)
            }
            this.setState ({
                spinner: false,
                department: null,
                cashClosings: '',
                paymentTypes: '',
                customerFacing: null,
                onlineOrCounter: '',
                listComputers: ''
            })
        })
    }

    render() {

        const enabled = 
            this.state.department != undefined &&
            this.state.cashClosings != '' &&
            this.state.paymentTypes != '' &&
            this.state.customerFacing != undefined &&
            this.state.listComputers != ''

        return (
            <div>
                <Select
                    value={this.state.department}
                    placeholder='Select department'
                    header='What is your department?'
                    options={Selects.Departments}
                    multi={false}
                    onChange={department => this.setState({ department })}
                    required={false}
                />
                <Input
                    value={this.state.cashClosings}
                    header="Who is responsible for cash closings in your department?"
                    placeholder="Enter name"
                    callback={e => this.setState({ cashClosings: e.target.value })}
                    required={false}
                />
                <Textarea
                    value={this.state.paymentTypes}
                    header="Please list all forms of payment accepted."
                    placeholder="Cash? Checks? Money orders?"
                    callback={e => this.setState({ paymentTypes: e.target.value })}
                    required={false}
                />
                <Select
                    value={this.state.customerFacing}
                    placeholder='Yes or no'
                    header='Do you have a customer facing area in your department?'
                    options={Selects.YesNo}
                    multi={false}
                    onChange={customerFacing => this.setState({ customerFacing })}
                    required={false}
                />
                {this.state.customerFacing && this.state.customerFacing.value == "Yes" &&
                    <Textarea
                        value={this.state.onlineOrCounter}
                        header="Do you take payments online or at a counter in your customer facing area?"
                        placeholder="Please explain the current process"
                        callback={e => this.setState({ onlineOrCounter: e.target.value })}
                        required={false}
                    />
                }
                <Textarea
                    value={this.state.listComputers}
                    header="List the computers your department has recently received from I&P that would be
                    interacting with JetPay."
                    placeholder="Please use the computer names (i.e. FIN-00104-555WX)"
                    callback={e => this.setState({ listComputers: e.target.value })}
                    required={false}
                />
                <div className='text-center' style={{margin: '15px'}}>
                    <button 
                        className='btn btn-success' 
                        style={{minWidth: '250px', color: '#53B948', fontSize: '1.5em'}}
                        onClick={this.submit.bind(this)}
                        disabled={!enabled}>
                        <span style={{color: '#fff'}} className='ubuntu'>Submit</span>
                    </button>
                </div>
                {this.state.spinner == true &&
                    <Spinner notice='...submitting request...'/>
                }   
            </div>
        )
    }
}