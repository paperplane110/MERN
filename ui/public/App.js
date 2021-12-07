"use strict";

var _graphQLFetch = _interopRequireDefault(require("./graphQLFetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the issueFilter");
  }

}

function IssueRow(props) {
  var issue = props.issue;
  var statusClass = issue.status.toLowerCase();
  return /*#__PURE__*/React.createElement("tr", {
    className: statusClass
  }, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created.toLocaleDateString()), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toLocaleDateString() : ''), /*#__PURE__*/React.createElement("td", null, issue.title));
}

function IssueTable(props) {
  var issueRows = props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.id,
    issue: issue
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    var issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
    };
    this.props.createIssue(issue);
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "owner",
      placeholder: "Owner"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Title"
    }), /*#__PURE__*/React.createElement("button", null, "Add"));
  }

}

IssueAdd.propTypes = {
  createIssue: PropTypes.func.isRequired
};

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
    this.createIssue = this.createIssue.bind(this);
  }

  loadData() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var query, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = "query {\n      issueList {\n        id title status owner\n        created effort due\n      }\n    }";
              _context.next = 3;
              return (0, _graphQLFetch.default)(query);

            case 3:
              data = _context.sent;

              if (data) {
                _this.setState({
                  issues: data.issueList
                });
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }

  componentDidMount() {
    this.loadData();
  }

  createIssue(issue) {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var query, data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = "mutation issueAdd($issue: IssueInputs!) {\n      issueAdd(issue: $issue) {\n        id\n      }\n    }";
              _context2.next = 3;
              return (0, _graphQLFetch.default)(query, {
                issue
              });

            case 3:
              data = _context2.sent;

              if (data) {
                _this2.loadData();
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
      createIssue: this.createIssue
    }));
  }

}

var element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('contents'));