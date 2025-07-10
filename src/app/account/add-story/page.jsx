import AddStory from "@/components/account/AddStory";
import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Story | True Real Story",
};

export default function Page() {

  // ✅ Access cookies on the server
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/signin"); // ⛔ No token → redirect to signin
  }

  return (
    <LayoutStyle7>
      <AddStory />
    </LayoutStyle7>
  );
  
}
