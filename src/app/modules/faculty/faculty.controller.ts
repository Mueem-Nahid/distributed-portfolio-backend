import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { FacultyService } from './faculty.service';

const getAllFaculties = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, facultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await FacultyService.getAllFaculties(
      filters,
      paginationOptions
    );

    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OK',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await FacultyService.getSingleFaculty(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OK',
      data: result,
    });
  }
);

const updateFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await FacultyService.updateFaculty(id, updatedData);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty updated successfully !',
      data: result,
    });
  }
);

const deleteFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const result = await FacultyService.deleteFaculty(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully !',
      data: result,
    });
  }
);

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};