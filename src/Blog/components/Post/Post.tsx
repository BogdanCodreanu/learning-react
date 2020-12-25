import React from 'react';

import './Post.css';

interface IPostProps {
    author: string;
    title: string;
    onClick: () => void;
}

const Post = (props: IPostProps) => {
    const onClick = () => {
        props.onClick();
    };

    return <article className="Post" onClick={onClick} >
        <h1 >{props.title}</h1 >
        <div className="Info" >
            <div className="Author" >{props.author}</div >
        </div >
    </article >;
};


export default Post;


