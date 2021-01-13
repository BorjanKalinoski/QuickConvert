import {setResponseHeaders} from "../../middleware";
import {mockRequest as MockRequest, mockResponse as MockResponse, RequestOutput, ResponseOutput} from "mock-req-res";


describe('Test setResponseHeaders middleware', () => {
    let mockRequest: RequestOutput;
    let mockResponse: ResponseOutput;
    let nextFn = jest.fn();

    beforeEach(() => {
        mockRequest = MockRequest();
        mockResponse = MockResponse();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call nextFn with valid request body', (done) => {
        mockRequest.body = {
            mimeType: 'audio/mp3',
            title: 'Dali e srekja'
        };

        setResponseHeaders(mockRequest, mockResponse, nextFn);

        expect(nextFn).toHaveBeenCalledTimes(1);
        done();
    });

    it('should set headers and attachment properties on the response object', (done) => {
        const setSpy = jest.spyOn(mockResponse, 'set');
        const attachmentSpy = jest.spyOn(mockResponse, 'attachment');
        mockRequest.body = {
            mimeType: 'audio/mp3',
            title: 'Dali e srekja'
        };

        setResponseHeaders(mockRequest, mockResponse, nextFn);

        expect(setSpy).toBeCalledWith({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': mockRequest.body.mimeType
        });
        expect(attachmentSpy).toBeCalledWith(mockRequest.body.title);
        done();
    });
});