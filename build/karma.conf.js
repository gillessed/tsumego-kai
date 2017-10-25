module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            { pattern: 'src/**/*.ts' },
            { pattern: 'test/**/*.ts' },
        ],
        preprocessors: {
            'src/**/*.ts': ['karma-typescript', 'coverage'],
            'test/**/*.ts': ['karma-typescript'],
        },
        reporters: ['progress', 'coverage', 'karma-typescript'],
        browsers: ['Chrome'],
        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [require('karma-typescript-es6-transform')()]
            }
        },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2FybWEuY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2thcm1hLmNvbmYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLE1BQU07SUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNULFVBQVUsRUFBRSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQztRQUMzQyxLQUFLLEVBQUU7WUFDTCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUU7WUFDMUIsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFO1NBQzVCO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsYUFBYSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDO1lBQy9DLGNBQWMsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQ3JDO1FBQ0QsU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQztRQUN2RCxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDcEIscUJBQXFCLEVBQUU7WUFDckIsY0FBYyxFQUFFO2dCQUNaLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFLENBQUM7YUFDNUQ7U0FDRjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9