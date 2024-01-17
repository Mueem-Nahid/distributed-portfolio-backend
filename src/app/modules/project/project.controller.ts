import { Request, Response } from 'express';
import { IProject } from './project.interface';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/common';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { ProjectService } from './project.service';

const getAllProject = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );

    const result = await ProjectService.getAllProjects(paginationOptions);

    sendResponse<IProject[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Projects retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await ProjectService.getSingleProject(id);
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ok',
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data = req.body;
  const result = await ProjectService.updateProject(id, data);
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated !',
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await ProjectService.deleteProject(id);
  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted !',
  });
});

export const ProjectController = {
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
