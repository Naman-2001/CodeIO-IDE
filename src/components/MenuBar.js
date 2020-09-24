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

const MenuBar = ({ handleLanguage, handleReset, handleTheme }) => {
  const [lang, setLang] = useState("C++");
  const [theme, setTheme] = useState("material");

  return (
    <AppBar position="static" color="secondary">
      <Toolbar variant="dense">
        <Grid container>
          <Grid item container justify="flex-start">
            <Grid item>
              <FormControl
                variant="outlined"
                size="small"
                style={{ width: "180px", height: "30px", marginBottom: "5px" }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Language
                </InputLabel>
                <Select
                  value={lang}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
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
                  <MenuItem value={62}>
                    <em>Java</em>
                  </MenuItem>
                  <MenuItem value={63}>
                    <em>Javascript</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item style={{ marginLeft: "30px" }}>
              <Button
                onClick={() => {
                  handleReset(true);
                }}
                variant="contained"
                color="primary"
              >
                Reset
              </Button>
            </Grid>
            <Grid item style={{ margin: "0px 0px 5px 30px" }}>
              <Button
                onClick={() => {
                  setTheme((prev) => {
                    if (prev === "material") {
                      return "neat";
                    } else {
                      return "material";
                    }
                  });
                  handleTheme(theme);
                }}
              >
                <Brightness7Icon />
              </Button>
            </Grid>
            <Grid item style={{ margin: "0px 0px 5px 30px" }}>
              <Button>
                <SubjectIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
