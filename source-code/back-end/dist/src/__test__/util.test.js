"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateBody_1 = require("../util/authenticateBody");
const authenticateBody_2 = require("../util/authenticateBody");
describe('validateRecipeBody function', () => {
    const mockReq = (body) => ({ body });
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const mockNext = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return 400 if req.body is missing', () => {
        (0, authenticateBody_1.validateRecipeBody)({}, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should return 400 if req.body.title is missing', () => {
        (0, authenticateBody_1.validateRecipeBody)(mockReq({}), mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should return 400 if req.body.ingredients is missing', () => {
        (0, authenticateBody_1.validateRecipeBody)(mockReq({ title: 'test title' }), mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should return 400 if req.body.instructions is missing', () => {
        (0, authenticateBody_1.validateRecipeBody)(mockReq({ title: 'test title', ingredients: ['ingredient1', 'ingredient2'] }), mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should return 400 if req.body.user is missing', () => {
        (0, authenticateBody_1.validateRecipeBody)(mockReq({ title: 'test title', ingredients: ['ingredient1', 'ingredient2'], instructions: ['instruction1', 'instruction2'] }), mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should call next() if all fields are present', () => {
        (0, authenticateBody_1.validateRecipeBody)(mockReq({ title: 'test title', ingredients: ['ingredient1', 'ingredient2'], instructions: ['instruction1', 'instruction2'], user: 'test user' }), mockRes, mockNext);
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });
});
describe('validateRecipeID function', () => {
    const mockReqMissingParams = {};
    const mockReqMissingID = { params: {} };
    const mockReqValid = { params: { id: 'validID' } };
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockNext = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return a 400 status and error message when req.params is missing', () => {
        (0, authenticateBody_2.validateRecipeID)(mockReqMissingParams, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request params/params field missing.' });
    });
    it('should return a 400 status and error message when req.params.id is missing', () => {
        (0, authenticateBody_2.validateRecipeID)(mockReqMissingID, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request params/params field missing.' });
    });
    it('should call next() when req.params and req.params.id are present', () => {
        (0, authenticateBody_2.validateRecipeID)(mockReqValid, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });
});
