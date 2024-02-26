import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import * as mapper from './project.mapper';

describe('project/project.mapper.ts tests', () => {
  describe('mapEmployeeSummaryFromApiToVm', () => {
    it('Should return the employee summary', () => {
      // Arrange
      const employeeSummary: apiModel.EmployeeSummary = {
        id: '1',
        isAssigned: true,
        employeeName: 'John Doe',
      };
      // Act
      const result = mapper.mapEmployeeSummaryFromApiToVm(employeeSummary);

      // Assert
      expect(result).toEqual<viewModel.EmployeeSummary>({
        id: '1',
        isAssigned: true,
        employeeName: 'John Doe',
      });
    });

    it('Should return the employee summary with two properties are undefined', () => {
      // Arrange
      const employeeSummary: apiModel.EmployeeSummary = {
        id: undefined,
        isAssigned: true,
        employeeName: undefined,
      };
      // Act
      const result = mapper.mapEmployeeSummaryFromApiToVm(employeeSummary);

      // Assert
      expect(result).toEqual<viewModel.EmployeeSummary>({
        id: undefined,
        isAssigned: true,
        employeeName: undefined,
      });
    });

    it('Should return the employee summary with two properties are null', () => {
      // Arrange
      const employeeSummary: apiModel.EmployeeSummary = {
        id: null,
        isAssigned: true,
        employeeName: null,
      };
      // Act
      const result = mapper.mapEmployeeSummaryFromApiToVm(employeeSummary);

      // Assert
      expect(result).toEqual<viewModel.EmployeeSummary>({
        id: null,
        isAssigned: true,
        employeeName: null,
      });
    });

    it('Should return the employee summary without property isAssigned', () => {
      // Arrange
      const employeeSummary: apiModel.EmployeeSummary = {
        id: '2',
        employeeName: 'John Doe',
      };
      // Act
      const result = mapper.mapEmployeeSummaryFromApiToVm(employeeSummary);

      // Assert
      expect(result).toEqual<viewModel.EmployeeSummary>({
        id: '2',
        isAssigned: undefined,
        employeeName: 'John Doe',
      });
    });
  });

  describe('mapEmployeeSummaryListFromApiToVm', () => {
    it('Should return the employee summary list from AM to VM', () => {
      // Arrange
      const employeeSummary: apiModel.EmployeeSummary[] = [
        {
          id: '1',
          isAssigned: true,
          employeeName: 'John Doe',
        },
        {
          id: '2',
          isAssigned: true,
          employeeName: 'Jane Doe',
        },
      ];

      // Act

      const result = mapper.mapEmployeeSummaryListFromApiToVm(employeeSummary);

      // Assert

      const expectedResult: viewModel.EmployeeSummary[] = [
        {
          id: '1',
          isAssigned: true,
          employeeName: 'John Doe',
        },

        {
          id: '2',
          isAssigned: true,
          employeeName: 'Jane Doe',
        },
      ];
      expect(result).toEqual(expectedResult);
    });

    it('Should return the employee summary list with properties to undefined', () => {
      // Arrange
      const employeeSummary: apiModel.EmployeeSummary[] = [
        {
          id: undefined,
          isAssigned: undefined,
          employeeName: undefined,
        },
      ];
      // Act
      const result = mapper.mapEmployeeSummaryListFromApiToVm(employeeSummary);
      // Assert
      const expectedResult: viewModel.EmployeeSummary[] = [
        {
          id: undefined,
          isAssigned: undefined,
          employeeName: undefined,
        },
      ];
      expect(result).toEqual(expectedResult);
    });

    it('Should return the employee summary with properties to null', () => {
      // Arrange
      const employeeSummary: apiModel.EmployeeSummary[] = [
        {
          id: null,
          isAssigned: null,
          employeeName: null,
        },
      ];
      // Act
      const result = mapper.mapEmployeeSummaryListFromApiToVm(employeeSummary);
      // Assert
      const expectedResult: viewModel.EmployeeSummary[] = [
        {
          id: null,
          isAssigned: null,
          employeeName: null,
        },
      ];
      expect(result).toEqual(expectedResult);
    });
  });

  describe('mapProyectFromApiToVm', () => {
    it('Should return project mapped from AM to VM when the project exist', () => {
      // Arrange
      const project: apiModel.Project = {
        id: '1',
        name: 'Foo',
        externalId: '2',
        comments: 'Hello world',
        isActive: true,
        employees: [
          {
            id: '1',
            isAssigned: true,
            employeeName: 'John Doe',
          },
        ],
      };

      const isProjectExist = Boolean(project);
      // Act

      const result = mapper.mapProjectFromApiToVm(project);
      // Assert
      const expectedResult: viewModel.Project = {
        id: '1',
        name: 'Foo',
        externalId: '2',
        comments: 'Hello world',
        isActive: true,
        employees: [
          {
            id: '1',
            isAssigned: true,
            employeeName: 'John Doe',
          },
        ],
      };
      expect(isProjectExist).toBeTruthy();
      expect(result).toEqual(expectedResult);
    });

    it('Should return a empty project when the function is passed an undefined', () => {
      // Arrange
      const project: apiModel.Project = undefined;
      const isProjectExist = Boolean(project);
      // Act
      const result = mapper.mapProjectFromApiToVm(project);
      // Assert
      const expectedResult: viewModel.Project = {
        id: '',
        name: '',
        externalId: '',
        comments: '',
        isActive: false,
        employees: [],
      };

      expect(isProjectExist).toBeFalsy();
      expect(result).toEqual(expectedResult);
    });
  });
});
