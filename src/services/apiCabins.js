import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
//https://obdkggrjpiprsbhrqsrx.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //1. Image Name
  const imageName = `${Math.random()} _ ${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  //2. Image URL
  
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  //3.Create a Cabin
  let query = supabase.from("cabins");
  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created  or edited");
  }

  //4. Upload image in the supabase bucket storage
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  console.log(newCabin.image);
  //5 . if uploading image was field , remove the record
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error("Upload Error", storageError);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created "
    );
  }
  return data;
}
