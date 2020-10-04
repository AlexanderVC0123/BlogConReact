import React, { Component } from 'react';
import axios from'axios';
import Global from './Global';

class Articles extends Component{

    url = Global.url;

    state = {
        articles: [],
        status:null
    }

    componentWillMount(){
        this.getArticles();
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
                    <article className="article-item" id="article-template">
                        <div className="image-wrap">
                            <img src="https://www.exoticca.com/blog/wp-content/uploads/2019/05/viajes-a-playas-paradis%C3%ADacas-930x360.jpg" alt="Playa" />
                        </div>
        
                        <h2>{article.title}</h2>
                        <span className="date">
                            {article.date} 
                        </span>
                        <a href="#">Leer más</a>
                        <div className="clearfix"></div>

                    </article>                )
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