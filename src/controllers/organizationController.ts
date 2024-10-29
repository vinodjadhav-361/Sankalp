import { Request, Response } from 'express';
import Organization from '../models/Organization';
import Post from '../models/Post';

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organizations', error });
  }
};

export const getOrganizationById = async (req: Request, res: Response) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organization', error });
  }
};

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const newOrganization = new Organization(req.body);
    const savedOrganization = await newOrganization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(400).json({ message: 'Error creating organization', error });
  }
};

export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const updatedOrganization = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrganization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json(updatedOrganization);
  } catch (error) {
    res.status(400).json({ message: 'Error updating organization', error });
  }
};

export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    const deletedOrganization = await Organization.findByIdAndDelete(req.params.id);
    if (!deletedOrganization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting organization', error });
  }
};

export const followOrganization = async (req: Request, res: Response) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    const userId = req.body.userId;
    if (organization.followers.includes(userId)) {
      organization.followers = organization.followers.filter(id => !id.equals(userId));
    } else {
      organization.followers.push(userId);
    }
    await organization.save();
    res.json({ isFollowing: organization.followers.includes(userId) });
  } catch (error) {
    res.status(400).json({ message: 'Error following/unfollowing organization', error });
  }
};

export const getOrganizationPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ organization: req.params.id }).populate('user', 'name handle avatar');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching organization posts', error });
  }
};