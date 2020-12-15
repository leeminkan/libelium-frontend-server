
import React, { Component } from 'react';
import { Row, Col, Collapse, Card, CardHeader, CardBody  } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';


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
                <Card key={item.waspmote_id}>
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
                                {item.id}
                            </Row>
                        </Collapse>
                    </CardBody>
                </Card>
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

