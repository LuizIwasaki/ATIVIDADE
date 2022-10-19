import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Post from "../models/Post";

export default {
  async index(request: Request, response: Response) {
    const postRepository = AppDataSource.getRepository(Post);

    const posts = await postRepository.find({
      relations: ["images"],
    });

    response.json(posts);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const postRepository = AppDataSource.getRepository(Post);

    const post = await postRepository.findOne({
      where: {
        id: +id,
      },
      // relations: ["images"],
      relations: { images: true },
    });

    console.log(post);

    response.json(post);
  },

  async create(request: Request, response: Response) {
    //desestruturar o corpo da requisição (JSON)
    console.log(request.body);
    console.log(request.files);

    const { message } = request.body;

    const postRepository = AppDataSource.getRepository(Post);

    const requestImagens = request.files as Express.Multer.File[];

    console.log(requestImagens);
    
    
    const images = requestImagens.map((image) => {
      return { path: image.filename };
    });

    console.log(images);
    

    const post = postRepository.create({
      message,
      images,
    });

    await postRepository.save(post);

    return response.status(201).json(post);
  },
};