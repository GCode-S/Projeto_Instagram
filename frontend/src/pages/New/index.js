import React, { Component } from 'react';

import './styles.css';
import api from '../../services/api';

export default class New extends Component {

  state={
    image: null,
    author: '',
    place: '',
    description:'',
    hashtags:'',
  }

  ChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  }

  Change = e =>{
    this.setState({ [e.target.name]: e.target.value });
  }

  Submit = async e => {
    e.preventDefault();
    const dados = new FormData();

    dados.append('image',this.state.image);
    dados.append('author',this.state.author);
    dados.append('place',this.state.place);
    dados.append('description',this.state.description);
    dados.append('hashtags',this.state.hashtags);

    await api.post('posts', dados);

    this.props.history.push('/');
  } 

  render() {
    return (
      <form onSubmit={this.Submit} id="post">
          <div className="ground">
            <input type="file" onChange={this.ChangeImage} accept="image/*"/>

            <input type="text" name="author" placeholder="Digite seu nome."  onChange={this.Change} value={this.state.author} />

            <input type="text" name="place" placeholder="Digite o nome da sua cidade."  onChange={this.Change} value={this.state.place} />

            <input type="text" name="description" placeholder="Digite aqui a descrição da foto"  onChange={this.Change} value={this.state.description} />

            <input type="text" name="hashtags" placeholder="Digite aqui sua(s) hashtag(s)"  onChange={this.Change} value={this.state.hashtags} />

            <button type="submit">
                Enviar
            </button>
          </div>
      </form>
    );
  }
}
