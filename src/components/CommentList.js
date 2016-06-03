import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'
import NewCommentForm from './NewCommentForm'
import { loadArticleComments } from '../AC/comments'

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array
    };

    componentWillReceiveProps(newProps) {
        const { isOpen, article } = newProps
        const { id } = article
        const commentsLoading = article.comments.loading
        const comments = article.getRelation('comments')
        // commentsLoaded === undefined можно, но это неочевидно и небезопасно, лучше ставить более явный флаг, типа !commentsLoading
        const commentsLoaded = comments.every((comment) => comment != undefined)

        if (isOpen && !commentsLoaded &&!commentsLoading) loadArticleComments({ id })
    }

    render() {
        return (
            <div>
                {this.getToggler()}
                {this.getList()}
            </div>
        )
    }

    getToggler() {
        const { isOpen, toggleOpen } = this.props
        const text = isOpen ? 'hide comments' : 'show comments'
        return <a href = "#" onClick = {toggleOpen}>{text}</a>
    }

    getList() {
        const { isOpen, article } = this.props
        const commentsLoading = article.comments.loading
        const comments = article.getRelation('comments')
        if (!isOpen) return null
        if (!comments || !comments.length || comments.some((comment) => comment === undefined)) {
            return <h3>{commentsLoading ? 'Loading...' : 'No comments yet'}</h3>
        }
        const items = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)
        return <ul>
            {items}
            <li><NewCommentForm articleId = {article.id} /></li>
        </ul>
    }
}

export default toggleOpen(CommentList)
