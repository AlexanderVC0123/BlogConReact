import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import swal from 'sweetalert';
import Global from '../components/Global';
import Sidebar from './Sidebar';
import imageDefault from '../assets/images/default.png';
import { Link, Redirect } from 'react-router-dom';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                })
            })
            .catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    deleteArticle = (id) => {

        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado, no podrás volver a recuperar el archivo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });
                            swal(
                                'Articulo eliminado',
                                'El artículo ha sido eliminado correctamente',
                                'success'
                            );
                        });
                } else {
                    swal(
                        'Ok!',
                        'El artículo no ha sido eliminado ',
                        'success'
                    );
                }
          });



        
    
}

render() {

    if (this.state.status === 'deleted') {
        return (
            <Redirect to="/blog" />
        )
    }

    var article = this.state.article;

    return (
        <div className="center">
            <section id="content">

                {this.state.article &&
                    <article className="article-item article-detail" id="article-template">
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb"/>
                                ) : (
                                        <img src={imageDefault} alt={article.title} className="thumb"/>
                                    )
                            }                            
                        </div>

                        <h1 className="subheader">{article.title}</h1>
                        <span className="date">
                            <Moment locale='es' fromNow>{article.date}</Moment>
                        </span>
                        <p>
                            {article.content}
                        </p>

                        <Link to={"/blog/editar/"+article._id} className="btn btn-warning">Editar</Link>
                        <button onClick={
                            () => {
                                this.deleteArticle(article._id)
                            }
                        } className="btn btn-danger">Eliminar</button>

                        <div className="clearfix"></div>
                    </article>

                }

                {!this.state.article && this.state.status === "success" &&
                    <div id="article">
                        <h2 className="subheader">
                            El artículo no existe
                            </h2>
                        <p>Intentalo más tarde</p>
                    </div>
                }

                {!this.state.status == null &&
                    <div id="article">
                        <h2 className="subheader">
                            Cargando...
                            </h2>
                        <p>Espere un momento</p>
                    </div>
                }



            </section>
            <Sidebar />
        </div>
    )
}
}

export default Article;