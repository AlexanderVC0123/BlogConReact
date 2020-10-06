import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from './Global';
import imageDefault from '../assets/images/default.png'

class Articles extends Component{

    url = Global.url;

    state = {
        articles: [],
        status:null
    }

    componentWillMount(){

        var home = this.props.home;
        var search = this.props.search;

        if(home === "true"){
            this.getLastArticles();
        }else if(search && search != null && search != undefined){
            this.getArticlesBySearch(search);
        }else{
            this.getArticles();
        }

    }

    getArticlesBySearch = (searched) => {
        //console.log("getArticles")
        axios.get(this.url+"search/"+searched)
        .then(res => {

            if(res.data.articles){
                this.setState({
                articles: res.data.articles,
                status: 'success'
                });
            }  
        })
        .catch( err  => {
            this.setState({
                articles: [],
                status: 'success'
                });
        });
    }

    getLastArticles = () => {
        //console.log("getArticles")
        axios.get(this.url+"articles/last")
        .then(res => {
            this.setState({
                articles: res.data.articles,
                status: 'success'
            });
            console.log(this.state);
        })
    }

    getArticles = () => {
        //console.log("getArticles")
        axios.get(this.url+"articles")
        .then(res => {
            this.setState({
                articles: res.data.articles,
                status: 'success'
            });
            console.log(this.state);
        })
    }

    render(){
        if(this.state.articles.length >= 1){

            var listadoArticles = this.state.articles.map((article) => {
                return(
                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={this.url+'get-image/'+article.image} alt={article.title} />
                                ) : (
                                    <img src={imageDefault} alt={article.title}/>
                                )
                            }
                        </div>
        
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale='es' fromNow date={article.date}> </Moment>
                        </span>
                        <Link to={'/blog/article/'+article._id}>Leer más</Link>
                        <div className="clearfix"></div>

                    </article>                
                )
            })

            return(
            <div id="articles">
                <h1>Listado de artículos</h1>
                {listadoArticles}
            </div>
            )
        }else if(this.state.articles.length === 0 && this.state.status === 'success'){
            return(
                <div id="articles">
                    <h2 className="subheader">No hay artículos para mostrar</h2>
                    <p>Todavía no hay contenido en esta sección</p>
                </div>
            )
        }else{
            return(
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras se carga el contenido</p>
                </div>
            )
        }
        
    };
}

export default Articles;