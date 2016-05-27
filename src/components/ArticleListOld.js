import React, { PropTypes, Component } from 'react'
import Article from './Article'
import Chart from './Chart'
import accordion from '../mixins/accordion'

const ArticleListOld = React.createClass({
    mixins: [accordion],

    render() {
        const { articles } = this.props
        const articleItems = articles.map((article) => <li key={article.id}>
            <Article article = {article}
                isOpen = {article.id == this.state.openedArticle}
                toggleOpen = {this.openArticle(article.id)}
            />
        </li>)
        return (
            <div>
                <ul>
                    {articleItems}
                </ul>
                <Chart articles = {articles}/>
            </div>
        )
    }
});

ArticleListOld.propTypes = {
    articles: PropTypes.array.isRequired
}

export default ArticleListOld
