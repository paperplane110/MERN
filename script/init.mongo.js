db.issues.remove({})

const issueDB = [
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
]

db.issues.insertMany(issueDB)
const count = db.issues.count()
print('Inserted', count, 'issues')

db.issues.createIndex({ id: 1 }, { unique: true })
db.issues.createIndex({ status: 1 })
db.issues.createIndex({ owner: 1 })
db.issues.createIndex({ created: 1 })