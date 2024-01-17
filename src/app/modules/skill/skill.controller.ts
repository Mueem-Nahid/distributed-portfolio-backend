import { Request, Response } from 'express';
import { ISkill } from './skill.interface';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/common';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { SkillService } from './skill.service';

const getAllSkill = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const paginationOptions: IPaginationOptions = pick(
      req.query,
      paginationFields
    );

    const result = await SkillService.getAllSkills(paginationOptions);

    sendResponse<ISkill[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Skills retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await SkillService.getSingleSkill(id);
  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ok',
    data: result,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data = req.body;
  const result = await SkillService.updateSkill(id, data);
  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill updated !',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await SkillService.deleteSkill(id);
  sendResponse<ISkill>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Skill deleted !',
  });
});

export const SkillController = {
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
