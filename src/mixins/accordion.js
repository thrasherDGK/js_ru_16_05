export default {
  getInitialState() { return { openedArticle: null } },

  openArticle(id) {
    return ev => {
      if (ev) ev.preventDefault()
      this.setState({
          openedArticle: this.state.openedArticle == id ? null : id
      })
    }
  }
}
