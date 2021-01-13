import {buildRequestBody} from "../utils";
import {validatePostRequest} from "../../middleware";
import {mockRequest as MockRequest, mockResponse as MockResponse, RequestOutput, ResponseOutput} from "mock-req-res";
import {
    validUrl,
    invalidUrl,
    validFormat,
    invalidFormat,
} from '../constants';

describe('test validatePostRequest middleware', () => {
    let mockRequest: RequestOutput;
    let mockResponse: ResponseOutput;
    let statusFnSpy: jest.SpyInstance;
    let jsonFnSpy: jest.SpyInstance;
    let nextFn = jest.fn();

    beforeEach(() => {
        mockRequest = MockRequest();
        mockResponse = MockResponse();
        statusFnSpy = jest.spyOn(mockResponse, 'status');
        jsonFnSpy = jest.spyOn(mockResponse, 'json');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should return 400 when a invalid request is provided', (done) => {
        mockRequest.body = buildRequestBody(invalidUrl, invalidFormat);

        validatePostRequest(mockRequest, mockResponse, nextFn);
        expectCommonBadRequestCalls();
        done();
    });

    it('should return 400 when invalid URL and valid format is provided', (done) => {
        mockRequest.body = buildRequestBody(invalidUrl, validFormat);

        validatePostRequest(mockRequest, mockResponse, nextFn);
        expectCommonBadRequestCalls();
        done();
    });

    it('should return 400 when a valid URL and a invalid format is provided', (done) => {
        mockRequest.body = buildRequestBody(validUrl, invalidFormat);

        validatePostRequest(mockRequest, mockResponse, nextFn);
        expectCommonBadRequestCalls();
        done();
    });

    it('should call nextFn when a valid request is provided', (done) => {
        mockRequest.body = buildRequestBody(validUrl, validFormat);

        validatePostRequest(mockRequest, mockResponse, nextFn);
        expect(nextFn).toHaveBeenCalledTimes(1);
        done();
    });

    function expectCommonBadRequestCalls() {
        expect(statusFnSpy).toHaveBeenCalledTimes(1);
        expect(statusFnSpy).toHaveBeenCalledWith(400);
        expect(jsonFnSpy).toHaveBeenCalledWith({message: 'Invalid request'});
        expect(jsonFnSpy).toHaveBeenCalledTimes(1);
        expect(nextFn).toHaveBeenCalledTimes(0);
    }

});