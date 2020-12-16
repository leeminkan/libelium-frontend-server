
import React, { Component } from 'react';
import { Row, Col, Collapse, Card, CardHeader, CardBody  } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import AlgorithmParameterForm from '../../components/Form/AlgorithmParameter';

// actions
import { addAlgorithmParameter } from "../../store/actions";

class CardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: []
        };
    }

    customSetState = (state) => {
        this.setState({
            ...this.state,
            ...state
        })
    }

    collapse = (value) => {
        if (!this.state.collapse.includes(value)) {
            this.state.collapse.push(value);
        } else {
            let index = this.state.collapse.indexOf(value);
            this.state.collapse.splice(index, 1);
        }
        this.customSetState({
            collapse: this.state.collapse
        });
    }

    renderCards = () => {
        let cardView = [];

        this.props.devices.forEach((item) => {
            let finded = this.props.data.find(e => {
                return e.waspmote_id === item.waspmote_id;
            })
            
            const initialValues = finded ? {
                waspmote_id: item.waspmote_id,
                window_size: finded.window_size,
                saving_level: finded.saving_level,
                time_base: finded.time_base,
                is_disabled: finded.is_disabled,
            } : {
                waspmote_id: item.waspmote_id,
            };

            cardView.push(
                <Col key={item.waspmote_id} sm={6}>
                    <Card className="algorithm-parameter-card">
                        <CardHeader>
                            <div onClick={() => {
                                this.collapse(item.waspmote_id)
                            }}>
                                {item.waspmote_id}
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Collapse isOpen={!this.state.collapse.includes(item.waspmote_id)}>
                                <Row>
                                    <AlgorithmParameterForm 
                                        onSubmit={(values) => {
                                        console.log(values);
                                        this.props.addAlgorithmParameter(this.props.history, values, item.waspmote_id)
                                    }}
                                        waspmote_id={item.waspmote_id}
                                        form={`AlgorithmParameter_${item.waspmote_id}`}
                                        initialValues={initialValues}
                                        loading={this.props.loading[`ADD_ALGORITHM_PARAMETER_${item.waspmote_id}`]}/>
                                </Row>
                            </Collapse>
                        </CardBody>
                    </Card>
                </Col>
            );
        });
        return cardView;
    }


    render() {

        return (
            <React.Fragment>
                {this.renderCards()}
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return {...state.AlgorithmParameter, devices: state.Device.data};
};
  
export default withRouter(connect(mapStatetoProps, { addAlgorithmParameter })(CardView));

