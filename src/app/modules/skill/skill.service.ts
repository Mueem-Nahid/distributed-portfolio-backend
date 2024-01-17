import {
  IGenericResponsePagination,
  IPaginationOptions,
} from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ISkill } from './skill.interface';
import { Skill } from './skill.model';

const createSkill = async (data: ISkill): Promise<ISkill | null> => {
  const createdSkill = Skill.create(data);
  if (!createdSkill) throw new ApiError(400, 'Failed to create skill.');
  return createdSkill;
};

const getAllSkills = async (
  paginationOption: IPaginationOptions
): Promise<IGenericResponsePagination<ISkill[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const result = await Skill.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total: number = await Skill.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSkill = async (id: string): Promise<ISkill | null> => {
  return Skill.findById(id);
};

const updateSkill = async (
  id: string,
  payload: Partial<ISkill>
): Promise<ISkill | null> => {
  const isExist = await Skill.findOne({ id });

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found.');

  return Skill.findOneAndUpdate({ id }, payload, { new: true });
};

const deleteSkill = async (id: string): Promise<ISkill | null> => {
  return Skill.findByIdAndDelete(id);
};

export const SkillService = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
