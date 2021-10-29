class IssueFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the issueFilter</div>
    )
  }
}

class IssueTable extends React.Component {
  render() {
    return (
      <div>This a placeholder for the Issue Table</div>
    )
  }
}

class IssueAdd extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the Issue Add</div>
    )
  }
}

class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable />
        <hr />
        <IssueAdd />
      </React.Fragment>
    )
  }
}

const element = <IssueList />
ReactDOM.render(element, document.getElementById('contents'))
