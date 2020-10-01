import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider'
import Sidebar from './Sidebar';


class Peliculas extends Component {

    state = {
        peliculas: [

            { titulo: 'Batman vs Superman', image: 'https://i1.wp.com/www.vinilonegro.com/wp-content/uploads/2016/03/Batman-v-Superman-3-e1459165974655.jpg?fit=600%2C400&ssl=1' },
            { titulo: 'Gran Torino', image: 'https://www.marquid.com/wp-content/uploads/2015/05/gran-torino.jpg' },
            { titulo: 'La chaqueta metalica', image: 'https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/04/16/Recortada/img_djuarez_20180416-085205_imagenes_lv_otras_fuentes_coronel-kg4F-U442616213405eNF-992x558@LaVanguardia-Web.jpg' }

        ],
        nombre: 'Alexander Valladares',
        favorita: ''
    };

    cambiarTitulo = () => {

        var { peliculas } = this.state;
        peliculas[0].titulo = "Batman Begins"

        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log("Favorita Marcada")
        console.log(pelicula, indice)
        this.setState({
            favorita: pelicula
        })
    }

    render() {
        var pStyle = {
            background: 'blue',
            color: 'white',
            padding: '10px'
        }

        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La película favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            )
        } else {
            favorita = (<p>No tiene pelicula favorita</p>)
        }

        return (

            <React.Fragment>
                <Slider
                    title="Peliculas"
                    size="slider-small"
                />

                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de peliculas</h2>
                        <p>Selección de peliculas favoritas de {this.state.nombre}</p>
                        <p><button onClick={this.cambiarTitulo}>Cambiar titulo de Batman</button></p>

                        {/** 
                    this.state.favorita.titulo ? (
                    <p className = "favorita" style = {pStyle}>
                    <strong>La película favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                    </p>
                    ) : (
                        <p>No tiene pelicula favorita</p>
                    )
                */}

                        {favorita}

                        {/**Crear componente pelicula */}

                        <div id="articles">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div >
                <Sidebar 
                        blog="false"
                    />
            </React.Fragment>
        )
    }
}
export default Peliculas;