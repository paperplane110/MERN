import React from 'react';

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

export default function IssueTable (props) {
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
