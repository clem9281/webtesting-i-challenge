const enhancer = require('./enhancer.js');
// test away!

test.todo("tests for repair");
test.todo("tests for success");
test.todo('tests for failure');


describe('repair', () => {
    // test objects and default values
    const stdObj = { name: 'Object1', durability: 25, enhancement: 19 };
    const objNoName = {
        durability: 25, enhancement: 19
    }
    const objNoEnh = {
        name: "Object1", durability: 25
    }
    const empty = {};
    const defaultName = "No Name Provided";
    const defaultEnh = 0;

    // check that it has the right properties
    it('should return an object that has name (any string), durability and enhancement properties', () => {
        expect(enhancer.repair(empty)).toHaveProperty('durability');

        expect(enhancer.repair(empty)).toHaveProperty('name', expect.any(String));

        expect(enhancer.repair(empty)).toHaveProperty('enhancement');
    })

    // make sure those properties are in the right range
    it('should return an object whose durbaility is between 0 and 100, and whose enhancement is between 0 and 20', () => {
        // durability
        expect(enhancer.repair(empty).durability).toBeGreaterThanOrEqual(0);

        expect(enhancer.repair(empty).durability).toBeLessThanOrEqual(100);

        expect(enhancer.repair(stdObj).durability).toBeGreaterThanOrEqual(0);

        expect(enhancer.repair(stdObj).durability).toBeLessThanOrEqual(100);

        // enhancement
        expect(enhancer.repair(empty).enhancement).toBeGreaterThanOrEqual(0);

        expect(enhancer.repair(empty).enhancement).toBeLessThanOrEqual(20);

        expect(enhancer.repair(stdObj).enhancement).toBeGreaterThanOrEqual(0);

        expect(enhancer.repair(stdObj).enhancement).toBeLessThanOrEqual(20);
    })

    // make sure durability is getting set to 100
    it("should return an object with it's durability set to 100", () => {

        expect(enhancer.repair(stdObj)).toEqual({ name: stdObj.name, durability: 100, enhancement: stdObj.enhancement });

        expect(enhancer.repair(objNoName)).toEqual({
            name: defaultName,
            durability: 100,
            enhancement: objNoName.enhancement
        })

        expect(enhancer.repair(objNoEnh)).toEqual({
            name: objNoEnh.name,
            durability: 100,
            enhancement: defaultEnh
        })

        expect(enhancer.repair(empty)).toEqual({
            name: defaultName,
            durability: 100,
            enhancement: defaultEnh
        })
    })
})
