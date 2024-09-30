import { supabase } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return {};
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function createUser({ name, email, password, avatar }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar,
        isAdmin: false,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function updateCurrentUser({ name, password, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (name) updateData = { data: { name } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  const fileName = `${Math.random()}-${avatar.name}`;

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://zvxcggkyjbitrikvbbua.supabase.co/storage/v1/object/public/avatar/${fileName}`,
    },
  });

  if (error2) {
    throw new Error(error2.message);
  }

  return updateUser;
}

export async function forgotPassword(email) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
