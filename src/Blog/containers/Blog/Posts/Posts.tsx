import React, { Component } from 'react';
import Post from "../../../components/Post/Post";
import axiosInstance from "../../../axios-blog";
import classes from "./Posts.module.css";
import { Route, RouteComponentProps } from "react-router-dom";
import FullPost from "../FullPost/FullPost";

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
    author: string;
}

interface IBlogState {
    selectedPostId: number | null;
    posts: IPost[]
}

interface IPostsProps extends RouteComponentProps {
    test?: number
}

class Posts extends Component<IPostsProps> {
    state: IBlogState = {
        posts: [],
        selectedPostId: null,
    };


    postSelectedHandler = (id: number) => {
        this.props.history.push({
            pathname: '/posts/' + id,

        });
        // this.setState({ selectedPostId: id });
    };


    private async loadData() {
        const response = await axiosInstance.get('/posts');
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post: IPost) => {
            return {
                ...post,
                author: 'Max',
            };
        });
        this.setState({ posts: updatedPosts });
    }

    async componentDidMount() {
        await this.loadData();
    }

    render() {
        const posts = this.state.posts.map(postData => {
            const onClick = () => this.postSelectedHandler(postData.id);

            return (
                <Post key={postData.id}
                      title={postData.title}
                      author={postData.author}
                      onClick={onClick} />);
        });

        return (
            <>
                <section className={classes.Posts} >
                    {posts}
                </section >
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </>
        );
    }
}

export default Posts;