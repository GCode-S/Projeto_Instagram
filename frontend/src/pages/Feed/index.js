import React, { Component } from 'react';

import './styles.css';

import api from '../../services/api';
import io from 'socket.io-client';

import coment from '../../assets/coment.png';
import like from '../../assets/like.png';
import more from '../../assets/more.png';
import send from '../../assets/send.png';
import user from '../../assets/user.png';

export default class Feed extends Component {

    state= {
        posts: [],
    }

    async componentDidMount(){
        this.handleio();
        const res = await api.get('posts');
        this.setState({posts: res.data});

    }

    handleio = () =>{
        const socket = io('http://localhost:3333');

        socket.on('like', newLike => {
            this.setState({
                posts: this.state.posts.map(post => post._id === newLike._id ? newLike : post)
            })
        })

        socket.on('post', newPost =>{
            this.setState({posts: [newPost, ...this.state.posts]})
        });

        socket.on('delete', destroy => {
               
            const position = this.state.posts.map(post => post._id === destroy._id ? destroy : null);
       
            for (var i = 0; i < position.length; i++){
                if(position[i] != null){
                    
                    const arr = this.state.posts;
                    arr.splice(i, 1);
                    this.setState({posts: arr });
                    return
                }
            }
        });
    }

    Like = id =>{
        api.post(`posts/${id}/like`);
    }


  render() {
    return (
        <section id="post-list">
            { this.state.posts.map(post => (
                <article key={post._id}>
                <header>
                    <div className="user-info">
                        <div className="avatar">
                            <img src={user} alt="user" className="avatar-image" />
                        </div>
                        <div className="user">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>
                    </div>
                    <img src={more} alt="more" className="more"/>
                </header>

                    <img src={`http://localhost:3333/files/${post.image}`} alt=""/>
               
                <footer>
                    <div className="buttons">
                    <button onClick={() => this.Like(post._id)}>
                        <img src={like}  alt=""/>
                    </button>

                    <button>
                        <img src={coment}  alt=""/>
                    </button>
                    <button>
                        <img src={send}  alt=""/>
                    </button>
                    </div>
                    <strong>{post.likes} curtidas</strong>
                    <p>
                        {post.description}
                        <span>{post.hashtags}</span>
                    </p>
                </footer>
            </article>

            ))}
        </section>
    );
  }
}
