import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import copy from "copy-to-clipboard";
import MenuBar from "./MenuBar";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import randomcolor from "randomcolor";
import SaveIcon from "@material-ui/icons/Save";
import GetAppIcon from "@material-ui/icons/GetApp";
import "./CodeIO.css";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/addon/selection/active-line");
require("codemirror/addon/search/match-highlighter");
require("codemirror/addon/scroll/annotatescrollbar.js");
require("codemirror/addon/search/matchesonscrollbar.js");
require("codemirror/addon/search/searchcursor.js");
require("codemirror/addon/search/match-highlighter.js");
require("codemirror/theme/material-ocean.css");
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

function CodeIO(props) {
  const {
    match: { params },
  } = props;

  const location = useLocation();

  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [output, setOutput] = useState("See Output Here");
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("C++");
  const [reset, setReset] = useState(false);
  const [theme2, setTheme] = useState("material-ocean");
  const [conState, setConstate] = useState("connected");
  const [note, setNote] = useState("");
  const [users, setUsers] = useState([]);
  const codeMirrorRef = useRef();
  let wsProvider = useRef();

  useEffect(() => {
    if (!codeMirrorRef.current) return;

    // A Yjs document holds the shared data
    const ydoc = new Y.Doc();

    wsProvider.current = new WebsocketProvider(
      "wss://codeio-backend.herokuapp.com/",
      // `ws://localhost:8000`,
      params.id,
      ydoc
    );
    const awareness = wsProvider.current.awareness;
    // Define a shared text type on the document
    const yText = ydoc.getText(`codemirror`);
    var person = prompt(
      "Please enter your name",
      Math.floor(Math.random() * 10) + "User"
    );

    if (person === " ") {
      person = Math.floor(Math.random() * 10) + "User";
    }

    awareness.setLocalStateField("user", {
      name: person,
      color: randomcolor(),
    });

    let status;

    wsProvider.current.on("status", (event) => {
      console.log(event.status); // logs "connected" or "disconnected"
      status = event.status;
      if (event.status == "connected") {
        const _codemirrorBinding = new CodemirrorBinding(
          yText,
          codeMirrorRef.current,
          wsProvider.current.awareness
        );
      }
    });
    awareness.on("change", () => {
      setUsers([]);
      awareness.getStates().forEach((state) => {
        if (state.user) {
          console.log(state.user);
          setUsers((prev) => {
            return [...prev, state.user];
          });
        }
      });
    });
  }, []);

  const handleSubmitCode = () => {
    const source = `${code}`;
    const inp = `${input}`;
    // console.log(source);

    axios({
      method: "POST",
      url: `https://judge0-ce.p.rapidapi.com/submissions`,
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
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
      .then(async (response) => {
        console.log(response.data);
        await setToken(response.data.token);
        setTimeout(() => {
          handleSubmit(response.data.token);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (token) => {
    axios({
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      headers: {
        // "content-type": "application/octet-stream",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "x-rapidapi-key": `7b3dddefe1msheb8ab51a9e386f1p114d8ejsn6f6d49dd4d69`,
        useQueryString: true,
      },
      params: { base64_encoded: "true", fields: "*" },
    })
      .then((res) => {
        if (res.data.compile_output) {
          let str = res.data.compile_output;
          console.log(base64.decode(str));
          setOutput(base64.decode(str));
        } else if (res.data.stdout) {
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

  const handleSave = () => {
    console.log(code);
    console.log(params.id, params.roomid);
    axios({
      method: "PATCH",
      url: "https://codeio-backend.herokuapp.com/room/save",
      data: {
        id: params.id,
        roomid: params.roomid,
        content: code,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConnection = (state) => {
    setConstate(state);
    if (state === "disconnected") {
      wsProvider.current.disconnect();
    } else if (state === "connected") {
      wsProvider.current.connect();
    }
  };

  const handleInvite = () => {
    var toEmail = prompt("Please enter email of the person to invite");
    axios({
      method: "post",
      url: `https://codeio-backend.herokuapp.com/room/sendinvite/${params.id}/${params.roomid}`,
      data: {
        fromEmail: location.state && location.state[0].email,
        toEmail,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNewTab = () => {
    window.open("https://localhost:300", "_blank");
  };

  const TextFile = (notes) => {
    const element = document.createElement("a");
    const file = new Blob([notes], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myNotes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div style={{ width: "100%", height: "95vh" }}>
      <Grid
        container
        style={{
          height: "100%",
          width: "100%",
          // padding: "20px",
        }}
      >
        <Grid item container xs={12} sm={8} style={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            sm={12}
            style={{
              height: "80%",
              border: "4px solid black",
              fontSize: "15px",
              position: "relative",
            }}
          >
            <CodeMirror //code
              id="textarea"
              // value={reset ? " " : { code }}
              value={code}
              editorDidMount={(editor) => {
                codeMirrorRef.current = editor;
                editor.setSize("", "100%");
              }}
              options={{
                mode:
                  lang === 54 ? "text/x-c++src" : lang === 71 ? "python" : null,
                // mode: "python",
                theme: theme2,
                lineNumbers: true,
                lineWrapping: true,
                matchBrackets: true,
                styleActiveLine: { nonEmpty: true },
                styleActiveSelected: true,
                smartIndent: true,
                highlightSelectionMatches: {
                  showToken: /\w/,
                  annotateScrollbar: true,
                },
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
            <Button
              onClick={handleSave}
              style={{
                position: "absolute",
                bottom: "15px",
                color: "white",
                zIndex: 100,
                right: "0px",
              }}
            >
              <SaveIcon />{" "}
            </Button>
            <Button
              onClick={handleInvite}
              style={{
                position: "absolute",
                color: "white",
                zIndex: 100,
                right: "0px",
                top: "0px",
                background: "green",
              }}
            >
              Invite +
            </Button>
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
            style={{
              height: "10%",
              border: "4px solid black",
              fontSize: "15px",
              position: "relative",
            }}
          >
            <textarea
              id="myInput"
              rows="3"
              value={note}
              style={{ height: "91%", width: "94%" }}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <Button
              type="button"
              onClick={() => TextFile(note)}
              value="save"
              id="save"
              style={{
                height: "100%",
                right: "0px",
                position: "absolute",
                background: "springgreen",
              }}
            >
              <GetAppIcon />
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ height: "10%", border: "2px solid black" }}
          >
            <MenuBar
              handleLanguage={handleLanguage}
              handleReset={handleReset}
              handleTheme={handleTheme}
              users={users}
              conState={conState}
              handleConnection={handleConnection}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          sm={4}
          spacing={0}
          style={{ height: "100%" }}
        >
          <Grid item container style={{ height: "90%" }}>
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                height: "50%",
                border: "4px solid black",
                fontSize: "15px",
              }}
            >
              <CodeMirror //input
                name="code"
                value={input}
                editorDidMount={(editor) => {
                  editor.setSize("", "100%");
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
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                height: "50%",
                border: "4px solid black",
                fontSize: "15px",
              }}
            >
              <CodeMirror //output
                name="code"
                value={output}
                editorDidMount={(editor) => {
                  editor.setSize("", "100%");
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
            className="shadow"
            style={{ height: "10%" }}
          >
            <Button
              style={{
                width: "98%",
                height: "80%",
                margin: "8px 5px",
                borderRadius: "0px",
                zIndex: "1000000000",
                color: "white",
                background:
                  "linear-gradient(45deg,rgb(0 0 0 / 64%), rgb(18 16 24 / 97%))",
              }}
              variant="contained"
              // color="primary"
              onClick={handleSubmitCode}
            >
              Compile And Run
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CodeIO;
