import React from "react";
import { useLoaderData } from "react-router-dom";

import VirtualTable from "@/components/VirtualTable";
import Layout from "@/components/Layout";
import { ItemTypes } from "@/@types";

const Demo: React.FC = () => {
  const data = useLoaderData() as ItemTypes[];
  return (
    <Layout>
      <div>
        <h2>长列表</h2>
        <VirtualTable data={data} showCount={10} />
      </div>
    </Layout>
  );
};

export default React.memo(Demo);
