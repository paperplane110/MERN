/* global React ReactDOM PropTypes */

import graphQLFetch from './graphQLFetch'
class IssueFilter extends React.Component {
  render () {
    return (
      <div>This is a placeholder for the issueFilter</div>
    )
  }
}

function IssueRow (props) {
  const issue = props.issue
  const statusClass = issue.status.toLowerCase()
  return (
    <tr className={statusClass}>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toLocaleDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toLocaleDateString() : ''}</td>
      <td>{issue.title}</td>
    </tr>
  )
}

function IssueTable (props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  )
  return (
    <table className='bordered-table'>
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

class IssueAdd extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const form = document.forms.issueAdd
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
    }
    this.props.createIssue(issue)
    form.owner.value = ''
    form.title.value = ''
  }

  render () {
    return (
      <form name='issueAdd' onSubmit={this.handleSubmit}>
        <input type='text' name='owner' placeholder='Owner' />
        <input type='text' name='title' placeholder='Title' />
        <button>Add</button>
      </form>
    )
  }
}

IssueAdd.propTypes = {
  createIssue: PropTypes.func.isRequired
}

class IssueList extends React.Component {
  constructor () {
    super()
    this.state = { issues: [] }
    this.createIssue = this.createIssue.bind(this)
  }

  async loadData () {
    const query = `query {
      issueList {
        id title status owner
        created effort due
      }
    }`
    const data = await graphQLFetch(query)
    if (data) {
      this.setState({ issues: data.issueList })
    }
  }

  componentDidMount () {
    this.loadData()
  }

  async createIssue (issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`

    const data = await graphQLFetch(query, { issue })
    if (data) {
      this.loadData()
    }
  }

  render () {
    return (
      <>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </>
    )
  }
}

const element = <IssueList />
ReactDOM.render(element, document.getElementById('contents'))
