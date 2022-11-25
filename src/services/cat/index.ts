import useAxios from "@/middlewares/axios";
import { ref } from "vue";
import type { TagsResponse, CatResponse, CatParams } from "./types";

const useCat = () => {
  const axios = useAxios();
  const tags = ref<TagsResponse>();
  const cat = ref<CatResponse>();
  const fetching = ref<boolean>(false);

  const getTags = async () => {
    try {
      const res = await axios.get("/api/tags");
      tags.value = await res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCat = async (payload: CatParams) => {
    const { tag, text } = payload;

    fetching.value = true;
    try {
      const res = await axios.get(`/cat/${tag}/says/${text}`, {
        params: {
          json: true,
        },
      });
      cat.value = await res.data;
    } catch (error) {
      console.log(error);
    } finally {
      fetching.value = false;
    }
  };

  const downloadCat = async () => {
    fetching.value = true;
    try {
      const res = await axios.get(`https://cataas.com/${cat.value?.url}`, {
        responseType: "blob",
        headers: {
          "Content-Type": cat.value?.mimetype,
        },
      });
      const url = URL.createObjectURL(new Blob([await res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", cat.value?.file);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      fetching.value = false;
    }
  };

  return {
    fetching,
    cat,
    tags,
    getCat,
    getTags,
    downloadCat,
  };
};

export default useCat;
