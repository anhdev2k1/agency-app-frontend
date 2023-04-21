import { React, useEffect, useState } from "react";
import grapesjs from "grapesjs";
import plugin from "grapesjs-preset-newsletter";
import "./styles/profileShop.scss";
import gsTap from "grapesjs-tabs";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfileShop = () => {
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState([]);
  const [pageHTML, setPageHTML] = useState("")
  const pageID = JSON.parse(localStorage.getItem("page"))
  useEffect(() => {
    editorConfig();
    getPage()
  }, []);

  const getPage = async () => {
    const res = await axios({
      method: "GET",
      url: `http://localhost:5000/api/shop/${pageID}`,
    });
  };
  const editorConfig = () => {
    const editor = grapesjs.init({
      container: "#editor",
      fromElement: true,
      width: "auto",
      storageManager: {
        type: "local",
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
        options: {
          local: {
            // Enrich the store call
            onStore: (data, editor) => {
              const pagesHtml = editor.Pages.getAll().map((page) => {
                const component = page.getMainComponent();
                return {
                  html: editor.getHtml({ component }),
                  css: editor.getCss({ component }),
                };
              });
              setPage(pagesHtml);
              setPageHTML(pagesHtml[0].html)
              return { data, pagesHtml };
            },
            onLoad: (result) => result.data,
          },
        },
      },
      plugins: [plugin, gsTap],
    });
    editor.setComponents(pageHTML)
    return editor;
  };
  const handleSavePage = () => {
    const data = {
      id: user._id,
      page: page,
    };
    const createPage = async () => {
      const res = await axios({
        method: "POST",
        url: `http://localhost:5000/api/shop/${pageID}`,
        data: data,
        headers: { "Content-Type": "application/json" },
      });
    };
    createPage();
  };

  return (
    <div className="shop__wrapper">
      <button onClick={handleSavePage}>Save</button>
      <div id="editor">
        {/* <h1>hello</h1> */}
      </div>
    </div>
  );
};

export default ProfileShop;
