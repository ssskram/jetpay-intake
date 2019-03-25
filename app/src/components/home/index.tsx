import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'
import IntakeForm from '../form'
import SubmitStatus from './submitStatus'

type props = {
    user: types.user
}

type state = {
    success: boolean
}

export class Home extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            success: undefined
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.success != prevState.success) {
            window.scrollTo(0, 0)
        }
    }

    throwSuccess = async (success: boolean) => {
        this.setState({ success })
    }

    render() {
        return (
            <div className='col-md-6 col-md-offset-3' style={{ padding: '25px 0px 100px 0px' }}>
                <div className='text-center'>
                    <h1 style={{ color: '#53B948' }} className='ubuntu'>Ready for JetPay?</h1>
                    <h3>Submit this application for your new credit card reader</h3>
                    <br />
                </div>
                <IntakeForm
                    returnSuccess={this.throwSuccess.bind(this)}
                    user={this.props.user}
                />
                {this.state.success != undefined &&
                    <SubmitStatus
                        status={this.state.success}
                        closeModal={() => this.setState({ success: undefined })}
                    />
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user
    }),
    ({
        ...user.actionCreators
    })
)(Home as any)