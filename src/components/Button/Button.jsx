import { Component } from "react"
import {Btn} from './Button.styled';

export class Button extends Component {
    render () {
    return (
        <Btn type="button"  onClick={this.props.loadMore} >
            Load more
        </Btn>
    )
}}