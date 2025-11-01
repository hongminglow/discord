"use server";

import z from "zod";
import { createRoomSchema } from "../schemas/rooms";
import { getCurrentUser } from "../lib/getCurrentUser";
import { createAdminClient } from "../server";
import { redirect } from "next/navigation";

export async function createRoom(unsafeData: z.infer<typeof createRoomSchema>) {
  const { success, data } = createRoomSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Invalid room data" };
  }

  const user = await getCurrentUser();
  if (user == null) {
    return { error: true, message: "User not authenticated" };
  }

  const supabase = createAdminClient();

  const { data: room, error: roomError } = await supabase.rpc(
    "create_chat_room_with_owner",
    {
      p_owner_id: user.id,
      p_name: data.name,
      p_is_public: data.isPublic,
    }
  );

  if (roomError || room == null) {
    return { error: true, message: "Failed to create room" };
  }

  redirect(`/rooms/${room.id}`);
}

export async function addUserToRoom({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  const currentUser = await getCurrentUser();
  if (currentUser == null) {
    return { error: true, message: "User not authenticated" };
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase.rpc("invite_room_member", {
    p_actor_id: currentUser.id,
    p_room_id: roomId,
    p_member_id: userId,
  });

  if (error) {
    console.error(error);
    return { error: true, message: error.message };
  }

  if (!data) {
    return { error: true, message: "User is already a member of the room" };
  }

  return { error: false, message: "User added to room successfully" };
}
