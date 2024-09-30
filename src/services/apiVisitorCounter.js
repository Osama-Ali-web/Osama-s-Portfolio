import { supabase } from "./supabase";

export async function updateVisitors(route) {
  const homepageVisit = localStorage.getItem("homePageVisit");
  const featurePageVisit = localStorage.getItem("featurePageVisit");
  const blogPageVisit = localStorage.getItem("blogPageVisit");
  const resumePageVisit = localStorage.getItem("resumePageVisit");
  const contactPageVisit = localStorage.getItem("contactPageVisit");

  let { data: visitor, error } = await supabase
    .from("visitor")
    .select("*")
    .single();

  if (error) {
    console.log(error);
    throw new Error("failed to fetch website visitor.");
  }

  const newCount = visitor.counter + 1;
  let query = supabase.from("visitor");

  if (route === "/" && !homepageVisit) {
    const homePageCounter = visitor.homePageCounter + 1;
    query = query
      .update({ counter: newCount, homePageCounter })
      .eq("id", visitor.id);
    localStorage.setItem("homePageVisit", true);
  }
  if (route === "/features" && !featurePageVisit) {
    const featurePageCounter = visitor.featurePageCounter + 1;
    query = query
      .update({ counter: newCount, featurePageCounter })
      .eq("id", visitor.id);
    localStorage.setItem("featurePageVisit", true);
  }
  if (route === "/blog" && !blogPageVisit) {
    const blogPageCounter = visitor.blogPageCounter + 1;
    query = query
      .update({ counter: newCount, blogPageCounter })
      .eq("id", visitor.id);
    localStorage.setItem("blogPageVisit", true);
  }
  if (route === "/resume" && !resumePageVisit) {
    const resumePageCounter = visitor.resumePageCounter + 1;
    query = query
      .update({ counter: newCount, resumePageCounter })
      .eq("id", visitor.id);
    localStorage.setItem("resumePageVisit", true);
  }
  if (route === "/contacts" && !contactPageVisit) {
    const contactPageCounter = visitor.contactPageCounter + 1;
    query = query
      .update({ counter: newCount, contactPageCounter })
      .eq("id", visitor.id);
    localStorage.setItem("contactPageVisit", true);
  }

  const { data: updatedVisitors, error: updateError } = await query
    .select()
    .single();

  if (updateError) {
    console.log(updateError);
    throw new Error("failed to update visitor counter");
  }

  return updatedVisitors;
}

export async function getAllVisitors() {
  let { data: visitors, error } = await supabase
    .from("visitor")
    .select("*")
    .single();

  if (error) {
    console.log(error);
    throw new Error("failed to fetch website visitor.");
  }
  return visitors;
}

// export async function getVisitorsAfterDate(date) {
//   const { data, error } = await supabase
//     .from("visitor")
//     .select("*")
//     .gte("created_at", date)
//     .lte("created_at", getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }
