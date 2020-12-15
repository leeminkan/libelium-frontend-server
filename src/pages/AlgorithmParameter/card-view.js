
import React, { Component } from 'react';
import { Row, Col, Collapse, Card, CardHeader, CardBody  } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import AlgorithmParameterForm from '../../components/Form/AlgorithmParameter';


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

        this.props.data.forEach((item) => {
            cardView.push(
                <Col sm={6}>
                    <Card className="algorithm-parameter-card" key={item.waspmote_id}>
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
                                        onSubmit={(values ) => {
                                        console.log(values);
                                    }}
                                        form={`AlgorithmParameter_${item.waspmote_id}`}
                                        initialValues={{
                                            window_size: item.window_size,
                                            saving_level: item.saving_level,
                                            time_base: item.time_base,
                                            is_disabled: item.is_disabled,
                                        }}/>
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
    return state.AlgorithmParameter;
};
  
export default withRouter(connect(mapStatetoProps, { })(CardView));

