"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IssueFilter = _interopRequireDefault(require("./IssueFilter.jsx"));

var _IssueTable = _interopRequireDefault(require("./IssueTable.jsx"));

var _IssueAdd = _interopRequireDefault(require("./IssueAdd.jsx"));

var _graphQLFetch = _interopRequireDefault(require("./graphQLFetch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
              query = "query {\n        issueList {\n          id title status owner\n          created effort due\n        }\n      }";
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
              query = "mutation issueAdd($issue: IssueInputs!) {\n        issueAdd(issue: $issue) {\n          id\n        }\n      }";
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(_IssueFilter.default, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(_IssueTable.default, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(_IssueAdd.default, {
      createIssue: this.createIssue
    }));
  }

}

exports.default = IssueList;