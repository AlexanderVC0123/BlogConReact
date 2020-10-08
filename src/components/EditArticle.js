import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import simpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import Global from '../components/Global';
import Sidebar from './Sidebar';
import imageDefault from '../assets/images/default.png';


//1. Tenemos que recoger el id del articulo a editar de la url 
//2. Crear un metodo para sacar ese objeto del backend
//3. Repoblar /rellenar el formulario con esos datos
//4. Actualizar el objeto haciendo una petición al backend

class EditArticle extends Component {

    url = Global.url;

    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {

        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
        this.validator = new simpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            })
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();

        //Rellenar state con formulario
        this.changeState();

        if (this.validator.allValid()) {

            //Petición http por post para guardar el articulo
            axios.put(this.url+'article/'+this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {

                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo actualizado',
                            'El artículo ha sido actualizado correctamente',
                            'success'
                        )

                        //Subir la imagen 
                        if (this.state.selectedFile !== null) {

                            //Sacar el id del artículo guardado
                            var articleId = this.state.article._id;

                            //Crear un form data y añadir fichero
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            )

                            //Petición ajax
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        })
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        })
                                    }
                                })

                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    render() {

        if (this.state.status === 'success') {
            return (
                <Redirect to="/blog" />
            )
        }

        var article = this.state.article;

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">
                        Editar artículo
                    </h1>

                    {this.state.article.title &&

                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState} />

                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="fail0" onChange={this.fileChange} />
                                <div className="image-wrap">
                                    {
                                        article.image !== null ? (
                                            <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                        ) : (
                                                <img src={imageDefault} alt={article.title} />
                                            )
                                    }
                                </div>

                            </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="guardar" className="btn btn-success" />
                        </form>
                    }

                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>

                <Sidebar />
            </div>
        )
    }
}

export default EditArticle;