const { BadRequestError } = require("../expressError");

// helper function for making partial SQL update queries
// makes the set portion for the SQL UPDATE query and corresponding values portion
// takes input in and outputs like the following:
// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
// jsToSql maps any JavaScript data fields to the actual PostgresSQL column names

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };

