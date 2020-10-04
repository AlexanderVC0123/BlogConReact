import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';



class Blog extends Component {

    /* state = {
        articles: {},
        status: null
    } */

    render() {

        /* axios.get("http://localhost:3900/api/articles")
            .then(res => {
                console.log(res.data);
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
            }) */

        return (

            <div id="blog">
                <Slider
                    title="Blog"
                    size="slider-small"
                />
                <div className="center">

                    <div id="content">
                        //Listado de articulos que vendrán del API rest de node
                        {/* {this.state.status === 'success' &&
                            <div>
                                {this.state.articles.map((article) => {
                                    return(
                                    <h1>{article.title}</h1>)
                                    })
                                }
                            </div>
                        } */}
                        
                        <Articles></Articles>
                        
                    </div>
                    <Sidebar 
                        blog="true"
                    />

                </div> {/*END de Center*/}

            </div>
        )
    }
}
export default Blog;