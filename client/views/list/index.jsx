import React from "react";
import PropTypes from 'prop-types';
import {AppStore} from "../../store/app-store";
import {
    observer,
    inject
} from "mobx-react";
@inject("appStore") @observer
export default class List extends React.Component {
    componentDidMount() {
         // do somethink here
    }

    render() {
        return (
            <div>
                {this.props.appStore.msg}
            </div>
        );
    }
}
List.propTypes = {
    appStore: PropTypes.instanceOf(AppStore).isRequired
};