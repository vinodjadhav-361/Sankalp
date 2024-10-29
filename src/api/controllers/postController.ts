import { Request, Response } from 'express';
import Post from '../../models/Post';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate('user', 'name handle avatar');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name handle avatar');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(400).json({ message: 'Error liking post', error });
  }
};