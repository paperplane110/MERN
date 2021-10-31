const initialIssues = [
  {
  id: 1,
  status: 'New',
  owner: 'Ravan',
  effort: 5,
  created: new Date('2018-08-15'),
  due: undefined,
  title: 'Error in console when clicking Add',
  },
  {
  id: 2,
  status: 'Assigned',
  owner: 'Eddie',
  effort: 14,
  created: new Date('2018-08-16'),
  due: new Date('2018-08-30'),
  title: 'Missing bottom border on panel',
  },
];


const sampleIssue = {
  status: 'New',
  owner: 'Pieta',
  title: 'Completion date should be optional'
}


class IssueFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the issueFilter</div>
    )
  }
}

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue
    const statusClass = issue.status.toLowerCase()
    return (
      <tr className={statusClass}>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toLocaleDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toLocaleDateString() : 'Undefined'}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }
}

class IssueTable extends React.Component {
  constructor () {
    super()
    this.state = { issues: [] }
    setTimeout(() => {
      this.createIssue(sampleIssue)
    }, 2000)
  }
  loadData() {
    setTimeout(() => {
      this.setState({ issues: initialIssues })
    }, 500)
  }
  componentDidMount() {
    this.loadData()
  }
  createIssue(issue) {
    issue.id = this.state.issues.length + 1
    issue.created = new Date()
    const newIssueList = this.state.issues.slice()
    newIssueList.push(issue)
    this.setState({ issues: newIssueList})
  }

  render() {
    console.count('Render times: ')
    const issueRows = this.state.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    )
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Due Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
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
