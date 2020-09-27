import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Controlled as CodeMirror } from "react-codemirror2";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import copy from "copy-to-clipboard";
import MenuBar from "./MenuBar";
import "./CodeIO.css";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/python/python.js");
require("codemirror/mode/cmake/cmake.js");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/addon/edit/matchbrackets.js");
require("codemirror/addon/edit/closebrackets.js");
require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/fold/foldgutter.css");
require("codemirror/addon/fold/brace-fold.js");
require("codemirror/addon/fold/comment-fold.js");
require("codemirror/addon/fold/indent-fold.js");
require("codemirror/addon/fold/markdown-fold.js");
require("codemirror/addon/fold/xml-fold.js");
require("codemirror/addon/comment/comment.js");
var base64 = require("base-64");

function CodeIO() {
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [output, setOutput] = useState("See Output Here");
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("C++");
  const [reset, setReset] = useState(false);
  const [theme2, setTheme] = useState("material");

  const handleSubmitCode = () => {
    const source = `${code}`;
    const inp = `${input}`;
    // console.log(source);

    axios({
      method: "POST",
      url: `https://judge0.p.rapidapi.com/submissions`,
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "judge0.p.rapidapi.com",
        "x-rapidapi-key": "7b3dddefe1msheb8ab51a9e386f1p114d8ejsn6f6d49dd4d69",
        accept: "application/json",
        useQueryString: true,
      },
      data: {
        language_id: lang,
        source_code: source,
        stdin: inp,
      },
    })
      .then((response) => {
        console.log(response.data);
        setToken(response.data.token);
        setTimeout(() => {
          handleSubmit(response.data.token);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (token) => {
    axios({
      method: "GET",
      url: `https://judge0.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "judge0.p.rapidapi.com",
        "x-rapidapi-key": `0e3af1fc74mshad035c1ca88d824p139da6jsn8ab4b4057169`,
        useQueryString: true,
      },
    })
      .then((res) => {
        if (res.data.compile_output) {
          let str = res.data.compile_output;
          console.log(base64.decode(str));
          setOutput(base64.decode(str));
        } else {
          setOutput(atob(res.data.stdout));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleChange = (value) => {
  //   setCode(value);
  // };

  // const handleInput = (value) => {
  //   setInput(value);
  // };

  const handleLanguage = (lang) => {
    setLang(lang);
  };

  const handleReset = (bool) => {
    setCode("");
    setReset(bool);
  };

  const handleTheme = (ctheme) => {
    setTheme(ctheme);
  };

  // const handleTab = (e) => {
  //   if (e.keyCode === 9) {
  //     // tab was pressed
  //     // get caret position/selection
  //     var start = e.target.selectionStart;
  //     var end = e.target.selectionEnd;

  //     var target = e.target;
  //     var value = target.value;

  //     // set textarea value to: text before caret + tab + text after caret
  //     target.value = value.substring(0, start) + "\t" + value.substring(end);

  //     // put caret at right position again (add one for the tab)
  //     e.target.selectionStart = e.target.selectionEnd = start + 1;

  //     // prevent the focus lose
  //     e.preventDefault();
  //   }
  // };

  // const insertInto = (str, input) => {
  //   var val = input.value,
  //     s = input.selectionStart,
  //     e = input.selectionEnd;
  //   input.value = val.slice(0, e) + str + val.slice(e);
  //   if (e == s) input.selectionStart += str.length - 1;
  //   input.selectionEnd = e + str.length - 1;
  // };

  // const handleClose = (e) => {
  //   switch (e.key) {
  //     case "{":
  //       return insertInto("}", e.target);
  //     case "[":
  //       return insertInto("]", e.target);
  //     case "(":
  //       return insertInto(")", e.target);
  //     case "<":
  //       return insertInto(">", e.target);
  //     case `"`:
  //       return insertInto(`"`, e.target);
  //     case `'`:
  //       return insertInto(`'`, e.target);
  //     default:
  //   }
  // };

  const handleNewTab = () => {
    window.open("https://localhost:300", "_blank");
  };

  return (
    <div style={{ width: "100%", height: "560px" }}>
      <Grid
        container
        style={{
          height: "560px",
          width: "100%",
          // padding: "20px",
        }}
      >
        <Grid item container xs={12} sm={8}>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ height: "85vh", border: "4px solid black" }}
          >
            <CodeMirror //code
              id="textarea"
              // value={reset ? " " : { code }}
              value={code}
              editorDidMount={(editor) => {
                editor.setSize("", "83.7vh");
              }}
              options={{
                mode:
                  lang === 54 ? "text/x-c++src" : lang === 71 ? "python" : null,
                // mode: "python",
                theme: theme2,
                lineNumbers: true,
                lineWrapping: true,
                matchBrackets: true,
                smartIndent: true,
                autoCloseBrackets: true,
                extraKeys: {
                  "Ctrl-Q": function (cm) {
                    cm.foldCode(cm.getCursor());
                  },

                  // 'Ctrl-/': editor.execCommand('toggleComment')
                  "Ctrl-/": function (cm) {
                    cm.execCommand(cm.toggleComment());
                  },
                },
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
              }}
              onBeforeChange={(editor, data, value) => {
                setReset(false);
                setCode(value);
              }}
            />
            {/* <button
              style={{
                // position: "absolute",
                // right: "32px",
                // top: "85px",
                // cursor: "pointer",
                position: "relative",
                left: "49rem",
                top: "7px",
                cursor: "pointer",
                zIndex: "10",
              }}
              onClick={() => {
                copy(code);
              }}
            >
              <FileCopyOutlinedIcon />
            </button> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ height: "46px", border: "2px solid black" }}
          >
            <MenuBar
              handleLanguage={handleLanguage}
              handleReset={handleReset}
              handleTheme={handleTheme}
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} sm={4} spacing={0}>
          <Grid item container style={{ height: "85vh" }}>
            <Grid item xs={12} sm={12} style={{ border: "4px solid black" }}>
              <CodeMirror //input
                name="code"
                value={input}
                editorDidMount={(editor) => {
                  editor.setSize("", "42vh");
                }}
                options={{
                  mode: "text/x-c++src",
                  theme: theme2,
                  // lineNumbers: true,
                  // foldOptions: true,
                  // foldGutter: true,
                  // gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                }}
                onBeforeChange={(editor, data, value) => {
                  setInput(value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} style={{ border: "4px solid black" }}>
              <CodeMirror //output
                name="code"
                value={output}
                editorDidMount={(editor) => {
                  editor.setSize("", "40vh");
                }}
                options={{
                  mode: "text/x-c++src",
                  theme: theme2,
                  // lineNumbers: true,
                  // gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                  // matchBrackets: true,
                  // autoCloseBrackets: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ border: "2px solid black", height: "46px" }}
          >
            <Button
              style={{
                width: "100%",
                height: "100%",
                margin: "0px",
                borderRadius: "0px",
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmitCode}
            >
              Run
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid container style={{ padding: "20px" }}>
        <Grid item container sm={6} justify="center">
          <Grid item style={{ width: "500px" }}>
            <CodeMirror //input
              name="code"
              value={input}
              options={{
                mode: "text/x-c++src",
                theme: theme2,
                lineNumbers: true,
                foldOptions: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
              }}
              onBeforeChange={(editor, data, value) => {
                setInput(value);
              }}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitCode}
            style={{ width: "70px" }}
          >
            Compile
          </Button>
        </Grid>
        <Grid item container sm={6} justify="center">
          <Grid item style={{ width: "500px" }}>
            <CodeMirror //output
              name="code"
              value={output}
              options={{
                mode: "text/x-c++src",
                theme: theme2,
                lineNumbers: true,
              }}
            />
          </Grid>

          <Button
            style={{ width: "70px" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Run
          </Button>
        </Grid>
        width: "414.5px",
      </Grid> */}
    </div>
  );
}

export default CodeIO;
