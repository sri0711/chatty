import config from "@/src/helpers/config";

const youtubeUtils = {
  search_song: async (string: String) => {
    try {
      let url = config.server_url + "/youtube/search?search_string=" + string;
      let data = await fetch(url);
      return await data.json();
    } catch (err) {
      console.log(err);
    }
  },
};

export default youtubeUtils;
