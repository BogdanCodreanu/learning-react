import React, { Component, Suspense } from 'react';
import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts';
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter, NavLink } from "react-router-dom";
import classes from "./Blog.module.css";

// const Posts = React.lazy(() => import('./Posts/Posts'));

class Blog extends Component {
    render() {

        const activeLinkStyle = {
            color: "#fa923f",
        };

        return (
            <BrowserRouter >
                <div className={classes.Blog} >
                    < header >
                        <nav >
                            <ul >
                                <li ><NavLink to={'/posts'}
                                              activeStyle={activeLinkStyle} >Home</NavLink >
                                </li >
                                <li ><NavLink to='/new-post'
                                              exact
                                              activeStyle={activeLinkStyle} >New
                                    Post</NavLink >
                                </li >
                            </ul >
                        </nav >
                    </header >
                    <Switch >
                        <Route path="/new-post" component={NewPost} />
                        <Route path="/posts" component={Posts} />
                        <Redirect to='/posts' exact from='/' />
                        <Route render={() => <h1 >Not Found</h1 >} />
                    </Switch >
                </div >
            </BrowserRouter >
        );
    }
}

export default Blog;