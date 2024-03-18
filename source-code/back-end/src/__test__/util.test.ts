import { validateRecipeBody } from '../util/authenticateBody';
import { validateRecipeID } from '../util/authenticateBody';


describe('validateRecipeBody function', () => {
  const mockReq = (body: any) => ({ body });
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if req.body is missing', () => {
    validateRecipeBody({}, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 400 if req.body.title is missing', () => {
    validateRecipeBody(mockReq({}), mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 400 if req.body.ingredients is missing', () => {
    validateRecipeBody(mockReq({ title: 'test title' }), mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 400 if req.body.instructions is missing', () => {
    validateRecipeBody(mockReq({ title: 'test title', ingredients: ['ingredient1', 'ingredient2'] }), mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 400 if req.body.user is missing', () => {
    validateRecipeBody(mockReq({ title: 'test title', ingredients: ['ingredient1', 'ingredient2'], instructions: ['instruction1', 'instruction2'] }), mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request body/body field missing.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next() if all fields are present', () => {
    validateRecipeBody(mockReq({ title: 'test title', ingredients: ['ingredient1', 'ingredient2'], instructions: ['instruction1', 'instruction2'], user: 'test user' }), mockRes, mockNext);
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
        validateRecipeID(mockReqMissingParams, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request params/params field missing.' });
    });

    it('should return a 400 status and error message when req.params.id is missing', () => {
        validateRecipeID(mockReqMissingID, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Recipe request params/params field missing.' });
    });

    it('should call next() when req.params and req.params.id are present', () => {
        validateRecipeID(mockReqValid, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });
});