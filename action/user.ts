"use server";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/authService";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();
  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: {
      id: self.id,
    },
    data: {
      ...validData,
    },
  });

  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/${self.username}`);

  return user;
};
