import {buildVideoInfo} from "../../middleware";
import ytdl from "ytdl-core";
import {buildRequestBody} from "../utils";
import {
    validUrl,
    invalidUrl,
    validFormat,
    invalidFormat,
} from '../constants';

import {mockRequest as MockRequest, mockResponse as MockResponse, RequestOutput, ResponseOutput} from "mock-req-res";
import sinon from "sinon";

describe('Test buildVideoInfo middleware', () => {
    let mockRequest: RequestOutput;
    let mockResponse: ResponseOutput;
    let statusFnSpy: jest.SpyInstance;
    let jsonFnSpy: jest.SpyInstance;
    let nextFn = jest.fn();
    let sandbox: any;

    beforeEach(() => {
        mockRequest = MockRequest();
        mockResponse = MockResponse();
        statusFnSpy = jest.spyOn(mockResponse, 'status');
        jsonFnSpy = jest.spyOn(mockResponse, 'json');
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        jest.clearAllMocks();
        sandbox.restore();
    });

    it('Should return 400 when a bad request is provided', (done) => {
        mockRequest.body = buildRequestBody(invalidUrl, invalidFormat);
        sandbox.stub(ytdl, 'getBasicInfo').throws(new Error('Fake error when fake data is provided'));

        buildVideoInfo(mockRequest, mockResponse, nextFn);
        expectCommonBadRequestCalls();
        done();
    });

    it('Should return 400 when a valid URL and a invalid format is provided', async (done) => {
        mockRequest.body = buildRequestBody(validUrl, invalidFormat);
        sandbox.stub(ytdl, 'getBasicInfo').resolves({
            videoDetails: {
                title: "Matej Foltz - mimika na srekja"
            }
        });

        await buildVideoInfo(mockRequest, mockResponse, nextFn);
        expectCommonBadRequestCalls();
        done();
    });

    it('should call nextFn and set request.body properties when valid request is provided', async (done) => {
        mockRequest.body = buildRequestBody(validUrl, validFormat);
        sandbox.stub(ytdl, 'getBasicInfo').resolves({
            videoDetails: {
                title: "Matej Foltz - mimika na srekja"
            }
        });

        await buildVideoInfo(mockRequest, mockResponse, nextFn);
        expect(nextFn).toHaveBeenCalledTimes(1);
        expect(mockRequest.body).toHaveProperty('title');
        expect(mockRequest.body).toHaveProperty('videoStream');
        expect(mockRequest.body).toHaveProperty('mimeType');
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

