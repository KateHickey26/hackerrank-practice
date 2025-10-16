const { getUsersFromAPI } = require('../getUsersFromAPI');


describe('getUsersFromAPI', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.clearAllMocks();
    });
    it('should return usernames with .org emails', async () => {
        const mockResponse = [
            { username: 'test', email: 'test@test.org'  },
            { username: 'test2', email: 'test2@test.com'}
        ];
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });
        const result = await getUsersFromAPI();
        expect(result).toEqual(['test']);
    });
    it('throws an error when the API call fails', async () => { 
        global.fetch.mockResolvedValue({
            ok: false,
            status: 500,
            json: async () => ({})
        });
        const result = await getUsersFromAPI();
        expect(result).toEqual([]);
    });
    it('throws an error when response is not ok', async () => { 
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
            json: async () => ([])
        });
        const result = await getUsersFromAPI();
        expect(result).toEqual([]);
    });
    // it('filters out users with non .org emails', async () => {
    //     const mockResponse = [
    //         { username: 'test', email: 'test@test.org'  },
    //         { username: 'test2', email: 'test2@test.com'}
    //     ];
    //     const mockFilteredResponse = [
    //         { username: 'test', email: 'test@test.org'  }
    //     ];
    //     global.fetch.mockResolvedValue({
    //         ok: true,
    //         json: async () => mockResponse
    //     });
    //     const result = await getUsersFromAPI();
    //     expect(result).toEqual(mockFilteredResponse);
    // });
});