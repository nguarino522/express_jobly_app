const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require('../expressError');

describe("testing SQL helping function", () => {
    
    const fieldsToMap = { firstName: "first_name", lastName: "last_name" };
    test("update 1 field", () => {
        const result = sqlForPartialUpdate({ firstName: "Test"}, fieldsToMap);
        expect(result).toEqual({
            setCols: '"first_name"=$1',
            values: ["Test"]
        });
    })

    test("update 2 fields", () => {
        const result = sqlForPartialUpdate({ firstName: "Test", lastName: "User"}, fieldsToMap);
        expect(result).toEqual({
            setCols: '"first_name"=$1, "last_name"=$2',
            values: ["Test", "User"]
        });
    })

    test("no data passed in", () => {
        try {
            const result = sqlForPartialUpdate({}, fieldsToMap);
            console.log(result)
        } catch(e) {
            expect(e instanceof BadRequestError);
        }
    })
})

