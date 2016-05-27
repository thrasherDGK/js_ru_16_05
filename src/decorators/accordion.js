import React, { Component } from 'react'

export default (SourceComponent) => {
  return class ComponentWithAccordion extends Component {
    state = {
        openedArticle: null
    }

    openArticle = id => ev => {
        if (ev) ev.preventDefault()
        this.setState({
            openedArticle: this.state.openedArticle == id ? null : id
        })
    }

    render() {
      return <SourceComponent {...this.props} openedArticle = {this.state.openedArticle} openArticle = {this.openArticle} />
    }
  }
}
