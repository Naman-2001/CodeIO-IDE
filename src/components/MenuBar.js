import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import SubjectIcon from "@material-ui/icons/Subject";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "0px",
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MenuBar = ({ handleLanguage, handleReset, handleTheme, users }) => {
  const classes = useStyles();

  const [lang, setLang] = useState("C++");
  const [theme, setTheme] = useState("material-ocean");

  return (
    <AppBar
      position="static"
      // color="secondary"
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(45deg,rgb(232 19 19 / 95%), rgb(0 0 0))",
      }}
    >
      {/* <Toolbar style={{ height: "10px" }}> */}
      <Grid
        container
        style={{
          padding: "0px 10px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Grid
          item
          style={{
            marginTop: "5px",
            height: "30px",
          }}
        >
          <FormControl
            variant="outlined"
            style={{
              width: "170px",
              height: "30px",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          >
            <Select
              style={{ height: "30px", padding: "0px !important" }}
              value={lang}
              label="C++"
              onChange={(e) => {
                setLang(e.target.value);
                handleLanguage(e.target.value);
              }}
            >
              <MenuItem value={54}>
                <em>C++</em>
              </MenuItem>
              <MenuItem value={71}>
                <em>Python</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item style={{ margin: "5px 0px 0px 30px", height: "30px" }}>
          <Button
            onClick={() => {
              handleReset(true);
            }}
            variant="contained"
            color="primary"
            style={{ height: "30px" }}
          >
            Reset
          </Button>
        </Grid>
        <Grid item style={{ margin: "0px 0px 5px 30px", height: "30px" }}>
          <Button
            onClick={() => {
              setTheme((prev) => {
                if (prev === "material-ocean") {
                  return "neat";
                } else {
                  return "material-ocean";
                }
              });
              handleTheme(theme);
            }}
          >
            <Brightness7Icon />
          </Button>
        </Grid>
        <Grid item style={{ margin: "0px 0px 5px 30px", height: "30px" }}>
          <Button>
            <SubjectIcon />
          </Button>
        </Grid>
        <Grid
          item
          style={{
            margin: "0px 0px 5px 30px",
            display: "flex",
            position: "absolute",
            right: "10px",
          }}
        >
          {users.map((user) => {
            return (
              <div
                style={{
                  color: "black",
                  fontSize: "1.7rem",
                  background: user.color,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid white",
                  margin: "10px",
                  textAlign: "center",
                }}
              >
                {user.name && user.name.slice(0, 1)}
              </div>
            );
          })}
        </Grid>
      </Grid>
      {/* </Toolbar> */}
    </AppBar>
  );
};

export default MenuBar;

{
  /* <MenuItem value={62}>
                    <em>Java</em>
                  </MenuItem>
                  <MenuItem value={63}>
                    <em>Javascript</em>
                  </MenuItem> */
}
