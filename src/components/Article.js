import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../components/Global';
import Sidebar from './Sidebar';

class Article extends Component {

    url = Global.url;

    state = {
        article: {},
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
    }

    render() {

        var article = this.state.article;

        return (
            <div className="center">
                <section id="content">

                    {this.state.article &&
                        <article className="article-item article-detail" id="article-template">
                            <div className="image-wrap">
                                <img src="https://www.exoticca.com/blog/wp-content/uploads/2019/05/viajes-a-playas-paradis%C3%ADacas-930x360.jpg" alt="Playa" />
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                Hace 5 minutos
                            </span>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget aliquet turpis, at ultricies nisi. Nulla quam erat, tincidunt vitae venenatis scelerisque, placerat sed turpis. Morbi arcu quam, suscipit et metus eget, pretium mollis est. Aliquam quis placerat tortor. Ut sit amet laoreet lacus. Suspendisse sodales lacinia consequat. Morbi gravida, ex id laoreet interdum, justo nulla molestie ex, sit amet ornare ligula lectus eget neque. Pellentesque tincidunt tristique velit vel blandit. Nam hendrerit odio sit amet hendrerit hendrerit. Duis ultricies, orci ac vestibulum condimentum, felis nibh iaculis ante, id venenatis tortor massa eu est. Suspendisse sagittis dictum magna, et finibus tellus elementum vel. Nulla eu nunc efficitur eros auctor semper a eu erat. Cras pulvinar, eros lacinia porttitor condimentum, ipsum magna posuere ipsum, quis sagittis ex nisi sed nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ornare nec mi in auctor.
                            </p>
                            <p>
                                Integer iaculis urna mi, vel ultricies orci viverra at. Etiam odio sem, blandit vitae ligula non, semper bibendum orci. Proin vulputate enim quis odio mattis vehicula. Proin et metus congue, egestas ex ullamcorper, cursus quam. Sed ac auctor est. Integer pellentesque porttitor felis ut ullamcorper. Quisque nec mollis elit. Aliquam pulvinar congue nulla, nec pretium ex lobortis a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin placerat in justo quis mollis.
                            </p>
                            <p>
                                Maecenas leo leo, sagittis ac blandit bibendum, cursus et ex. In blandit odio justo, sed ultricies mi molestie eget. Cras at tortor vitae orci rutrum molestie. Ut at tincidunt est. Donec a efficitur mauris. Nullam aliquet fermentum tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus gravida lacus augue, ac pharetra turpis laoreet sed. Duis fermentum interdum dignissim. Mauris gravida euismod feugiat. Donec at arcu leo.
                            </p>
                            <div class="clearfix"></div>
                        </article>

                    }



                </section>
                <Sidebar />
            </div>
        )
    }
}

export default Article;