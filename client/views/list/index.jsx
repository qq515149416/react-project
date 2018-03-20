import React from "react";
import PropTypes from 'prop-types';
import {AppStore} from "../../store/store";
import {Helmet} from "react-helmet";
import {
    observer,
    inject
} from "mobx-react";
@inject("appStore") @observer
export default class List extends React.Component {
    asyncBootstrap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.props.appStore.num=4;
                resolve(true);
            },1000);
        })
    }
    componentDidMount() {
         // do somethink here
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>My Title</title>
                    <meta name="description" content="" />
                    <meta name="keywords" content=""/>
                </Helmet>
                {this.props.appStore.msg}
            </div>
        );
    }
}
List.propTypes = {
    appStore: PropTypes.instanceOf(AppStore)
};