import { migrator } from "@/app/utils/migrator";
import { type PostDTO } from "@/data/dto/post.dto";
import { type PostModel } from "@/data/model/post.model";
import { postSchema } from "@/data/schemas/dtoValidations/postSchema";

export const postMigration = (dto: PostDTO): PostModel => {
  return migrator(dto, postSchema, (data) => ({
    id: data.id,
    title: data.title,
    description: data.body,
    isRead: false,
  }));
};
