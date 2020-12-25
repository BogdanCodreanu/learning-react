import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';
import { IPost } from '../Posts/Posts';
import { RouteComponentProps } from "react-router";

interface IFullPostProps extends RouteComponentProps<{ id?: string }> {
    selectedPostId: number | null
}

interface IFullPostState {
    loadedPost: IPost | null;
}

class FullPost extends Component<IFullPostProps> {
    state: IFullPostState = {
        loadedPost: null,
    };

    async componentDidMount() {
        await this.LoadPost();
    }

    async componentDidUpdate() {
        await this.LoadPost();
    }


    private async LoadPost() {
        if (!this.state.loadedPost ||
            this.props.match.params.id !==
            this.state.loadedPost.id.toString()) {

            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/posts/' +
                this.props.match.params.id);
            this.setState({ loadedPost: response.data });
        }
    }

    deletePostHandler = async () => {
        const response = await axios.delete('https://jsonplaceholder.typicode.com/posts/' +
                                            this.props.selectedPostId);
    };

    render() {
        let post = <p style={{ textAlign: 'center' }} >Please select a Post!</p >;
        if (this.props.selectedPostId) {
            post = <p style={{ textAlign: 'center' }} >Loading</p >;
        }

        if (this.state.loadedPost) {
            return (
                <div className="FullPost" >
                    <h1 >{this.state.loadedPost?.title}</h1 >
                    <p >{this.state.loadedPost?.body}</p >
                    <div className="Edit" >
                        <button className="Delete"
                                onClick={this.deletePostHandler} >Delete
                        </button >
                    </div >
                </div >

            );
        }
        return post;
    }
}

export default FullPost;


