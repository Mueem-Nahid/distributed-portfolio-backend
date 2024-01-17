import {
  IGenericResponsePagination,
  IPaginationOptions,
} from '../../../interfaces/common';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IProject } from './project.interface';
import { Project } from './project.model';

const getAllProjects = async (
  paginationOption: IPaginationOptions
): Promise<IGenericResponsePagination<IProject[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const result = await Project.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total: number = await Project.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleProject = async (id: string): Promise<IProject | null> => {
  return Project.findById(id);
};

const updateProject = async (
  id: string,
  payload: Partial<IProject>
): Promise<IProject | null> => {
  const isExist = await Project.findOne({ id });

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found.');

  return Project.findOneAndUpdate({ id }, payload, { new: true });
};

const deleteProject = async (id: string): Promise<IProject | null> => {
  return Project.findByIdAndDelete(id);
};

export const ProjectService = {
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
