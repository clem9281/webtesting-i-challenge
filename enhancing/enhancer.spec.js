const enhancer = require('./enhancer.js');
// test away!

test.todo("tests for success");
test.todo('tests for failure');

// reuse these tests across all three functions
const checkProperties = (func, empty, stdObj) => {

    // make sure the returned object has the right properties
    it('should return an object that has name (any string), durability and enhancement properties', () => {
        expect(func(empty)).toHaveProperty('durability');

        expect(func(empty)).toHaveProperty('name', expect.any(String));

        expect(func(empty)).toHaveProperty('enhancement');
    })

    // make sure those properties are in the right range
    it('should return an object whose durbaility is between 0 and 100, and whose enhancement is between 0 and 20', () => {
        // durability
        expect(func(empty).durability).toBeGreaterThanOrEqual(0);

        expect(func(empty).durability).toBeLessThanOrEqual(100);

        expect(func(stdObj).durability).toBeGreaterThanOrEqual(0);

        expect(func(stdObj).durability).toBeLessThanOrEqual(100);

        // enhancement
        expect(func(empty).enhancement).toBeGreaterThanOrEqual(0);

        expect(func(empty).enhancement).toBeLessThanOrEqual(20);

        expect(func(stdObj).enhancement).toBeGreaterThanOrEqual(0);

        expect(func(stdObj).enhancement).toBeLessThanOrEqual(20);
    })
}
// test objects and default values
const stdObj = { name: 'Object1', durability: 25, enhancement: 19 };
const stdObjEnh20 = {
    name: "Object1",
    durability: 25,
    enhancement: 20
}
const stdObjEnh15 = {
    name: "Object1",
    durability: 25,
    enhancement: 15
}
const stdObjEnhLess15 = {
    name: "Object1",
    durability: 25,
    enhancement: 14
}
const objNoEnh = {
    name: "Object1", durability: 25
}
const objNoDur = {
    name: "Object1", enhancement: 14
}
const objNoDurEnh15 = {
    name: "Object1", enhancement: 15
}
const objNoDurEnh16 = {
    name: "Object1", enhancement: 16
}
const empty = {};
const defaultName = "No Name Provided";
const defaultEnh = 0;
const defaultDur = 100;

describe('repair', () => {
    checkProperties(enhancer.repair, empty, stdObj);
    // make sure durability is getting set to 100
    it("should return an object with it's durability set to 100", () => {

        expect(enhancer.repair(stdObj)).toEqual({ name: stdObj.name, durability: 100, enhancement: stdObj.enhancement });

        // even if we aren't provided with a durability, it should get set to 100
        expect(enhancer.repair(objNoDur)).toEqual({
            name: objNoDur.name,
            durability: 100,
            enhancement: objNoDur.enhancement
        })
        // if the provided object is empty, still set durability to 100
        expect(enhancer.repair(empty)).toEqual({
            name: defaultName,
            durability: 100,
            enhancement: defaultEnh
        })
    })
})

describe('success', () => {
    checkProperties(enhancer.succeed, empty, stdObj);
    // make sure the enhancement gets increased by one when it is less than 20 
    it('should return the enhancement increased by one if the enhancement was less than 20', () => {
        expect(enhancer.succeed(stdObj)).toEqual({
            name: stdObj.name,
            durability: stdObj.durability,
            enhancement: 20
        })
        // if no enhancement is provided, make sure it is getting set to 1
        expect(enhancer.succeed(objNoEnh)).toEqual({
            name: objNoEnh.name,
            durability: objNoEnh.durability,
            enhancement: 1
        })
        // if the provided object is empty make sure enhancement is getting set to 1
        expect(enhancer.succeed(empty)).toEqual({
            name: defaultName,
            durability: defaultDur,
            enhancement: 1
        })
    })
    // if the enhancement is already 20, make sure it doesn't change
    it('should not change the enhancement if the enhancement is equal to 20', () => {
        expect(enhancer.succeed(stdObjEnh20)).toEqual({
            name: stdObjEnh20.name,
            durability: stdObj.durability,
            enhancement: 20
        })
    })
})

describe('fail', () => {
    checkProperties(enhancer.fail, empty, stdObj);
    // handle when the enhancement is less than 15
    it('should return the durability decreased by 5 if the enhancement is less than 15', () => {
        expect(enhancer.fail(stdObjEnhLess15)).toEqual({
            name: stdObjEnhLess15.name,
            durability: 20,
            enhancement: stdObjEnhLess15.enhancement
        })
        // if no enhancement is provided, set to 0 and handle durability accordingly
        expect(enhancer.fail(objNoEnh)).toEqual({
            name: objNoEnh.name,
            durability: 20,
            enhancement: 0
        })
        // if no durability is provided, set to 100 and handle  accordingly
        expect(enhancer.fail(objNoDur)).toEqual({
            name: objNoDur.name,
            durability: 95,
            enhancement: objNoDur.enhancement
        })
        // if the provided object is empty make sure enhancement is getting set to 0 and durability is still getting decreased
        expect(enhancer.fail(empty)).toEqual({
            name: defaultName,
            durability: 95,
            enhancement: 0
        })
    })
    // handle when enhancement is greater than 15
    it("should decrease durability by 10 if the item's enhancement is greater than 15", () => {
        expect(enhancer.fail(stdObjEnh15)).toEqual({
            name: stdObjEnh15.name,
            durability: 15,
            enhancement: stdObjEnh15.enhancement
        })
        // if no durability is provided, set to 100 and handle  accordingly
        expect(enhancer.fail(objNoDurEnh15)).toEqual({
            name: objNoDurEnh15.name,
            durability: 90,
            enhancement: objNoDurEnh15.enhancement
        })
    })

    // handle when enhancement is greater than 16
    it("should decrease durability by 10 if the item's enhancement is greater than 15", () => {
        expect(enhancer.fail(stdObj)).toEqual({
            name: stdObj.name,
            durability: 15,
            enhancement: 18
        })
        // if no durability is provided, set to 100 and handle  accordingly
        expect(enhancer.fail(objNoDurEnh16)).toEqual({
            name: objNoDurEnh16.name,
            durability: 90,
            enhancement: 15
        })
    })

})