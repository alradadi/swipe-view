import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
// import { virtualize } from 'react-swipeable-views-utils';
import { CircularProgress } from 'material-ui/Progress';
import { blue } from 'material-ui/colors';
import Card, { CardImage, CardBody, CardFooter } from './Card';


// const VirtualizeSwipeableViews = virtualize(SwipeableViews);


class TestCard extends Component {
    shouldComponentUpdate(nextProps, nextState){
        console.log(this.props, nextProps);
        console.log(this.state, nextState);
        return false;
    }
    render() {
        console.log('TEST CARD');
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

class SwipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: false,
        };

        this.styles = {
            swipeViewRoot: {
                height: '100%',
                boxShadow: '0 5px 8px rgba(0, 0, 0, 0.19), 0 1px 3px rgba(0, 0, 0, 0.23)',
            },
            swipeViewContainer: {
                height: '100%',
            },
            slideStyle: {
                display: 'flex',
                justifyContent: 'center',
                padding: 10,
                width: 'calc(100% - 20px)',
            },
        };

        this.listItems = this.listItems.bind(this);
        // this.slideRenderer = this.slideRenderer.bind(this);

        this.fetchData();
    }


    // slideRenderer({ key, index }) {
    //     //console.log(key, index);
    //     return (
    //
    //         <Slide key={key} index={index}/>
    //     );
    // }

    async fetchData() {
        try {
            const response = await fetch('https://renthoop-production.appspot.com/_ah/api/renthoopendpoint/v1/potentialroommate/181004659047340?latitude=34.072926&longitude=-118.442986&state=CA&locality=West%20Hollywood&radius=32000.000000');
            const reponseJson = await response.json();
            console.log(reponseJson);
            const images = [];
            for (const item of reponseJson.items) {
                images.push(`https://graph.facebook.com/${item.potentialRoommate.userID}/picture?width=400&height=400`);
            }
            // this.setState({ loading: false, images });
        } catch (error) {
            console.log(error);
        }
    }

    listItems() {
        return this.state.images.map(img =>
            (
                <Card key={img}>
                    <CardImage src={img}/>
                    <CardBody>Hello,
                        I am the cofounder and CTO of RentHoop. Please feel free to swipe right if you would like to
                        provide any feedback about the app or simply say </CardBody>
                    <CardFooter/>
                </Card>
            ));
    }

    test() {
        console.log('##############');
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i =>
            (
                <TestCard key={i}>{i}</TestCard>
            ));
    }

    render() {
        if (this.state.loading) {
            return (<CircularProgress size={50} style={{ color: blue[500] }}/>);
        }
        const { swipeViewRoot, swipeViewContainer, slideStyle } = this.styles;
        return (
            <SwipeableViews style={swipeViewRoot} containerStyle={swipeViewContainer} slideStyle={slideStyle}>
                {this.test()}
            </SwipeableViews>
        );
    }
}

export default SwipeView;
