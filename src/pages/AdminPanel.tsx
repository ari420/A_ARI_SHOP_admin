import { useState } from "react";
import Sidbar from "../components/Sidebar/index";
import Navbar from "../components/Header/index";
import ECommerce from "../components/Dashboard/ECommerce";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <section className=" p-[20px] fixed dark:bg-slate-800 bg-white right-0 top-[80px] w-full xl:w-[calc(100%-300px)] h-[calc(100%-80px)] overflow-y-scroll overflow-x-hidden">
        <ECommerce />
      </section>
    </main>
  );
}
