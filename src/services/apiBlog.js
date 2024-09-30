import { supabase, supabaseUrl } from "./supabase";

export async function createBlog(newBlog) {
  console.log(newBlog);
  const imageName = `${Math.random()}-${newBlog?.blogImage?.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/blogImages/${imageName}`;
  const { data, error } = await supabase
    .from("Blog")
    .insert([{ ...newBlog, blogImage: imagePath }])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Blog could not created.");
  }

  const { error: storageError } = await supabase.storage
    .from("blogImages")
    .upload(imageName, newBlog.blogImage);
  if (storageError) {
    console.log(storageError);
    await supabase.from("Blog").delete().eq("id", data.id);
    throw new Error(
      "Blog image could not uploaded and the blog was not created.",
    );
  }
  return data;
}

export async function getBlogs() {
  let { data, error, count } = await supabase
    .from("Blog")
    .select("*", { count: "exact" });

  if (error) {
    console.log(error);
    throw new Error("Blogs could not loaded.");
  }
  return { data, count };
}

export async function getBlog(id) {
  const { data, error } = await supabase.from("Blog").select("*").eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Blog data could not loaded.");
  }
  return data[0];
}

export async function updateBlog(newBlog, id) {
  const hasImagePath = newBlog.blogImage?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newBlog?.blogImage?.name}`;
  const imagePath = hasImagePath
    ? newBlog.blogImage
    : `${supabaseUrl}/storage/v1/object/public/blogImages/${imageName}`;

  const { data, error } = await supabase
    .from("Blog")
    .update({ ...newBlog, blogImage: imagePath })
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Blog could not updated. Please try again");
  }
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("blogImages")
    .upload(imageName, newBlog.blogImage);

  if (storageError) {
    console.log(error);
    throw new Error(
      "Blog image could not updated due to some internal error. Please try again",
    );
  }
  return data;
}

export async function deleteBlogById(id) {
  const { data, error } = await supabase.from("Blog").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Unable to delete Blog. Please try again.");
  }
  return data;
}
